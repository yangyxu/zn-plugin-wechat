'use strict';

var React = require('react');
module.exports = React.createClass({
	displayName: 'exports',

	getDefaultProps: function getDefaultProps() {
		return {};
	},
	getInitialState: function getInitialState() {
		return {
			data: Store.post('/znadmin/model/paging', {
				model: 'zn_admin_user'
			})
		};
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		if (nextProps.roleId != this.props.roleId) {
			this.state.data._data.where = {
				"0&<>": "locate('," + nextProps.roleId + ",',roleIds)"
			};
			this.state.data.exec();
		}
	},
	__onUserClick: function __onUserClick(event, item, index) {
		event.stopPropagation();
		Session.jump('/main/znadmin/UserInfo', { userId: item.id });
	},
	__itemRender: function __itemRender(item, index) {
		var _this = this;

		return React.createElement(
			'div',
			{ className: 'user-item' },
			React.createElement('img', { className: 'avatar', src: Store.fixURL(item.avatarImg || '') }),
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
					item.name
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
	render: function render() {
		return React.createElement(UI.PagerView, {
			view: 'ListView',
			className: 'rt-list-view-border',
			textKey: 'name',
			valueKey: 'id',
			selectMode: 'none',
			itemRender: this.__itemRender,
			data: this.state.data });
	}
});