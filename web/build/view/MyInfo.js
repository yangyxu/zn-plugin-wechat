'use strict';

require('./UserInfo.less');
var React = require('react');

module.exports = React.createClass({
	displayName: 'exports',

	getInitialState: function getInitialState() {
		return {
			userId: this.props.userId || Session.json().id,
			toolbarItems: this.props.userId ? [] : [{ icon: 'fa-edit', text: '修改个人信息', onClick: this.__onEdit }],
			info: null,
			formItems: [{ title: '头像', name: 'avatarImg', type: 'ImageUploader', action: '/klproject/uploadFiles' }, { title: '用户名', name: 'name', type: 'Input', required: true, error: '用户名必填项!' }, { title: '密码', name: 'pwd', type: 'Input', attrs: { type: 'password' }, required: true, error: '密码必填项!' }, { title: '邮箱', name: 'email', type: 'Input', required: true, error: '邮箱必填项!' }, { title: '手机号', name: 'phone', type: 'Input', required: true, error: '手机号必填项!' }, { title: '地址', name: 'address', type: 'Input' }, { title: '说明', name: 'note', type: 'Textarea' }],
			data: Store.post('/znadmin/model/select', { model: 'zn_admin_role', where: { pid: 0 } })
		};
	},
	componentDidMount: function componentDidMount() {
		this.__loadUserInfo();
	},
	__doSuccess: function __doSuccess() {
		Popup.close('dialog');
		Toast.success('修改成功');
		Store.post('/znadmin/user/findUserById', { userId: this.state.userId }).exec().then(function (data) {
			this.setState({
				info: data.result
			});
		}.bind(this));
	},
	__onEdit: function __onEdit(data) {
		Popup.dialog({
			title: '修改个人信息',
			hStyle: { backgroundColor: '#0B72A5' },
			width: 480,
			content: React.createElement(UI.Form, {
				method: 'POST',
				layout: 'stacked',
				action: '/znadmin/model/updateNode',
				exts: { model: 'zn_admin_user', where: { id: this.state.info.id } },
				merge: 'data',
				value: this.state.info,
				style: { margin: 25 },
				syncSubmit: false,
				onSubmitSuccess: this.__doSuccess,
				btns: [{ text: '修改', icon: 'fa-edit', type: 'submit', float: 'right', style: { marginRight: 0 } }, { text: '取消', type: 'cancle', status: 'danger', float: 'right' }],
				items: this.state.formItems })
		});
	},
	__loadUserInfo: function __loadUserInfo() {
		Store.post('/znadmin/user/findUserById', { userId: this.state.userId }).exec().then(function (data) {
			this.setState({
				info: data.result
			});
		}.bind(this));
	},
	__onTreeMenuItemCheckboxChange: function __onTreeMenuItemCheckboxChange(value) {
		Store.post('/znadmin/user/updateUser', { data: { roleIds: value }, userId: this.state.info.id }).exec().then(function (data) {
			Toast.success('保存成功');
		});
	},
	__itemContentRender: function __itemContentRender(props) {
		var _icon = '';
		if (props.data.type == 1) {
			_icon = 'fa-sitemap';
		}
		if (props.data.type == 2) {
			_icon = 'fa-graduation-cap';
		}

		return React.createElement(
			'span',
			null,
			React.createElement('i', { style: { margin: 5 }, className: 'fa ' + _icon }),
			props.data.id + '、' + props.data.title
		);
	},
	render: function render() {
		if (!this.state.info) {
			return null;
		}
		return React.createElement(
			UI.Page,
			{ title: this.state.info.name, icon: 'fa-newspaper-o', toolbarItems: this.state.toolbarItems },
			React.createElement(
				'div',
				{ className: 'user-info' },
				React.createElement(
					'div',
					{ className: 'info-form user-item' },
					React.createElement('img', { className: 'avatar', src: Store.fixURL(this.state.info.avatarImg) || './images/DefaultAvatar.png' }),
					React.createElement(
						'div',
						{ className: 'details' },
						React.createElement(
							'span',
							{ className: 'last-logintime' },
							'\u6700\u8FD1\u4E00\u6B21\u767B\u5F55\u65F6\u95F4\uFF1A',
							this.state.info.lastLoginTime || '还未登陆'
						),
						React.createElement(
							'div',
							{ className: 'name' },
							this.state.info.name
						),
						React.createElement(
							'div',
							null,
							React.createElement('i', { className: 'fa fa-clock-o' }),
							'\u521B\u5EFA\u65F6\u95F4\uFF1A',
							this.state.info.createTime
						),
						React.createElement(
							'div',
							null,
							React.createElement('i', { className: 'fa fa-envelope' }),
							'\u90AE\u7BB1\uFF1A',
							this.state.info.email
						),
						React.createElement(
							'div',
							null,
							React.createElement('i', { className: 'fa fa-phone' }),
							'\u624B\u673A\u53F7\uFF1A',
							this.state.info.phone
						),
						React.createElement(
							'div',
							null,
							this.state.info.note
						)
					)
				),
				React.createElement(
					'div',
					{ className: 'rt-panel c-default' },
					React.createElement(
						'div',
						{ className: 'p-head' },
						'\u90E8\u95E8\u53CA\u89D2\u8272'
					),
					React.createElement(
						'div',
						{ className: 'p-body' },
						React.createElement(UI.TreeListView, { disabled: true, cascade: false, enableCheckbox: true, onItemCheckboxChange: this.__onTreeMenuItemCheckboxChange, value: this.state.info.roleIds, itemContentRender: this.__itemContentRender, ref: 'maintreemenu', activeAll: true, data: this.state.data })
					)
				)
			)
		);
	}
});