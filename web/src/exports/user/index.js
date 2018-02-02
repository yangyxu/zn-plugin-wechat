module.exports = zn.arrayValueToObject([
    'Bind',
    'Info',
    'List',
    'LoginLog'
], function (value, index){
    return require('./'+value+'.js');
});
