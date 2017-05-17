zn.define({
    authorize: {
        url: 'https://open.weixin.qq.com/connect/oauth2/authorize',
        method: 'GET',
        qs: {
            appid: '{AppID}',
            response_type: 'code',
            scope: 'snsapi_base',
            state: ''
        }
    }
});
