var React = require('react');
module.exports = React.createClass({
	getDefaultProps: function () {
		return {
			model: 'ZNPluginWechatConfig'
		};
	},
	getInitialState: function () {
		return {
			data: zn.store.post('/zn.plugin.admin/model/paging', {
				model: this.props.model
			}),
			items: [
				{ title: '_id', name: '_id', width: 200 },
				{ title: '_title', name: '_title', width: 200 },
				{ title: '_key', name: '_key', width: 140 },
				{ title: '_value', name: '_value', width: 250 },
				{ title: 'ref_id', name: 'ref_id', width: 80 },
				{ title: 'var_id', name: 'var_id', width: 80 },
				{ title: 'InputType', name: 'input_type', width: 120 },
				{ title: 'DataType', name: 'data_type', width: 100 },
				{ title: 'RichValue', name: '_rich_value' }
			],
			formItems: [
				{ title: '_id', name: '_id', type: 'AutoComplete', data: zn.store.get('/zn.plugin.admin/config/get_ids'), required: true, error: '_id必填' },
				{ title: '_title', name: '_title', type: 'Input' },
				{ title: '_key', name: '_key', type: 'Input' },
				{ title: '_value', name: '_value', type: 'Input' },
				{ title: 'ref_id', name: 'ref_id', type: 'Input' },
				{ title: 'var_id', name: 'var_id', type: 'Input' },
				{ title: 'InputType', name: 'input_type', type: 'Menu', data: ['Input', 'ImageUploader', 'FileUploader', 'Textarea', 'RichEditor'] },
				{ title: 'DataType', name: 'data_type', type: 'Input' },
				{ title: 'RichValue', name: '_rich_value', type: 'Textarea' }
			],
			toolbarItems: [
				{ text: '添加', name: 'add', icon: 'fa-plus', style: { marginRight: 5 } },
				{ text: '删除', name: 'remove', status: 'danger', icon: 'fa-remove', style: { marginRight: 5 } }
			]
		}
	},
	__doSuccess: function (){
		this.state.data.refresh();
	},
	__addItem: function (){
		zn.dialog({
			title: '新增',
			content: <zn.react.Form
				action='/zn.plugin.admin/model/insert'
				merge='values'
				exts={{ model: this.props.model }}
				onSubmitSuccess={this.__doSuccess}
				items={this.state.formItems} />
		});
	},
	__updateItem: function (data){
		zn.dialog({
			title: '更新',
			content: <zn.react.Form
				action='/zn.plugin.admin/model/update'
				exts={{ model: this.props.model, where: {id: data.id} }}
				merge="updates"
				value={data}
				onSubmitSuccess={this.__doSuccess}
				items={this.state.formItems} />
		});
	},
	__removeItems: function (){
		var _self = this,
			_values = this.refs.table.getValue();
		if(_values && _values.length){
			zn.confirm('确认删除这' + _values.length + '个值吗？', '提示', function () {
				zn.http.post('/zn.plugin.admin/model/delete', {
					model: this.props.model,
					where: "id in (" + _values.join(',') + ")"
				}).then(function (){
					zn.toast.success('删除成功');
					_self.state.data.refresh();
				}, function (data){
					zn.toast.error('删除失败: ' + data.result);
				});
			}.bind(this));
		}else {
			zn.toast.warning('请先选择要删除的用户');
		}
	},
	__onToolbarClick: function (item){
		switch (item.name) {
			case 'add':
				this.__addItem();
				break;
			case 'remove':
				this.__removeItems();
				break;
		}
	},
	__onTableColumnRender: function (rowIndex, columnIndex, data, item, value){
		switch (columnIndex) {
			case 1:
				return <div><i className="fa fa-edit" onClick={()=>this.__updateItem(data)} style={{padding: 5}} /><a href={'#'+zn.react.session.fixPath('/znpluginadmin.setting.base')+'?_id=' + data._id}>{value}</a></div>;
		}
	},
	render:function(){
		return (
			<zn.react.Page title="微信公众号平台参数配置" toolbarItems={this.state.toolbarItems} onToolbarClick={this.__onToolbarClick}>
				<zn.react.PagerView
					ref="table"
					view="Table"
					enableFilter={true}
					checkbox={50}
					showHeader={true}
					columnRender={this.__onTableColumnRender}
					data={this.state.data}
					items={this.state.items}/>
			</zn.react.Page>
		);
	}
});
