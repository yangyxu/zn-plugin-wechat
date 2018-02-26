module.exports = zn.Class({
    static: true,
    methods: {
        getAuthorizeURL: function getAuthorizeURL(data, success, error) {
            return zn.http.post('/zn.plugin.wechat/wx/getAuthorizeURL', zn.extend({
                redirect_url: encodeURIComponent(window.location.origin + window.location.pathname)
            }, data)).then(success, error), this;
        },
        loginByCode: function loginByCode(code, success, error) {
            return zn.http.post('/zn.plugin.wechat/user/loginByCode', {
                code: code
            }).then(success, error), this;
        },
        initJSSDKConfig: function initJSSDKConfig(share, config) {
            zn.http.post('/zn.plugin.wechat/wx/getJSSDKConfig', {
                url: encodeURIComponent(window.location.origin + window.location.pathname)
            }).then(function (data) {
                if (data.status == 200) {
                    var _share = zn.extend({
                        title: '', // 分享标题
                        desc: '', // 分享内容描述
                        link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: '', // 分享图标
                        success: function success() {}
                    }, share),
                        _config = zn.extend(data.result, {
                        debug: false,
                        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'openLocation', 'getLocation']
                    }, config);
                    wx.config(_config);
                    wx.ready(function () {
                        wx.onMenuShareTimeline(_share);
                        wx.onMenuShareAppMessage(_share);
                        wx.onMenuShareQQ(_share);
                        wx.onMenuShareWeibo(_share);
                        wx.onMenuShareQZone(_share);
                    });
                } else {
                    zn.notification.error(data.result);
                }

                return this;
            });
        }
    }
});