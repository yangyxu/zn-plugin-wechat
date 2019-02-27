"use strict";

var _exports = {},
    _export = null,
    _path = null;
var _data = {
  user: require('./user.js'),
  Login: require('./Login.js'),
  UserInfo: require('./UserInfo.js'),
  ZNPluginAdminUserWechatInfo: require('./ZNPluginAdminUserWechatInfo.js')
};
Object.keys(_data).map(function (path) {
  _exports[path.toLowerCase()] = _data[path];
});

_exports.getToken = function () {
  return zn.react.session.jsonKeyValue("ZN_PLUGIN_WECHAT_USER_LOGIN_TOKEN");
};

module.exports = _exports;