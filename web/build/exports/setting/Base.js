"use strict";

var React = require('react');

module.exports = React.createClass({
  displayName: "exports",
  getInitialState: function getInitialState() {
    return {
      _id: this.props.request.search._id || 'zn.plugin.wechat.base',
      items: null
    };
  },
  componentDidMount: function componentDidMount() {
    this.__getData();
  },
  __getData: function __getData() {
    zn.http.post('/zn.plugin.admin/config/selectBy_id', {
      _id: this.state._id
    }).then(function (data) {
      var _items = [],
          _item = null;
      zn.each(data.result, function (value, key) {
        _item = {
          name: key,
          title: value._title,
          type: value.input_type,
          value: value._value || value._rich_value
        };

        if (_item.type == 'ImageUploader') {
          _item.action = '/zn.plugin.admin/uploadFiles';
        }

        _items.push(_item);
      });
      this.setState({
        items: _items
      });
    }.bind(this));
  },
  render: function render() {
    return React.createElement(zn.react.Page, {
      loading: !this.state.items,
      title: '微信公众号开发系统设置: ' + this.state._id
    }, React.createElement("div", {
      style: {
        backgroundColor: '#FFF',
        padding: 5
      }
    }, this.state.items && React.createElement(zn.react.Form, {
      items: this.state.items,
      action: "/zn.plugin.admin/config/updateBy_id",
      merge: "updates",
      exts: {
        _id: this.state._id
      }
    })));
  }
});