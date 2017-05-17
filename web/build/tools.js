'use strict';

window.PluginModel = require('../znmodel/index.js');

module.exports = zn.deepEachObject({
	'/tool/Menu': './view/Menu.js',
	'/tool/Project': './view/Project.js',
	'/tool/User': './view/User.js',
	'/tool/Role': './view/Role.js',
	'/tool/Var': './view/Var.js'
}, function (value, index, item) {
	return require(value);
});