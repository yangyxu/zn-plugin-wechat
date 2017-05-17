'use strict';

require('./UserSearcher.less');
var React = require('react');

var CHARS = ['A', 'B', 'C', 'D', ''];

var UserSelector = React.createClass({
	displayName: 'UserSelector',

	getDefaultProps: function getDefaultProps() {
		return {
			value: ','
		};
	},
	getInitialState: function getInitialState() {
		return {
			value: this.props.value,
			tag: null,
			tags: [],
			user: null,
			users: []
		};
	},
	componentDidMount: function componentDidMount() {
		this.loadRoles();
		this.loadUsers();
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		if (nextProps.value != this.props.value) {
			this.setState({
				value: nextProps.value
			});
		}
	},
	loadRoles: function loadRoles() {
		/*
  Store.post('/plugins/dbms/model/selectAllChildByPid', {model: 'zn_admin_role', fields: 'id as value, title as text', pid: 1}).exec().then(function (data){
  	this.setState({
  		tags: data.result
  	});
  }.bind(this));*/
	},
	loadUsers: function loadUsers() {
		Store.post('/znadmin/model/select', { model: 'zn_admin_user', fields: 'id as value, name as text' }).exec().then(function (data) {
			this.setState({
				users: data.result
			});
		}.bind(this));
	},
	__onTagClick: function __onTagClick(item) {
		this.setState({ tag: item.value });
	},
	__onUserClick: function __onUserClick(user) {
		var _id = user.value + ',';
		if (this.state.value.indexOf(',' + _id) == -1) {
			this.state.value = this.state.value + _id;
		} else {
			this.state.value = this.state.value.replace(',' + _id, ',');
		}
		this.setState({
			value: this.state.value
		});
		this.props.onChange && this.props.onChange(this.state.value);
	},
	render: function render() {
		return React.createElement(
			'div',
			{ className: 'rt-user-selector' },
			React.createElement(
				'ul',
				{ className: 'tags', style: { borderBottom: '1px dashed #e4e2e2' } },
				this.state.tags.map(function (item, index) {
					var _this = this;

					return React.createElement(
						'li',
						{ key: index, className: this.state.tag == item.value ? 'curr' : '', onClick: function onClick() {
								return _this.__onTagClick(item);
							} },
						item.text
					);
				}.bind(this))
			),
			React.createElement(
				'ul',
				{ className: 'tags' },
				this.state.users.map(function (item, index) {
					var _this2 = this;

					return React.createElement(
						'li',
						{ key: index, className: this.state.value.indexOf(',' + item.value + ',') !== -1 ? 'curr' : '', onClick: function onClick() {
								return _this2.__onUserClick(item);
							} },
						item.text
					);
				}.bind(this))
			)
		);
	}
});

module.exports = React.createClass({
	displayName: 'exports',

	getDefaultProps: function getDefaultProps() {
		return {
			model: 'zn_admin_user'
		};
	},
	getInitialState: function getInitialState() {
		return {
			data: Store.post('/znadmin/model/select', { model: this.props.model, where: { pid: 0 } }),
			userSelectType: 0
		};
	},
	componentDidMount: function componentDidMount() {},
	__onListViewItemClick: function __onListViewItemClick(event, item) {
		if (item.view) {
			this.setState({
				userSelectType: item.type
			});
		}
	},
	render: function render() {
		return React.createElement(UserSelector, this.props);

		return React.createElement(
			'div',
			{ className: 'rt-user-searcher' },
			React.createElement(UI.ListView, {
				className: 'c-tab-1',
				fireIndex: 0,
				onClick: this.__onListViewItemClick,
				itemRender: function itemRender(item) {
					return React.createElement(
						'span',
						null,
						React.createElement('i', { style: { marginRight: 5 }, className: 'fa ' + item.icon }),
						item.text
					);
				},
				data: [{ text: '首字母', icon: 'fa-font', type: 0 }, { text: '所属部门', icon: 'fa-sitemap', type: 1 }] }),
			React.createElement(UserSelector, { type: this.state.userSelectType })
		);
	}
});