zn.define(['node:chinese-to-pinyin'], function (pinyin) {

    return zn.Controller('zn.plugin.admin.user',{
        methods: {
            bindWechatWithOpenid: {
                method: 'GET/POST',
                argv: {
                    openid: null,
                    token: null
                },
                value: function (request, response, chain){
                    var _openid = request.getValue('openid'),
                        _token = request.getValue('token'),
                        _wechat = null,
                        _admin = null;
                    this.beginTransaction()
                        .query(zn.sql.select({
                            table: 'zn_plugin_wechat_user',
                            where: {
                                openid: _openid
                            }
                        })+zn.sql.select({
                            table: 'zn_plugin_admin_user',
                            fields: 'id, name, phone, email, status, avatar_img, zn_id, zn_plugin_wechat_open_id',
                            where: {
                                id: _token
                            }
                        }))
                        .query('bind data', function (sql, data){
                            _wechat = data[0][0];
                            _admin = data[1][0];
                            if(!_wechat || !_admin){
                                return response.error('绑定参数错误'), false;
                            }
                            _admin.zn_plugin_wechat_open_id = _openid;
                            _admin.avatar_img = _admin.avatar_img || _wechat.headimgurl;
                            _wechat.zn_plugin_admin_user_zn_id = _admin.zn_id;
                            return zn.sql.update({
                                table: 'zn_plugin_admin_user',
                                updates: {
                                    zn_plugin_wechat_open_id: _openid,
                                    avatar_img: _admin.avatar_img || _wechat.headimgurl
                                },
                                where: {
                                    id: _token
                                }
                            })+zn.sql.update({
                                table: 'zn_plugin_wechat_user',
                                updates: {
                                    zn_plugin_admin_user_zn_id: _admin.zn_id
                                },
                                where: {
                                    openid: _openid
                                }
                            });
                        }, function (err, data){
                            if(err){
                                response.error(err.message);
                            }else {
                                response.success({
                                    admin: _admin,
                                    wechat: _wechat
                                });
                            }
                        })
                        .commit()
                }
            },
            authWithOpenid: {
                method: 'GET/POST',
                argv: {
                    openid: null
                },
                value: function (request, response, chain){
                    var _openid = request.getValue('openid');
                    this.beginTransaction()
                        .query('select user', function (){
                            return zn.sql.select({
                                table: 'zn_plugin_admin_user',
                                fields: 'id, zn_id, zn_create_time, name, pin_yin, pin_yin_first_char, first_char, role_ids, email, phone, address, avatar_img',
                                where: {
                                    zn_plugin_wechat_open_id: _openid
                                }
                            });
                        }, function (err, data){
                            if(err){
                                response.error(err.message);
                            }else {
                                if(data[0]){
                                    response.success(data[0]);
                                }else {
                                    response.error('还未激活账号');
                                }
                            }
                        })
                        .commit()
                }
            },
            register: {
                method: 'GET/POST',
                argv: {
                    zn_plugin_wechat_open_id: null,
                    name: null
                },
                value: function (request, response, chain){
                    var _value = request.getValue();
                    this.beginTransaction()
                        .query(zn.sql.select({
                            table: 'zn_plugin_admin_user',
                            fields: 'id, zn_id, zn_create_time, name, pin_yin, pin_yin_first_char, first_char, role_ids, email, phone, address, avatar_img',
                            where: {
                                zn_plugin_wechat_open_id: _value.zn_plugin_wechat_open_id
                            }
                        }))
                        .query('select user', function (sql, data){
                            if(data[0]){
                                return response.error('你已经注册, 请直接登录'), false;
                            }else {
                                _value.zn_id = zn.uuid();
                                _value.pin_yin = pinyin(_value.name, { noTone: true, filterChinese: true });
                                var _firsts = [];
                                zn.each(_value.pin_yin.split(' '), function (value, index){
                                    _firsts.push(value[0].toUpperCase());
                                });
                                _value.pin_yin_first_char = _firsts.join('');
                                _value.first_char = _value.pin_yin[0].toUpperCase();
                                return zn.sql.insert({
                                    table: 'zn_plugin_admin_user',
                                    values: _value
                                });
                            }
                        }.bind(this), function (err, data){
                            if(err){
                                response.error(err.message);
                            }else {
                                response.success(data);
                            }
                        })
                        .commit()
                }
            },
        }
    });

});
