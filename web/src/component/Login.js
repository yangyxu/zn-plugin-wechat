var React = require('react');
var TOKEN_KEY = "ZN_PLUGIN_WECHAT_USER_LOGIN_TOKEN";
var HASH_KEY = "ZN_PLUGIN_WECHAT_USER_LOGIN_HASH";
module.exports = React.createClass({
	getInitialState: function (){
		return {
			loading: false,
			debug: this.props.debug || 0,
			state: 1,
			code: null,
			token: zn.react.session.jsonKeyValue(TOKEN_KEY)
		};
	},
	componentDidMount: function (){
		this.__validate();
	},
	__validate: function (){
		if(!this.state.token){
			this.__parseHash();
			if(this.state.code){
				this.__loginWithWeChatCode();
			}else {
				this.__reLogin();
			}
		}else {
			this.__doAuth(this.state.token);
		}
	},
	__parseHash: function (){
		if(window.location.hash){
			zn.react.session.setKeyValue(HASH_KEY, window.location.hash);
		}
		var _searchs = window.location.href.split('?'),
			_temp = [], _self = this, _value;
		_searchs.shift();
		_searchs.forEach(function (search){
			if(search.indexOf('#/')!=-1) {
				search = search.split('#/')[0];
			}
			search.split('&').forEach(function (value){
				_temp = value.split('=');
				_value = _temp[1];
				if(_temp[0]=='code'){
					_self.state.debug = 0;
				}
				_self.state[_temp[0]] = _value;
			});
		});
	},
	__loginWithWeChatCode: function (){
		this.setState({ loading: true });
		zn.plugin.wechat.user.loginByCode(this.state.code, function (data){
			if(data.status==200){
				this.__doAuth(data.result);
			}else {
				this.__reLogin();
			}
		}.bind(this), function (){
			this.__reLogin();
		}.bind(this));
	},
	__doAuth: function (token){
		var _hash = zn.react.session.getKeyValue(HASH_KEY);
		zn.react.session.setKeyValue(TOKEN_KEY, token);
		this.__initWXJSSDKConfig();
		this.setState({ token: token });
		if(_hash){
			window.location.hash = _hash;
			zn.react.session.removeKeyValue(HASH_KEY);
		}
		this.props.onAuthSuccess && this.props.onAuthSuccess(token, _hash);
	},
	__reLogin: function (){
		if(this.state.debug){ return false; }
		zn.plugin.wechat.user.getAuthorizeURL({
			redirect_state: this.state.state
		}, function (data){
			if(data.result){
				window.location.href = data.result;
			}else {
				zn.notification.error('后台服务不可用');
			}
		}, function (){
			zn.notification.error('后台服务不可用');
		});
	},
	__initWXJSSDKConfig: function (){
		zn.plugin.wechat.user.initJSSDKConfig();
	},
	render:function(){
		if(!this.state.token){
			return <zn.react.DataLoader loader="timer" content="认证中..." />;
		}
		if(this.state.loading){
			return <zn.react.DataLoader loader="timer" content="登陆中..." />;
		} else {
			return <div className="zn-plugin-wechat-login">认证成功</div>;
		}
	}
});
