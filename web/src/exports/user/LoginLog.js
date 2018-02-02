var React = require('react');
module.exports = React.createClass({
	render:function(){
		return (
			<zn.react.Page
				toolbarItems={[{text:'导出'}]}
				onToolbarClick={this.__onToolbarClick}
				title="用户登录日志">
				<zn.react.PagerView
					view="Table"
					enableFilter={false}
					checkbox={0}
					showHeader={true}
					data={this.state.data}
					items={this.state.items}/>
			</zn.react.Page>
		);
	}
});
