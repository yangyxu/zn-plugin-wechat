/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	//require('zeanium-react-web');
	var React = __webpack_require__(2);
	var ReactDOM = __webpack_require__(3);
	ReactDOM.render(React.createElement(UI.URLRouter, { home: '/', routers: __webpack_require__(4) }), document.getElementById('container'));

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = React;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = ReactDOM;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = zn.deepEachObject({
		'/znadmin/Menu': './view/Menu.js',
		'/znadmin/User': './view/User.js',
		'/znadmin/UserInfo': './view/UserInfo.js',
		'/znadmin/UserLog': './view/UserLog.js',
		'/znadmin/MyInfo': './view/MyInfo.js',
		'/znadmin/Role': './view/Role.js',
		'/znadmin/Var': './view/Var.js'
	}, function (value, index, item) {
		return __webpack_require__(5)(value);
	});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	var map = {
		"./component/RightsSetting": 6,
		"./component/RightsSetting.js": 6,
		"./component/RoleSearcher": 11,
		"./component/RoleSearcher.js": 11,
		"./component/UserSearcher": 7,
		"./component/UserSearcher.js": 7,
		"./component/UserSearcher.less": 8,
		"./component/index": 12,
		"./component/index.js": 12,
		"./entry": 1,
		"./entry.js": 1,
		"./index": 14,
		"./index.js": 14,
		"./less/UserItem.less": 15,
		"./router": 4,
		"./router.js": 4,
		"./tools": 17,
		"./tools.js": 17,
		"./view/Menu": 18,
		"./view/Menu.js": 18,
		"./view/MyInfo": 20,
		"./view/MyInfo.js": 20,
		"./view/Project": 23,
		"./view/Project.js": 23,
		"./view/ProjectBug": 24,
		"./view/ProjectBug.js": 24,
		"./view/Role": 25,
		"./view/Role.js": 25,
		"./view/User": 27,
		"./view/User.js": 27,
		"./view/UserInfo": 28,
		"./view/UserInfo.js": 28,
		"./view/UserInfo.less": 21,
		"./view/UserLog": 29,
		"./view/UserLog.js": 29,
		"./view/UsersForRoles": 26,
		"./view/UsersForRoles.js": 26,
		"./view/Var": 19,
		"./view/Var.js": 19,
		"./view/index": 30,
		"./view/index.js": 30
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 5;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);
	var UserSearcher = __webpack_require__(7);
	var RoleSearcher = __webpack_require__(11);
	module.exports = React.createClass({
		displayName: 'exports',

		getDefaultProps: function getDefaultProps() {
			return {
				model: null,
				id: null
			};
		},
		getInitialState: function getInitialState() {
			return {
				users: ',',
				roles: ',',
				observers: ',',
				ownerId: 0,
				items: [{
					title: '是否启用权限', name: 'ifEnabledRights', type: 'radio',
					data: [{ text: "禁用", value: 0 }, { text: '启用', value: 1 }]
				}, { title: '扩展', name: 'ext', type: 'textarea' }]
			};
		},
		componentDidMount: function componentDidMount() {
			this.__load(this.props.id);
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			if (nextProps.id != this.props.id) {
				this.__load(nextProps.id);
			}
		},
		__load: function __load(id) {
			if (id) {
				Store.post('/znadmin/model/selectOne', {
					fields: '*',
					model: this.props.model,
					where: { id: id }
				}).exec().then(function (data) {
					this.setState(data.result);
				}.bind(this));
			}
		},
		__save: function __save() {
			if (!this.props.id) {
				Toast.warning('必须编辑项');
				return;
			}
			var _data = {
				users: this.state.users,
				roles: this.state.roles
			};

			Store.post('/znadmin/model/updateNode', { data: _data, model: this.props.model, where: { id: this.props.id } }).exec().then(function (data) {
				if (data.result.changedRows) {
					Toast.success('保存成功');
				}
			}.bind(this));
		},
		__changeOwner: function __changeOwner() {},
		render: function render() {
			var _this = this;

			return React.createElement(
				'div',
				{ className: 'rt-rights-setting', style: { padding: 5 } },
				React.createElement(
					'div',
					{ className: 'title', style: { lineHeight: '4rem' } },
					React.createElement('i', { className: 'fa fa-yelp', style: { margin: 5 } }),
					React.createElement(
						'span',
						null,
						'\u6743\u9650\u8BBE\u7F6E\u3010\u62E5\u6709\u8005\uFF1A',
						React.createElement(
							'a',
							{ onClick: this.__changeOwner },
							this.state.ownerId
						),
						'\u3011'
					),
					this.props.id && React.createElement(UI.Button, { onClick: this.__save, text: '\u4FDD\u5B58', icon: 'fa-save', float: 'right', style: { margin: 5 } })
				),
				React.createElement(
					UI.Card,
					{ icon: 'fa-user', title: '\u7528\u6237' },
					React.createElement(UserSearcher, { value: this.state.users, onChange: function onChange(value) {
							return _this.state.users = value;
						} })
				),
				React.createElement(
					UI.Card,
					{ icon: 'fa-graduation-cap', title: '\u89D2\u8272' },
					React.createElement(RoleSearcher, { value: this.state.roles, onChange: function onChange(value) {
							return _this.state.roles = value;
						} })
				)
			);
		}
	});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(8);
	var React = __webpack_require__(2);

	var CHARS = ['A', 'B', 'C', 'D', ''];

	var UserSelector = React.createClass({
		displayName: 'UserSelector',

		getDefaultProps: function getDefaultProps() {
			return {
				value: ','
			};
		},
		getInitialState: function getInitialState() {
			return {
				value: this.props.value,
				tag: null,
				tags: [],
				user: null,
				users: []
			};
		},
		componentDidMount: function componentDidMount() {
			this.loadRoles();
			this.loadUsers();
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			if (nextProps.value != this.props.value) {
				this.setState({
					value: nextProps.value
				});
			}
		},
		loadRoles: function loadRoles() {
			/*
	  Store.post('/plugins/dbms/model/selectAllChildByPid', {model: 'zn_admin_role', fields: 'id as value, title as text', pid: 1}).exec().then(function (data){
	  	this.setState({
	  		tags: data.result
	  	});
	  }.bind(this));*/
		},
		loadUsers: function loadUsers() {
			Store.post('/znadmin/model/select', { model: 'zn_admin_user', fields: 'id as value, name as text' }).exec().then(function (data) {
				this.setState({
					users: data.result
				});
			}.bind(this));
		},
		__onTagClick: function __onTagClick(item) {
			this.setState({ tag: item.value });
		},
		__onUserClick: function __onUserClick(user) {
			var _id = user.value + ',';
			if (this.state.value.indexOf(',' + _id) == -1) {
				this.state.value = this.state.value + _id;
			} else {
				this.state.value = this.state.value.replace(',' + _id, ',');
			}
			this.setState({
				value: this.state.value
			});
			this.props.onChange && this.props.onChange(this.state.value);
		},
		render: function render() {
			return React.createElement(
				'div',
				{ className: 'rt-user-selector' },
				React.createElement(
					'ul',
					{ className: 'tags', style: { borderBottom: '1px dashed #e4e2e2' } },
					this.state.tags.map(function (item, index) {
						var _this = this;

						return React.createElement(
							'li',
							{ key: index, className: this.state.tag == item.value ? 'curr' : '', onClick: function onClick() {
									return _this.__onTagClick(item);
								} },
							item.text
						);
					}.bind(this))
				),
				React.createElement(
					'ul',
					{ className: 'tags' },
					this.state.users.map(function (item, index) {
						var _this2 = this;

						return React.createElement(
							'li',
							{ key: index, className: this.state.value.indexOf(',' + item.value + ',') !== -1 ? 'curr' : '', onClick: function onClick() {
									return _this2.__onUserClick(item);
								} },
							item.text
						);
					}.bind(this))
				)
			);
		}
	});

	module.exports = React.createClass({
		displayName: 'exports',

		getDefaultProps: function getDefaultProps() {
			return {
				model: 'zn_admin_user'
			};
		},
		getInitialState: function getInitialState() {
			return {
				data: Store.post('/znadmin/model/select', { model: this.props.model, where: { pid: 0 } }),
				userSelectType: 0
			};
		},
		componentDidMount: function componentDidMount() {},
		__onListViewItemClick: function __onListViewItemClick(event, item) {
			if (item.view) {
				this.setState({
					userSelectType: item.type
				});
			}
		},
		render: function render() {
			return React.createElement(UserSelector, this.props);

			return React.createElement(
				'div',
				{ className: 'rt-user-searcher' },
				React.createElement(UI.ListView, {
					className: 'c-tab-1',
					fireIndex: 0,
					onClick: this.__onListViewItemClick,
					itemRender: function itemRender(item) {
						return React.createElement(
							'span',
							null,
							React.createElement('i', { style: { marginRight: 5 }, className: 'fa ' + item.icon }),
							item.text
						);
					},
					data: [{ text: '首字母', icon: 'fa-font', type: 0 }, { text: '所属部门', icon: 'fa-sitemap', type: 1 }] }),
				React.createElement(UserSelector, { type: this.state.userSelectType })
			);
		}
	});

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 9 */,
/* 10 */,
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(8);
	var React = __webpack_require__(2);

	module.exports = React.createClass({
		displayName: 'exports',

		getDefaultProps: function getDefaultProps() {
			return {
				value: ','
			};
		},
		getInitialState: function getInitialState() {
			return {
				value: this.props.value,
				roles: []
			};
		},
		componentDidMount: function componentDidMount() {
			this.loadRoles();
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			if (nextProps.value != this.props.value) {
				this.setState({
					value: nextProps.value
				});
			}
		},
		loadRoles: function loadRoles() {
			Store.post('/znadmin/model/selectAllChildByPid', { model: 'zn_admin_role', fields: 'id as value, title as text, type', pid: 1 }).exec().then(function (data) {
				this.setState({
					roles: data.result
				});
			}.bind(this));
		},
		__onTagClick: function __onTagClick(item) {
			this.setState({ tag: item.value });
		},
		__onUserClick: function __onUserClick(user) {
			var _id = user.value + ',';
			if (this.state.value.indexOf(',' + _id) == -1) {
				this.state.value = this.state.value + _id;
			} else {
				this.state.value = this.state.value.replace(',' + _id, ',');
			}
			this.setState({
				value: this.state.value
			});
			this.props.onChange && this.props.onChange(this.state.value);
		},
		__renderIcon: function __renderIcon(item) {
			switch (item.type) {
				case 0:
					return null;
				case 1:
					return React.createElement('i', { title: '\u8FD9\u662F\u90E8\u95E8', className: 'fa fa-sitemap', style: { margin: 5, color: '#d9534f' } });
				case 2:
					return React.createElement('i', { title: '\u8FD9\u662F\u89D2\u8272', className: 'fa fa-graduation-cap', style: { margin: 5 } });
			}
		},
		render: function render() {
			return React.createElement(
				'div',
				{ className: 'rt-user-selector' },
				React.createElement(
					'ul',
					{ className: 'tags' },
					this.state.roles.map(function (item, index) {
						var _this = this;

						return React.createElement(
							'li',
							{ key: index, className: this.state.value.indexOf(',' + item.value + ',') !== -1 ? 'curr' : '', onClick: function onClick() {
									return _this.__onUserClick(item);
								} },
							this.__renderIcon(item),
							item.text
						);
					}.bind(this))
				)
			);
		}
	});

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = zn.deepEachObject({
	    'RightsSetting': './RightsSetting.js',
	    'RoleSearcher': './RoleSearcher.js',
	    'UserSearcher': './UserSearcher.js'
	}, function (value, key) {
	    return __webpack_require__(13)(value);
	});

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	var map = {
		"./RightsSetting": 6,
		"./RightsSetting.js": 6,
		"./RoleSearcher": 11,
		"./RoleSearcher.js": 11,
		"./UserSearcher": 7,
		"./UserSearcher.js": 7,
		"./UserSearcher.less": 8,
		"./index": 12,
		"./index.js": 12
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 13;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var EXPORTS = {
	    component: './component/index.js',
	    view: './view/index.js'
	},
	    _EXPORTS = {};

	var _temp = null;
	for (var key in EXPORTS) {
	    _temp = __webpack_require__(5)(EXPORTS[key]);
	    _EXPORTS[key] = _temp;
	    for (var _tkey in _temp) {
	        _EXPORTS[_tkey] = _temp[_tkey];
	    }
	}

	module.exports = _EXPORTS;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 16 */,
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = zn.deepEachObject({
		'/tool/Menu': './view/Menu.js',
		'/tool/Project': './view/Project.js',
		'/tool/User': './view/User.js',
		'/tool/Role': './view/Role.js',
		'/tool/Var': './view/Var.js'
	}, function (value, index, item) {
		return __webpack_require__(5)(value);
	});

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(2);
	var Var = __webpack_require__(19);
	var RightsSetting = __webpack_require__(6);
	var VarPanel = React.createClass({
		displayName: 'VarPanel',

		getInitialState: function getInitialState() {
			return {
				typeIndex: 0
			};
		},
		__onListViewItemClick: function __onListViewItemClick(event, item, index) {
			this.setState({ typeIndex: index });
		},
		__renderBody: function __renderBody() {
			var _treeModel = this.props.treeModel;

			return React.createElement(RightsSetting, { model: _treeModel.props.model, id: _treeModel.state.currItem ? _treeModel.state.currItem.props.data.id : null });
			/*
	  switch (this.state.typeIndex) {
	  	case 0:
	  		return <RightsSetting model={_treeModel.props.model} id={_treeModel.state.currItem?_treeModel.state.currItem.props.data.id:null}  />;
	  	case 1:
	  		if(_treeModel.state.currItem){
	  			return <Var menuId={_treeModel.state.currItem.props.data.id} pid={2} />
	  		}else {
	  			return <div style={{textAlign:'center'}}>请先选中菜单</div>;
	  		}
	  }*/
		},
		render: function render() {
			return this.__renderBody();
			return React.createElement(
				UI.ActivityLayout,
				{ direction: 'v', begin: 4, barWidth: 0.3, unit: 'rem' },
				React.createElement(UI.ListView, {
					className: 'rt-list-view-tab',
					fireIndex: 0,
					onClick: this.__onListViewItemClick,
					itemRender: function itemRender(item, index) {
						return React.createElement(
							'span',
							null,
							React.createElement('i', { style: { marginRight: 5 }, className: 'fa ' + item.icon }),
							item.text
						);
					},
					data: [{ text: '权限设置', icon: 'fa-yelp' }, { text: '资源管理', icon: 'fa-table' }] }),
				this.__renderBody()
			);
		}
	});

	module.exports = React.createClass({
		displayName: 'exports',

		getDefaultProps: function getDefaultProps() {
			return {
				model: 'zn_admin_menu',
				title: '菜单管理',
				leftWidth: 30,
				pid: 0,
				fields: [{ title: '标题', type: 'Input', name: 'title' }, { title: '类型', type: 'Radio', name: 'type', value: 0,
					data: [{ text: '分类', value: 0 }, { text: '功能菜单', value: 1 }]
				}, { title: '图标', type: 'Input', name: 'icon' }, { title: '链接', type: 'Input', name: 'url' }, { title: '路径', type: 'Input', name: 'path' }, { title: '扩展', type: 'Textarea', name: 'ext' }]
			};
		},
		__rightRender: function __rightRender(treeModel) {
			return React.createElement(VarPanel, { treeModel: treeModel });
		},
		render: function render() {
			return React.createElement(PluginModel.TreeModelView, _extends({}, this.props, { rightRender: this.__rightRender }));
		}
	});

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(2);
	var RightsSetting = __webpack_require__(6);
	module.exports = React.createClass({
		displayName: 'exports',

		getDefaultProps: function getDefaultProps() {
			return {
				model: 'zn_admin_var',
				pid: 0,
				title: '资源管理',
				menuId: 0,
				fields: [{ title: '标题', type: 'Input', name: 'title' }, { title: '类型', type: 'Radio', name: 'type', value: 0,
					data: [{ text: '分类', value: 0 }, { text: '按钮', value: 1 }, { text: '常量', value: 2 }, { text: '标签', value: 3 }, { text: '标签', value: 4 }]
				}, { title: '图标', type: 'Input', name: 'icon' }, { title: '图片', type: 'ImageUploader', name: 'img', action: '/znadmin/uploadFiles' }, { title: '链接', type: 'Input', name: 'url' }, { title: '路径', type: 'Input', name: 'path' }, { title: '扩展', type: 'Textarea', name: 'ext' }]
			};
		},
		__rightRender: function __rightRender(treeModel) {
			if (!treeModel.state.currItem) {
				return null;
			}
			var _id = treeModel.state.currItem.props.data.id;
			return React.createElement(
				'div',
				null,
				React.createElement(RightsSetting, { model: this.props.model, id: treeModel.state.currItem ? treeModel.state.currItem.props.data.id : null })
			);
		},
		__itemContentRender: function __itemContentRender(item) {
			var _data = item.data;
			switch (_data.type) {
				case 1:
					return React.createElement(
						'span',
						null,
						React.createElement('i', { title: '\u8FD9\u662F\u64CD\u4F5C\u6309\u94AE', className: 'fa fa-hand-o-up', style: { margin: 5, color: '#0B72A5' } }),
						React.createElement('i', { className: 'fa ' + _data.icon, style: { marginRight: 5 } }),
						_data.id + '、' + _data.title
					);
				case 2:
					return React.createElement(
						'span',
						null,
						React.createElement('i', { title: '\u8FD9\u662F\u9759\u6001\u5E38\u91CF', className: 'fa fa-text-width', style: { margin: 5, color: '#d9534f' } }),
						React.createElement('i', { className: 'fa ' + _data.icon, style: { marginRight: 5 } }),
						_data.id + '、' + _data.title
					);
				case 3:
					return React.createElement(
						'span',
						null,
						React.createElement('i', { title: '\u8FD9\u662F\u6807\u7B7E\u7C7B\u522B', className: 'fa fa-tag', style: { margin: 5 } }),
						React.createElement('i', { className: 'fa ' + _data.icon, style: { marginRight: 5 } }),
						_data.id + '、' + _data.title
					);
			}
		},
		render: function render() {
			return React.createElement(PluginModel.TreeModelView, _extends({}, this.props, { where: { menuId: this.props.menuId }, itemContentRender: this.__itemContentRender, rightRender: this.__rightRender, leftWidth: 30 }));
		}
	});

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(21);
	var React = __webpack_require__(2);

	module.exports = React.createClass({
		displayName: 'exports',

		getInitialState: function getInitialState() {
			return {
				userId: this.props.userId || Session.json().id,
				toolbarItems: this.props.userId ? [] : [{ icon: 'fa-edit', text: '修改个人信息', onClick: this.__onEdit }],
				info: null,
				formItems: [{ title: '头像', name: 'avatarImg', type: 'ImageUploader', action: '/klproject/uploadFiles' }, { title: '用户名', name: 'name', type: 'Input', required: true, error: '用户名必填项!' }, { title: '密码', name: 'pwd', type: 'Input', attrs: { type: 'password' }, required: true, error: '密码必填项!' }, { title: '邮箱', name: 'email', type: 'Input', required: true, error: '邮箱必填项!' }, { title: '手机号', name: 'phone', type: 'Input', required: true, error: '手机号必填项!' }, { title: '地址', name: 'address', type: 'Input' }, { title: '说明', name: 'note', type: 'Textarea' }],
				data: Store.post('/znadmin/model/select', { model: 'zn_admin_role', where: { pid: 0 } })
			};
		},
		componentDidMount: function componentDidMount() {
			this.__loadUserInfo();
		},
		__doSuccess: function __doSuccess() {
			Popup.close('dialog');
			Toast.success('修改成功');
			Store.post('/znadmin/user/findUserById', { userId: this.state.userId }).exec().then(function (data) {
				this.setState({
					info: data.result
				});
			}.bind(this));
		},
		__onEdit: function __onEdit(data) {
			Popup.dialog({
				title: '修改个人信息',
				hStyle: { backgroundColor: '#0B72A5' },
				width: 480,
				content: React.createElement(UI.Form, {
					method: 'POST',
					layout: 'stacked',
					action: '/znadmin/model/updateNode',
					exts: { model: 'zn_admin_user', where: { id: this.state.info.id } },
					merge: 'data',
					value: this.state.info,
					style: { margin: 25 },
					syncSubmit: false,
					onSubmitSuccess: this.__doSuccess,
					btns: [{ text: '修改', icon: 'fa-edit', type: 'submit', float: 'right', style: { marginRight: 0 } }, { text: '取消', type: 'cancle', status: 'danger', float: 'right' }],
					items: this.state.formItems })
			});
		},
		__loadUserInfo: function __loadUserInfo() {
			Store.post('/znadmin/user/findUserById', { userId: this.state.userId }).exec().then(function (data) {
				this.setState({
					info: data.result
				});
			}.bind(this));
		},
		__onTreeMenuItemCheckboxChange: function __onTreeMenuItemCheckboxChange(value) {
			Store.post('/znadmin/user/updateUser', { data: { roleIds: value }, userId: this.state.info.id }).exec().then(function (data) {
				Toast.success('保存成功');
			});
		},
		__itemContentRender: function __itemContentRender(props) {
			var _icon = '';
			if (props.data.type == 1) {
				_icon = 'fa-sitemap';
			}
			if (props.data.type == 2) {
				_icon = 'fa-graduation-cap';
			}

			return React.createElement(
				'span',
				null,
				React.createElement('i', { style: { margin: 5 }, className: 'fa ' + _icon }),
				props.data.id + '、' + props.data.title
			);
		},
		render: function render() {
			if (!this.state.info) {
				return null;
			}
			return React.createElement(
				UI.Page,
				{ title: this.state.info.name, icon: 'fa-newspaper-o', toolbarItems: this.state.toolbarItems },
				React.createElement(
					'div',
					{ className: 'user-info' },
					React.createElement(
						'div',
						{ className: 'info-form user-item' },
						React.createElement('img', { className: 'avatar', src: Store.fixURL(this.state.info.avatarImg) || './images/DefaultAvatar.png' }),
						React.createElement(
							'div',
							{ className: 'details' },
							React.createElement(
								'span',
								{ className: 'last-logintime' },
								'\u6700\u8FD1\u4E00\u6B21\u767B\u5F55\u65F6\u95F4\uFF1A',
								this.state.info.lastLoginTime || '还未登陆'
							),
							React.createElement(
								'div',
								{ className: 'name' },
								this.state.info.name
							),
							React.createElement(
								'div',
								null,
								React.createElement('i', { className: 'fa fa-clock-o' }),
								'\u521B\u5EFA\u65F6\u95F4\uFF1A',
								this.state.info.createTime
							),
							React.createElement(
								'div',
								null,
								React.createElement('i', { className: 'fa fa-envelope' }),
								'\u90AE\u7BB1\uFF1A',
								this.state.info.email
							),
							React.createElement(
								'div',
								null,
								React.createElement('i', { className: 'fa fa-phone' }),
								'\u624B\u673A\u53F7\uFF1A',
								this.state.info.phone
							),
							React.createElement(
								'div',
								null,
								this.state.info.note
							)
						)
					),
					React.createElement(
						'div',
						{ className: 'rt-panel c-default' },
						React.createElement(
							'div',
							{ className: 'p-head' },
							'\u90E8\u95E8\u53CA\u89D2\u8272'
						),
						React.createElement(
							'div',
							{ className: 'p-body' },
							React.createElement(UI.TreeListView, { disabled: true, cascade: false, enableCheckbox: true, onItemCheckboxChange: this.__onTreeMenuItemCheckboxChange, value: this.state.info.roleIds, itemContentRender: this.__itemContentRender, ref: 'maintreemenu', activeAll: true, data: this.state.data })
						)
					)
				)
			);
		}
	});

/***/ }),
/* 21 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 22 */,
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(2);
	var ProjectBug = __webpack_require__(24);

	module.exports = React.createClass({
		displayName: 'exports',

		getDefaultProps: function getDefaultProps() {
			return {
				model: 'zn_admin_project',
				title: '项目管理',
				leftWidth: 20,
				pid: 0,
				fields: [{ title: '模块名称', type: 'Input', name: 'title' }, { title: '版本号', type: 'Input', name: 'version' }, { title: '优先级', type: 'Select', name: 'priority', data: [{ text: '正常', value: 1 }, { text: '紧急', value: 2 }, { text: '非常紧急', value: 3 }] }, { title: '开始时间', name: 'beginTime', type: 'Timer' }, { title: '结束时间', name: 'endTime', type: 'Timer' }, { title: '文件', name: 'files', type: 'FileUploader', action: '/znadmin/uploadFiles' }, { title: '功能表述', type: 'RichEditor', name: 'description' }, { title: '备注', type: 'Textarea', name: 'note' }]
			};
		},
		__rightRender: function __rightRender(tree) {
			var _currItem = tree.state.currItem;
			return React.createElement(ProjectBug, { data: _currItem ? _currItem.props.data : null });
		},
		__itemContentRender: function __itemContentRender(item) {
			//console.log(item);
			return React.createElement(
				'div',
				{ style: { display: 'inline-flex', lineHeight: '25px' } },
				React.createElement(
					'span',
					{ className: 'title' },
					item.data.title
				),
				React.createElement(
					'span',
					{ className: 'version' },
					'(',
					item.data.version,
					')'
				)
			);
		},
		render: function render() {
			return React.createElement(PluginModel.TreeModelView, _extends({ itemContentRender: this.__itemContentRender }, this.props, { rightRender: this.__rightRender }));
		}
	});

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);
	module.exports = React.createClass({
		displayName: 'exports',

		getDefaultProps: function getDefaultProps() {
			return {
				data: null,
				model: 'zn_admin_project_bug'
			};
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			if (nextProps.data !== this.props.data) {
				this.state.data._data.where = {
					projectId: nextProps.data.id
				};
				this.state.data.exec();
			}
		},
		getInitialState: function getInitialState() {
			var _where = {};
			if (this.props.data) {
				_where.projectId = this.props.data.id;
			}
			return {
				data: Store.post('/znadmin/model/paging', {
					model: this.props.model,
					where: _where
				}),
				items: [{ title: '操作', width: 60, textAlign: 'center' }, { title: '问题', name: 'title', width: 220, filter: { type: 'Input', opts: ['like'] } }, { title: '状态', name: 'state', width: 80, filter: { type: 'Menu', data: [{ text: '待处理', value: 0 }, { text: '处理中...', value: 2 }, { text: '已经解决', value: 3 }, { text: '已经确认', value: 3 }], opts: ['='] } }, { title: '优先级', name: 'priority', width: 80, filter: { type: 'Menu', data: [{ text: '正常', value: 1 }, { text: '紧急', value: 2 }, { text: '非常紧急', value: 3 }], opts: ['='] } }, { title: '开始时间', name: 'beginTime', width: 140 }, { title: '结束时间', name: 'endTime', width: 140 }, { title: '完成时间', name: 'finishTime', width: 140 }, { title: '提交时间', name: 'createTime', width: 140 }, { title: '描述', name: 'note' }],
				formItems: [{ title: '问题', name: 'title', type: 'Textarea' }, { title: '版本号', type: 'Input', name: 'version' }, {
					title: '优先级',
					type: 'Select',
					name: 'priority',
					data: [{ text: '正常', value: 1 }, { text: '紧急', value: 2 }, { text: '非常紧急', value: 3 }]
				}, { title: '开始时间', name: 'beginTime', type: 'Timer' }, { title: '结束时间', name: 'endTime', type: 'Timer' }, { title: '附件', name: 'files', type: 'FileUploader', action: '/znadmin/uploadFiles' }, { title: '问题描述', name: 'description', type: 'RichEditor' }, { title: '解决方案', name: 'solution', type: 'RichEditor' }],
				toolbarItems: [{ text: '添加', icon: 'fa-plus' }]
			};
		},
		__onRowActions: function __onRowActions(rtitem, data) {
			var _data = this.state.data;
			var _self = this;
			switch (rtitem.props.icon) {
				case 'fa-remove':
					Alert.show({
						width: 280,
						title: '提示',
						content: '确定删除该数据吗？',
						onConfirm: function onConfirm() {
							Store.post('/znadmin/model/deleteNode', {
								model: _self.props.model,
								id: data.id
							}).exec().then(function (data) {
								Toast.success('删除成功！');
								_data.refresh();
							});
						}
					});
					break;
				case 'fa-edit':
					this.__updateItem(data);
					break;
			}
		},
		__onView: function __onView() {},
		__onTableColumnRender: function __onTableColumnRender(rowIndex, columnIndex, data, item, value) {
			var _this = this;

			switch (columnIndex) {
				case 0:
					return React.createElement(UI.ListView, {
						className: 'rt-flex',
						data: [{ text: '删除', icon: 'fa-remove' }, { text: '修改', icon: 'fa-edit' }],
						itemRender: function itemRender(item, index) {
							return React.createElement('i', { title: item.text, className: 'fa ' + item.icon, style: item.style });
						},
						onClick: function onClick(value, rtitem) {
							return _this.__onRowActions(rtitem, data);
						}
					});
				case 1:
					return React.createElement(
						'a',
						{ style: { textDecoration: 'underline' }, onClick: function onClick() {
								return _this.__onView(data);
							} },
						value
					);
				case 2:
					switch (+value) {
						case 0:
							return React.createElement(
								'span',
								null,
								'\u7B49\u5F85\u5904\u7406'
							);
						case 1:
							return React.createElement(
								'span',
								{ style: { color: 'yellow' } },
								'\u5904\u7406\u4E2D'
							);
						case 2:
							return React.createElement(
								'span',
								{ style: { color: 'red' } },
								'\u5DF2\u7ECF\u89E3\u51B3'
							);
						case 3:
							return React.createElement(
								'span',
								{ style: { color: 'red' } },
								'\u5DF2\u7ECF\u786E\u8BA4'
							);
					}
					return null;
				case 3:
					switch (+value) {
						case 1:
							return React.createElement(
								'span',
								null,
								'\u6B63\u5E38'
							);
						case 2:
							return React.createElement(
								'span',
								{ style: { color: '#F44336' } },
								'\u7D27\u6025'
							);
						case 3:
							return React.createElement(
								'span',
								{ style: { color: 'red' } },
								'\u975E\u5E38\u7D27\u6025'
							);
					}
					return null;
			}
		},
		__updateItem: function __updateItem(data) {
			Popup.dialog({
				title: '修改',
				hStyle: { backgroundColor: '#0B72A5' },
				width: 780,
				content: React.createElement(UI.Form, {
					method: 'POST',
					layout: 'stacked',
					action: '/znadmin/model/updateNode',
					exts: { model: this.props.model, where: { id: data.id } },
					merge: 'data',
					value: Store.post('/znadmin/model/selectOne', { model: this.props.model, where: { id: data.id } }),
					style: { margin: 25 },
					syncSubmit: false,
					onSubmitSuccess: this.__doSuccess,
					btns: [{ text: '修改', icon: 'fa-edit', type: 'submit', float: 'right', style: { marginRight: 0 } }, { text: '取消', type: 'cancle', status: 'danger', float: 'right' }],
					items: this.state.formItems })
			});
		},
		__doSuccess: function __doSuccess() {
			Popup.close('dialog');
			Toast.success('操作成功');
			this.state.data.refresh();
		},
		__addItem: function __addItem(pid) {
			if (!this.props.data) {
				Toast.warning('请先选择左边商品类型项');
				return false;
			}
			Popup.dialog({
				title: '添加',
				width: 780,
				content: React.createElement(UI.Form, {
					method: 'POST',
					layout: 'stacked',
					action: '/znadmin/model/addNode',
					exts: { model: this.props.model },
					hiddens: { projectId: this.props.data.id },
					merge: 'data',
					style: { margin: 25 },
					syncSubmit: false,
					onSubmitSuccess: this.__doSuccess,
					btns: [{ text: '添加', icon: 'fa-plus', type: 'submit', float: 'right', style: { marginRight: 0 } }, { text: '取消', type: 'cancle', status: 'danger', float: 'right' }],
					items: this.state.formItems })
			});
		},
		__onToolbarClick: function __onToolbarClick(rtitem) {
			switch (rtitem.icon) {
				case 'fa-plus':
					this.__addItem();
					break;
			}
		},
		render: function render() {
			return React.createElement(
				UI.Page,
				{ title: '\u95EE\u9898\u5217\u8868', icon: 'fa-list-ul',
					onToolbarClick: this.__onToolbarClick,
					toolbarItems: this.state.toolbarItems },
				React.createElement(UI.PagerView, {
					view: 'Table',
					checkbox: 0,
					enableFilter: true,
					showHeader: true,
					data: this.state.data,
					columnRender: this.__onTableColumnRender,
					onTableRowClick: this.__onTableRowClick,
					items: this.state.items })
			);
		}
	});

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var React = __webpack_require__(2);
	var UsersForRoles = __webpack_require__(26);
	module.exports = React.createClass({
		displayName: 'exports',

		getDefaultProps: function getDefaultProps() {
			return {
				model: 'zn_admin_role',
				pid: 0,
				title: '部门及角色管理',
				menuId: 0,
				fields: [{ title: '名称', type: 'Input', name: 'title' }, { title: '类型', type: 'Radio', name: 'type', value: 1,
					data: [{ text: '分类', value: 0 }, { text: '部门', value: 1 }, { text: '角色', value: 2 }]
				}, { title: '说明', type: 'Textarea', name: 'note' }]
			};
		},
		componentDidMount: function componentDidMount() {},
		__rightRender: function __rightRender(treeMenu) {
			return React.createElement(UsersForRoles, { roleId: treeMenu.state.currItem ? treeMenu.state.currItem.props.data.id : null });
		},
		__itemContentRender: function __itemContentRender(item) {
			var _data = item.data;
			switch (_data.type) {
				case 0:
					return React.createElement(
						'span',
						null,
						_data.id + '、' + _data.title
					);
				case 1:
					return React.createElement(
						'span',
						null,
						React.createElement('i', { title: '\u8FD9\u662F\u90E8\u95E8', className: 'fa fa-sitemap', style: { margin: 5, color: '#d9534f' } }),
						_data.id + '、' + _data.title
					);
				case 2:
					return React.createElement(
						'span',
						null,
						React.createElement('i', { title: '\u8FD9\u662F\u89D2\u8272', className: 'fa fa-graduation-cap', style: { margin: 5 } }),
						_data.id + '、' + _data.title
					);
			}
		},
		render: function render() {
			return React.createElement(PluginModel.TreeModelView, _extends({}, this.props, { rightRender: this.__rightRender, itemContentRender: this.__itemContentRender }));
		}
	});

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);
	module.exports = React.createClass({
		displayName: 'exports',

		getDefaultProps: function getDefaultProps() {
			return {};
		},
		getInitialState: function getInitialState() {
			return {
				data: Store.post('/znadmin/model/paging', {
					model: 'zn_admin_user'
				})
			};
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			if (nextProps.roleId != this.props.roleId) {
				this.state.data._data.where = {
					"0&<>": "locate('," + nextProps.roleId + ",',roleIds)"
				};
				this.state.data.exec();
			}
		},
		__onUserClick: function __onUserClick(event, item, index) {
			event.stopPropagation();
			Session.jump('/main/znadmin/UserInfo', { userId: item.id });
		},
		__itemRender: function __itemRender(item, index) {
			var _this = this;

			return React.createElement(
				'div',
				{ className: 'user-item' },
				React.createElement('img', { className: 'avatar', src: Store.fixURL(item.avatarImg || '') }),
				React.createElement(
					'div',
					{ className: 'details' },
					React.createElement(
						'span',
						{ className: 'last-logintime' },
						item.lastLoginTime || '还未登陆'
					),
					React.createElement(
						'div',
						{ className: 'name', onClick: function onClick(event) {
								return _this.__onUserClick(event, item, index);
							} },
						item.name
					),
					React.createElement(
						'div',
						null,
						React.createElement('i', { className: 'fa fa-clock-o' }),
						'\u521B\u5EFA\u65F6\u95F4\uFF1A',
						item.createTime
					),
					React.createElement(
						'div',
						null,
						React.createElement('i', { className: 'fa fa-envelope' }),
						'\u90AE\u7BB1\uFF1A',
						item.email
					),
					React.createElement(
						'div',
						null,
						React.createElement('i', { className: 'fa fa-phone' }),
						'\u624B\u673A\u53F7\uFF1A',
						item.phone
					)
				)
			);
		},
		render: function render() {
			return React.createElement(UI.PagerView, {
				view: 'ListView',
				className: 'rt-list-view-border',
				textKey: 'name',
				valueKey: 'id',
				selectMode: 'none',
				itemRender: this.__itemRender,
				data: this.state.data });
		}
	});

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);
	module.exports = React.createClass({
		displayName: 'exports',

		getDefaultProps: function getDefaultProps() {
			return {
				model: 'zn_admin_user'
			};
		},
		getInitialState: function getInitialState() {
			return {
				data: Store.post('/znadmin/model/paging', {
					model: this.props.model
				}),
				items: [{ title: '用户名', name: 'name', width: 80 }, { title: '邮箱', name: 'email', width: 200 }, { title: '手机号', name: 'phone', width: 120 }, { title: '地址', name: 'address', width: 200 }, { title: '说明', name: 'note' }],
				formItems: [{ title: '用户名', name: 'name', type: 'Input', required: true, error: '用户名必填项!' }, { title: '邮箱', name: 'email', type: 'Input' }, { title: '手机号', name: 'phone', type: 'Input' }, { title: '地址', name: 'address', type: 'Input' }, { title: '说明', name: 'note', type: 'Textarea' }],
				toolbarItems: [{ text: '添加', name: 'add', icon: 'fa-plus', style: { marginRight: 5 } }, { text: '删除', name: 'remove', status: 'danger', icon: 'fa-remove', style: { marginRight: 5 } }]
			};
		},
		__doSuccess: function __doSuccess() {
			Popup.close('dialog');
			Toast.success('操作成功！');
			this.state.data.refresh();
		},
		__addItem: function __addItem() {
			Popup.dialog({
				title: '新增用户',
				hStyle: { backgroundColor: '#0B72A5' },
				width: 480,
				content: React.createElement(UI.Form, {
					method: 'POST',
					layout: 'stacked',
					action: '/znadmin/model/addNode',
					merge: 'data',
					exts: { model: this.props.model },
					style: { margin: 25 },
					syncSubmit: false,
					onSubmitSuccess: this.__doSuccess,
					btns: [{ text: '新增用户', icon: 'fa-plus', type: 'submit', float: 'right', style: { marginRight: 0 } }, { text: '取消', type: 'cancle', status: 'danger', float: 'right' }],
					items: this.state.formItems })
			});
		},
		__updateItem: function __updateItem(data) {
			Popup.dialog({
				title: '更新用户信息',
				hStyle: { backgroundColor: '#0B72A5' },
				width: 480,
				content: React.createElement(UI.Form, {
					method: 'POST',
					layout: 'stacked',
					action: '/znadmin/model/updateNode',
					exts: { model: this.props.model, where: { id: data.id } },
					merge: 'data',
					data: data,
					style: { margin: 25 },
					syncSubmit: false,
					onSubmitSuccess: this.__doSuccess,
					btns: [{ text: '更新', icon: 'fa-edit', type: 'submit', float: 'right', style: { marginRight: 0 } }, { text: '取消', type: 'cancle', status: 'danger', float: 'right' }],
					items: this.state.formItems })
			});
		},
		__removeItems: function __removeItems() {
			var _self = this,
			    _values = this.refs.table.getValue();
			if (_values && _values.length) {
				Popup.confirm({
					content: '确认删除这' + _values.length + '个用户吗？',
					onConfirm: function () {
						Store.post('/znadmin/model/deleteNodes', { model: this.props.model, ids: _values }).exec().then(function () {
							Toast.success('删除成功');
							_self.state.data.refresh();
						}, function (data) {
							Toast.warning('删除失败: ' + data.result);
						});
					}.bind(this)
				});
			} else {
				Toast.warning('请先选择要删除的用户');
			}
		},
		__onToolbarClick: function __onToolbarClick(item) {
			switch (item.name) {
				case 'add':
					this.__addItem();
					break;
				case 'remove':
					this.__removeItems();
					break;
			}
		},
		__onEditItem: function __onEditItem(event, item) {
			event.stopPropagation();
			this.__updateItem(item);
		},
		__itemRender: function __itemRender(item, index) {
			var _this = this;

			return React.createElement(
				'div',
				{ className: 'user-item' },
				React.createElement('img', { className: 'avatar', src: './images/DefaultAvatar.png' }),
				React.createElement(
					'div',
					{ className: 'details' },
					React.createElement(
						'span',
						{ className: 'last-logintime' },
						item.lastLoginTime || '还未登陆'
					),
					React.createElement(
						'div',
						{ className: 'name', onClick: function onClick(event) {
								return _this.__onUserClick(event, item, index);
							} },
						item.name,
						React.createElement('i', { style: { margin: 5, color: '#971818' }, className: 'fa fa-edit', onClick: function onClick(event) {
								return _this.__onEditItem(event, item);
							} })
					),
					React.createElement(
						'div',
						null,
						React.createElement('i', { className: 'fa fa-clock-o' }),
						'\u521B\u5EFA\u65F6\u95F4\uFF1A',
						item.createTime
					),
					React.createElement(
						'div',
						null,
						React.createElement('i', { className: 'fa fa-envelope' }),
						'\u90AE\u7BB1\uFF1A',
						item.email
					),
					React.createElement(
						'div',
						null,
						React.createElement('i', { className: 'fa fa-phone' }),
						'\u624B\u673A\u53F7\uFF1A',
						item.phone
					)
				)
			);
		},
		__onTableColumnRender: function __onTableColumnRender(rowIndex, columnIndex, data, item, value) {
			switch (columnIndex) {
				case 1:
					return React.createElement(
						'a',
						{ href: '#/main/znadmin/UserInfo?userId=' + data.id },
						value
					);
			}
		},
		render: function render() {
			return React.createElement(
				UI.Page,
				{
					toolbarItems: this.state.toolbarItems,
					onToolbarClick: this.__onToolbarClick,
					title: '\u7CFB\u7EDF\u8D26\u6237\u7BA1\u7406' },
				React.createElement(UI.PagerView, {
					ref: 'table',
					view: 'Table',
					enableFilter: true,
					checkbox: 50,
					showHeader: true,
					columnRender: this.__onTableColumnRender,
					onTableRowClick: this.__onTableRowClick,
					data: this.state.data,
					items: this.state.items })
			);
		}
	});

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(21);
	var React = __webpack_require__(2);

	module.exports = React.createClass({
		displayName: 'exports',

		getInitialState: function getInitialState() {
			return {
				userId: this.props.userId,
				info: null,
				data: Store.post('/znadmin/model/select', { model: 'zn_admin_role', where: { pid: 0 } })
			};
		},
		componentDidMount: function componentDidMount() {
			this.__loadUserInfo();
		},
		__loadUserInfo: function __loadUserInfo() {
			Store.post('/znadmin/user/findUserById', { userId: this.state.userId }).exec().then(function (data) {
				this.setState({
					info: data.result
				});
			}.bind(this));
		},
		__onTreeMenuItemCheckboxChange: function __onTreeMenuItemCheckboxChange(value) {
			Store.post('/znadmin/user/updateUser', { data: { roleIds: value }, userId: this.state.info.id }).exec().then(function (data) {
				Popup.message({
					content: '保存成功!',
					type: 'success'
				});
			});
		},
		__itemContentRender: function __itemContentRender(props) {
			var _icon = '';
			if (props.data.type == 1) {
				_icon = 'fa-sitemap';
			}
			if (props.data.type == 2) {
				_icon = 'fa-graduation-cap';
			}
			return React.createElement(
				'span',
				null,
				React.createElement('i', { style: { margin: 5 }, className: 'fa ' + _icon }),
				props.data.id + '、' + props.data.title
			);
		},
		render: function render() {
			if (!this.state.info) {
				return null;
			}
			return React.createElement(
				UI.Page,
				{ title: this.state.info.name, icon: 'fa-newspaper-o', toolbarItems: this.state.toolbarItems },
				React.createElement(
					'div',
					{ className: 'user-info' },
					React.createElement(
						'div',
						{ className: 'info-form user-item' },
						React.createElement('img', { className: 'avatar', src: './images/DefaultAvatar.png' }),
						React.createElement(
							'div',
							{ className: 'details' },
							React.createElement(
								'span',
								{ className: 'last-logintime' },
								'\u6700\u8FD1\u4E00\u6B21\u767B\u5F55\u65F6\u95F4\uFF1A',
								this.state.info.lastLoginTime || '还未登陆'
							),
							React.createElement(
								'div',
								{ className: 'name' },
								this.state.info.name
							),
							React.createElement(
								'div',
								null,
								React.createElement('i', { className: 'fa fa-clock-o' }),
								'\u521B\u5EFA\u65F6\u95F4\uFF1A',
								this.state.info.createTime
							),
							React.createElement(
								'div',
								null,
								React.createElement('i', { className: 'fa fa-envelope' }),
								'\u90AE\u7BB1\uFF1A',
								this.state.info.email
							),
							React.createElement(
								'div',
								null,
								React.createElement('i', { className: 'fa fa-phone' }),
								'\u624B\u673A\u53F7\uFF1A',
								this.state.info.phone
							),
							React.createElement(
								'div',
								null,
								this.state.info.note
							)
						)
					),
					React.createElement(
						'div',
						{ className: 'rt-panel c-default' },
						React.createElement(
							'div',
							{ className: 'p-head' },
							'\u90E8\u95E8\u53CA\u89D2\u8272'
						),
						React.createElement(
							'div',
							{ className: 'p-body' },
							React.createElement(UI.TreeListView, { cascade: false, enableCheckbox: true, onItemCheckboxChange: this.__onTreeMenuItemCheckboxChange, value: this.state.info.roleIds, itemContentRender: this.__itemContentRender, ref: 'maintreemenu', activeAll: true, data: this.state.data })
						)
					)
				)
			);
		}
	});

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);
	module.exports = React.createClass({
		displayName: 'exports',

		getDefaultProps: function getDefaultProps() {
			return {
				model: 'zn_admin_user_log'
			};
		},
		getInitialState: function getInitialState() {
			return {
				data: Store.post('/znadmin/model/paging', {
					model: this.props.model
				}),
				items: [{ title: '操作人', name: 'userId_convert', width: 100 }, { title: '操作时间', name: 'createTime', width: 180 }, { title: '类型', name: 'actionType', width: 80 }, { title: '说明', name: 'note' }]
			};
		},
		__onToolbarClick: function __onToolbarClick() {},
		render: function render() {
			return React.createElement(
				UI.Page,
				{
					toolbarItems: [{ text: '导出' }],
					onToolbarClick: this.__onToolbarClick,
					title: '\u7CFB\u7EDF\u8D26\u6237\u767B\u5F55\u65E5\u5FD7' },
				React.createElement(UI.PagerView, {
					view: 'Table',
					enableFilter: false,
					checkbox: 0,
					showHeader: true,
					data: this.state.data,
					items: this.state.items })
			);
		}
	});

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = zn.deepEachObject({
	    'Menu': './Menu.js',
	    'MyInfo': './MyInfo.js',
	    'Role': './Role.js',
	    'User': './User.js',
	    'Var': './Var.js'
	}, function (value, key) {
	    return __webpack_require__(31)(value);
	});

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	var map = {
		"./Menu": 18,
		"./Menu.js": 18,
		"./MyInfo": 20,
		"./MyInfo.js": 20,
		"./Project": 23,
		"./Project.js": 23,
		"./ProjectBug": 24,
		"./ProjectBug.js": 24,
		"./Role": 25,
		"./Role.js": 25,
		"./User": 27,
		"./User.js": 27,
		"./UserInfo": 28,
		"./UserInfo.js": 28,
		"./UserInfo.less": 21,
		"./UserLog": 29,
		"./UserLog.js": 29,
		"./UsersForRoles": 26,
		"./UsersForRoles.js": 26,
		"./Var": 19,
		"./Var.js": 19,
		"./index": 30,
		"./index.js": 30
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 31;


/***/ })
/******/ ]);