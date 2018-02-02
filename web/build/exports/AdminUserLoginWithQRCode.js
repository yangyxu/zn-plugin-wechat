var React = require('react');
module.exports = React.createClass({
	displayName: 'exports',

	getInitialState: function getInitialState() {
		return {
			user: null,
			loading: true,
			items: [{ type: 'ImageUploader', isImage: true, required: true, name: 'avatar_img', placeholder: '请上传个人头像', title: '头像' }, { type: 'Input', name: 'name', placeholder: '请输入真实姓名', title: '姓名' }, { type: 'Input', name: 'password', attrs: { type: 'password' }, placeholder: '请输入密码', title: '密码' }, { type: 'Input', name: 'phone', attrs: { type: 'number' }, placeholder: '请输入手机号', title: '手机号' }, { type: 'Input', name: 'qq', attrs: { type: 'number' }, placeholder: '请输入QQ', title: 'QQ' }, { type: 'Input', name: 'wechat', placeholder: '请输入微信号', title: '微信号' }, { type: 'Input', name: 'email', placeholder: '请输入常用邮箱', title: '邮箱' }, { type: 'Textarea', name: 'address', placeholder: '请输入详细地址', title: '地址' }, { type: 'Textarea', name: 'zn_note', title: '备注' }]
		};
	},
	componentDidMount: function componentDidMount() {
		zn.http.post('/zn.plugin.wechat/zn.plugin.admin.user/authWithOpenid', {
			openid: zn.plugin.wechat.getToken().openid
		}).then(function (data) {
			if (data.status == 200) {
				this.setState({ user: data.result, loading: false });
			}
		}.bind(this), function (err) {
			zn.toast.error('网络请求失败');
		});
	},
	__renderUserInfo: function __renderUserInfo() {
		return React.createElement(
			'div',
			{ style: { backgroundColor: '#FFF', margin: 10, padding: 3 } },
			React.createElement(
				'div',
				{ style: { textAlign: 'center', backgroundColor: '#e6e6e6', fontWeight: 'bold', lineHeight: '40px' } },
				'\u7528\u6237\u4FE1\u606F'
			),
			React.createElement(
				'div',
				{ style: { display: 'flex', padding: 10, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' } },
				React.createElement('img', { style: { width: 64, height: 64, borderRadius: 64 }, src: this.state.user.avatar_img }),
				React.createElement(
					'div',
					null,
					this.state.user.name
				)
			),
			React.createElement('div', null)
		);
	},
	__onRegisterBefore: function __onRegisterBefore(data) {
		zn.http.post('/zn.plugin.wechat/zn.plugin.admin.user/register', data).then(function (data) {
			if (data.status == 200) {
				this.setState({ user: data.result, loading: false });
			} else {
				zn.toast.error('注册失败：' + data.result);
			}
		}.bind(this), function (err) {
			zn.toast.error('网络请求失败');
		});
		return false;
	},
	__renderRegister: function __renderRegister() {
		var _token = zn.plugin.wechat.getToken();
		return React.createElement(
			'div',
			{ style: { backgroundColor: '#FFF', margin: 10, padding: 3 } },
			React.createElement(
				'div',
				{ style: { textAlign: 'center', backgroundColor: '#e6e6e6', fontWeight: 'bold', lineHeight: '40px' } },
				'\u65B0\u7528\u6237\u6CE8\u518C'
			),
			React.createElement(zn.react.Form, { value: { avatar_img: _token.headimgurl, name: _token.nickname }, onSubmitBefore: this.__onRegisterBefore, hiddens: { zn_plugin_wechat_open_id: zn.plugin.wechat.getToken().openid }, items: this.state.items, buttons: [{ text: '提交注册', type: 'submit', status: 'primary', icon: 'fa-registered' }] })
		);
	},
	render: function render() {
		return React.createElement(
			zn.react.Page,
			{ canBack: false, title: '\u5FAE\u4FE1\u767B\u5F55' },
			this.state.loading ? React.createElement(
				'div',
				{ style: { textAlign: 'center', padding: 10 } },
				React.createElement(
					'span',
					{ className: 'zr-dot-loading' },
					'\u52A0\u8F7D\u4E2D'
				)
			) : this.state.user ? this.__renderUserInfo() : this.__renderRegister()
		);
	}
});