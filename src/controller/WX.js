zn.define([
    '../WX.js'
], function (WX) {

    return zn.Controller('wx',{
        methods: {
            init: function (){
                var _appConfig = this._context._config,
                    _serverConfig = this._context._serverContext._config,
                    _config = zn.overwrite({}, _serverConfig.wx, _appConfig.wx);
                zn.wx = new WX(_config);
            },
            validate: {
                method: 'GET/POST',
                value: function (request, response, chain){
                    var _signature = request.getValue('signature'),
                        _timestamp = request.getValue('timestamp'),
                        _nonce = request.getValue('nonce');
                    var _checked = zn.wx.checkSignature(_signature, _timestamp, _nonce);
                    if (_checked) {
                        response.writeEnd(request.getValue('echostr')); // 确认来源是微信，并把echostr返回给微信服务器。
                    } else {
                        response.error("Client is not wechat.");
                    }
                }
            },
            getAccessToken: {
                method: 'GET/POST',
                value: function (request, response, chain){
                    zn.wx.getAccessToken().then(function (AccessToken, AccessTokenExpiredTime){
                        response.success(AccessToken);
                    });
                }
            },
            getAuthorizeURL: {
                method: 'GET/POST',
                value: function (request, response, chain){
                    //console.log(request.getValue('redirect_uri'));
                    response.success(zn.wx.getAuthorizeURL('http://www.youyangit.com', 'yangyxu', 'snsapi_userinfo'));
                }
            },
            getJSApiTicket: {
                method: 'GET/POST',
                value: function (request, response, chain){
                    zn.wx.getJSApiTicket().then(function (ticket){
                        response.success(data);
                    });
                }
            },
            getJSSDKSignature: {
                method: 'GET/POST',
                argv: {
                    url: "http://wine.hu-chun.com"
                },
                value: function (request, response, chain){
                    var _url = "http://www.youyangit.com";
                    zn.wx.getJSApiTicket().then(function (ticket){
                        response.success(zn.wx.getJSSDKSignature(ticket, _url));
                    }, function (){

                    });
                }
            },
            getJSSDKConfig: {
                method: 'GET/POST',
                argv: {
                    url: "http://wine.hu-chun.com"
                },
                value: function (request, response, chain){
                    var _url = request.getValue('url');
                    zn.wx.getJSApiTicket().then(function (ticket){
                        response.success(zn.wx.getJSSDKConfig(ticket, _url));
                    }, function (error){
                        zn.wx.refreshAccessToken(function (data){
                            zn.wx.getJSApiTicket().then(function (ticket){
                                response.success(zn.wx.getJSSDKConfig(ticket, _url));
                            }, function (error){
                                response.error(error);
                            });
                        }, function (error){
                            response.error(error);
                        });
                    });
                }
            }
        }
    });

});
