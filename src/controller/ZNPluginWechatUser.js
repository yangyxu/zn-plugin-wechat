zn.define(['node:chinese-to-pinyin'], function (pinyin) {

    return zn.Controller('zn.plugin.wechat.user',{
        methods: {
            getInfoWithOpenid: {
                method: 'GET/POST',
                argv: {
                    openid: null
                },
                value: function (request, response, chain){
                    var _openid = request.getValue('openid');
                    this.beginTransaction()
                        .query('select user', function (){
                            return zn.sql.select({
                                table: 'zn_plugin_wechat_user',
                                where: {
                                    openid: _openid
                                }
                            }) + zn.sql.select({
                                table: 'zn_plugin_wechat_user_login_log',
                                where: {
                                    user_openid: _openid
                                },
                                order: {
                                    zn_create_time: 'desc'
                                }
                            });
                        }, function (err, data){
                            if(err){
                                response.error(err.message);
                            }else {
                                response.success(data);
                            }
                        })
                        .commit()
                }
            }
        }
    });

});
