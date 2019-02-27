"use strict";

var React = require('react');

module.exports = React.createClass({
  displayName: "exports",
  getDefaultProps: function getDefaultProps() {
    return {
      model: 'ZNPluginWechatUser'
    };
  },
  getInitialState: function getInitialState() {
    return {
      data: zn.store.post('/zn.plugin.admin/model/paging', {
        model: this.props.model
      }),
      items: [{
        title: '用户名',
        name: 'nickname',
        width: 120,
        filter: {
          type: 'Input',
          opts: ['like']
        }
      }, {
        title: '性别',
        name: 'sex',
        width: 60
      }, {
        title: '年龄',
        name: 'age',
        width: 60
      }, {
        title: '国籍',
        name: 'country',
        width: 60
      }, {
        title: '省',
        name: 'province',
        width: 60
      }, {
        title: '城市',
        name: 'city',
        width: 60
      }, {
        title: '地址',
        name: 'address',
        width: 300
      }, {
        title: '状态',
        name: 'status_convert',
        width: 60
      }, {
        title: 'OpenId',
        name: 'openid',
        width: 220,
        filter: {
          type: 'Input',
          opts: ['like']
        }
      }, {
        title: 'Unionid',
        name: 'unionid',
        width: 200,
        filter: {
          type: 'Input',
          opts: ['like']
        }
      }, {
        title: '注册时间',
        name: 'zn_create_time',
        width: 130
      }, {
        title: '备注',
        name: 'note'
      }],
      toolbarItems: [{
        text: '查看登录记录',
        name: 'loginlog',
        icon: 'fa-sign-in',
        style: {
          marginRight: 5
        }
      }]
    };
  },
  __onToolbarClick: function __onToolbarClick(item) {
    switch (item.name) {
      case 'loginlog':
        zn.react.session.relativeJump('/znpluginwechat.user.loginlog');
        break;
    }
  },
  __onTableColumnRender: function __onTableColumnRender(rowIndex, columnIndex, data, item, value) {
    switch (item.name) {
      case 'nickname':
        return React.createElement("a", {
          style: {
            textDecoration: 'underline'
          },
          onClick: function onClick() {
            return zn.react.session.relativeJump('/znpluginwechat.user.info?openid=' + data.openid);
          }
        }, React.createElement("img", {
          style: {
            width: 24,
            height: 24,
            borderRadius: '50%',
            position: 'relative',
            top: 5,
            marginRight: 3
          },
          src: data.headimgurl
        }), React.createElement("span", null, value));

      case 'sex':
        return value == 1 ? '男' : '女';
    }
  },
  render: function render() {
    return React.createElement(zn.react.Page, {
      title: "\u5FAE\u4FE1\u7528\u6237\u7BA1\u7406",
      toolbarItems: this.state.toolbarItems,
      onToolbarClick: this.__onToolbarClick
    }, React.createElement(zn.react.PagerView, {
      ref: "table",
      view: "Table",
      enableFilter: true,
      checkbox: 50,
      showHeader: true,
      columnRender: this.__onTableColumnRender,
      data: this.state.data,
      items: this.state.items
    }));
  }
});