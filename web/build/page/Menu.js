var React = require('react');

module.exports = React.createClass({
	displayName: 'exports',

	getDefaultProps: function getDefaultProps() {
		return {};
	},
	render: function render() {
		return React.createElement(
			'div',
			null,
			'znwechat'
		);
	}
});