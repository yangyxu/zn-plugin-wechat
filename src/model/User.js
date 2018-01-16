zn.define(function () {

    return zn.Class("zn.plugin.wechat.model.user", {
        properties: {
            subscribe: {
                value: null,
                type: ['int', 4],
                default: 0
            },
            groupid: {
                value: null,
                type: ['int', 4],
                default: 0
            },
            openid: {
                value: null,
                type: ['varchar', 100],
                default: ''
            },
            nickname: {
                value: null,
                type: ['varchar', 100],
                default: ''
            },
            sex: {
                value: null,
                type: ['int', 4],
                default: 0
            },
            language: {
                value: null,
                type: ['varchar', 100],
                default: ''
            },
            city: {
                value: null,
                type: ['varchar', 100],
                default: ''
            },
            province: {
                value: null,
                type: ['varchar', 100],
                default: ''
            },
            country: {
                value: null,
                type: ['varchar', 100],
                default: ''
            },
            headimgurl: {
                value: null,
                type: ['varchar', 500],
                default: ''
            },
            subscribe_time: {
                value: null,
                type: ['varchar', 100],
                default: ''
            },
            unionid: {
                value: null,
                type: ['varchar', 100],
                default: ''
            },
            remark: {
                value: null,
                type: ['varchar', 100],
                default: ''
            },
            tagid_list: {
                value: null,
                type: ['varchar', 100],
                default: ''
            },
            last_login_time: {
                value: null,
                type: ['datetime'],
                format: "date_format({},'%Y-%c-%d %h:%i:%s')",
                default: null
            }
        }
    });

});
