zn.define([
    'node:crypto',
    'node:request',
    './api/index.js',
    './WXToken.js',
    './WXJSSDK.js',
    './WXPayment.js'
], function (node_crypto, node_request, api, WXToken, WXJSSDK, WXPayment) {

    return zn.Class({
        mixins: [ WXJSSDK, WXPayment ],
        properties: {
            ID: null,
            AppID: null,
            AppSecret: null,
            CallBackUrl: null,
            Token: null,
            EncodingAESKey: null,
            WXHOST: null
        },
        methods: {
            init: function (argv){
                this.sets(argv);
                this._AccessToken = new WXToken({
                    tokenKey: 'access_token',
                    tokenFilePath: './AccessToken.ini',
                    api: this.parsePath('base.token'),
                    onSuccess: this.__onRefreshAccessToken.bind(this)
                });
                this._JSApiTicket = new WXToken({
                    tokenKey: 'ticket',
                    tokenFilePath: './JSApiTicket.ini',
                    api: this.parsePath('ticket.getjsapiticket')
                });
                this._AccessToken.refresh();
            },
            __onRefreshAccessToken: function (access_token){
                this._JSApiTicket.setRequestQueryString({
                    access_token: access_token
                }).refresh();
            },
            refreshAccessToken: function (success, error){
                return this._AccessToken.refresh(success, error);
            },
            formatQueryString: function (queryString){
                var _values = this.gets(),
                    _value = null;
                for(var key in queryString){
                    _value = queryString[key];
                    if(_value!==null && _value!==undefined && _value.indexOf('{')!=-1 && _value.indexOf('}')!=-1){
                        queryString[key] = _value.format(_values);
                    }
                }

                return queryString;
            },
            getAPIPath: function (path, argv, extend){
                var _api = this.parsePath(path, argv);
                return _api.url + '?' + zn.querystring.stringify(_api.qs) + extend;
            },
            request: function (path, argv, extend){
                var _defer = zn.async.defer(),
                    _api = this.parsePath(path, argv, extend);

                zn.debug('Request: ', _api);
                node_request(_api, function (err, response, body){
                    if(err){
                        _defer.reject(err);
                    }else {
                        var _data = JSON.parse(body);
                        if(+_data.errcode==40002){
                            _defer.reject(_data);
                        }else {
                            _defer.resolve(_data);
                        }
                    }
                });

                return _defer.promise;
            },
            accessTokenRequest: function (path, argv, extend){
                var _defer = zn.async.defer(),
                    _api = this.parsePath(path, argv, extend),
                    _self = this;

                this._AccessToken.getToken(function (AccessToken){
                    _self.doAccessTokenRequest(_api, AccessToken, function (data){
                        _defer.resolve(data);
                    }, function (error){
                        _defer.reject(error);
                    });
                });

                return _defer.promise;
            },
            doAccessTokenRequest: function (api, AccessToken, success, error){
                var _self = this;
                if(!api.qs){
                    api.qs = {};
                }
                if(!api.qs.access_token){
                    api.qs.access_token = AccessToken;
                }
                zn.debug('AccessTokenRequest: ', api);
                node_request(api, function (err, response, body){
                    var _data = response.body;
                    if(_data && typeof _data != 'object'){
                        _data = JSON.parse(_data);
                    }
                    if(+_data.errcode==40002){
                        _self._AccessToken.refresh(function (AccessToken){
                            _self.doAccessTokenRequest(api, AccessToken, success, error);
                        });
                    }else {
                        success&&success(_data);
                    }
                }.bind(this));
            },
            parsePath: function (path, argv, extend){
                var _api = zn.extend({}, zn.path(api, path));
                if(!_api){
                    return zn.error('The api ' + path + ' is not exist!'), false;
                }
                var _host = _api.host || this.get('WXHOST');
                if(_api.url.indexOf('https://') == -1 && _api.url.indexOf('http://') == -1){
                    _api.url = _host + _api.url;
                }

                if(extend){
                    _api.url = _api.url + extend;
                }
                _api.method = (_api.method||'GET').toUpperCase();
                if(_api.method=='POST'){
                    _api.json = zn.overwrite(argv, this.formatQueryString(_api.json));
                }else {
                    _api.qs = zn.overwrite(argv, this.formatQueryString(_api.qs));
                }

                return _api;
            },
            getTimeStamp: function (){
                return parseInt(new Date().getTime() / 1000) + '';
            },
            getNonceStr: function (){
                return Math.random().toString(36).substr(2, 15);
            },
            getJSSDKSignature: function (ticket, url){
                return this.getJSSDKConfig(ticket, url).signature();
            },
            getJSSDKConfig: function (ticket, url){
                var _timestamp = this.getTimeStamp(),
                    _nonceStr = this.getNonceStr(),
                    _argv = [
                        'jsapi_ticket=' + ticket,
                        'noncestr=' + _nonceStr,
                        'timestamp=' + _timestamp,
                        'url=' + url
                    ];
                var _string1 = _argv.join('&'),
                    _signature = node_crypto.createHash('sha1').update(_string1).digest('hex');

                //zn.debug('Argv: ', _argv);
                //zn.debug('String1: ', _string1);
                //zn.debug('Signature: ', _signature);
                return {
                    appId: this.get('AppID'),
                    timestamp: _timestamp,
                    nonceStr: _nonceStr,
                    signature: _signature
                }
            },
            getSignature: function (timestamp, nonce){
                var _tmp = [this.get('Token'), timestamp, nonce],
                    _sha1 = node_crypto.createHash('sha1');
                _tmp.sort();                                    // 1.将token、timestamp、nonce三个参数进行字典序排序
                _sha1.update(_tmp.join(''));                    // 2.将三个参数字符串拼接成一个字符串tmpStr
                return _sha1.digest('hex');                     // 3.字符串tmpStr进行sha1加密
            },
            checkSignature: function(signature, timestamp, nonce) {
                return this.getSignature(timestamp, nonce) === signature;       //加密后的字符串与signature对比，确定来源于微信
            }
        }
    });

});
