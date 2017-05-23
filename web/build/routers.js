module.exports = zn.deepEachObject({
	'/znwechat/Menu': './view/Menu.js'
}, function (value, index, item) {
	return require(value);
});