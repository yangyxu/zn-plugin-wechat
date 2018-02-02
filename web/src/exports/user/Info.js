var React = require('react');
var UserInfo = require('../../component/UserInfo.js');

module.exports = React.createClass({
	getInitialState: function () {
		return {
			openid: this.props.openid || this.props.request.search.openid
		}
	},
	render:function(){
		return (
			<zn.react.Page title="微信账户信息" >
				<UserInfo openid={this.state.openid} />
			</zn.react.Page>
		);
	}
});
