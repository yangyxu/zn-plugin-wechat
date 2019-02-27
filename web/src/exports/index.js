var _exports = {},
    _export = null,
    _path = null;

var _data = {
    setting: require('./setting/index.js'),
    user: require('./user/index.js')
};

Object.keys(_data).map(function (path){
    _export = _data[path];
    for(var key in _export){
        _exports[(path + '.' + key).toLowerCase()] = _export[key];
    }
});

var _data = {
    AdminUserAuth: require('./AdminUserAuth.js'),
    AdminUserLoginWithQRCode: require('./AdminUserLoginWithQRCode.js')
};

Object.keys(_data).map(function (path){
    _exports[(path).toLowerCase()] = _data[path];
});

module.exports = _exports;
