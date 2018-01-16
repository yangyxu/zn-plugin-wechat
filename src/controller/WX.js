zn.define([
    '../WX.js'
], function (WX) {

    return zn.Controller('wx',{
        methods: {
            init: function (){
                var _appConfig = this._context._config,
                    _serverConfig = this._context._serverContext._config,
                    _config = zn.overwrite({}, _serverConfig.wx, _appConfig.wx);
                this._config = _config;
                zn.wx = new WX(_config);
            },
            getConfig: {
                method: 'GET/POST',
                value: function (request, response, chain){
                    response.success(this._config);
                }
            },
            getTokens: {
                method: 'GET/POST',
                value: function (request, response, chain){
                    response.success(this._config);
                }
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
                    zn.wx.getAccessToken()
                        .then(function (AccessToken, AccessTokenExpiredTime){
                            response.success(AccessToken);
                        }, function (err){
                            response.error(err);
                        });
                }
            },
            getAuthorizeURL: {
                method: 'GET/POST',
                argv: {
                    redirect_url: null,
                    redirect_state: "1",
                    scope: 'snsapi_userinfo'
                },
                value: function (request, response, chain){
                    var _url = request.getValue('redirect_url'),
                        _state = request.getValue('redirect_state');
                    response.success(zn.wx.getAuthorizeURL(decodeURIComponent(_url), _state, request.getValue('scope')));
                }
            },
            getJSApiTicket: {
                method: 'GET/POST',
                value: function (request, response, chain){
                    zn.wx.getJSApiTicket()
                        .then(function (ticket){
                            response.success(data);
                        }, function (err){
                            response.error(err);
                        });
                }
            },
            getJSSDKSignature: {
                method: 'GET/POST',
                argv: {
                    url: "http://www.zeanium.com"
                },
                value: function (request, response, chain){
                    var _url = decodeURIComponent(request.getValue('url'));
                    zn.wx.getJSApiTicket()
                        .then(function (ticket){
                            response.success(zn.wx.getJSSDKSignature(ticket, _url));
                        }, function (err){
                            response.error(err);
                        });
                }
            },
            getJSSDKConfig: {
                method: 'GET/POST',
                argv: {
                    url: null
                },
                value: function (request, response, chain){
                    var _url = decodeURIComponent(request.getValue('url'));
                    zn.wx.getJSApiTicket()
                        .then(function (ticket){
                            response.success(zn.wx.getJSSDKConfig(ticket, _url));
                        }, function (error){
                            zn.wx.refreshAccessToken(function (data){
                                zn.wx.getJSApiTicket()
                                    .then(function (ticket){
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
