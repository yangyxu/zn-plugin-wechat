var _exports = {},
    _export = null,
    _path = null;

[].forEach(function (path){
    _path = './' + path + '/index.js';
    _export = require(_path);
    for(var key in _export){
        _exports[(path + '.' + key)] = _export[key];
    }
});

['user', 'Login', 'UserInfo', 'ZNPluginAdminUserWechatInfo'].forEach(function (path){
    _path = './' + path;
    _exports[(path)] = require(_path);
});

_exports.getToken = function (){
    return zn.react.session.jsonKeyValue("ZN_PLUGIN_WECHAT_USER_LOGIN_TOKEN");
}

module.exports = _exports;
