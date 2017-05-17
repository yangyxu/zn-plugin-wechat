'use strict';

module.exports = zn.deepEachObject({
    'Menu': './Menu.js',
    'MyInfo': './MyInfo.js',
    'Role': './Role.js',
    'User': './User.js',
    'Var': './Var.js'
}, function (value, key) {
    return require(value);
});