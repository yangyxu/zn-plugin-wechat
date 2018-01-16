zn.define(function () {

    var model = zn.db.common.model;

    return zn.Model("zn_plugin_wechat_config", {
        mixins: [
            model.Base,
            model.Rights
        ],
        properties: {
            _id: {
                value: null,
                type: ['varchar', 50],
                default: ''
            },
            _title: {
                value: null,
                type: ['varchar', 250],
                default: ''
            },
            _key: {
                value: null,
                type: ['varchar', 250],
                default: ''
            },
            _value: {
                value: null,
                type: ['varchar', 2000],
                default: ''
            },
            _rich_value: {
                value: null,
                type: ['longtext']
            },
            ref_id: {
                value: null,
                type: ['int', 11],
                default: 0
            },
            var_id: {
                value: null,
                type: ['int', 11],
                default: 0
            },
            input_type: {
                value: null,
                type: ['varchar', 50],
                default: 'Input'
            },
            data_type: {
                value: null,
                type: ['varchar', 20],
                default: 'String'
            }
        }
    });

})
