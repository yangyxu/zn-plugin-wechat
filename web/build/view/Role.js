'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var UsersForRoles = require('./UsersForRoles.js');
module.exports = React.createClass({
	displayName: 'exports',

	getDefaultProps: function getDefaultProps() {
		return {
			model: 'zn_admin_role',
			pid: 0,
			title: '部门及角色管理',
			menuId: 0,
			fields: [{ title: '名称', type: 'Input', name: 'title' }, { title: '类型', type: 'Radio', name: 'type', value: 1,
				data: [{ text: '分类', value: 0 }, { text: '部门', value: 1 }, { text: '角色', value: 2 }]
			}, { title: '说明', type: 'Textarea', name: 'note' }]
		};
	},
	componentDidMount: function componentDidMount() {},
	__rightRender: function __rightRender(treeMenu) {
		return React.createElement(UsersForRoles, { roleId: treeMenu.state.currItem ? treeMenu.state.currItem.props.data.id : null });
	},
	__itemContentRender: function __itemContentRender(item) {
		var _data = item.data;
		switch (_data.type) {
			case 0:
				return React.createElement(
					'span',
					null,
					_data.id + '、' + _data.title
				);
			case 1:
				return React.createElement(
					'span',
					null,
					React.createElement('i', { title: '\u8FD9\u662F\u90E8\u95E8', className: 'fa fa-sitemap', style: { margin: 5, color: '#d9534f' } }),
					_data.id + '、' + _data.title
				);
			case 2:
				return React.createElement(
					'span',
					null,
					React.createElement('i', { title: '\u8FD9\u662F\u89D2\u8272', className: 'fa fa-graduation-cap', style: { margin: 5 } }),
					_data.id + '、' + _data.title
				);
		}
	},
	render: function render() {
		return React.createElement(PluginModel.TreeModelView, _extends({}, this.props, { rightRender: this.__rightRender, itemContentRender: this.__itemContentRender }));
	}
});