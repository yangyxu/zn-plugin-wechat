zn.define([
    'node:crypto'
], function (node_crypto) {

    return zn.Class({
        properties: {
            token: null,
            encodingAESKey: null,
            id: null
        },
        methods: {
            init: function (token, encodingAESKey, id){
                if (!token || !encodingAESKey || !id) {
                    throw new Error('Please check arguments');
                }
                this._token = token;
                this._encodingAESKey = encodingAESKey;
                this._id = id;
            }
        }
    });

});
