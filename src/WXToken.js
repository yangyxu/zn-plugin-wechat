zn.define([
    'node:request',
    'node:fs'
], function (node_request, node_fs) {

    var TOKEN_SEP = '{$}';

    return zn.Class({
        properties: {
            api: null,
            token: '',
            tokenKey: 'access_token',
            tokenFilePath: '',
            tokenExpiredTime: 0,
            onSuccess: function (){ },
            onError: function (){ }
        },
        methods: {
            init: function (argv){
                argv.tokenFilePath = require.resolve(argv.tokenFilePath);
                this.sets(argv);
            },
            setRequestQueryString: function (value, force){
                if(force){
                    this._api.qs = value;
                }else {
                    zn.extend(this._api.qs, value);
                }

                return this;
            },
            refresh: function (success, error){
                var _defer = zn.async.defer();
                zn.debug(this._api);
                node_request(this._api, function (err, response, body){
                    if(err){
                        this.__onError(err, error);
                        _defer.reject(err);
                    }else {
                        var _data = JSON.parse(body);
                        if(_data.errcode>0){
                            this.__onError(_data, error);
                            _defer.reject(_data);
                        }else {
                            this.__onSuccess(_data, success);
                            _defer.resolve(_data);
                        }
                    }
                }.bind(this));
            },
            __onSuccess: function (data, callback){
                var _token = data[this._tokenKey];
                var _tokenExpiredTime = (+data.expires_in*1000) + (new Date()).getTime();
                node_fs.writeFileSync(this._tokenFilePath, _token + TOKEN_SEP + _tokenExpiredTime);
                this.sets({
                    token: _token,
                    tokenExpiredTime: _tokenExpiredTime
                });
                this._onSuccess && this._onSuccess(_token);
                zn.debug("WeiXin [" + this._tokenKey + "]: ", _token, data);
                callback && callback(_token);
            },
            __onError: function (data, callback){
                this._onError && this._onError(data);
                zn.error("WeiXin [" + this._tokenKey + "] Error: ", data);
                callback && callback(data);
            },
            getToken: function (success, error){
                var _defer = zn.async.defer(),
                    _nowTime = (new Date()).getTime(),
                    _token = this.get('token'),
                    _tokenExpiredTime = this.get('tokenExpiredTime');

                if(_token && _tokenExpiredTime > _nowTime){
                    success && success(_token);
                    _defer.resolve(_token);
                }else {
                    var _data = (node_fs.readFileSync(this._tokenFilePath, "utf-8")||TOKEN_SEP).split(TOKEN_SEP);
                    _token = _data[0];
                    _tokenExpiredTime = +_data[1];
                    if(_token && _tokenExpiredTime > _nowTime){
                        this.sets({
                            token: _token,
                            tokenExpiredTime: _tokenExpiredTime
                        });
                        success && success(_token);
                        _defer.resolve(_token);
                    }else {
                        this.refresh(function (token){
                            success && success(token);
                            _defer.resolve(token);
                        }, function (err){
                            error && error(err);
                            _defer.reject(err);
                        });
                    }
                }

                return _defer.promise;
            }
        }
    });

});
