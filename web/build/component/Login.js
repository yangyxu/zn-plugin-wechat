var React = require('react');
var TOKEN_KEY = "ZN_PLUGIN_WECHAT_USER_LOGIN_TOKEN";
var HASH_KEY = "ZN_PLUGIN_WECHAT_USER_LOGIN_HASH";
module.exports = React.createClass({
	displayName: "exports",

	getInitialState: function getInitialState() {
		return {
			loading: false,
			debug: this.props.debug || 0,
			state: 1,
			code: null,
			token: zn.react.session.jsonKeyValue(TOKEN_KEY)
		};
	},
	componentDidMount: function componentDidMount() {
		this.__validate();
	},
	__validate: function __validate() {
		if (!this.state.token) {
			this.__parseHash();
			if (this.state.code) {
				this.__loginWithWeChatCode();
			} else {
				this.__reLogin();
			}
		} else {
			this.__doAuth(this.state.token);
		}
	},
	__parseHash: function __parseHash() {
		if (window.location.hash) {
			zn.react.session.setKeyValue(HASH_KEY, window.location.hash);
		}
		var _searchs = window.location.href.split('?'),
		    _temp = [],
		    _self = this,
		    _value;
		_searchs.shift();
		_searchs.forEach(function (search) {
			if (search.indexOf('#/') != -1) {
				search = search.split('#/')[0];
			}
			search.split('&').forEach(function (value) {
				_temp = value.split('=');
				_value = _temp[1];
				if (_temp[0] == 'code') {
					_self.state.debug = 0;
				}
				_self.state[_temp[0]] = _value;
			});
		});
	},
	__loginWithWeChatCode: function __loginWithWeChatCode() {
		this.setState({ loading: true });
		zn.plugin.wechat.user.loginByCode(this.state.code, function (data) {
			if (data.status == 200) {
				this.__doAuth(data.result);
			} else {
				this.__reLogin();
			}
		}.bind(this), function () {
			this.__reLogin();
		}.bind(this));
	},
	__doAuth: function __doAuth(token) {
		var _hash = zn.react.session.getKeyValue(HASH_KEY);
		zn.react.session.setKeyValue(TOKEN_KEY, token);
		this.__initWXJSSDKConfig();
		this.setState({ token: token });
		if (_hash) {
			window.location.hash = _hash;
			zn.react.session.removeKeyValue(HASH_KEY);
		}
		this.props.onAuthSuccess && this.props.onAuthSuccess(token, _hash);
	},
	__reLogin: function __reLogin() {
		if (this.state.debug) {
			return false;
		}
		zn.plugin.wechat.user.getAuthorizeURL({
			redirect_state: this.state.state
		}, function (data) {
			if (data.result) {
				window.location.href = data.result;
			} else {
				zn.notification.error('后台服务不可用');
			}
		}, function () {
			zn.notification.error('后台服务不可用');
		});
	},
	__initWXJSSDKConfig: function __initWXJSSDKConfig() {
		zn.plugin.wechat.user.initJSSDKConfig();
	},
	render: function render() {
		if (!this.state.token) {
			return React.createElement(zn.react.DataLoader, { loader: "timer", content: "\u8BA4\u8BC1\u4E2D..." });
		}
		if (this.state.loading) {
			return React.createElement(zn.react.DataLoader, { loader: "timer", content: "\u767B\u9646\u4E2D..." });
		} else {
			return React.createElement(
				"div",
				{ className: "zn-plugin-wechat-login" },
				"\u8BA4\u8BC1\u6210\u529F"
			);
		}
	}
});