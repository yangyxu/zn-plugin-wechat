var React = require('react');
var UserInfo = require('./UserInfo.js');
var QRCode = require('qrcode.react');

module.exports = React.createClass({
	displayName: 'exports',

	getInitialState: function getInitialState() {
		return {
			isReset: false
		};
	},
	__renderQRCode: function __renderQRCode() {
		var _this = this;

		console.log(window.location.origin + window.location.pathname.replace('admin.html', 'index.html') + "#/znpluginwechat.user.bind?token=" + zn.plugin.admin.getToken().id);
		return React.createElement(
			'div',
			{ className: 'qr-code' },
			React.createElement(
				'div',
				{ className: 'title' },
				'\u5FAE\u4FE1\u626B\u4E00\u626B'
			),
			React.createElement(QRCode, { value: window.location.origin + window.location.pathname.replace('admin.html', 'index.html') + "#/znpluginwechat.user.bind?token=" + zn.plugin.admin.getToken().id }),
			React.createElement(
				'div',
				{ className: 'tip' },
				'\u7ED1\u5B9A\u5FAE\u4FE1\u53F7'
			),
			this.props.openid && React.createElement(zn.react.Button, { style: { width: 140 }, onClick: function onClick() {
					return _this.setState({ isReset: false });
				}, text: '\u53D6\u6D88', status: 'danger' })
		);
	},
	render: function render() {
		var _this2 = this;

		return React.createElement(
			'div',
			{ className: 'zn-plugin-wechat-zn-plugin-admin-wechat-user-info' },
			this.props.openid && !this.state.isReset ? React.createElement(
				'div',
				{ className: 'user' },
				React.createElement(UserInfo, { openid: this.props.openid }),
				React.createElement(zn.react.Button, { style: { margin: 20 }, onClick: function onClick() {
						return _this2.setState({ isReset: true });
					}, text: '\u91CD\u65B0\u7ED1\u5B9A' })
			) : this.__renderQRCode()
		);
	}
});