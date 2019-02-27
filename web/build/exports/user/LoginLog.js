"use strict";

var React = require('react');

module.exports = React.createClass({
  displayName: "exports",
  render: function render() {
    return React.createElement(zn.react.Page, {
      toolbarItems: [{
        text: '导出'
      }],
      onToolbarClick: this.__onToolbarClick,
      title: "\u7528\u6237\u767B\u5F55\u65E5\u5FD7"
    }, React.createElement(zn.react.PagerView, {
      view: "Table",
      enableFilter: false,
      checkbox: 0,
      showHeader: true,
      data: this.state.data,
      items: this.state.items
    }));
  }
});