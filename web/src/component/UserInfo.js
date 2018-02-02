var React = require('react');

module.exports = React.createClass({
	getInitialState: function (){
		return {
			user: null,
			logs: []
		};
	},
	componentDidMount: function (){
		if(this.props.openid){
			this.__loadInfo();
		}
	},
	__loadInfo: function (){
		zn.http.post('/zn.plugin.wechat/zn.plugin.wechat.user/getInfoWithOpenid',{
			openid: this.props.openid
		}).then(function (data){
			if(data.status==200){
				this.setState({
					user: data.result[0][0],
					logs: data.result[1]
				});
			}else {
				zn.notification.error(data.result);
			}
		}.bind(this), function (err){
			zn.notification.error("网络请求失败");
		});
	},
	__renderUserInfo: function (){
		return (
			<div className="wechat-user">
				<div className="base-info">
					<img className="avatar" src={this.state.user.headimgurl} />
					<div className="name">{this.state.user.nickname} ({this.state.user.sex==1?'男':'女'})</div>
					<div className="address">{this.state.user.country} / {this.state.user.province} / {this.state.user.city}</div>
				</div>
				<div className="count">共<span className="value">{this.state.logs.length}</span>次登录</div>
				<ul className="logs">
					{
						this.state.logs.map(function (log){
							return <li className="log">
								在<span className="time">{" " + log.zn_create_time + " "}</span>登录
							</li>;
						})
					}
				</ul>
			</div>
		);
	},
	render:function(){
		return (
			<div className="zn-plugin-wechat-user-info">
				{this.state.user ? this.__renderUserInfo() : <zn.react.DataLoader content="加载中..." loader="timer" />}
			</div>
		);
	}
});
