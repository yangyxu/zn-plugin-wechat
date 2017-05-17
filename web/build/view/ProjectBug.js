'use strict';

var React = require('react');
module.exports = React.createClass({
	displayName: 'exports',

	getDefaultProps: function getDefaultProps() {
		return {
			data: null,
			model: 'zn_admin_project_bug'
		};
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		if (nextProps.data !== this.props.data) {
			this.state.data._data.where = {
				projectId: nextProps.data.id
			};
			this.state.data.exec();
		}
	},
	getInitialState: function getInitialState() {
		var _where = {};
		if (this.props.data) {
			_where.projectId = this.props.data.id;
		}
		return {
			data: Store.post('/znadmin/model/paging', {
				model: this.props.model,
				where: _where
			}),
			items: [{ title: '操作', width: 60, textAlign: 'center' }, { title: '问题', name: 'title', width: 220, filter: { type: 'Input', opts: ['like'] } }, { title: '状态', name: 'state', width: 80, filter: { type: 'Menu', data: [{ text: '待处理', value: 0 }, { text: '处理中...', value: 2 }, { text: '已经解决', value: 3 }, { text: '已经确认', value: 3 }], opts: ['='] } }, { title: '优先级', name: 'priority', width: 80, filter: { type: 'Menu', data: [{ text: '正常', value: 1 }, { text: '紧急', value: 2 }, { text: '非常紧急', value: 3 }], opts: ['='] } }, { title: '开始时间', name: 'beginTime', width: 140 }, { title: '结束时间', name: 'endTime', width: 140 }, { title: '完成时间', name: 'finishTime', width: 140 }, { title: '提交时间', name: 'createTime', width: 140 }, { title: '描述', name: 'note' }],
			formItems: [{ title: '问题', name: 'title', type: 'Textarea' }, { title: '版本号', type: 'Input', name: 'version' }, {
				title: '优先级',
				type: 'Select',
				name: 'priority',
				data: [{ text: '正常', value: 1 }, { text: '紧急', value: 2 }, { text: '非常紧急', value: 3 }]
			}, { title: '开始时间', name: 'beginTime', type: 'Timer' }, { title: '结束时间', name: 'endTime', type: 'Timer' }, { title: '附件', name: 'files', type: 'FileUploader', action: '/znadmin/uploadFiles' }, { title: '问题描述', name: 'description', type: 'RichEditor' }, { title: '解决方案', name: 'solution', type: 'RichEditor' }],
			toolbarItems: [{ text: '添加', icon: 'fa-plus' }]
		};
	},
	__onRowActions: function __onRowActions(rtitem, data) {
		var _data = this.state.data;
		var _self = this;
		switch (rtitem.props.icon) {
			case 'fa-remove':
				Alert.show({
					width: 280,
					title: '提示',
					content: '确定删除该数据吗？',
					onConfirm: function onConfirm() {
						Store.post('/znadmin/model/deleteNode', {
							model: _self.props.model,
							id: data.id
						}).exec().then(function (data) {
							Toast.success('删除成功！');
							_data.refresh();
						});
					}
				});
				break;
			case 'fa-edit':
				this.__updateItem(data);
				break;
		}
	},
	__onView: function __onView() {},
	__onTableColumnRender: function __onTableColumnRender(rowIndex, columnIndex, data, item, value) {
		var _this = this;

		switch (columnIndex) {
			case 0:
				return React.createElement(UI.ListView, {
					className: 'rt-flex',
					data: [{ text: '删除', icon: 'fa-remove' }, { text: '修改', icon: 'fa-edit' }],
					itemRender: function itemRender(item, index) {
						return React.createElement('i', { title: item.text, className: 'fa ' + item.icon, style: item.style });
					},
					onClick: function onClick(value, rtitem) {
						return _this.__onRowActions(rtitem, data);
					}
				});
			case 1:
				return React.createElement(
					'a',
					{ style: { textDecoration: 'underline' }, onClick: function onClick() {
							return _this.__onView(data);
						} },
					value
				);
			case 2:
				switch (+value) {
					case 0:
						return React.createElement(
							'span',
							null,
							'\u7B49\u5F85\u5904\u7406'
						);
					case 1:
						return React.createElement(
							'span',
							{ style: { color: 'yellow' } },
							'\u5904\u7406\u4E2D'
						);
					case 2:
						return React.createElement(
							'span',
							{ style: { color: 'red' } },
							'\u5DF2\u7ECF\u89E3\u51B3'
						);
					case 3:
						return React.createElement(
							'span',
							{ style: { color: 'red' } },
							'\u5DF2\u7ECF\u786E\u8BA4'
						);
				}
				return null;
			case 3:
				switch (+value) {
					case 1:
						return React.createElement(
							'span',
							null,
							'\u6B63\u5E38'
						);
					case 2:
						return React.createElement(
							'span',
							{ style: { color: '#F44336' } },
							'\u7D27\u6025'
						);
					case 3:
						return React.createElement(
							'span',
							{ style: { color: 'red' } },
							'\u975E\u5E38\u7D27\u6025'
						);
				}
				return null;
		}
	},
	__updateItem: function __updateItem(data) {
		Popup.dialog({
			title: '修改',
			hStyle: { backgroundColor: '#0B72A5' },
			width: 780,
			content: React.createElement(UI.Form, {
				method: 'POST',
				layout: 'stacked',
				action: '/znadmin/model/updateNode',
				exts: { model: this.props.model, where: { id: data.id } },
				merge: 'data',
				value: Store.post('/znadmin/model/selectOne', { model: this.props.model, where: { id: data.id } }),
				style: { margin: 25 },
				syncSubmit: false,
				onSubmitSuccess: this.__doSuccess,
				btns: [{ text: '修改', icon: 'fa-edit', type: 'submit', float: 'right', style: { marginRight: 0 } }, { text: '取消', type: 'cancle', status: 'danger', float: 'right' }],
				items: this.state.formItems })
		});
	},
	__doSuccess: function __doSuccess() {
		Popup.close('dialog');
		Toast.success('操作成功');
		this.state.data.refresh();
	},
	__addItem: function __addItem(pid) {
		if (!this.props.data) {
			Toast.warning('请先选择左边商品类型项');
			return false;
		}
		Popup.dialog({
			title: '添加',
			width: 780,
			content: React.createElement(UI.Form, {
				method: 'POST',
				layout: 'stacked',
				action: '/znadmin/model/addNode',
				exts: { model: this.props.model },
				hiddens: { projectId: this.props.data.id },
				merge: 'data',
				style: { margin: 25 },
				syncSubmit: false,
				onSubmitSuccess: this.__doSuccess,
				btns: [{ text: '添加', icon: 'fa-plus', type: 'submit', float: 'right', style: { marginRight: 0 } }, { text: '取消', type: 'cancle', status: 'danger', float: 'right' }],
				items: this.state.formItems })
		});
	},
	__onToolbarClick: function __onToolbarClick(rtitem) {
		switch (rtitem.icon) {
			case 'fa-plus':
				this.__addItem();
				break;
		}
	},
	render: function render() {
		return React.createElement(
			UI.Page,
			{ title: '\u95EE\u9898\u5217\u8868', icon: 'fa-list-ul',
				onToolbarClick: this.__onToolbarClick,
				toolbarItems: this.state.toolbarItems },
			React.createElement(UI.PagerView, {
				view: 'Table',
				checkbox: 0,
				enableFilter: true,
				showHeader: true,
				data: this.state.data,
				columnRender: this.__onTableColumnRender,
				onTableRowClick: this.__onTableRowClick,
				items: this.state.items })
		);
	}
});