zn.define({
    deploy: 'znwechat',
    models: '/src/model/',
    controllers: '/src/controller/',
    views: {
        path: '/src/view/',
        suffix: 'html'
    },
    wx: {
        ID: null,
        AppID: null,
        AppSecret: null,
        CallBackUrl: null,
        Token: null,
        EncodingAESKey: null,
        WXHOST: 'https://api.weixin.qq.com/cgi-bin'
    }
});
