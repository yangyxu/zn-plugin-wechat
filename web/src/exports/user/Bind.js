var React = require('react');
var UserInfo = require('../../component/UserInfo.js');

module.exports = React.createClass({
	getInitialState: function () {
		return {
			token: this.props.request.search.token,
			admin: null,
			wechat: null
		}
	},

	bindAccount: function (){
		zn.confirm('确认绑定该微信号么？', '提示', function () {
			zn.preloader.open({
				content: '绑定中...'
			});
			zn.http.post('/zn.plugin.wechat/zn.plugin.admin.user/bindWechatWithOpenid', {
				openid: zn.plugin.wechat.getToken().openid,
				token: this.state.token
			}).then(function (data){
				if(data.status==200){
					zn.toast.success("绑定成功");
					this.setState(data.result)
				}else {
					zn.toast.error(data.result||'服务不可用');
				}
				zn.preloader.close();
			}.bind(this), function (){
				zn.toast.error('网络请求失败');
				zn.preloader.close();
			});
		}.bind(this));
	},
	render:function(){
		return (
			<zn.react.Page title="登录信息" canBack={false} >
				{
					this.state.admin && <div style={{display:'flex', padding: 20}}>
						<div style={{flex: 1, display:'flex', alignItems: 'center', justifyContent: 'center'}}>
							<img style={{width: 16, height: 16, borderRadius: 16, margin: 3}} src={zn.http.fixURL(this.state.admin.avatar_img)} />{this.state.admin.name}
						</div>
						<div style={{width: 64, height: 10, border:'1px solid #ccc', margin: 7, borderLeftWidth: 0, borderRightWidth: 0}} />
						<div style={{flex: 1, display:'flex', alignItems: 'center', justifyContent: 'center'}}>
							<img style={{width: 16, height: 16, borderRadius: 16, margin: 3}} src={zn.http.fixURL(this.state.wechat.headimgurl)} />{this.state.wechat.nickname}
						</div>
					</div>
				}
				<UserInfo openid={zn.plugin.wechat.getToken().openid} />
				{!this.state.admin && <zn.react.Button style={{margin: 20}} onClick={this.bindAccount} text="绑定" status="warning" />}
			</zn.react.Page>
		);
	}
});
