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
                        _token = request.getValue('token');
                    this.beginTransaction()
                        .query('bind data', function (){
                            return zn.sql.update({
                                table: 'zn_plugin_admin_user',
                                updates: {
                                    zn_plugin_wechat_open_id: _openid
                                },
                                where: {
                                    id: _token
                                }
                            });
                        }, function (err, data){
                            if(err){
                                response.error(err.message);
                            }else {
                                response.success('绑定成功');
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
