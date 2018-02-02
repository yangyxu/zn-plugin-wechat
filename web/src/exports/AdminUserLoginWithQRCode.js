var React = require('react');
module.exports = React.createClass({
	getInitialState: function () {
		return {
			user: null,
			loading: true,
			items: [
				{ type: 'ImageUploader', isImage: true, required: true, name: 'avatar_img', placeholder: '请上传个人头像', title: '头像' },
				{ type: 'Input', name: 'name', placeholder: '请输入真实姓名', title: '姓名' },
				{ type: 'Input', name: 'password', attrs: { type: 'password' }, placeholder: '请输入密码', title: '密码' },
				{ type: 'Input', name: 'phone', attrs: { type: 'number' }, placeholder: '请输入手机号', title: '手机号' },
				{ type: 'Input', name: 'qq', attrs: { type: 'number' }, placeholder: '请输入QQ', title: 'QQ' },
				{ type: 'Input', name: 'wechat', placeholder: '请输入微信号', title: '微信号' },
				{ type: 'Input', name: 'email', placeholder: '请输入常用邮箱', title: '邮箱' },
				{ type: 'Textarea', name: 'address', placeholder: '请输入详细地址', title: '地址' },
				{ type: 'Textarea', name: 'zn_note', title: '备注' }
			]
		}
	},
	componentDidMount: function (){
		zn.http.post('/zn.plugin.wechat/zn.plugin.admin.user/authWithOpenid', {
			openid: zn.plugin.wechat.getToken().openid
		}).then(function (data){
			if(data.status==200){
				this.setState({user: data.result, loading: false});
			}
		}.bind(this), function(err){
			zn.toast.error('网络请求失败');
		});
	},
	__renderUserInfo: function (){
		return <div style={{ backgroundColor:'#FFF', margin: 10, padding: 3 }}>
			<div style={{textAlign: 'center', backgroundColor: '#e6e6e6', fontWeight: 'bold', lineHeight: '40px'}}>用户信息</div>
			<div style={{display: 'flex', padding: 10, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
				<img style={{width:64, height: 64, borderRadius: 64}} src={this.state.user.avatar_img} />
				<div>{this.state.user.name}</div>
			</div>
			<div>

			</div>
		</div>;
	},
	__onRegisterBefore: function (data) {
		zn.http.post('/zn.plugin.wechat/zn.plugin.admin.user/register', data).then(function (data){
			if(data.status==200){
				this.setState({user: data.result, loading: false});
			}else {
				zn.toast.error('注册失败：' + data.result);
			}
		}.bind(this), function(err){
			zn.toast.error('网络请求失败');
		});
		return false
	},
	__renderRegister: function (){
		var _token = zn.plugin.wechat.getToken();
		return <div style={{ backgroundColor:'#FFF', margin: 10, padding: 3 }}>
			<div style={{textAlign: 'center', backgroundColor: '#e6e6e6', fontWeight: 'bold', lineHeight: '40px'}}>新用户注册</div>
			<zn.react.Form value={{ avatar_img: _token.headimgurl, name: _token.nickname }} onSubmitBefore={this.__onRegisterBefore} hiddens={{ zn_plugin_wechat_open_id: zn.plugin.wechat.getToken().openid }} items={this.state.items} buttons={[{ text: '提交注册', type: 'submit', status: 'primary', icon: 'fa-registered' }]} />
		</div>;
	},
	render:function(){
		return (
			<zn.react.Page canBack={false} title="微信登录">
				{this.state.loading?<div style={{textAlign:'center', padding: 10 }}><span className="zr-dot-loading">加载中</span></div>:(this.state.user?this.__renderUserInfo():this.__renderRegister())}
			</zn.react.Page>
		);
	}
});
