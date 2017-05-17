zn.define([
    'node:md5',
    'node:request',
    'node:xml2js'
], function (node_md5, node_request, node_xml2js) {

    var URLS = {
        UNIFIED_ORDER: 'https://api.mch.weixin.qq.com/pay/unifiedorder',
        MICROPAY: 'https://api.mch.weixin.qq.com/pay/micropay',
        ORDER_QUERY: 'https://api.mch.weixin.qq.com/pay/orderquery',
        REFUND: 'https://api.mch.weixin.qq.com/secapi/pay/refund',
        REFUND_QUERY: 'https://api.mch.weixin.qq.com/pay/refundquery',
        DOWNLOAD_BILL: 'https://api.mch.weixin.qq.com/pay/downloadbill',
        SHORT_URL: 'https://api.mch.weixin.qq.com/tools/shorturl',
        CLOSE_ORDER: 'https://api.mch.weixin.qq.com/pay/closeorder',
        REVERSE: 'https://api.mch.weixin.qq.com/secapi/pay/reverse'
    };

    var CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var XML_Builder = new node_xml2js.Builder();

    return zn.Class({
        methods: {
            xmlStringify: function (object){
                return XML_Builder.buildObject({
                    xml: object
                });
            },
            xmlParse: function (xml, callback){
                node_xml2js.parseString(xml, {
                    trim: true,
                    explicitArray: false
                }, function (error, data) {
                    if(error){
                        error = new Error();
                        error.name = 'XMLParseError';
                        callback && callback(error);
                    }else {
                        callback && callback(data);
                    }
                });

                return this;
            },
            generateTimeStamp: function (){
                return parseInt(+new Date() / 1000, 10) + '';
            },
            generateNonceStr: function (length){
                var _max = CHARS.length,
                    _size = length || 32,
                    _noceStr = '';
                for (var i = 0; i < _size; i++) {
                    _noceStr += CHARS.charAt(Math.floor(Math.random() * _max));
                }

                return _noceStr;
            },
            getPaySign: function (argv, key, signType){
                var _argv = zn.extend({}, argv);
                _argv.sign = null;
                delete _argv.sign;
                var _stringA = this.__argvStringify(_argv);
                var _stringSignTemp = _stringA + '&key=' + key;
                return node_md5(_stringSignTemp).toUpperCase();
            },
            __argvStringify: function (argv){
                return Object.keys(argv).filter(function (key) {
                    return argv[key] !== undefined && argv[key] !== '';
                }).sort().map(function (key) {
                    return key + '=' + argv[key];
                }).join('&');
            }
        }
    });

});
