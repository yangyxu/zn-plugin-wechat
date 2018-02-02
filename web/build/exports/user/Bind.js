var React = require('react');
var UserInfo = require('../../component/UserInfo.js');

module.exports = React.createClass({
	displayName: 'exports',

	getInitialState: function getInitialState() {
		return {
			token: this.props.request.search.token
		};
	},
	bindAccount: function bindAccount() {
		zn.confirm('确认绑定该微信号么？', '提示', function () {
			zn.preloader.open({
				content: '绑定中...'
			});
			zn.http.post('/zn.plugin.wechat/zn.plugin.admin.user/bindWechatWithOpenid', {
				openid: zn.plugin.wechat.getToken().openid,
				token: this.state.token
			}).then(function (data) {
				if (data.status == 200) {
					zn.toast.success(data.result);
				} else {
					zn.toast.error(data.result || '服务不可用');
				}
				zn.preloader.close();
			}, function () {
				zn.toast.error('网络请求失败');
				zn.preloader.close();
			});
		}.bind(this));
	},
	render: function render() {
		return React.createElement(
			zn.react.Page,
			{ title: '\u767B\u5F55\u4FE1\u606F', canBack: false },
			React.createElement(UserInfo, { openid: zn.plugin.wechat.getToken().openid }),
			React.createElement(zn.react.Button, { style: { margin: 20 }, onClick: this.bindAccount, text: '\u7ED1\u5B9A', status: 'warning' })
		);
	}
});