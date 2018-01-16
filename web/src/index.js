zn.plugin.wechat = require('./component/index.js');
zn.deepEachObject({}, function (value){ return require(value); });
module.exports = zn.react.extendPath('/znpluginwechat.', require('./exports/index.js'));
