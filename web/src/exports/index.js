var _exports = {},
    _export = null,
    _path = null;

['setting'].forEach(function (path){
    _path = './' + path + '/index.js';
    _export = require(_path);
    for(var key in _export){
        _exports[(path + '.' + key).toLowerCase()] = _export[key];
    }
});

['UserList', 'UserLoginLog'].forEach(function (path){
    _path = './' + path;
    _exports[(path).toLowerCase()] = require(_path);
});

module.exports = _exports;
