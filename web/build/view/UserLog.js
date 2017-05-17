'use strict';

var React = require('react');
module.exports = React.createClass({
	displayName: 'exports',

	getDefaultProps: function getDefaultProps() {
		return {
			model: 'zn_admin_user_log'
		};
	},
	getInitialState: function getInitialState() {
		return {
			data: Store.post('/znadmin/model/paging', {
				model: this.props.model
			}),
			items: [{ title: '操作人', name: 'userId_convert', width: 100 }, { title: '操作时间', name: 'createTime', width: 180 }, { title: '类型', name: 'actionType', width: 80 }, { title: '说明', name: 'note' }]
		};
	},
	__onToolbarClick: function __onToolbarClick() {},
	render: function render() {
		return React.createElement(
			UI.Page,
			{
				toolbarItems: [{ text: '导出' }],
				onToolbarClick: this.__onToolbarClick,
				title: '\u7CFB\u7EDF\u8D26\u6237\u767B\u5F55\u65E5\u5FD7' },
			React.createElement(UI.PagerView, {
				view: 'Table',
				enableFilter: false,
				checkbox: 0,
				showHeader: true,
				data: this.state.data,
				items: this.state.items })
		);
	}
});