"use strict";

module.exports = zn.arrayValueToObject(['Base', 'Config'], function (value, index) {
  return require('./' + value + '.js');
});