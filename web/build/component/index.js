'use strict';

module.exports = zn.deepEachObject({
    'RightsSetting': './RightsSetting.js',
    'RoleSearcher': './RoleSearcher.js',
    'UserSearcher': './UserSearcher.js'
}, function (value, key) {
    return require(value);
});