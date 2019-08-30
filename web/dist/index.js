(function(e, a) { for(var i in a) e[i] = a[i]; }(this, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

(function() { module.exports = this["React"]; }());

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(14);

var React = __webpack_require__(0);

module.exports = React.createClass({
  displayName: "exports",
  getInitialState: function getInitialState() {
    return {
      user: null,
      logs: []
    };
  },
  componentDidMount: function componentDidMount() {
    if (this.props.openid) {
      this.__loadInfo();
    }
  },
  __loadInfo: function __loadInfo() {
    zn.http.post('/zn.plugin.wechat/zn.plugin.wechat.user/getInfoWithOpenid', {
      openid: this.props.openid
    }).then(function (data) {
      if (data.status == 200) {
        this.setState({
          user: data.result[0][0],
          logs: data.result[1]
        });
      } else {
        zn.notification.error(data.result);
      }
    }.bind(this), function (err) {
      zn.notification.error("网络请求失败");
    });
  },
  __renderUserInfo: function __renderUserInfo() {
    return React.createElement("div", {
      className: "wechat-user"
    }, React.createElement("div", {
      className: "base-info"
    }, React.createElement("img", {
      className: "avatar",
      src: this.state.user.headimgurl
    }), React.createElement("div", {
      className: "name"
    }, this.state.user.nickname, " (", this.state.user.sex == 1 ? '男' : '女', ")"), React.createElement("div", {
      className: "address"
    }, this.state.user.country, " / ", this.state.user.province, " / ", this.state.user.city)), React.createElement("div", {
      className: "count"
    }, "\u5171", React.createElement("span", {
      className: "value"
    }, this.state.logs.length), "\u6B21\u767B\u5F55"), React.createElement("ul", {
      className: "logs"
    }, this.state.logs.map(function (log) {
      return React.createElement("li", {
        className: "log"
      }, "\u5728", React.createElement("span", {
        className: "time"
      }, " " + log.zn_create_time + " "), "\u767B\u5F55");
    })));
  },
  render: function render() {
    return React.createElement("div", {
      className: "zn-plugin-wechat-user-info"
    }, this.state.user ? this.__renderUserInfo() : React.createElement(zn.react.DataLoader, {
      content: "\u52A0\u8F7D\u4E2D...",
      loader: "timer"
    }));
  }
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = __webpack_require__(0);

var PropTypes = __webpack_require__(17); // qr.js doesn't handle error level of zero (M) so we need to do it right,
// thus the deep require.


var QRCodeImpl = __webpack_require__(20);

var ErrorCorrectLevel = __webpack_require__(4); // Convert from UTF-16, forcing the use of byte-mode encoding in our QR Code.
// This allows us to encode Hanji, Kanji, emoji, etc. Ideally we'd do more
// detection and not resort to byte-mode if possible, but we're trading off
// a smaller library for a smaller amount of data we can potentially encode.
// Based on http://jonisalonen.com/2012/from-utf-16-to-utf-8-in-javascript/


function convertStr(str) {
  var out = '';

  for (var i = 0; i < str.length; i++) {
    var charcode = str.charCodeAt(i);

    if (charcode < 0x0080) {
      out += String.fromCharCode(charcode);
    } else if (charcode < 0x0800) {
      out += String.fromCharCode(0xc0 | charcode >> 6);
      out += String.fromCharCode(0x80 | charcode & 0x3f);
    } else if (charcode < 0xd800 || charcode >= 0xe000) {
      out += String.fromCharCode(0xe0 | charcode >> 12);
      out += String.fromCharCode(0x80 | charcode >> 6 & 0x3f);
      out += String.fromCharCode(0x80 | charcode & 0x3f);
    } else {
      // This is a surrogate pair, so we'll reconsitute the pieces and work
      // from that
      i++;
      charcode = 0x10000 + ((charcode & 0x3ff) << 10 | str.charCodeAt(i) & 0x3ff);
      out += String.fromCharCode(0xf0 | charcode >> 18);
      out += String.fromCharCode(0x80 | charcode >> 12 & 0x3f);
      out += String.fromCharCode(0x80 | charcode >> 6 & 0x3f);
      out += String.fromCharCode(0x80 | charcode & 0x3f);
    }
  }

  return out;
}

var DEFAULT_PROPS = {
  size: 128,
  level: 'L',
  bgColor: '#FFFFFF',
  fgColor: '#000000',
  includeMargin: false
};
var PROP_TYPES = {
  value: PropTypes.string.isRequired,
  size: PropTypes.number,
  level: PropTypes.oneOf(['L', 'M', 'Q', 'H']),
  bgColor: PropTypes.string,
  fgColor: PropTypes.string,
  includeMargin: PropTypes.bool
};
var MARGIN_SIZE = 4;

function generatePath(modules) {
  var margin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var ops = [];
  modules.forEach(function (row, y) {
    var start = null;
    row.forEach(function (cell, x) {
      if (!cell && start !== null) {
        // M0 0h7v1H0z injects the space with the move and drops the comma,
        // saving a char per operation
        ops.push("M".concat(start + margin, " ").concat(y + margin, "h").concat(x - start, "v1H").concat(start + margin, "z"));
        start = null;
        return;
      } // end of row, clean up or skip


      if (x === row.length - 1) {
        if (!cell) {
          // We would have closed the op above already so this can only mean
          // 2+ light modules in a row.
          return;
        }

        if (start === null) {
          // Just a single dark module.
          ops.push("M".concat(x + margin, ",").concat(y + margin, " h1v1H").concat(x + margin, "z"));
        } else {
          // Otherwise finish the current line.
          ops.push("M".concat(start + margin, ",").concat(y + margin, " h").concat(x + 1 - start, "v1H").concat(start + margin, "z"));
        }

        return;
      }

      if (cell && start === null) {
        start = x;
      }
    });
  });
  return ops.join('');
} // For canvas we're going to switch our drawing mode based on whether or not
// the environment supports Path2D. We only need the constructor to be
// supported, but Edge doesn't actually support the path (string) type
// argument. Luckily it also doesn't support the addPath() method. We can
// treat that as the same thing.


var SUPPORTS_PATH2D = function () {
  try {
    new Path2D().addPath(new Path2D());
  } catch (e) {
    return false;
  }

  return true;
}();

var QRCodeCanvas =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(QRCodeCanvas, _React$PureComponent);

  function QRCodeCanvas() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, QRCodeCanvas);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(QRCodeCanvas)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_canvas", void 0);

    return _this;
  }

  _createClass(QRCodeCanvas, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.update();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.update();
    }
  }, {
    key: "update",
    value: function update() {
      var _this$props = this.props,
          value = _this$props.value,
          size = _this$props.size,
          level = _this$props.level,
          bgColor = _this$props.bgColor,
          fgColor = _this$props.fgColor,
          includeMargin = _this$props.includeMargin; // We'll use type===-1 to force QRCode to automatically pick the best type

      var qrcode = new QRCodeImpl(-1, ErrorCorrectLevel[level]);
      qrcode.addData(convertStr(value));
      qrcode.make();

      if (this._canvas != null) {
        var canvas = this._canvas;
        var ctx = canvas.getContext('2d');

        if (!ctx) {
          return;
        }

        var cells = qrcode.modules;

        if (cells === null) {
          return;
        }

        var margin = includeMargin ? MARGIN_SIZE : 0;
        var numCells = cells.length + margin * 2; // We're going to scale this so that the number of drawable units
        // matches the number of cells. This avoids rounding issues, but does
        // result in some potentially unwanted single pixel issues between
        // blocks, only in environments that don't support Path2D.

        var pixelRatio = window.devicePixelRatio || 1;
        canvas.height = canvas.width = size * pixelRatio;
        var scale = size / numCells * pixelRatio;
        ctx.scale(scale, scale); // Draw solid background, only paint dark modules.

        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, numCells, numCells);
        ctx.fillStyle = fgColor;

        if (SUPPORTS_PATH2D) {
          // $FlowFixMe: Path2D c'tor doesn't support args yet.
          ctx.fill(new Path2D(generatePath(cells, margin)));
        } else {
          cells.forEach(function (row, rdx) {
            row.forEach(function (cell, cdx) {
              if (cell) {
                ctx.fillRect(cdx + margin, rdx + margin, 1, 1);
              }
            });
          });
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          value = _this$props2.value,
          size = _this$props2.size,
          level = _this$props2.level,
          bgColor = _this$props2.bgColor,
          fgColor = _this$props2.fgColor,
          style = _this$props2.style,
          includeMargin = _this$props2.includeMargin,
          otherProps = _objectWithoutProperties(_this$props2, ["value", "size", "level", "bgColor", "fgColor", "style", "includeMargin"]);

      var canvasStyle = _objectSpread({
        height: size,
        width: size
      }, style);

      return React.createElement("canvas", _extends({
        style: canvasStyle,
        height: size,
        width: size,
        ref: function ref(_ref) {
          return _this2._canvas = _ref;
        }
      }, otherProps));
    }
  }]);

  return QRCodeCanvas;
}(React.PureComponent);

_defineProperty(QRCodeCanvas, "defaultProps", DEFAULT_PROPS);

_defineProperty(QRCodeCanvas, "propTypes", PROP_TYPES);

var QRCodeSVG =
/*#__PURE__*/
function (_React$PureComponent2) {
  _inherits(QRCodeSVG, _React$PureComponent2);

  function QRCodeSVG() {
    _classCallCheck(this, QRCodeSVG);

    return _possibleConstructorReturn(this, _getPrototypeOf(QRCodeSVG).apply(this, arguments));
  }

  _createClass(QRCodeSVG, [{
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          value = _this$props3.value,
          size = _this$props3.size,
          level = _this$props3.level,
          bgColor = _this$props3.bgColor,
          fgColor = _this$props3.fgColor,
          includeMargin = _this$props3.includeMargin,
          otherProps = _objectWithoutProperties(_this$props3, ["value", "size", "level", "bgColor", "fgColor", "includeMargin"]); // We'll use type===-1 to force QRCode to automatically pick the best type


      var qrcode = new QRCodeImpl(-1, ErrorCorrectLevel[level]);
      qrcode.addData(convertStr(value));
      qrcode.make();
      var cells = qrcode.modules;

      if (cells === null) {
        return null;
      }

      var margin = includeMargin ? MARGIN_SIZE : 0; // Drawing strategy: instead of a rect per module, we're going to create a
      // single path for the dark modules and layer that on top of a light rect,
      // for a total of 2 DOM nodes. We pay a bit more in string concat but that's
      // way faster than DOM ops.
      // For level 1, 441 nodes -> 2
      // For level 40, 31329 -> 2

      var fgPath = generatePath(cells, margin);
      var numCells = cells.length + margin * 2;
      return React.createElement("svg", _extends({
        shapeRendering: "crispEdges",
        height: size,
        width: size,
        viewBox: "0 0 ".concat(numCells, " ").concat(numCells)
      }, otherProps), React.createElement("path", {
        fill: bgColor,
        d: "M0,0 h".concat(numCells, "v").concat(numCells, "H0z")
      }), React.createElement("path", {
        fill: fgColor,
        d: fgPath
      }));
    }
  }]);

  return QRCodeSVG;
}(React.PureComponent);

_defineProperty(QRCodeSVG, "defaultProps", DEFAULT_PROPS);

_defineProperty(QRCodeSVG, "propTypes", PROP_TYPES);

var QRCode = function QRCode(props) {
  var renderAs = props.renderAs,
      otherProps = _objectWithoutProperties(props, ["renderAs"]);

  var Component = renderAs === 'svg' ? QRCodeSVG : QRCodeCanvas;
  return React.createElement(Component, otherProps);
};

QRCode.defaultProps = _objectSpread({
  renderAs: 'canvas'
}, DEFAULT_PROPS);
module.exports = QRCode;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = {
	MODE_NUMBER :		1 << 0,
	MODE_ALPHA_NUM : 	1 << 1,
	MODE_8BIT_BYTE : 	1 << 2,
	MODE_KANJI :		1 << 3
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = {
	L : 1,
	M : 0,
	Q : 3,
	H : 2
};



/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var math = __webpack_require__(6);

function QRPolynomial(num, shift) {

	if (num.length == undefined) {
		throw new Error(num.length + "/" + shift);
	}

	var offset = 0;

	while (offset < num.length && num[offset] == 0) {
		offset++;
	}

	this.num = new Array(num.length - offset + shift);
	for (var i = 0; i < num.length - offset; i++) {
		this.num[i] = num[i + offset];
	}
}

QRPolynomial.prototype = {

	get : function(index) {
		return this.num[index];
	},
	
	getLength : function() {
		return this.num.length;
	},
	
	multiply : function(e) {
	
		var num = new Array(this.getLength() + e.getLength() - 1);
	
		for (var i = 0; i < this.getLength(); i++) {
			for (var j = 0; j < e.getLength(); j++) {
				num[i + j] ^= math.gexp(math.glog(this.get(i) ) + math.glog(e.get(j) ) );
			}
		}
	
		return new QRPolynomial(num, 0);
	},
	
	mod : function(e) {
	
		if (this.getLength() - e.getLength() < 0) {
			return this;
		}
	
		var ratio = math.glog(this.get(0) ) - math.glog(e.get(0) );
	
		var num = new Array(this.getLength() );
		
		for (var i = 0; i < this.getLength(); i++) {
			num[i] = this.get(i);
		}
		
		for (var i = 0; i < e.getLength(); i++) {
			num[i] ^= math.gexp(math.glog(e.get(i) ) + ratio);
		}
	
		// recursive call
		return new QRPolynomial(num, 0).mod(e);
	}
};

module.exports = QRPolynomial;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

var QRMath = {

	glog : function(n) {
	
		if (n < 1) {
			throw new Error("glog(" + n + ")");
		}
		
		return QRMath.LOG_TABLE[n];
	},
	
	gexp : function(n) {
	
		while (n < 0) {
			n += 255;
		}
	
		while (n >= 256) {
			n -= 255;
		}
	
		return QRMath.EXP_TABLE[n];
	},
	
	EXP_TABLE : new Array(256),
	
	LOG_TABLE : new Array(256)

};
	
for (var i = 0; i < 8; i++) {
	QRMath.EXP_TABLE[i] = 1 << i;
}
for (var i = 8; i < 256; i++) {
	QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4]
		^ QRMath.EXP_TABLE[i - 5]
		^ QRMath.EXP_TABLE[i - 6]
		^ QRMath.EXP_TABLE[i - 8];
}
for (var i = 0; i < 255; i++) {
	QRMath.LOG_TABLE[QRMath.EXP_TABLE[i] ] = i;
}

module.exports = QRMath;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = zn.arrayValueToObject(['Base', 'Config'], function (value, index) {
  return __webpack_require__(26)("./" + value + ".js");
});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = zn.arrayValueToObject(['Bind', 'Info', 'List', 'LoginLog'], function (value, index) {
  return __webpack_require__(29)("./" + value + ".js");
});

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

zn.plugin.wechat = __webpack_require__(10);
module.exports = zn.react.extendPath('/znpluginwechat.', __webpack_require__(25));

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var _exports = {},
    _export = null,
    _path = null;
var _data = {
  user: __webpack_require__(11),
  Login: __webpack_require__(12),
  UserInfo: __webpack_require__(1),
  ZNPluginAdminUserWechatInfo: __webpack_require__(15)
};
Object.keys(_data).map(function (path) {
  _exports[path.toLowerCase()] = _data[path];
});

_exports.getToken = function () {
  return zn.react.session.jsonKeyValue("ZN_PLUGIN_WECHAT_USER_LOGIN_TOKEN");
};

module.exports = _exports;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = zn.Class({
  "static": true,
  methods: {
    getAuthorizeURL: function getAuthorizeURL(data, success, error) {
      return zn.http.post('/zn.plugin.wechat/wx/getAuthorizeURL', zn.extend({
        redirect_url: encodeURIComponent(window.location.origin + window.location.pathname)
      }, data)).then(success, error), this;
    },
    loginByCode: function loginByCode(code, success, error) {
      return zn.http.post('/zn.plugin.wechat/user/loginByCode', {
        code: code
      }).then(success, error), this;
    },
    initJSSDKConfig: function initJSSDKConfig(share, config) {
      zn.http.post('/zn.plugin.wechat/wx/getJSSDKConfig', {
        url: encodeURIComponent(window.location.origin + window.location.pathname)
      }).then(function (data) {
        if (data.status == 200) {
          var _share = zn.extend({
            title: '',
            // 分享标题
            desc: '',
            // 分享内容描述
            link: '',
            // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: '',
            // 分享图标
            success: function success() {}
          }, share),
              _config = zn.extend(data.result, {
            debug: false,
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'openLocation', 'getLocation']
          }, config);

          wx.config(_config);
          wx.ready(function () {
            wx.onMenuShareTimeline(_share);
            wx.onMenuShareAppMessage(_share);
            wx.onMenuShareQQ(_share);
            wx.onMenuShareWeibo(_share);
            wx.onMenuShareQZone(_share);
          });
        } else {
          zn.notification.error(data.result);
        }

        return this;
      });
    }
  }
});

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(13);

var React = __webpack_require__(0);

var TOKEN_KEY = "ZN_PLUGIN_WECHAT_USER_LOGIN_TOKEN";
var HASH_KEY = "ZN_PLUGIN_WECHAT_USER_LOGIN_HASH";
module.exports = React.createClass({
  displayName: "exports",
  getInitialState: function getInitialState() {
    return {
      loading: false,
      debug: this.props.debug || 0,
      state: 1,
      code: null,
      token: zn.react.session.jsonKeyValue(TOKEN_KEY)
    };
  },
  componentDidMount: function componentDidMount() {
    this.__validate();
  },
  __validate: function __validate() {
    if (!this.state.token) {
      this.__parseHash();

      if (this.state.code) {
        this.__loginWithWeChatCode();
      } else {
        this.__reLogin();
      }
    } else {
      this.__doAuth(this.state.token);
    }
  },
  __parseHash: function __parseHash() {
    if (window.location.hash) {
      zn.react.session.setKeyValue(HASH_KEY, window.location.hash);
    }

    var _searchs = window.location.href.split('?'),
        _temp = [],
        _self = this,
        _value;

    _searchs.shift();

    _searchs.forEach(function (search) {
      if (search.indexOf('#/') != -1) {
        search = search.split('#/')[0];
      }

      search.split('&').forEach(function (value) {
        _temp = value.split('=');
        _value = _temp[1];

        if (_temp[0] == 'code') {
          _self.state.debug = 0;
        }

        _self.state[_temp[0]] = _value;
      });
    });
  },
  __loginWithWeChatCode: function __loginWithWeChatCode() {
    this.setState({
      loading: true
    });
    zn.plugin.wechat.user.loginByCode(this.state.code, function (data) {
      if (data.status == 200) {
        this.__doAuth(data.result);
      } else {
        this.__reLogin();
      }
    }.bind(this), function () {
      this.__reLogin();
    }.bind(this));
  },
  __doAuth: function __doAuth(token) {
    var _hash = zn.react.session.getKeyValue(HASH_KEY);

    zn.react.session.setKeyValue(TOKEN_KEY, token);

    this.__initWXJSSDKConfig();

    this.setState({
      token: token
    });

    if (_hash) {
      window.location.hash = _hash;
      zn.react.session.removeKeyValue(HASH_KEY);
    }

    this.props.onAuthSuccess && this.props.onAuthSuccess(token, _hash);
  },
  __reLogin: function __reLogin() {
    if (this.state.debug) {
      return false;
    }

    zn.plugin.wechat.user.getAuthorizeURL({
      redirect_state: this.state.state
    }, function (data) {
      if (data.result) {
        window.location.href = data.result;
      } else {
        zn.notification.error('后台服务不可用');
      }
    }, function () {
      zn.notification.error('后台服务不可用');
    });
  },
  __initWXJSSDKConfig: function __initWXJSSDKConfig() {
    zn.plugin.wechat.user.initJSSDKConfig();
  },
  render: function render() {
    if (!this.state.token) {
      return React.createElement(zn.react.DataLoader, {
        loader: "timer",
        content: "\u8BA4\u8BC1\u4E2D..."
      });
    }

    if (this.state.loading) {
      return React.createElement(zn.react.DataLoader, {
        loader: "timer",
        content: "\u767B\u9646\u4E2D..."
      });
    } else {
      return React.createElement("div", {
        className: "zn-plugin-wechat-login"
      }, "\u8BA4\u8BC1\u6210\u529F");
    }
  }
});

/***/ }),
/* 13 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 14 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(16);

var React = __webpack_require__(0);

var UserInfo = __webpack_require__(1);

var QRCode = __webpack_require__(2);

module.exports = React.createClass({
  displayName: "exports",
  getInitialState: function getInitialState() {
    return {
      isReset: false
    };
  },
  __renderQRCode: function __renderQRCode() {
    var _this = this;

    console.log(window.location.origin + window.location.pathname.replace('admin.html', 'index.html') + "#/znpluginwechat.user.bind?token=" + zn.plugin.admin.getToken().id);
    return React.createElement("div", {
      className: "qr-code"
    }, React.createElement("div", {
      className: "title"
    }, "\u5FAE\u4FE1\u626B\u4E00\u626B"), React.createElement(QRCode, {
      value: window.location.origin + window.location.pathname.replace('admin.html', 'index.html') + "#/znpluginwechat.user.bind?token=" + zn.plugin.admin.getToken().id
    }), React.createElement("div", {
      className: "tip"
    }, "\u7ED1\u5B9A\u5FAE\u4FE1\u53F7"), this.props.openid && React.createElement(zn.react.Button, {
      style: {
        width: 140
      },
      onClick: function onClick() {
        return _this.setState({
          isReset: false
        });
      },
      text: "\u53D6\u6D88",
      status: "danger"
    }));
  },
  render: function render() {
    var _this2 = this;

    return React.createElement("div", {
      className: "zn-plugin-wechat-zn-plugin-admin-wechat-user-info"
    }, this.props.openid && !this.state.isReset ? React.createElement("div", {
      className: "user"
    }, React.createElement(UserInfo, {
      openid: this.props.openid
    }), React.createElement(zn.react.Button, {
      style: {
        margin: 20
      },
      onClick: function onClick() {
        return _this2.setState({
          isReset: true
        });
      },
      text: "\u91CD\u65B0\u7ED1\u5B9A"
    })) : this.__renderQRCode());
  }
});

/***/ }),
/* 16 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) { var throwOnDirectAccess, ReactIs; } else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(18)();
}


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = __webpack_require__(19);

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var BitByte = __webpack_require__(21);
var RSBlock = __webpack_require__(22);
var BitBuffer = __webpack_require__(23);
var util = __webpack_require__(24);
var Polynomial = __webpack_require__(5);

function QRCode(typeNumber, errorCorrectLevel) {
	this.typeNumber = typeNumber;
	this.errorCorrectLevel = errorCorrectLevel;
	this.modules = null;
	this.moduleCount = 0;
	this.dataCache = null;
	this.dataList = [];
}

// for client side minification
var proto = QRCode.prototype;

proto.addData = function(data) {
	var newData = new BitByte(data);
	this.dataList.push(newData);
	this.dataCache = null;
};

proto.isDark = function(row, col) {
	if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
		throw new Error(row + "," + col);
	}
	return this.modules[row][col];
};

proto.getModuleCount = function() {
	return this.moduleCount;
};

proto.make = function() {
	// Calculate automatically typeNumber if provided is < 1
	if (this.typeNumber < 1 ){
		var typeNumber = 1;
		for (typeNumber = 1; typeNumber < 40; typeNumber++) {
			var rsBlocks = RSBlock.getRSBlocks(typeNumber, this.errorCorrectLevel);

			var buffer = new BitBuffer();
			var totalDataCount = 0;
			for (var i = 0; i < rsBlocks.length; i++) {
				totalDataCount += rsBlocks[i].dataCount;
			}

			for (var i = 0; i < this.dataList.length; i++) {
				var data = this.dataList[i];
				buffer.put(data.mode, 4);
				buffer.put(data.getLength(), util.getLengthInBits(data.mode, typeNumber) );
				data.write(buffer);
			}
			if (buffer.getLengthInBits() <= totalDataCount * 8)
				break;
		}
		this.typeNumber = typeNumber;
	}
	this.makeImpl(false, this.getBestMaskPattern() );
};

proto.makeImpl = function(test, maskPattern) {
	
	this.moduleCount = this.typeNumber * 4 + 17;
	this.modules = new Array(this.moduleCount);
	
	for (var row = 0; row < this.moduleCount; row++) {
		
		this.modules[row] = new Array(this.moduleCount);
		
		for (var col = 0; col < this.moduleCount; col++) {
			this.modules[row][col] = null;//(col + row) % 3;
		}
	}

	this.setupPositionProbePattern(0, 0);
	this.setupPositionProbePattern(this.moduleCount - 7, 0);
	this.setupPositionProbePattern(0, this.moduleCount - 7);
	this.setupPositionAdjustPattern();
	this.setupTimingPattern();
	this.setupTypeInfo(test, maskPattern);
	
	if (this.typeNumber >= 7) {
		this.setupTypeNumber(test);
	}

	if (this.dataCache == null) {
		this.dataCache = QRCode.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);
	}

	this.mapData(this.dataCache, maskPattern);
};

proto.setupPositionProbePattern = function(row, col)  {
	
	for (var r = -1; r <= 7; r++) {
		
		if (row + r <= -1 || this.moduleCount <= row + r) continue;
		
		for (var c = -1; c <= 7; c++) {
			
			if (col + c <= -1 || this.moduleCount <= col + c) continue;
			
			if ( (0 <= r && r <= 6 && (c == 0 || c == 6) )
					|| (0 <= c && c <= 6 && (r == 0 || r == 6) )
					|| (2 <= r && r <= 4 && 2 <= c && c <= 4) ) {
				this.modules[row + r][col + c] = true;
			} else {
				this.modules[row + r][col + c] = false;
			}
		}		
	}		
};

proto.getBestMaskPattern = function() {

	var minLostPoint = 0;
	var pattern = 0;

	for (var i = 0; i < 8; i++) {
		
		this.makeImpl(true, i);

		var lostPoint = util.getLostPoint(this);

		if (i == 0 || minLostPoint >  lostPoint) {
			minLostPoint = lostPoint;
			pattern = i;
		}
	}

	return pattern;
};

proto.createMovieClip = function(target_mc, instance_name, depth) {

	var qr_mc = target_mc.createEmptyMovieClip(instance_name, depth);
	var cs = 1;

	this.make();

	for (var row = 0; row < this.modules.length; row++) {
		
		var y = row * cs;
		
		for (var col = 0; col < this.modules[row].length; col++) {

			var x = col * cs;
			var dark = this.modules[row][col];
		
			if (dark) {
				qr_mc.beginFill(0, 100);
				qr_mc.moveTo(x, y);
				qr_mc.lineTo(x + cs, y);
				qr_mc.lineTo(x + cs, y + cs);
				qr_mc.lineTo(x, y + cs);
				qr_mc.endFill();
			}
		}
	}
	
	return qr_mc;
};

proto.setupTimingPattern = function() {
	
	for (var r = 8; r < this.moduleCount - 8; r++) {
		if (this.modules[r][6] != null) {
			continue;
		}
		this.modules[r][6] = (r % 2 == 0);
	}

	for (var c = 8; c < this.moduleCount - 8; c++) {
		if (this.modules[6][c] != null) {
			continue;
		}
		this.modules[6][c] = (c % 2 == 0);
	}
};

proto.setupPositionAdjustPattern = function() {

	var pos = util.getPatternPosition(this.typeNumber);
	
	for (var i = 0; i < pos.length; i++) {
	
		for (var j = 0; j < pos.length; j++) {
		
			var row = pos[i];
			var col = pos[j];
			
			if (this.modules[row][col] != null) {
				continue;
			}
			
			for (var r = -2; r <= 2; r++) {
			
				for (var c = -2; c <= 2; c++) {
				
					if (r == -2 || r == 2 || c == -2 || c == 2
							|| (r == 0 && c == 0) ) {
						this.modules[row + r][col + c] = true;
					} else {
						this.modules[row + r][col + c] = false;
					}
				}
			}
		}
	}
};

proto.setupTypeNumber = function(test) {

	var bits = util.getBCHTypeNumber(this.typeNumber);

	for (var i = 0; i < 18; i++) {
		var mod = (!test && ( (bits >> i) & 1) == 1);
		this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
	}

	for (var i = 0; i < 18; i++) {
		var mod = (!test && ( (bits >> i) & 1) == 1);
		this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
	}
};

proto.setupTypeInfo = function(test, maskPattern) {

	var data = (this.errorCorrectLevel << 3) | maskPattern;
	var bits = util.getBCHTypeInfo(data);

	// vertical		
	for (var i = 0; i < 15; i++) {

		var mod = (!test && ( (bits >> i) & 1) == 1);

		if (i < 6) {
			this.modules[i][8] = mod;
		} else if (i < 8) {
			this.modules[i + 1][8] = mod;
		} else {
			this.modules[this.moduleCount - 15 + i][8] = mod;
		}
	}

	// horizontal
	for (var i = 0; i < 15; i++) {

		var mod = (!test && ( (bits >> i) & 1) == 1);
		
		if (i < 8) {
			this.modules[8][this.moduleCount - i - 1] = mod;
		} else if (i < 9) {
			this.modules[8][15 - i - 1 + 1] = mod;
		} else {
			this.modules[8][15 - i - 1] = mod;
		}
	}

	// fixed module
	this.modules[this.moduleCount - 8][8] = (!test);
};

proto.mapData = function(data, maskPattern) {
	
	var inc = -1;
	var row = this.moduleCount - 1;
	var bitIndex = 7;
	var byteIndex = 0;
	
	for (var col = this.moduleCount - 1; col > 0; col -= 2) {

		if (col == 6) col--;

		while (true) {

			for (var c = 0; c < 2; c++) {
				
				if (this.modules[row][col - c] == null) {
					
					var dark = false;

					if (byteIndex < data.length) {
						dark = ( ( (data[byteIndex] >>> bitIndex) & 1) == 1);
					}

					var mask = util.getMask(maskPattern, row, col - c);

					if (mask) {
						dark = !dark;
					}
					
					this.modules[row][col - c] = dark;
					bitIndex--;

					if (bitIndex == -1) {
						byteIndex++;
						bitIndex = 7;
					}
				}
			}
							
			row += inc;

			if (row < 0 || this.moduleCount <= row) {
				row -= inc;
				inc = -inc;
				break;
			}
		}
	}
};

QRCode.PAD0 = 0xEC;
QRCode.PAD1 = 0x11;

QRCode.createData = function(typeNumber, errorCorrectLevel, dataList) {
	
	var rsBlocks = RSBlock.getRSBlocks(typeNumber, errorCorrectLevel);
	
	var buffer = new BitBuffer();
	
	for (var i = 0; i < dataList.length; i++) {
		var data = dataList[i];
		buffer.put(data.mode, 4);
		buffer.put(data.getLength(), util.getLengthInBits(data.mode, typeNumber) );
		data.write(buffer);
	}

	// calc num max data.
	var totalDataCount = 0;
	for (var i = 0; i < rsBlocks.length; i++) {
		totalDataCount += rsBlocks[i].dataCount;
	}

	if (buffer.getLengthInBits() > totalDataCount * 8) {
		throw new Error("code length overflow. ("
			+ buffer.getLengthInBits()
			+ ">"
			+  totalDataCount * 8
			+ ")");
	}

	// end code
	if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
		buffer.put(0, 4);
	}

	// padding
	while (buffer.getLengthInBits() % 8 != 0) {
		buffer.putBit(false);
	}

	// padding
	while (true) {
		
		if (buffer.getLengthInBits() >= totalDataCount * 8) {
			break;
		}
		buffer.put(QRCode.PAD0, 8);
		
		if (buffer.getLengthInBits() >= totalDataCount * 8) {
			break;
		}
		buffer.put(QRCode.PAD1, 8);
	}

	return QRCode.createBytes(buffer, rsBlocks);
};

QRCode.createBytes = function(buffer, rsBlocks) {

	var offset = 0;
	
	var maxDcCount = 0;
	var maxEcCount = 0;
	
	var dcdata = new Array(rsBlocks.length);
	var ecdata = new Array(rsBlocks.length);
	
	for (var r = 0; r < rsBlocks.length; r++) {

		var dcCount = rsBlocks[r].dataCount;
		var ecCount = rsBlocks[r].totalCount - dcCount;

		maxDcCount = Math.max(maxDcCount, dcCount);
		maxEcCount = Math.max(maxEcCount, ecCount);
		
		dcdata[r] = new Array(dcCount);
		
		for (var i = 0; i < dcdata[r].length; i++) {
			dcdata[r][i] = 0xff & buffer.buffer[i + offset];
		}
		offset += dcCount;
		
		var rsPoly = util.getErrorCorrectPolynomial(ecCount);
		var rawPoly = new Polynomial(dcdata[r], rsPoly.getLength() - 1);

		var modPoly = rawPoly.mod(rsPoly);
		ecdata[r] = new Array(rsPoly.getLength() - 1);
		for (var i = 0; i < ecdata[r].length; i++) {
            var modIndex = i + modPoly.getLength() - ecdata[r].length;
			ecdata[r][i] = (modIndex >= 0)? modPoly.get(modIndex) : 0;
		}

	}
	
	var totalCodeCount = 0;
	for (var i = 0; i < rsBlocks.length; i++) {
		totalCodeCount += rsBlocks[i].totalCount;
	}

	var data = new Array(totalCodeCount);
	var index = 0;

	for (var i = 0; i < maxDcCount; i++) {
		for (var r = 0; r < rsBlocks.length; r++) {
			if (i < dcdata[r].length) {
				data[index++] = dcdata[r][i];
			}
		}
	}

	for (var i = 0; i < maxEcCount; i++) {
		for (var r = 0; r < rsBlocks.length; r++) {
			if (i < ecdata[r].length) {
				data[index++] = ecdata[r][i];
			}
		}
	}

	return data;
};

module.exports = QRCode;



/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var mode = __webpack_require__(3);

function QR8bitByte(data) {
	this.mode = mode.MODE_8BIT_BYTE;
	this.data = data;
}

QR8bitByte.prototype = {

	getLength : function(buffer) {
		return this.data.length;
	},
	
	write : function(buffer) {
		for (var i = 0; i < this.data.length; i++) {
			// not JIS ...
			buffer.put(this.data.charCodeAt(i), 8);
		}
	}
};

module.exports = QR8bitByte;



/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// ErrorCorrectLevel
var ECL = __webpack_require__(4);

function QRRSBlock(totalCount, dataCount) {
	this.totalCount = totalCount;
	this.dataCount  = dataCount;
}

QRRSBlock.RS_BLOCK_TABLE = [

	// L
	// M
	// Q
	// H

	// 1
	[1, 26, 19],
	[1, 26, 16],
	[1, 26, 13],
	[1, 26, 9],
	
	// 2
	[1, 44, 34],
	[1, 44, 28],
	[1, 44, 22],
	[1, 44, 16],

	// 3
	[1, 70, 55],
	[1, 70, 44],
	[2, 35, 17],
	[2, 35, 13],

	// 4		
	[1, 100, 80],
	[2, 50, 32],
	[2, 50, 24],
	[4, 25, 9],
	
	// 5
	[1, 134, 108],
	[2, 67, 43],
	[2, 33, 15, 2, 34, 16],
	[2, 33, 11, 2, 34, 12],
	
	// 6
	[2, 86, 68],
	[4, 43, 27],
	[4, 43, 19],
	[4, 43, 15],
	
	// 7		
	[2, 98, 78],
	[4, 49, 31],
	[2, 32, 14, 4, 33, 15],
	[4, 39, 13, 1, 40, 14],
	
	// 8
	[2, 121, 97],
	[2, 60, 38, 2, 61, 39],
	[4, 40, 18, 2, 41, 19],
	[4, 40, 14, 2, 41, 15],
	
	// 9
	[2, 146, 116],
	[3, 58, 36, 2, 59, 37],
	[4, 36, 16, 4, 37, 17],
	[4, 36, 12, 4, 37, 13],
	
	// 10		
	[2, 86, 68, 2, 87, 69],
	[4, 69, 43, 1, 70, 44],
	[6, 43, 19, 2, 44, 20],
	[6, 43, 15, 2, 44, 16],

	// 11
	[4, 101, 81],
	[1, 80, 50, 4, 81, 51],
	[4, 50, 22, 4, 51, 23],
	[3, 36, 12, 8, 37, 13],

	// 12
	[2, 116, 92, 2, 117, 93],
	[6, 58, 36, 2, 59, 37],
	[4, 46, 20, 6, 47, 21],
	[7, 42, 14, 4, 43, 15],

	// 13
	[4, 133, 107],
	[8, 59, 37, 1, 60, 38],
	[8, 44, 20, 4, 45, 21],
	[12, 33, 11, 4, 34, 12],

	// 14
	[3, 145, 115, 1, 146, 116],
	[4, 64, 40, 5, 65, 41],
	[11, 36, 16, 5, 37, 17],
	[11, 36, 12, 5, 37, 13],

	// 15
	[5, 109, 87, 1, 110, 88],
	[5, 65, 41, 5, 66, 42],
	[5, 54, 24, 7, 55, 25],
	[11, 36, 12],

	// 16
	[5, 122, 98, 1, 123, 99],
	[7, 73, 45, 3, 74, 46],
	[15, 43, 19, 2, 44, 20],
	[3, 45, 15, 13, 46, 16],

	// 17
	[1, 135, 107, 5, 136, 108],
	[10, 74, 46, 1, 75, 47],
	[1, 50, 22, 15, 51, 23],
	[2, 42, 14, 17, 43, 15],

	// 18
	[5, 150, 120, 1, 151, 121],
	[9, 69, 43, 4, 70, 44],
	[17, 50, 22, 1, 51, 23],
	[2, 42, 14, 19, 43, 15],

	// 19
	[3, 141, 113, 4, 142, 114],
	[3, 70, 44, 11, 71, 45],
	[17, 47, 21, 4, 48, 22],
	[9, 39, 13, 16, 40, 14],

	// 20
	[3, 135, 107, 5, 136, 108],
	[3, 67, 41, 13, 68, 42],
	[15, 54, 24, 5, 55, 25],
	[15, 43, 15, 10, 44, 16],

	// 21
	[4, 144, 116, 4, 145, 117],
	[17, 68, 42],
	[17, 50, 22, 6, 51, 23],
	[19, 46, 16, 6, 47, 17],

	// 22
	[2, 139, 111, 7, 140, 112],
	[17, 74, 46],
	[7, 54, 24, 16, 55, 25],
	[34, 37, 13],

	// 23
	[4, 151, 121, 5, 152, 122],
	[4, 75, 47, 14, 76, 48],
	[11, 54, 24, 14, 55, 25],
	[16, 45, 15, 14, 46, 16],

	// 24
	[6, 147, 117, 4, 148, 118],
	[6, 73, 45, 14, 74, 46],
	[11, 54, 24, 16, 55, 25],
	[30, 46, 16, 2, 47, 17],

	// 25
	[8, 132, 106, 4, 133, 107],
	[8, 75, 47, 13, 76, 48],
	[7, 54, 24, 22, 55, 25],
	[22, 45, 15, 13, 46, 16],

	// 26
	[10, 142, 114, 2, 143, 115],
	[19, 74, 46, 4, 75, 47],
	[28, 50, 22, 6, 51, 23],
	[33, 46, 16, 4, 47, 17],

	// 27
	[8, 152, 122, 4, 153, 123],
	[22, 73, 45, 3, 74, 46],
	[8, 53, 23, 26, 54, 24],
	[12, 45, 15, 28, 46, 16],

	// 28
	[3, 147, 117, 10, 148, 118],
	[3, 73, 45, 23, 74, 46],
	[4, 54, 24, 31, 55, 25],
	[11, 45, 15, 31, 46, 16],

	// 29
	[7, 146, 116, 7, 147, 117],
	[21, 73, 45, 7, 74, 46],
	[1, 53, 23, 37, 54, 24],
	[19, 45, 15, 26, 46, 16],

	// 30
	[5, 145, 115, 10, 146, 116],
	[19, 75, 47, 10, 76, 48],
	[15, 54, 24, 25, 55, 25],
	[23, 45, 15, 25, 46, 16],

	// 31
	[13, 145, 115, 3, 146, 116],
	[2, 74, 46, 29, 75, 47],
	[42, 54, 24, 1, 55, 25],
	[23, 45, 15, 28, 46, 16],

	// 32
	[17, 145, 115],
	[10, 74, 46, 23, 75, 47],
	[10, 54, 24, 35, 55, 25],
	[19, 45, 15, 35, 46, 16],

	// 33
	[17, 145, 115, 1, 146, 116],
	[14, 74, 46, 21, 75, 47],
	[29, 54, 24, 19, 55, 25],
	[11, 45, 15, 46, 46, 16],

	// 34
	[13, 145, 115, 6, 146, 116],
	[14, 74, 46, 23, 75, 47],
	[44, 54, 24, 7, 55, 25],
	[59, 46, 16, 1, 47, 17],

	// 35
	[12, 151, 121, 7, 152, 122],
	[12, 75, 47, 26, 76, 48],
	[39, 54, 24, 14, 55, 25],
	[22, 45, 15, 41, 46, 16],

	// 36
	[6, 151, 121, 14, 152, 122],
	[6, 75, 47, 34, 76, 48],
	[46, 54, 24, 10, 55, 25],
	[2, 45, 15, 64, 46, 16],

	// 37
	[17, 152, 122, 4, 153, 123],
	[29, 74, 46, 14, 75, 47],
	[49, 54, 24, 10, 55, 25],
	[24, 45, 15, 46, 46, 16],

	// 38
	[4, 152, 122, 18, 153, 123],
	[13, 74, 46, 32, 75, 47],
	[48, 54, 24, 14, 55, 25],
	[42, 45, 15, 32, 46, 16],

	// 39
	[20, 147, 117, 4, 148, 118],
	[40, 75, 47, 7, 76, 48],
	[43, 54, 24, 22, 55, 25],
	[10, 45, 15, 67, 46, 16],

	// 40
	[19, 148, 118, 6, 149, 119],
	[18, 75, 47, 31, 76, 48],
	[34, 54, 24, 34, 55, 25],
	[20, 45, 15, 61, 46, 16]
];

QRRSBlock.getRSBlocks = function(typeNumber, errorCorrectLevel) {
	
	var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);
	
	if (rsBlock == undefined) {
		throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
	}

	var length = rsBlock.length / 3;
	
	var list = new Array();
	
	for (var i = 0; i < length; i++) {

		var count = rsBlock[i * 3 + 0];
		var totalCount = rsBlock[i * 3 + 1];
		var dataCount  = rsBlock[i * 3 + 2];

		for (var j = 0; j < count; j++) {
			list.push(new QRRSBlock(totalCount, dataCount) );	
		}
	}
	
	return list;
}

QRRSBlock.getRsBlockTable = function(typeNumber, errorCorrectLevel) {

	switch(errorCorrectLevel) {
	case ECL.L :
		return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
	case ECL.M :
		return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
	case ECL.Q :
		return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
	case ECL.H :
		return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
	default :
		return undefined;
	}
}

module.exports = QRRSBlock;


/***/ }),
/* 23 */
/***/ (function(module, exports) {

function QRBitBuffer() {
	this.buffer = new Array();
	this.length = 0;
}

QRBitBuffer.prototype = {

	get : function(index) {
		var bufIndex = Math.floor(index / 8);
		return ( (this.buffer[bufIndex] >>> (7 - index % 8) ) & 1) == 1;
	},
	
	put : function(num, length) {
		for (var i = 0; i < length; i++) {
			this.putBit( ( (num >>> (length - i - 1) ) & 1) == 1);
		}
	},
	
	getLengthInBits : function() {
		return this.length;
	},
	
	putBit : function(bit) {
	
		var bufIndex = Math.floor(this.length / 8);
		if (this.buffer.length <= bufIndex) {
			this.buffer.push(0);
		}
	
		if (bit) {
			this.buffer[bufIndex] |= (0x80 >>> (this.length % 8) );
		}
	
		this.length++;
	}
};

module.exports = QRBitBuffer;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var Mode = __webpack_require__(3);
var Polynomial = __webpack_require__(5);
var math = __webpack_require__(6);

var QRMaskPattern = {
	PATTERN000 : 0,
	PATTERN001 : 1,
	PATTERN010 : 2,
	PATTERN011 : 3,
	PATTERN100 : 4,
	PATTERN101 : 5,
	PATTERN110 : 6,
	PATTERN111 : 7
};

var QRUtil = {

    PATTERN_POSITION_TABLE : [
	    [],
	    [6, 18],
	    [6, 22],
	    [6, 26],
	    [6, 30],
	    [6, 34],
	    [6, 22, 38],
	    [6, 24, 42],
	    [6, 26, 46],
	    [6, 28, 50],
	    [6, 30, 54],		
	    [6, 32, 58],
	    [6, 34, 62],
	    [6, 26, 46, 66],
	    [6, 26, 48, 70],
	    [6, 26, 50, 74],
	    [6, 30, 54, 78],
	    [6, 30, 56, 82],
	    [6, 30, 58, 86],
	    [6, 34, 62, 90],
	    [6, 28, 50, 72, 94],
	    [6, 26, 50, 74, 98],
	    [6, 30, 54, 78, 102],
	    [6, 28, 54, 80, 106],
	    [6, 32, 58, 84, 110],
	    [6, 30, 58, 86, 114],
	    [6, 34, 62, 90, 118],
	    [6, 26, 50, 74, 98, 122],
	    [6, 30, 54, 78, 102, 126],
	    [6, 26, 52, 78, 104, 130],
	    [6, 30, 56, 82, 108, 134],
	    [6, 34, 60, 86, 112, 138],
	    [6, 30, 58, 86, 114, 142],
	    [6, 34, 62, 90, 118, 146],
	    [6, 30, 54, 78, 102, 126, 150],
	    [6, 24, 50, 76, 102, 128, 154],
	    [6, 28, 54, 80, 106, 132, 158],
	    [6, 32, 58, 84, 110, 136, 162],
	    [6, 26, 54, 82, 110, 138, 166],
	    [6, 30, 58, 86, 114, 142, 170]
    ],

    G15 : (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0),
    G18 : (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0),
    G15_MASK : (1 << 14) | (1 << 12) | (1 << 10)	| (1 << 4) | (1 << 1),

    getBCHTypeInfo : function(data) {
	    var d = data << 10;
	    while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
		    d ^= (QRUtil.G15 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) ) ); 	
	    }
	    return ( (data << 10) | d) ^ QRUtil.G15_MASK;
    },

    getBCHTypeNumber : function(data) {
	    var d = data << 12;
	    while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
		    d ^= (QRUtil.G18 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) ) ); 	
	    }
	    return (data << 12) | d;
    },

    getBCHDigit : function(data) {

	    var digit = 0;

	    while (data != 0) {
		    digit++;
		    data >>>= 1;
	    }

	    return digit;
    },

    getPatternPosition : function(typeNumber) {
	    return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
    },

    getMask : function(maskPattern, i, j) {
	    
	    switch (maskPattern) {
		    
	    case QRMaskPattern.PATTERN000 : return (i + j) % 2 == 0;
	    case QRMaskPattern.PATTERN001 : return i % 2 == 0;
	    case QRMaskPattern.PATTERN010 : return j % 3 == 0;
	    case QRMaskPattern.PATTERN011 : return (i + j) % 3 == 0;
	    case QRMaskPattern.PATTERN100 : return (Math.floor(i / 2) + Math.floor(j / 3) ) % 2 == 0;
	    case QRMaskPattern.PATTERN101 : return (i * j) % 2 + (i * j) % 3 == 0;
	    case QRMaskPattern.PATTERN110 : return ( (i * j) % 2 + (i * j) % 3) % 2 == 0;
	    case QRMaskPattern.PATTERN111 : return ( (i * j) % 3 + (i + j) % 2) % 2 == 0;

	    default :
		    throw new Error("bad maskPattern:" + maskPattern);
	    }
    },

    getErrorCorrectPolynomial : function(errorCorrectLength) {

	    var a = new Polynomial([1], 0);

	    for (var i = 0; i < errorCorrectLength; i++) {
		    a = a.multiply(new Polynomial([1, math.gexp(i)], 0) );
	    }

	    return a;
    },

    getLengthInBits : function(mode, type) {

	    if (1 <= type && type < 10) {

		    // 1 - 9

		    switch(mode) {
		    case Mode.MODE_NUMBER 	: return 10;
		    case Mode.MODE_ALPHA_NUM 	: return 9;
		    case Mode.MODE_8BIT_BYTE	: return 8;
		    case Mode.MODE_KANJI  	: return 8;
		    default :
			    throw new Error("mode:" + mode);
		    }

	    } else if (type < 27) {

		    // 10 - 26

		    switch(mode) {
		    case Mode.MODE_NUMBER 	: return 12;
		    case Mode.MODE_ALPHA_NUM 	: return 11;
		    case Mode.MODE_8BIT_BYTE	: return 16;
		    case Mode.MODE_KANJI  	: return 10;
		    default :
			    throw new Error("mode:" + mode);
		    }

	    } else if (type < 41) {

		    // 27 - 40

		    switch(mode) {
		    case Mode.MODE_NUMBER 	: return 14;
		    case Mode.MODE_ALPHA_NUM	: return 13;
		    case Mode.MODE_8BIT_BYTE	: return 16;
		    case Mode.MODE_KANJI  	: return 12;
		    default :
			    throw new Error("mode:" + mode);
		    }

	    } else {
		    throw new Error("type:" + type);
	    }
    },

    getLostPoint : function(qrCode) {
	    
	    var moduleCount = qrCode.getModuleCount();
	    
	    var lostPoint = 0;
	    
	    // LEVEL1
	    
	    for (var row = 0; row < moduleCount; row++) {

		    for (var col = 0; col < moduleCount; col++) {

			    var sameCount = 0;
			    var dark = qrCode.isDark(row, col);

				for (var r = -1; r <= 1; r++) {

				    if (row + r < 0 || moduleCount <= row + r) {
					    continue;
				    }

				    for (var c = -1; c <= 1; c++) {

					    if (col + c < 0 || moduleCount <= col + c) {
						    continue;
					    }

					    if (r == 0 && c == 0) {
						    continue;
					    }

					    if (dark == qrCode.isDark(row + r, col + c) ) {
						    sameCount++;
					    }
				    }
			    }

			    if (sameCount > 5) {
				    lostPoint += (3 + sameCount - 5);
			    }
		    }
	    }

	    // LEVEL2

	    for (var row = 0; row < moduleCount - 1; row++) {
		    for (var col = 0; col < moduleCount - 1; col++) {
			    var count = 0;
			    if (qrCode.isDark(row,     col    ) ) count++;
			    if (qrCode.isDark(row + 1, col    ) ) count++;
			    if (qrCode.isDark(row,     col + 1) ) count++;
			    if (qrCode.isDark(row + 1, col + 1) ) count++;
			    if (count == 0 || count == 4) {
				    lostPoint += 3;
			    }
		    }
	    }

	    // LEVEL3

	    for (var row = 0; row < moduleCount; row++) {
		    for (var col = 0; col < moduleCount - 6; col++) {
			    if (qrCode.isDark(row, col)
					    && !qrCode.isDark(row, col + 1)
					    &&  qrCode.isDark(row, col + 2)
					    &&  qrCode.isDark(row, col + 3)
					    &&  qrCode.isDark(row, col + 4)
					    && !qrCode.isDark(row, col + 5)
					    &&  qrCode.isDark(row, col + 6) ) {
				    lostPoint += 40;
			    }
		    }
	    }

	    for (var col = 0; col < moduleCount; col++) {
		    for (var row = 0; row < moduleCount - 6; row++) {
			    if (qrCode.isDark(row, col)
					    && !qrCode.isDark(row + 1, col)
					    &&  qrCode.isDark(row + 2, col)
					    &&  qrCode.isDark(row + 3, col)
					    &&  qrCode.isDark(row + 4, col)
					    && !qrCode.isDark(row + 5, col)
					    &&  qrCode.isDark(row + 6, col) ) {
				    lostPoint += 40;
			    }
		    }
	    }

	    // LEVEL4
	    
	    var darkCount = 0;

	    for (var col = 0; col < moduleCount; col++) {
		    for (var row = 0; row < moduleCount; row++) {
			    if (qrCode.isDark(row, col) ) {
				    darkCount++;
			    }
		    }
	    }
	    
	    var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
	    lostPoint += ratio * 10;

	    return lostPoint;		
    }
};

module.exports = QRUtil;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var _exports = {},
    _export = null,
    _path = null;
var _data = {
  setting: __webpack_require__(7),
  user: __webpack_require__(8)
};
Object.keys(_data).map(function (path) {
  _export = _data[path];

  for (var key in _export) {
    _exports[(path + '.' + key).toLowerCase()] = _export[key];
  }
});
var _data = {
  AdminUserAuth: __webpack_require__(35),
  AdminUserLoginWithQRCode: __webpack_require__(36)
};
Object.keys(_data).map(function (path) {
  _exports[path.toLowerCase()] = _data[path];
});
module.exports = _exports;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./Base.js": 27,
	"./Config.js": 28,
	"./index.js": 7
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 26;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

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

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

module.exports = React.createClass({
  displayName: "exports",
  getDefaultProps: function getDefaultProps() {
    return {
      model: 'ZNPluginWechatConfig'
    };
  },
  getInitialState: function getInitialState() {
    return {
      data: zn.store.post('/zn.plugin.admin/model/paging', {
        model: this.props.model
      }),
      items: [{
        title: '_id',
        name: '_id',
        width: 200
      }, {
        title: '_title',
        name: '_title',
        width: 200
      }, {
        title: '_key',
        name: '_key',
        width: 140
      }, {
        title: '_value',
        name: '_value',
        width: 250
      }, {
        title: 'ref_id',
        name: 'ref_id',
        width: 80
      }, {
        title: 'var_id',
        name: 'var_id',
        width: 80
      }, {
        title: 'InputType',
        name: 'input_type',
        width: 120
      }, {
        title: 'DataType',
        name: 'data_type',
        width: 100
      }, {
        title: 'RichValue',
        name: '_rich_value'
      }],
      formItems: [{
        title: '_id',
        name: '_id',
        type: 'AutoComplete',
        data: zn.store.get('/zn.plugin.admin/config/get_ids'),
        required: true,
        error: '_id必填'
      }, {
        title: '_title',
        name: '_title',
        type: 'Input'
      }, {
        title: '_key',
        name: '_key',
        type: 'Input'
      }, {
        title: '_value',
        name: '_value',
        type: 'Input'
      }, {
        title: 'ref_id',
        name: 'ref_id',
        type: 'Input'
      }, {
        title: 'var_id',
        name: 'var_id',
        type: 'Input'
      }, {
        title: 'InputType',
        name: 'input_type',
        type: 'Menu',
        data: ['Input', 'ImageUploader', 'FileUploader', 'Textarea', 'RichEditor']
      }, {
        title: 'DataType',
        name: 'data_type',
        type: 'Input'
      }, {
        title: 'RichValue',
        name: '_rich_value',
        type: 'Textarea'
      }],
      toolbarItems: [{
        text: '添加',
        name: 'add',
        icon: 'fa-plus',
        style: {
          marginRight: 5
        }
      }, {
        text: '删除',
        name: 'remove',
        status: 'danger',
        icon: 'fa-remove',
        style: {
          marginRight: 5
        }
      }]
    };
  },
  __doSuccess: function __doSuccess() {
    this.state.data.refresh();
  },
  __addItem: function __addItem() {
    zn.dialog({
      title: '新增',
      content: React.createElement(zn.react.Form, {
        action: "/zn.plugin.admin/model/insert",
        merge: "values",
        exts: {
          model: this.props.model
        },
        onSubmitSuccess: this.__doSuccess,
        items: this.state.formItems
      })
    });
  },
  __updateItem: function __updateItem(data) {
    zn.dialog({
      title: '更新',
      content: React.createElement(zn.react.Form, {
        action: "/zn.plugin.admin/model/update",
        exts: {
          model: this.props.model,
          where: {
            id: data.id
          }
        },
        merge: "updates",
        value: data,
        onSubmitSuccess: this.__doSuccess,
        items: this.state.formItems
      })
    });
  },
  __removeItems: function __removeItems() {
    var _self = this,
        _values = this.refs.table.getValue();

    if (_values && _values.length) {
      zn.confirm('确认删除这' + _values.length + '个值吗？', '提示', function () {
        zn.http.post('/zn.plugin.admin/model/delete', {
          model: this.props.model,
          where: "id in (" + _values.join(',') + ")"
        }).then(function () {
          zn.toast.success('删除成功');

          _self.state.data.refresh();
        }, function (data) {
          zn.toast.error('删除失败: ' + data.result);
        });
      }.bind(this));
    } else {
      zn.toast.warning('请先选择要删除的用户');
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
  __onTableColumnRender: function __onTableColumnRender(rowIndex, columnIndex, data, item, value) {
    var _this = this;

    switch (columnIndex) {
      case 1:
        return React.createElement("div", null, React.createElement("i", {
          className: "fa fa-edit",
          onClick: function onClick() {
            return _this.__updateItem(data);
          },
          style: {
            padding: 5
          }
        }), React.createElement("a", {
          href: '#' + zn.react.session.fixPath('/znpluginadmin.setting.base') + '?_id=' + data._id
        }, value));
    }
  },
  render: function render() {
    return React.createElement(zn.react.Page, {
      title: "\u5FAE\u4FE1\u516C\u4F17\u53F7\u5E73\u53F0\u53C2\u6570\u914D\u7F6E",
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

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./Bind.js": 30,
	"./Info.js": 31,
	"./List.js": 32,
	"./LoginLog.js": 33,
	"./ZNPluginAdminUserBind.js": 34,
	"./index.js": 8
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 29;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

var UserInfo = __webpack_require__(1);

module.exports = React.createClass({
  displayName: "exports",
  getInitialState: function getInitialState() {
    return {
      token: this.props.request.search.token,
      admin: null,
      wechat: null
    };
  },
  bindAccount: function bindAccount() {
    zn.confirm('确认绑定该微信号么？', '提示', function () {
      zn.preloader.open({
        content: '绑定中...'
      });
      zn.http.post('/zn.plugin.wechat/zn.plugin.admin.user/bindWechatWithOpenid', {
        openid: zn.plugin.wechat.getToken().openid,
        token: this.state.token
      }).then(function (data) {
        if (data.status == 200) {
          zn.toast.success("绑定成功");
          this.setState(data.result);
        } else {
          zn.toast.error(data.result || '服务不可用');
        }

        zn.preloader.close();
      }.bind(this), function () {
        zn.toast.error('网络请求失败');
        zn.preloader.close();
      });
    }.bind(this));
  },
  render: function render() {
    return React.createElement(zn.react.Page, {
      title: "\u767B\u5F55\u4FE1\u606F",
      canBack: false
    }, this.state.admin && React.createElement("div", {
      style: {
        display: 'flex',
        padding: 20
      }
    }, React.createElement("div", {
      style: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, React.createElement("img", {
      style: {
        width: 16,
        height: 16,
        borderRadius: 16,
        margin: 3
      },
      src: zn.http.fixURL(this.state.admin.avatar_img)
    }), this.state.admin.name), React.createElement("div", {
      style: {
        width: 64,
        height: 10,
        border: '1px solid #ccc',
        margin: 7,
        borderLeftWidth: 0,
        borderRightWidth: 0
      }
    }), React.createElement("div", {
      style: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, React.createElement("img", {
      style: {
        width: 16,
        height: 16,
        borderRadius: 16,
        margin: 3
      },
      src: zn.http.fixURL(this.state.wechat.headimgurl)
    }), this.state.wechat.nickname)), React.createElement(UserInfo, {
      openid: zn.plugin.wechat.getToken().openid
    }), !this.state.admin && React.createElement(zn.react.Button, {
      style: {
        margin: 20
      },
      onClick: this.bindAccount,
      text: "\u7ED1\u5B9A",
      status: "warning"
    }));
  }
});

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

var UserInfo = __webpack_require__(1);

module.exports = React.createClass({
  displayName: "exports",
  getInitialState: function getInitialState() {
    return {
      openid: this.props.openid || this.props.request.search.openid
    };
  },
  render: function render() {
    return React.createElement(zn.react.Page, {
      title: "\u5FAE\u4FE1\u8D26\u6237\u4FE1\u606F"
    }, React.createElement(UserInfo, {
      openid: this.state.openid
    }));
  }
});

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

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

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

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

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

var QRCode = __webpack_require__(2);

module.exports = React.createClass({
  displayName: "exports",
  getInitialState: function getInitialState() {
    return {
      user: null,
      logs: []
    };
  },
  componentDidMount: function componentDidMount() {
    if (this.props.openid) {
      this.__loadInfo();
    }
  },
  __loadInfo: function __loadInfo() {
    zn.http.post('/zn.plugin.wechat/zn.plugin.wechat.user/getInfoWithOpenid', {
      openid: this.props.openid
    }).then(function () {});
  },
  __renderQRCode: function __renderQRCode() {},
  render: function render() {
    return React.createElement("div", {
      className: "zn-plugin-wechat-user-info"
    }, React.createElement("div", {
      className: "info-left"
    }, React.createElement(QRCode, {
      value: window.location.origin + window.location.pathname.replace('admin.html', 'index.html') + "#/znpluginwechat.user.bind?znid=" + this.state.user.zn_id
    })), this.state.user && React.createElement("div", {
      className: "info-right"
    }));
  }
});

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

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

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(0);

module.exports = React.createClass({
  displayName: "exports",
  getInitialState: function getInitialState() {
    return {
      user: null,
      loading: true,
      items: [{
        type: 'ImageUploader',
        isImage: true,
        required: true,
        name: 'avatar_img',
        placeholder: '请上传个人头像',
        title: '头像'
      }, {
        type: 'Input',
        name: 'name',
        placeholder: '请输入真实姓名',
        title: '姓名'
      }, {
        type: 'Input',
        name: 'password',
        attrs: {
          type: 'password'
        },
        placeholder: '请输入密码',
        title: '密码'
      }, {
        type: 'Input',
        name: 'phone',
        attrs: {
          type: 'number'
        },
        placeholder: '请输入手机号',
        title: '手机号'
      }, {
        type: 'Input',
        name: 'qq',
        attrs: {
          type: 'number'
        },
        placeholder: '请输入QQ',
        title: 'QQ'
      }, {
        type: 'Input',
        name: 'wechat',
        placeholder: '请输入微信号',
        title: '微信号'
      }, {
        type: 'Input',
        name: 'email',
        placeholder: '请输入常用邮箱',
        title: '邮箱'
      }, {
        type: 'Textarea',
        name: 'address',
        placeholder: '请输入详细地址',
        title: '地址'
      }, {
        type: 'Textarea',
        name: 'zn_note',
        title: '备注'
      }]
    };
  },
  componentDidMount: function componentDidMount() {
    zn.http.post('/zn.plugin.wechat/zn.plugin.admin.user/authWithOpenid', {
      openid: zn.plugin.wechat.getToken().openid
    }).then(function (data) {
      if (data.status == 200) {
        this.setState({
          user: data.result,
          loading: false
        });
      }
    }.bind(this), function (err) {
      zn.toast.error('网络请求失败');
    });
  },
  __renderUserInfo: function __renderUserInfo() {
    return React.createElement("div", {
      style: {
        backgroundColor: '#FFF',
        margin: 10,
        padding: 3
      }
    }, React.createElement("div", {
      style: {
        textAlign: 'center',
        backgroundColor: '#e6e6e6',
        fontWeight: 'bold',
        lineHeight: '40px'
      }
    }, "\u7528\u6237\u4FE1\u606F"), React.createElement("div", {
      style: {
        display: 'flex',
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }
    }, React.createElement("img", {
      style: {
        width: 64,
        height: 64,
        borderRadius: 64
      },
      src: this.state.user.avatar_img
    }), React.createElement("div", null, this.state.user.name)), React.createElement("div", null));
  },
  __onRegisterBefore: function __onRegisterBefore(data) {
    zn.http.post('/zn.plugin.wechat/zn.plugin.admin.user/register', data).then(function (data) {
      if (data.status == 200) {
        this.setState({
          user: data.result,
          loading: false
        });
      } else {
        zn.toast.error('注册失败：' + data.result);
      }
    }.bind(this), function (err) {
      zn.toast.error('网络请求失败');
    });
    return false;
  },
  __renderRegister: function __renderRegister() {
    var _token = zn.plugin.wechat.getToken();

    return React.createElement("div", {
      style: {
        backgroundColor: '#FFF',
        margin: 10,
        padding: 3
      }
    }, React.createElement("div", {
      style: {
        textAlign: 'center',
        backgroundColor: '#e6e6e6',
        fontWeight: 'bold',
        lineHeight: '40px'
      }
    }, "\u65B0\u7528\u6237\u6CE8\u518C"), React.createElement(zn.react.Form, {
      value: {
        avatar_img: _token.headimgurl,
        name: _token.nickname
      },
      onSubmitBefore: this.__onRegisterBefore,
      hiddens: {
        zn_plugin_wechat_open_id: zn.plugin.wechat.getToken().openid
      },
      items: this.state.items,
      buttons: [{
        text: '提交注册',
        type: 'submit',
        status: 'primary',
        icon: 'fa-registered'
      }]
    }));
  },
  render: function render() {
    return React.createElement(zn.react.Page, {
      canBack: false,
      title: "\u5FAE\u4FE1\u767B\u5F55"
    }, this.state.loading ? React.createElement("div", {
      style: {
        textAlign: 'center',
        padding: 10
      }
    }, React.createElement("span", {
      className: "zr-dot-loading"
    }, "\u52A0\u8F7D\u4E2D")) : this.state.user ? this.__renderUserInfo() : this.__renderRegister());
  }
});

/***/ })
/******/ ])));