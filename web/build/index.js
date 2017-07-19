zn.react.znwechat = {};
zn.deepEachObject({}, function (value) {
  return require(value);
});
module.exports = zn.react.extendPath('/znwechat/', require('./page/index.js'));