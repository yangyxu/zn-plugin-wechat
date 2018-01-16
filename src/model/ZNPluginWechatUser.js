zn.define([
    './User'
], function (User) {

    var model = zn.db.common.model;

    return zn.Model("zn_plugin_wechat_user", {
        mixins: [
            model.Base,
            User
        ],
        properties: {
            zn_plugin_admin_user_zn_id: {
                value: null,
                type: ['varchar', 100],
                default: ''
            },
            user_openid: {
                value: null,
                type: ['varchar', 100],
                default: ''
            },
            access_token: {
                value: null,
                type: ['varchar', 500],
                default: ''
            },
            expires_in: {
                value: null,
                type: ['varchar', 100],
                default: ''
            },
            refresh_token: {
                value: null,
                type: ['varchar', 500],
                default: ''
            },
            scope: {
                value: null,
                type: ['varchar', 50],
                default: ''
            }
        }
    });

});
