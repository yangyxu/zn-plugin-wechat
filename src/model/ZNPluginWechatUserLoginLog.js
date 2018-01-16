zn.define(function () {

    var model = zn.db.common.model;

    return zn.Model("zn_plugin_wechat_user_login_log", {
        mixins: [
            model.Base
        ],
        properties: {
            status: {
                value: null,
                type: ['int', 11],
                default: 0
            },
            user_openid: {
                value: null,
                type: ['varchar', 100],
                default: ''
            }
        }
    });

});
