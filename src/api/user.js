zn.define({
    getAllUsers: {
        url: '/user/get',
        qs: {
            next_openid: null
        }
    },
    info: {
        url: '/user/info',
        qs: {
            openid: null,
            lang: 'zh_CN'
        }
    },
    infoBatchget: {

    }
});
