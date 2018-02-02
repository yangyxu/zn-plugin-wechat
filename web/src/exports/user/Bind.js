var React = require('react');
var UserInfo = require('../../component/UserInfo.js');

module.exports = React.createClass({
	getInitialState: function () {
		return {
			token: this.props.request.search.token
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
					zn.toast.success(data.result);
				}else {
					zn.toast.error(data.result||'服务不可用');
				}
				zn.preloader.close();
			}, function (){
				zn.toast.error('网络请求失败');
				zn.preloader.close();
			});
		}.bind(this));
	},
	render:function(){
		return (
			<zn.react.Page title="登录信息" canBack={false} >
				<UserInfo openid={zn.plugin.wechat.getToken().openid} />
				<zn.react.Button style={{margin: 20}} onClick={this.bindAccount} text="绑定" status="warning" />
			</zn.react.Page>
		);
	}
});
