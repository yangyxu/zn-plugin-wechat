zn.define(function () {

    var model = zn.db.common.model;

    return zn.Model("zn_wx_user", {
        mixins: [
            model.Base
        ],
        properties: {
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
                type: ['int', 10],
                default: 0
            },
            name: {
                value: null,
                type: ['varchar', 100],
                default: ''
            },
            password: {
                value: null,
                type: ['varchar', 100],
                default: '1234'
            },
            email: {
                value: null,
                type: ['varchar', 50],
                default: ''
            },
            phone: {
                value: null,
                type: ['varchar', 20],
                default: ''
            },
            province: {
                value: null,
                type: ['varchar', 100],
                default: ''
            },
            province: {
                value: null,
                type: ['varchar', 100],
                default: ''
            },
            address: {
                value: null,
                type: ['varchar', 250],
                default: ''
            },
            avatarImg: {
                value: null,
                type: ['varchar', 100],
                default: ''
            },
            lastLoginTime: {
                value: null,
                type: ['datetime'],
                format: "date_format({},'%Y-%c-%d %h:%i:%s')",
                default: null
            }
        }
    });

})
