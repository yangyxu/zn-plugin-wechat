var React = require('react');
var UserInfo = require('../../component/UserInfo.js');

module.exports = React.createClass({
	displayName: 'exports',

	getInitialState: function getInitialState() {
		return {
			openid: this.props.openid || this.props.request.search.openid
		};
	},
	render: function render() {
		return React.createElement(
			zn.react.Page,
			{ title: '\u5FAE\u4FE1\u8D26\u6237\u4FE1\u606F' },
			React.createElement(UserInfo, { openid: this.state.openid })
		);
	}
});