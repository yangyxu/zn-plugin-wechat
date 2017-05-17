zn.define([
    'node:crypto',
    'node:request'
], function (node_crypto, node_request) {

    var SNSAPI_SCOPE_ARGV = {
        'snsapi_base': 'appid={0}&redirect_uri={1}&response_type=code&scope=snsapi_base&state={2}#wechat_redirect',
        'snsapi_userinfo': 'appid={0}&redirect_uri={1}&response_type=code&scope=snsapi_userinfo&state={2}#wechat_redirect'
    }

    return zn.Class({
        methods: {
            getAuthorizeURL: function (redirect, state, scope){
                var _host = 'https://open.weixin.qq.com/connect/oauth2/authorize',
                    _param = SNSAPI_SCOPE_ARGV[scope||'snsapi_base'].format(this.get('AppID'), redirect, state);
                return _host + '?' + _param;

                return zn.wx.getAPIPath('oauth.authorize', {
                    redirect_uri: encodeURI(redirect),
                    state: state||'',
                    scope: scope||'snsapi_base'
                }, '#wechat_redirect');
            },
            getRemoteJSApiTicket: function (){
                return this.accessTokenRequest('ticket.getjsapiticket');
            },
            getJSApiTicket: function (ticket){
                return this._JSApiTicket.getToken(ticket);
            }
        }
    });

});
