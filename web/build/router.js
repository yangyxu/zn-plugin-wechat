'use strict';

window.PluginModel = require('../znmodel/index.js');

module.exports = zn.deepEachObject({
	'/znadmin/Menu': './view/Menu.js',
	'/znadmin/User': './view/User.js',
	'/znadmin/UserInfo': './view/UserInfo.js',
	'/znadmin/UserLog': './view/UserLog.js',
	'/znadmin/MyInfo': './view/MyInfo.js',
	'/znadmin/Role': './view/Role.js',
	'/znadmin/Var': './view/Var.js'
}, function (value, index, item) {
	return require(value);
});