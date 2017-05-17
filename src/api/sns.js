zn.define({
    auth: {
        url: 'https://api.weixin.qq.com/sns/auth',
        qs: {
            access_token: '',
            openid: ''
        }
    },
    getUserOpenId: {
        url: 'https://api.weixin.qq.com/sns/oauth2/access_token',
        qs: {
            appid: '{AppID}',
            secret: '{AppSecret}',
            code: '',
            grant_type: 'authorization_code'
        }
    },
    refreshToken: {
        url: 'https://api.weixin.qq.com/sns/oauth2/refresh_token',
        qs: {
            appid: '{AppID}',
            grant_type: 'refresh_token',
            refresh_token: ''
        }
    },
    userInfo: {
        url: 'https://api.weixin.qq.com/sns/userinfo',
        qs: {
            access_token: '',
            openid: '',
            lang: 'zh_CN'
        }
    }
});
