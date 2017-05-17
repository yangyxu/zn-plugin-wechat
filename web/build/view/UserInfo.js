'use strict';

require('./UserInfo.less');
var React = require('react');

module.exports = React.createClass({
	displayName: 'exports',

	getInitialState: function getInitialState() {
		return {
			userId: this.props.userId,
			info: null,
			data: Store.post('/znadmin/model/select', { model: 'zn_admin_role', where: { pid: 0 } })
		};
	},
	componentDidMount: function componentDidMount() {
		this.__loadUserInfo();
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
			Popup.message({
				content: '保存成功!',
				type: 'success'
			});
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
					React.createElement('img', { className: 'avatar', src: './images/DefaultAvatar.png' }),
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
						React.createElement(UI.TreeListView, { cascade: false, enableCheckbox: true, onItemCheckboxChange: this.__onTreeMenuItemCheckboxChange, value: this.state.info.roleIds, itemContentRender: this.__itemContentRender, ref: 'maintreemenu', activeAll: true, data: this.state.data })
					)
				)
			)
		);
	}
});