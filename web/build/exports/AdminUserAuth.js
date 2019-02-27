"use strict";

var React = require('react');

module.exports = React.createClass({
  displayName: "exports",
  getInitialState: function getInitialState() {
    return {
      data: zn.store.post('/zn.plugin.admin/model/paging', {
        model: this.props.model,
        where: {
          user_openid: this.props.request.search.useropenid
        }
      }),
      items: [{
        title: '用户',
        name: 'user_openid',
        width: 100
      }, {
        title: '时间',
        name: 'zn_create_time',
        width: 180
      }, {
        title: '类型',
        name: 'status',
        width: 80
      }, {
        title: '说明',
        name: 'zn_note'
      }]
    };
  },
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