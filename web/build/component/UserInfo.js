var React = require('react');

module.exports = React.createClass({
	displayName: 'exports',

	getInitialState: function getInitialState() {
		return {
			user: null,
			logs: []
		};
	},
	componentDidMount: function componentDidMount() {
		if (this.props.openid) {
			this.__loadInfo();
		}
	},
	__loadInfo: function __loadInfo() {
		zn.http.post('/zn.plugin.wechat/zn.plugin.wechat.user/getInfoWithOpenid', {
			openid: this.props.openid
		}).then(function (data) {
			if (data.status == 200) {
				this.setState({
					user: data.result[0][0],
					logs: data.result[1]
				});
			} else {
				zn.notification.error(data.result);
			}
		}.bind(this), function (err) {
			zn.notification.error("网络请求失败");
		});
	},
	__renderUserInfo: function __renderUserInfo() {
		return React.createElement(
			'div',
			{ className: 'wechat-user' },
			React.createElement(
				'div',
				{ className: 'base-info' },
				React.createElement('img', { className: 'avatar', src: this.state.user.headimgurl }),
				React.createElement(
					'div',
					{ className: 'name' },
					this.state.user.nickname,
					' (',
					this.state.user.sex == 1 ? '男' : '女',
					')'
				),
				React.createElement(
					'div',
					{ className: 'address' },
					this.state.user.country,
					' / ',
					this.state.user.province,
					' / ',
					this.state.user.city
				)
			),
			React.createElement(
				'div',
				{ className: 'count' },
				'\u5171',
				React.createElement(
					'span',
					{ className: 'value' },
					this.state.logs.length
				),
				'\u6B21\u767B\u5F55'
			),
			React.createElement(
				'ul',
				{ className: 'logs' },
				this.state.logs.map(function (log) {
					return React.createElement(
						'li',
						{ className: 'log' },
						'\u5728',
						React.createElement(
							'span',
							{ className: 'time' },
							" " + log.zn_create_time + " "
						),
						'\u767B\u5F55'
					);
				})
			)
		);
	},
	render: function render() {
		return React.createElement(
			'div',
			{ className: 'zn-plugin-wechat-user-info' },
			this.state.user ? this.__renderUserInfo() : React.createElement(zn.react.DataLoader, { content: '\u52A0\u8F7D\u4E2D...', loader: 'timer' })
		);
	}
});