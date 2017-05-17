'use strict';

var React = require('react');
var UserSearcher = require('./UserSearcher');
var RoleSearcher = require('./RoleSearcher');
module.exports = React.createClass({
	displayName: 'exports',

	getDefaultProps: function getDefaultProps() {
		return {
			model: null,
			id: null
		};
	},
	getInitialState: function getInitialState() {
		return {
			users: ',',
			roles: ',',
			observers: ',',
			ownerId: 0,
			items: [{
				title: '是否启用权限', name: 'ifEnabledRights', type: 'radio',
				data: [{ text: "禁用", value: 0 }, { text: '启用', value: 1 }]
			}, { title: '扩展', name: 'ext', type: 'textarea' }]
		};
	},
	componentDidMount: function componentDidMount() {
		this.__load(this.props.id);
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		if (nextProps.id != this.props.id) {
			this.__load(nextProps.id);
		}
	},
	__load: function __load(id) {
		if (id) {
			Store.post('/znadmin/model/selectOne', {
				fields: '*',
				model: this.props.model,
				where: { id: id }
			}).exec().then(function (data) {
				this.setState(data.result);
			}.bind(this));
		}
	},
	__save: function __save() {
		if (!this.props.id) {
			Toast.warning('必须编辑项');
			return;
		}
		var _data = {
			users: this.state.users,
			roles: this.state.roles
		};

		Store.post('/znadmin/model/updateNode', { data: _data, model: this.props.model, where: { id: this.props.id } }).exec().then(function (data) {
			if (data.result.changedRows) {
				Toast.success('保存成功');
			}
		}.bind(this));
	},
	__changeOwner: function __changeOwner() {},
	render: function render() {
		var _this = this;

		return React.createElement(
			'div',
			{ className: 'rt-rights-setting', style: { padding: 5 } },
			React.createElement(
				'div',
				{ className: 'title', style: { lineHeight: '4rem' } },
				React.createElement('i', { className: 'fa fa-yelp', style: { margin: 5 } }),
				React.createElement(
					'span',
					null,
					'\u6743\u9650\u8BBE\u7F6E\u3010\u62E5\u6709\u8005\uFF1A',
					React.createElement(
						'a',
						{ onClick: this.__changeOwner },
						this.state.ownerId
					),
					'\u3011'
				),
				this.props.id && React.createElement(UI.Button, { onClick: this.__save, text: '\u4FDD\u5B58', icon: 'fa-save', float: 'right', style: { margin: 5 } })
			),
			React.createElement(
				UI.Card,
				{ icon: 'fa-user', title: '\u7528\u6237' },
				React.createElement(UserSearcher, { value: this.state.users, onChange: function onChange(value) {
						return _this.state.users = value;
					} })
			),
			React.createElement(
				UI.Card,
				{ icon: 'fa-graduation-cap', title: '\u89D2\u8272' },
				React.createElement(RoleSearcher, { value: this.state.roles, onChange: function onChange(value) {
						return _this.state.roles = value;
					} })
			)
		);
	}
});