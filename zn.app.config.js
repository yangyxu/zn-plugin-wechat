zn.define({
    deploy: 'zn.plugin.wechat',
    models: '/src/model/',
    controllers: '/src/controller/',
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
