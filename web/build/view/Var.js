'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var RightsSetting = require('../component/RightsSetting');
module.exports = React.createClass({
	displayName: 'exports',

	getDefaultProps: function getDefaultProps() {
		return {
			model: 'zn_admin_var',
			pid: 0,
			title: '资源管理',
			menuId: 0,
			fields: [{ title: '标题', type: 'Input', name: 'title' }, { title: '类型', type: 'Radio', name: 'type', value: 0,
				data: [{ text: '分类', value: 0 }, { text: '按钮', value: 1 }, { text: '常量', value: 2 }, { text: '标签', value: 3 }, { text: '标签', value: 4 }]
			}, { title: '图标', type: 'Input', name: 'icon' }, { title: '图片', type: 'ImageUploader', name: 'img', action: '/znadmin/uploadFiles' }, { title: '链接', type: 'Input', name: 'url' }, { title: '路径', type: 'Input', name: 'path' }, { title: '扩展', type: 'Textarea', name: 'ext' }]
		};
	},
	__rightRender: function __rightRender(treeModel) {
		if (!treeModel.state.currItem) {
			return null;
		}
		var _id = treeModel.state.currItem.props.data.id;
		return React.createElement(
			'div',
			null,
			React.createElement(RightsSetting, { model: this.props.model, id: treeModel.state.currItem ? treeModel.state.currItem.props.data.id : null })
		);
	},
	__itemContentRender: function __itemContentRender(item) {
		var _data = item.data;
		switch (_data.type) {
			case 1:
				return React.createElement(
					'span',
					null,
					React.createElement('i', { title: '\u8FD9\u662F\u64CD\u4F5C\u6309\u94AE', className: 'fa fa-hand-o-up', style: { margin: 5, color: '#0B72A5' } }),
					React.createElement('i', { className: 'fa ' + _data.icon, style: { marginRight: 5 } }),
					_data.id + '、' + _data.title
				);
			case 2:
				return React.createElement(
					'span',
					null,
					React.createElement('i', { title: '\u8FD9\u662F\u9759\u6001\u5E38\u91CF', className: 'fa fa-text-width', style: { margin: 5, color: '#d9534f' } }),
					React.createElement('i', { className: 'fa ' + _data.icon, style: { marginRight: 5 } }),
					_data.id + '、' + _data.title
				);
			case 3:
				return React.createElement(
					'span',
					null,
					React.createElement('i', { title: '\u8FD9\u662F\u6807\u7B7E\u7C7B\u522B', className: 'fa fa-tag', style: { margin: 5 } }),
					React.createElement('i', { className: 'fa ' + _data.icon, style: { marginRight: 5 } }),
					_data.id + '、' + _data.title
				);
		}
	},
	render: function render() {
		return React.createElement(PluginModel.TreeModelView, _extends({}, this.props, { where: { menuId: this.props.menuId }, itemContentRender: this.__itemContentRender, rightRender: this.__rightRender, leftWidth: 30 }));
	}
});