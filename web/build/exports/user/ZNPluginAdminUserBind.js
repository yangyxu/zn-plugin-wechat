var React = require('react');
var QRCode = require('qrcode.react');

module.exports = React.createClass({
	displayName: 'exports',

	getInitialState: function getInitialState() {
		return {
			user: null,
			logs: []
		};
	},
	componentDidMount: function componentDidMount() {
		if (this.props.openid) {
			this.__loadInfo();
		}
	},
	__loadInfo: function __loadInfo() {
		zn.http.post('/zn.plugin.wechat/zn.plugin.wechat.user/getInfoWithOpenid', {
			openid: this.props.openid
		}).then(function () {});
	},
	__renderQRCode: function __renderQRCode() {},
	render: function render() {
		return React.createElement(
			'div',
			{ className: 'zn-plugin-wechat-user-info' },
			React.createElement(
				'div',
				{ className: 'info-left' },
				React.createElement(QRCode, { value: window.location.origin + window.location.pathname.replace('admin.html', 'index.html') + "#/znpluginwechat.user.bind?znid=" + this.state.user.zn_id })
			),
			this.state.user && React.createElement('div', { className: 'info-right' })
		);
	}
});