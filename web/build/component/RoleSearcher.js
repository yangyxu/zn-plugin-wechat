'use strict';

require('./UserSearcher.less');
var React = require('react');

module.exports = React.createClass({
	displayName: 'exports',

	getDefaultProps: function getDefaultProps() {
		return {
			value: ','
		};
	},
	getInitialState: function getInitialState() {
		return {
			value: this.props.value,
			roles: []
		};
	},
	componentDidMount: function componentDidMount() {
		this.loadRoles();
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		if (nextProps.value != this.props.value) {
			this.setState({
				value: nextProps.value
			});
		}
	},
	loadRoles: function loadRoles() {
		Store.post('/znadmin/model/selectAllChildByPid', { model: 'zn_admin_role', fields: 'id as value, title as text, type', pid: 1 }).exec().then(function (data) {
			this.setState({
				roles: data.result
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
	__renderIcon: function __renderIcon(item) {
		switch (item.type) {
			case 0:
				return null;
			case 1:
				return React.createElement('i', { title: '\u8FD9\u662F\u90E8\u95E8', className: 'fa fa-sitemap', style: { margin: 5, color: '#d9534f' } });
			case 2:
				return React.createElement('i', { title: '\u8FD9\u662F\u89D2\u8272', className: 'fa fa-graduation-cap', style: { margin: 5 } });
		}
	},
	render: function render() {
		return React.createElement(
			'div',
			{ className: 'rt-user-selector' },
			React.createElement(
				'ul',
				{ className: 'tags' },
				this.state.roles.map(function (item, index) {
					var _this = this;

					return React.createElement(
						'li',
						{ key: index, className: this.state.value.indexOf(',' + item.value + ',') !== -1 ? 'curr' : '', onClick: function onClick() {
								return _this.__onUserClick(item);
							} },
						this.__renderIcon(item),
						item.text
					);
				}.bind(this))
			)
		);
	}
});