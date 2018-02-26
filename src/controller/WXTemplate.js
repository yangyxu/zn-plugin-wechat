zn.define(function () {

    return zn.Controller('template',{
        methods: {
            setIndustry: {
                method: 'GET/POST',
                argv: {
                    industry_id1: 1,
                    industry_id2: 10
                },
                value: function (request, response, chain){
                    zn.wx.accessTokenRequest('template.api_set_industry', {
                        industry_id1: request.getValue('industry_id1'),
                        industry_id2: request.getValue('industry_id2')
                    }).then(function (data){
                        response.success(data);
                    });
                }
            },
            getIndustry: {
                method: 'GET',
                value: function (request, response, chain){
                    zn.wx.accessTokenRequest('template.get_industry').then(function (data){
                        response.success(data);
                    });
                }
            },
            getAllPrivateTemplate: {
                method: 'GET',
                value: function (request, response, chain){
                    zn.wx.accessTokenRequest('template.get_all_private_template').then(function (data){
                        response.success(data);
                    });
                }
            },
            addTemplate: {
                method: 'GET/POST',
                argv: {
                    template_id_short: 'MT00010'
                },
                value: function (request, response, chain){
                    zn.wx.accessTokenRequest('template.api_add_template', {
                        template_id_short: request.getValue('template_id_short')
                    }).then(function (data){
                        response.success(data);
                    });
                }
            }
        }
    });

});
