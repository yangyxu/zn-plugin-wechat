zn.define(function () {

    return zn.Controller('user',{
        methods: {
            getUserList: {
                method: 'GET/POST',
                value: function (request, response, chain){
                    zn.wx.accessTokenRequest('user.getAllUsers', {
                        next_openid: request.getValue('next_openid')||null
                    }).then(function (data){
                        response.success(data);
                    });
                }
            },
            getUserByCode: {
                method: 'GET/POST',
                argv: {
                    code: null
                },
                value: function (request, response, chain){
                    zn.wx.accessTokenRequest('sns.getUserOpenId', {
                        code: request.getValue('code')||null
                    }).then(function (data){
                        response.success(data);
                    });
                }
            }
        }
    });

});
