zn.define({
    token: {
        url: '/token',
        method: 'GET',
        qs: {
            grant_type: 'client_credential',
            appid: '{AppID}',
            secret: '{AppSecret}'
        }
    },
    getcallbackip: {
        url: '/getcallbackip',
        method: 'GET'
    }
});
