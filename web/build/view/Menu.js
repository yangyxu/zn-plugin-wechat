'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Var = require('./Var');
var RightsSetting = require('../component/RightsSetting');
var VarPanel = React.createClass({
	displayName: 'VarPanel',

	getInitialState: function getInitialState() {
		return {
			typeIndex: 0
		};
	},
	__onListViewItemClick: function __onListViewItemClick(event, item, index) {
		this.setState({ typeIndex: index });
	},
	__renderBody: function __renderBody() {
		var _treeModel = this.props.treeModel;

		return React.createElement(RightsSetting, { model: _treeModel.props.model, id: _treeModel.state.currItem ? _treeModel.state.currItem.props.data.id : null });
		/*
  switch (this.state.typeIndex) {
  	case 0:
  		return <RightsSetting model={_treeModel.props.model} id={_treeModel.state.currItem?_treeModel.state.currItem.props.data.id:null}  />;
  	case 1:
  		if(_treeModel.state.currItem){
  			return <Var menuId={_treeModel.state.currItem.props.data.id} pid={2} />
  		}else {
  			return <div style={{textAlign:'center'}}>请先选中菜单</div>;
  		}
  }*/
	},
	render: function render() {
		return this.__renderBody();
		return React.createElement(
			UI.ActivityLayout,
			{ direction: 'v', begin: 4, barWidth: 0.3, unit: 'rem' },
			React.createElement(UI.ListView, {
				className: 'rt-list-view-tab',
				fireIndex: 0,
				onClick: this.__onListViewItemClick,
				itemRender: function itemRender(item, index) {
					return React.createElement(
						'span',
						null,
						React.createElement('i', { style: { marginRight: 5 }, className: 'fa ' + item.icon }),
						item.text
					);
				},
				data: [{ text: '权限设置', icon: 'fa-yelp' }, { text: '资源管理', icon: 'fa-table' }] }),
			this.__renderBody()
		);
	}
});

module.exports = React.createClass({
	displayName: 'exports',

	getDefaultProps: function getDefaultProps() {
		return {
			model: 'zn_admin_menu',
			title: '菜单管理',
			leftWidth: 30,
			pid: 0,
			fields: [{ title: '标题', type: 'Input', name: 'title' }, { title: '类型', type: 'Radio', name: 'type', value: 0,
				data: [{ text: '分类', value: 0 }, { text: '功能菜单', value: 1 }]
			}, { title: '图标', type: 'Input', name: 'icon' }, { title: '链接', type: 'Input', name: 'url' }, { title: '路径', type: 'Input', name: 'path' }, { title: '扩展', type: 'Textarea', name: 'ext' }]
		};
	},
	__rightRender: function __rightRender(treeModel) {
		return React.createElement(VarPanel, { treeModel: treeModel });
	},
	render: function render() {
		return React.createElement(PluginModel.TreeModelView, _extends({}, this.props, { rightRender: this.__rightRender }));
	}
});