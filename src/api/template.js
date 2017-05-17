zn.define({
    api_set_industry: {
        url: '/template/api_set_industry',
        method: 'POST',
        qs: {

        },
        json: {
            industry_id1: "1",
            industry_id2: "4"
        }
    },
    get_industry: {
        url: '/template/get_industry',
        method: 'GET'
    },
    api_add_template: {
        url: '/template/api_add_template',
        method: 'POST'
    },
    send: {
        url: '/message/template/send',
        method: 'POST',
        json: {
            touser: null,
            template_id: "ngqIpbwh8bUfcSsECmogfXcV14J0tQlEpBO27izEYtY",
            url: null,
            topcolor: "#FF0000",
            data: null
        }
    }
});
