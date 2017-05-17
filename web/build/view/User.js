'use strict';

var React = require('react');
module.exports = React.createClass({
	displayName: 'exports',

	getDefaultProps: function getDefaultProps() {
		return {
			model: 'zn_admin_user'
		};
	},
	getInitialState: function getInitialState() {
		return {
			data: Store.post('/znadmin/model/paging', {
				model: this.props.model
			}),
			items: [{ title: '用户名', name: 'name', width: 80 }, { title: '邮箱', name: 'email', width: 200 }, { title: '手机号', name: 'phone', width: 120 }, { title: '地址', name: 'address', width: 200 }, { title: '说明', name: 'note' }],
			formItems: [{ title: '用户名', name: 'name', type: 'Input', required: true, error: '用户名必填项!' }, { title: '邮箱', name: 'email', type: 'Input' }, { title: '手机号', name: 'phone', type: 'Input' }, { title: '地址', name: 'address', type: 'Input' }, { title: '说明', name: 'note', type: 'Textarea' }],
			toolbarItems: [{ text: '添加', name: 'add', icon: 'fa-plus', style: { marginRight: 5 } }, { text: '删除', name: 'remove', status: 'danger', icon: 'fa-remove', style: { marginRight: 5 } }]
		};
	},
	__doSuccess: function __doSuccess() {
		Popup.close('dialog');
		Toast.success('操作成功！');
		this.state.data.refresh();
	},
	__addItem: function __addItem() {
		Popup.dialog({
			title: '新增用户',
			hStyle: { backgroundColor: '#0B72A5' },
			width: 480,
			content: React.createElement(UI.Form, {
				method: 'POST',
				layout: 'stacked',
				action: '/znadmin/model/addNode',
				merge: 'data',
				exts: { model: this.props.model },
				style: { margin: 25 },
				syncSubmit: false,
				onSubmitSuccess: this.__doSuccess,
				btns: [{ text: '新增用户', icon: 'fa-plus', type: 'submit', float: 'right', style: { marginRight: 0 } }, { text: '取消', type: 'cancle', status: 'danger', float: 'right' }],
				items: this.state.formItems })
		});
	},
	__updateItem: function __updateItem(data) {
		Popup.dialog({
			title: '更新用户信息',
			hStyle: { backgroundColor: '#0B72A5' },
			width: 480,
			content: React.createElement(UI.Form, {
				method: 'POST',
				layout: 'stacked',
				action: '/znadmin/model/updateNode',
				exts: { model: this.props.model, where: { id: data.id } },
				merge: 'data',
				data: data,
				style: { margin: 25 },
				syncSubmit: false,
				onSubmitSuccess: this.__doSuccess,
				btns: [{ text: '更新', icon: 'fa-edit', type: 'submit', float: 'right', style: { marginRight: 0 } }, { text: '取消', type: 'cancle', status: 'danger', float: 'right' }],
				items: this.state.formItems })
		});
	},
	__removeItems: function __removeItems() {
		var _self = this,
		    _values = this.refs.table.getValue();
		if (_values && _values.length) {
			Popup.confirm({
				content: '确认删除这' + _values.length + '个用户吗？',
				onConfirm: function () {
					Store.post('/znadmin/model/deleteNodes', { model: this.props.model, ids: _values }).exec().then(function () {
						Toast.success('删除成功');
						_self.state.data.refresh();
					}, function (data) {
						Toast.warning('删除失败: ' + data.result);
					});
				}.bind(this)
			});
		} else {
			Toast.warning('请先选择要删除的用户');
		}
	},
	__onToolbarClick: function __onToolbarClick(item) {
		switch (item.name) {
			case 'add':
				this.__addItem();
				break;
			case 'remove':
				this.__removeItems();
				break;
		}
	},
	__onEditItem: function __onEditItem(event, item) {
		event.stopPropagation();
		this.__updateItem(item);
	},
	__itemRender: function __itemRender(item, index) {
		var _this = this;

		return React.createElement(
			'div',
			{ className: 'user-item' },
			React.createElement('img', { className: 'avatar', src: './images/DefaultAvatar.png' }),
			React.createElement(
				'div',
				{ className: 'details' },
				React.createElement(
					'span',
					{ className: 'last-logintime' },
					item.lastLoginTime || '还未登陆'
				),
				React.createElement(
					'div',
					{ className: 'name', onClick: function onClick(event) {
							return _this.__onUserClick(event, item, index);
						} },
					item.name,
					React.createElement('i', { style: { margin: 5, color: '#971818' }, className: 'fa fa-edit', onClick: function onClick(event) {
							return _this.__onEditItem(event, item);
						} })
				),
				React.createElement(
					'div',
					null,
					React.createElement('i', { className: 'fa fa-clock-o' }),
					'\u521B\u5EFA\u65F6\u95F4\uFF1A',
					item.createTime
				),
				React.createElement(
					'div',
					null,
					React.createElement('i', { className: 'fa fa-envelope' }),
					'\u90AE\u7BB1\uFF1A',
					item.email
				),
				React.createElement(
					'div',
					null,
					React.createElement('i', { className: 'fa fa-phone' }),
					'\u624B\u673A\u53F7\uFF1A',
					item.phone
				)
			)
		);
	},
	__onTableColumnRender: function __onTableColumnRender(rowIndex, columnIndex, data, item, value) {
		switch (columnIndex) {
			case 1:
				return React.createElement(
					'a',
					{ href: '#/main/znadmin/UserInfo?userId=' + data.id },
					value
				);
		}
	},
	render: function render() {
		return React.createElement(
			UI.Page,
			{
				toolbarItems: this.state.toolbarItems,
				onToolbarClick: this.__onToolbarClick,
				title: '\u7CFB\u7EDF\u8D26\u6237\u7BA1\u7406' },
			React.createElement(UI.PagerView, {
				ref: 'table',
				view: 'Table',
				enableFilter: true,
				checkbox: 50,
				showHeader: true,
				columnRender: this.__onTableColumnRender,
				onTableRowClick: this.__onTableRowClick,
				data: this.state.data,
				items: this.state.items })
		);
	}
});