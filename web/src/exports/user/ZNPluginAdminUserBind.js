var React = require('react');
var QRCode = require('qrcode.react');

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
		}).then(function (){

		});
	},
	__renderQRCode: function (){

	},
	render:function(){
		return (
			<div className="zn-plugin-wechat-user-info">
				<div className="info-left">
					<QRCode value={window.location.origin + window.location.pathname.replace('admin.html', 'index.html') + "#/znpluginwechat.user.bind?znid="+this.state.user.zn_id} />
				</div>
				{this.state.user && <div className="info-right"></div>}
			</div>
		);
	}
});
