require('./ZNPluginAdminUserWechatInfo.less');
var React = require('react');
var UserInfo = require('./UserInfo.js');
var QRCode = require('qrcode.react');

module.exports = React.createClass({
	getInitialState: function (){
		return {
			isReset: false
		};
	},
	__renderQRCode: function (){
		console.log(window.location.origin + window.location.pathname.replace('admin.html', 'index.html') + "#/znpluginwechat.user.bind?token="+zn.plugin.admin.getToken().id);
		return <div className="qr-code">
			<div className="title">微信扫一扫</div>
			<QRCode value={window.location.origin + window.location.pathname.replace('admin.html', 'index.html') + "#/znpluginwechat.user.bind?token="+zn.plugin.admin.getToken().id} />
			<div className="tip">绑定微信号</div>
			{this.props.openid && <zn.react.Button style={{width: 140}} onClick={()=>this.setState({isReset: false})} text="取消" status='danger'  />}
		</div>
	},
	render:function(){
		return (
			<div className="zn-plugin-wechat-zn-plugin-admin-wechat-user-info">
				{
					(this.props.openid&&!this.state.isReset)?<div className="user">
						<UserInfo openid={this.props.openid} />
						<zn.react.Button style={{margin: 20}} onClick={()=>this.setState({isReset: true})} text="重新绑定"  />
					</div>:this.__renderQRCode()
				}
			</div>
		);
	}
});
