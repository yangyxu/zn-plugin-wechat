module.exports = zn.deepEachObject({
    'Menu': './Menu.js'
}, function (value, key){
    return require(value);
});
