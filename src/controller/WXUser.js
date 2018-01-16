zn.define(function () {

    return zn.Controller('user',{
        methods: {
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
            getUserList: {
                method: 'GET/POST',
                value: function (request, response, chain){
                    zn.wx.accessTokenRequest('user.getAllUsers', {
                        next_openid: request.getValue('next_openid')||null
                    }).then(function (data){
                        response.success(data);
                    });
                }
            },
            getUserByCode: {
                method: 'GET/POST',
                argv: {
                    code: null
                },
                value: function (request, response, chain){
                    zn.wx.accessTokenRequest('sns.getUserOpenId', {
                        code: request.getValue('code')||null
                    }).then(function (data){
                        response.success(data);
                    });
                }
            },
            getUserInfo: {
                method: 'GET/POST',
                value: function (request, response, chain){
                    zn.wx.accessTokenRequest('user.info', {
                        openid: request.getValue('openid')||'oJ_xbwdXtcNmve1goO0HH_5Aouyg'
                    }).then(function (data){
                        response.success(data);
                    });
                }
            },
            getLoginUserSession: {
                method: 'GET/POST',
                value: function (request, response, chain){
                    response.success(request.session.getItem('@WXUser'));
                }
            },
            loginByCode: {
                method: 'GET/POST',
                argv: {
                    code: null,
                    debug: 0
                },
                value: function (request, response, chain){
                    var _self = this,
                        _user = request.session.getItem('@WXUser'),
                        _debug = request.getValue('debug'),
                        _code = request.getValue('code'),
                        _session = {};

                    if(+_debug){
                        _user = {
                            openid: "oJ_xbwdXtcNmve1goO0HH_5Aouyg",
                            scope: "snsapi_userinfo",
                            unionid: "o4EaljvqhI4xhpsH-DaJyDTfjKdE",
                            nickname: "徐洋洋",
                            language: "zh_CN",
                            city: "徐汇",
                            province: "上海",
                            country: "中国",
                            headimgurl: "http://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEKVEjibiaVTLT9radibgH5icYpaxJnIBQzU85PmyNWBv9BeFGbmJMXE6dC1b9upyIjibHNJ0GiaPjNIBzDg/0",
                            zn_create_user: 0,
                            sex: 1,
                            id: 2
                        };
                        request.session.setItem('@WXUser', _user);
                        return response.success(_user), false;
                    }

                    if(_user){
                        return response.success(_user), false;
                    }

                    zn.wx.accessTokenRequest('sns.getUserOpenId', {
                        code: _code
                    }).then(function (data){
                        zn.overwrite(_session, data);
                        if(data.errcode){
                            return response.error(data), false;
                        }else {
                            var _sql = zn.sql.select({
                                table: 'zn_plugin_wechat_user',
                                fields: 'city, country, province, sex, headimgurl, nickname, openid, zn_plugin_admin_user_zn_id, zn_create_time',
                                where: {
                                    openid: _session.openid
                                }
                            });
                            _sql += zn.sql.insert({
                                table: 'zn_plugin_wechat_user_code',
                                values: {
                                    code: _code,
                                    user_openid: _session.openid
                                }
                            });

                            return this.query(_sql);
                        }
                    }.bind(this)).then(function (data){
                        if(data[0].length){
                            _user = data[0][0];
                            request.session.setItem('@WXUser', _user);
                            this.query(zn.sql.insert({
                                table: 'zn_plugin_wechat_user_login_log',
                                values: {
                                    user_openid: _user.openid,
                                    status: 1
                                }
                            }));
                            return response.success(_user), false;
                        }else {
                            return zn.wx.request('sns.userInfo', {
                                access_token: _session.access_token,
                                openid: _session.openid
                            });
                        }
                    }.bind(this)).then(function (data){
                        zn.overwrite(_session, data);
                        zn.debug('wxuser info: ', data);
                        _session.privilege = null;
                        delete _session.privilege;
                        return this.query(zn.sql.insert({
                            table: 'zn_plugin_wechat_user',
                            values: _session
                        }) + zn.sql.insert({
                            table: 'zn_plugin_wechat_user_login_log',
                            values: {
                                user_openid: _session.openid,
                                status: 1
                            }
                        }));
                    }.bind(this)).then(function (data){
                        request.session.setItem('@WXUser', _session);
                        response.success({
                            city: _session.city,
                            country: _session.country,
                            province: _session.province,
                            sex: _session.sex,
                            headimgurl: _session.headimgurl,
                            nickname: _session.nickname,
                            openid: _session.openid,
                            zn_create_time: _session.zn_create_time
                        });
                    }.bind(this), function (err){
                        response.error(err);
                    });
                }
            }
        }
    });

});
