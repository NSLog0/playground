// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/dat.gui/build/dat.gui.module.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.GUI = exports.gui = exports.dom = exports.controllers = exports.color = void 0;

/**
 * dat-gui JavaScript Controller Library
 * http://code.google.com/p/dat-gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */
function ___$insertStyle(css) {
  if (!css) {
    return;
  }

  if (typeof window === 'undefined') {
    return;
  }

  var style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.innerHTML = css;
  document.head.appendChild(style);
  return css;
}

function colorToString(color, forceCSSHex) {
  var colorFormat = color.__state.conversionName.toString();

  var r = Math.round(color.r);
  var g = Math.round(color.g);
  var b = Math.round(color.b);
  var a = color.a;
  var h = Math.round(color.h);
  var s = color.s.toFixed(1);
  var v = color.v.toFixed(1);

  if (forceCSSHex || colorFormat === 'THREE_CHAR_HEX' || colorFormat === 'SIX_CHAR_HEX') {
    var str = color.hex.toString(16);

    while (str.length < 6) {
      str = '0' + str;
    }

    return '#' + str;
  } else if (colorFormat === 'CSS_RGB') {
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  } else if (colorFormat === 'CSS_RGBA') {
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  } else if (colorFormat === 'HEX') {
    return '0x' + color.hex.toString(16);
  } else if (colorFormat === 'RGB_ARRAY') {
    return '[' + r + ',' + g + ',' + b + ']';
  } else if (colorFormat === 'RGBA_ARRAY') {
    return '[' + r + ',' + g + ',' + b + ',' + a + ']';
  } else if (colorFormat === 'RGB_OBJ') {
    return '{r:' + r + ',g:' + g + ',b:' + b + '}';
  } else if (colorFormat === 'RGBA_OBJ') {
    return '{r:' + r + ',g:' + g + ',b:' + b + ',a:' + a + '}';
  } else if (colorFormat === 'HSV_OBJ') {
    return '{h:' + h + ',s:' + s + ',v:' + v + '}';
  } else if (colorFormat === 'HSVA_OBJ') {
    return '{h:' + h + ',s:' + s + ',v:' + v + ',a:' + a + '}';
  }

  return 'unknown format';
}

var ARR_EACH = Array.prototype.forEach;
var ARR_SLICE = Array.prototype.slice;
var Common = {
  BREAK: {},
  extend: function extend(target) {
    this.each(ARR_SLICE.call(arguments, 1), function (obj) {
      var keys = this.isObject(obj) ? Object.keys(obj) : [];
      keys.forEach(function (key) {
        if (!this.isUndefined(obj[key])) {
          target[key] = obj[key];
        }
      }.bind(this));
    }, this);
    return target;
  },
  defaults: function defaults(target) {
    this.each(ARR_SLICE.call(arguments, 1), function (obj) {
      var keys = this.isObject(obj) ? Object.keys(obj) : [];
      keys.forEach(function (key) {
        if (this.isUndefined(target[key])) {
          target[key] = obj[key];
        }
      }.bind(this));
    }, this);
    return target;
  },
  compose: function compose() {
    var toCall = ARR_SLICE.call(arguments);
    return function () {
      var args = ARR_SLICE.call(arguments);

      for (var i = toCall.length - 1; i >= 0; i--) {
        args = [toCall[i].apply(this, args)];
      }

      return args[0];
    };
  },
  each: function each(obj, itr, scope) {
    if (!obj) {
      return;
    }

    if (ARR_EACH && obj.forEach && obj.forEach === ARR_EACH) {
      obj.forEach(itr, scope);
    } else if (obj.length === obj.length + 0) {
      var key = void 0;
      var l = void 0;

      for (key = 0, l = obj.length; key < l; key++) {
        if (key in obj && itr.call(scope, obj[key], key) === this.BREAK) {
          return;
        }
      }
    } else {
      for (var _key in obj) {
        if (itr.call(scope, obj[_key], _key) === this.BREAK) {
          return;
        }
      }
    }
  },
  defer: function defer(fnc) {
    setTimeout(fnc, 0);
  },
  debounce: function debounce(func, threshold, callImmediately) {
    var timeout = void 0;
    return function () {
      var obj = this;
      var args = arguments;

      function delayed() {
        timeout = null;
        if (!callImmediately) func.apply(obj, args);
      }

      var callNow = callImmediately || !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(delayed, threshold);

      if (callNow) {
        func.apply(obj, args);
      }
    };
  },
  toArray: function toArray(obj) {
    if (obj.toArray) return obj.toArray();
    return ARR_SLICE.call(obj);
  },
  isUndefined: function isUndefined(obj) {
    return obj === undefined;
  },
  isNull: function isNull(obj) {
    return obj === null;
  },
  isNaN: function (_isNaN) {
    function isNaN(_x) {
      return _isNaN.apply(this, arguments);
    }

    isNaN.toString = function () {
      return _isNaN.toString();
    };

    return isNaN;
  }(function (obj) {
    return isNaN(obj);
  }),
  isArray: Array.isArray || function (obj) {
    return obj.constructor === Array;
  },
  isObject: function isObject(obj) {
    return obj === Object(obj);
  },
  isNumber: function isNumber(obj) {
    return obj === obj + 0;
  },
  isString: function isString(obj) {
    return obj === obj + '';
  },
  isBoolean: function isBoolean(obj) {
    return obj === false || obj === true;
  },
  isFunction: function isFunction(obj) {
    return obj instanceof Function;
  }
};
var INTERPRETATIONS = [{
  litmus: Common.isString,
  conversions: {
    THREE_CHAR_HEX: {
      read: function read(original) {
        var test = original.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);

        if (test === null) {
          return false;
        }

        return {
          space: 'HEX',
          hex: parseInt('0x' + test[1].toString() + test[1].toString() + test[2].toString() + test[2].toString() + test[3].toString() + test[3].toString(), 0)
        };
      },
      write: colorToString
    },
    SIX_CHAR_HEX: {
      read: function read(original) {
        var test = original.match(/^#([A-F0-9]{6})$/i);

        if (test === null) {
          return false;
        }

        return {
          space: 'HEX',
          hex: parseInt('0x' + test[1].toString(), 0)
        };
      },
      write: colorToString
    },
    CSS_RGB: {
      read: function read(original) {
        var test = original.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);

        if (test === null) {
          return false;
        }

        return {
          space: 'RGB',
          r: parseFloat(test[1]),
          g: parseFloat(test[2]),
          b: parseFloat(test[3])
        };
      },
      write: colorToString
    },
    CSS_RGBA: {
      read: function read(original) {
        var test = original.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);

        if (test === null) {
          return false;
        }

        return {
          space: 'RGB',
          r: parseFloat(test[1]),
          g: parseFloat(test[2]),
          b: parseFloat(test[3]),
          a: parseFloat(test[4])
        };
      },
      write: colorToString
    }
  }
}, {
  litmus: Common.isNumber,
  conversions: {
    HEX: {
      read: function read(original) {
        return {
          space: 'HEX',
          hex: original,
          conversionName: 'HEX'
        };
      },
      write: function write(color) {
        return color.hex;
      }
    }
  }
}, {
  litmus: Common.isArray,
  conversions: {
    RGB_ARRAY: {
      read: function read(original) {
        if (original.length !== 3) {
          return false;
        }

        return {
          space: 'RGB',
          r: original[0],
          g: original[1],
          b: original[2]
        };
      },
      write: function write(color) {
        return [color.r, color.g, color.b];
      }
    },
    RGBA_ARRAY: {
      read: function read(original) {
        if (original.length !== 4) return false;
        return {
          space: 'RGB',
          r: original[0],
          g: original[1],
          b: original[2],
          a: original[3]
        };
      },
      write: function write(color) {
        return [color.r, color.g, color.b, color.a];
      }
    }
  }
}, {
  litmus: Common.isObject,
  conversions: {
    RGBA_OBJ: {
      read: function read(original) {
        if (Common.isNumber(original.r) && Common.isNumber(original.g) && Common.isNumber(original.b) && Common.isNumber(original.a)) {
          return {
            space: 'RGB',
            r: original.r,
            g: original.g,
            b: original.b,
            a: original.a
          };
        }

        return false;
      },
      write: function write(color) {
        return {
          r: color.r,
          g: color.g,
          b: color.b,
          a: color.a
        };
      }
    },
    RGB_OBJ: {
      read: function read(original) {
        if (Common.isNumber(original.r) && Common.isNumber(original.g) && Common.isNumber(original.b)) {
          return {
            space: 'RGB',
            r: original.r,
            g: original.g,
            b: original.b
          };
        }

        return false;
      },
      write: function write(color) {
        return {
          r: color.r,
          g: color.g,
          b: color.b
        };
      }
    },
    HSVA_OBJ: {
      read: function read(original) {
        if (Common.isNumber(original.h) && Common.isNumber(original.s) && Common.isNumber(original.v) && Common.isNumber(original.a)) {
          return {
            space: 'HSV',
            h: original.h,
            s: original.s,
            v: original.v,
            a: original.a
          };
        }

        return false;
      },
      write: function write(color) {
        return {
          h: color.h,
          s: color.s,
          v: color.v,
          a: color.a
        };
      }
    },
    HSV_OBJ: {
      read: function read(original) {
        if (Common.isNumber(original.h) && Common.isNumber(original.s) && Common.isNumber(original.v)) {
          return {
            space: 'HSV',
            h: original.h,
            s: original.s,
            v: original.v
          };
        }

        return false;
      },
      write: function write(color) {
        return {
          h: color.h,
          s: color.s,
          v: color.v
        };
      }
    }
  }
}];
var result = void 0;
var toReturn = void 0;

var interpret = function interpret() {
  toReturn = false;
  var original = arguments.length > 1 ? Common.toArray(arguments) : arguments[0];
  Common.each(INTERPRETATIONS, function (family) {
    if (family.litmus(original)) {
      Common.each(family.conversions, function (conversion, conversionName) {
        result = conversion.read(original);

        if (toReturn === false && result !== false) {
          toReturn = result;
          result.conversionName = conversionName;
          result.conversion = conversion;
          return Common.BREAK;
        }
      });
      return Common.BREAK;
    }
  });
  return toReturn;
};

var tmpComponent = void 0;
var ColorMath = {
  hsv_to_rgb: function hsv_to_rgb(h, s, v) {
    var hi = Math.floor(h / 60) % 6;
    var f = h / 60 - Math.floor(h / 60);
    var p = v * (1.0 - s);
    var q = v * (1.0 - f * s);
    var t = v * (1.0 - (1.0 - f) * s);
    var c = [[v, t, p], [q, v, p], [p, v, t], [p, q, v], [t, p, v], [v, p, q]][hi];
    return {
      r: c[0] * 255,
      g: c[1] * 255,
      b: c[2] * 255
    };
  },
  rgb_to_hsv: function rgb_to_hsv(r, g, b) {
    var min = Math.min(r, g, b);
    var max = Math.max(r, g, b);
    var delta = max - min;
    var h = void 0;
    var s = void 0;

    if (max !== 0) {
      s = delta / max;
    } else {
      return {
        h: NaN,
        s: 0,
        v: 0
      };
    }

    if (r === max) {
      h = (g - b) / delta;
    } else if (g === max) {
      h = 2 + (b - r) / delta;
    } else {
      h = 4 + (r - g) / delta;
    }

    h /= 6;

    if (h < 0) {
      h += 1;
    }

    return {
      h: h * 360,
      s: s,
      v: max / 255
    };
  },
  rgb_to_hex: function rgb_to_hex(r, g, b) {
    var hex = this.hex_with_component(0, 2, r);
    hex = this.hex_with_component(hex, 1, g);
    hex = this.hex_with_component(hex, 0, b);
    return hex;
  },
  component_from_hex: function component_from_hex(hex, componentIndex) {
    return hex >> componentIndex * 8 & 0xFF;
  },
  hex_with_component: function hex_with_component(hex, componentIndex, value) {
    return value << (tmpComponent = componentIndex * 8) | hex & ~(0xFF << tmpComponent);
  }
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var Color = function () {
  function Color() {
    classCallCheck(this, Color);
    this.__state = interpret.apply(this, arguments);

    if (this.__state === false) {
      throw new Error('Failed to interpret color arguments');
    }

    this.__state.a = this.__state.a || 1;
  }

  createClass(Color, [{
    key: 'toString',
    value: function toString() {
      return colorToString(this);
    }
  }, {
    key: 'toHexString',
    value: function toHexString() {
      return colorToString(this, true);
    }
  }, {
    key: 'toOriginal',
    value: function toOriginal() {
      return this.__state.conversion.write(this);
    }
  }]);
  return Color;
}();

function defineRGBComponent(target, component, componentHexIndex) {
  Object.defineProperty(target, component, {
    get: function get$$1() {
      if (this.__state.space === 'RGB') {
        return this.__state[component];
      }

      Color.recalculateRGB(this, component, componentHexIndex);
      return this.__state[component];
    },
    set: function set$$1(v) {
      if (this.__state.space !== 'RGB') {
        Color.recalculateRGB(this, component, componentHexIndex);
        this.__state.space = 'RGB';
      }

      this.__state[component] = v;
    }
  });
}

function defineHSVComponent(target, component) {
  Object.defineProperty(target, component, {
    get: function get$$1() {
      if (this.__state.space === 'HSV') {
        return this.__state[component];
      }

      Color.recalculateHSV(this);
      return this.__state[component];
    },
    set: function set$$1(v) {
      if (this.__state.space !== 'HSV') {
        Color.recalculateHSV(this);
        this.__state.space = 'HSV';
      }

      this.__state[component] = v;
    }
  });
}

Color.recalculateRGB = function (color, component, componentHexIndex) {
  if (color.__state.space === 'HEX') {
    color.__state[component] = ColorMath.component_from_hex(color.__state.hex, componentHexIndex);
  } else if (color.__state.space === 'HSV') {
    Common.extend(color.__state, ColorMath.hsv_to_rgb(color.__state.h, color.__state.s, color.__state.v));
  } else {
    throw new Error('Corrupted color state');
  }
};

Color.recalculateHSV = function (color) {
  var result = ColorMath.rgb_to_hsv(color.r, color.g, color.b);
  Common.extend(color.__state, {
    s: result.s,
    v: result.v
  });

  if (!Common.isNaN(result.h)) {
    color.__state.h = result.h;
  } else if (Common.isUndefined(color.__state.h)) {
    color.__state.h = 0;
  }
};

Color.COMPONENTS = ['r', 'g', 'b', 'h', 's', 'v', 'hex', 'a'];
defineRGBComponent(Color.prototype, 'r', 2);
defineRGBComponent(Color.prototype, 'g', 1);
defineRGBComponent(Color.prototype, 'b', 0);
defineHSVComponent(Color.prototype, 'h');
defineHSVComponent(Color.prototype, 's');
defineHSVComponent(Color.prototype, 'v');
Object.defineProperty(Color.prototype, 'a', {
  get: function get$$1() {
    return this.__state.a;
  },
  set: function set$$1(v) {
    this.__state.a = v;
  }
});
Object.defineProperty(Color.prototype, 'hex', {
  get: function get$$1() {
    if (this.__state.space !== 'HEX') {
      this.__state.hex = ColorMath.rgb_to_hex(this.r, this.g, this.b);
      this.__state.space = 'HEX';
    }

    return this.__state.hex;
  },
  set: function set$$1(v) {
    this.__state.space = 'HEX';
    this.__state.hex = v;
  }
});

var Controller = function () {
  function Controller(object, property) {
    classCallCheck(this, Controller);
    this.initialValue = object[property];
    this.domElement = document.createElement('div');
    this.object = object;
    this.property = property;
    this.__onChange = undefined;
    this.__onFinishChange = undefined;
  }

  createClass(Controller, [{
    key: 'onChange',
    value: function onChange(fnc) {
      this.__onChange = fnc;
      return this;
    }
  }, {
    key: 'onFinishChange',
    value: function onFinishChange(fnc) {
      this.__onFinishChange = fnc;
      return this;
    }
  }, {
    key: 'setValue',
    value: function setValue(newValue) {
      this.object[this.property] = newValue;

      if (this.__onChange) {
        this.__onChange.call(this, newValue);
      }

      this.updateDisplay();
      return this;
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this.object[this.property];
    }
  }, {
    key: 'updateDisplay',
    value: function updateDisplay() {
      return this;
    }
  }, {
    key: 'isModified',
    value: function isModified() {
      return this.initialValue !== this.getValue();
    }
  }]);
  return Controller;
}();

var EVENT_MAP = {
  HTMLEvents: ['change'],
  MouseEvents: ['click', 'mousemove', 'mousedown', 'mouseup', 'mouseover'],
  KeyboardEvents: ['keydown']
};
var EVENT_MAP_INV = {};
Common.each(EVENT_MAP, function (v, k) {
  Common.each(v, function (e) {
    EVENT_MAP_INV[e] = k;
  });
});
var CSS_VALUE_PIXELS = /(\d+(\.\d+)?)px/;

function cssValueToPixels(val) {
  if (val === '0' || Common.isUndefined(val)) {
    return 0;
  }

  var match = val.match(CSS_VALUE_PIXELS);

  if (!Common.isNull(match)) {
    return parseFloat(match[1]);
  }

  return 0;
}

var dom = {
  makeSelectable: function makeSelectable(elem, selectable) {
    if (elem === undefined || elem.style === undefined) return;
    elem.onselectstart = selectable ? function () {
      return false;
    } : function () {};
    elem.style.MozUserSelect = selectable ? 'auto' : 'none';
    elem.style.KhtmlUserSelect = selectable ? 'auto' : 'none';
    elem.unselectable = selectable ? 'on' : 'off';
  },
  makeFullscreen: function makeFullscreen(elem, hor, vert) {
    var vertical = vert;
    var horizontal = hor;

    if (Common.isUndefined(horizontal)) {
      horizontal = true;
    }

    if (Common.isUndefined(vertical)) {
      vertical = true;
    }

    elem.style.position = 'absolute';

    if (horizontal) {
      elem.style.left = 0;
      elem.style.right = 0;
    }

    if (vertical) {
      elem.style.top = 0;
      elem.style.bottom = 0;
    }
  },
  fakeEvent: function fakeEvent(elem, eventType, pars, aux) {
    var params = pars || {};
    var className = EVENT_MAP_INV[eventType];

    if (!className) {
      throw new Error('Event type ' + eventType + ' not supported.');
    }

    var evt = document.createEvent(className);

    switch (className) {
      case 'MouseEvents':
        {
          var clientX = params.x || params.clientX || 0;
          var clientY = params.y || params.clientY || 0;
          evt.initMouseEvent(eventType, params.bubbles || false, params.cancelable || true, window, params.clickCount || 1, 0, 0, clientX, clientY, false, false, false, false, 0, null);
          break;
        }

      case 'KeyboardEvents':
        {
          var init = evt.initKeyboardEvent || evt.initKeyEvent;
          Common.defaults(params, {
            cancelable: true,
            ctrlKey: false,
            altKey: false,
            shiftKey: false,
            metaKey: false,
            keyCode: undefined,
            charCode: undefined
          });
          init(eventType, params.bubbles || false, params.cancelable, window, params.ctrlKey, params.altKey, params.shiftKey, params.metaKey, params.keyCode, params.charCode);
          break;
        }

      default:
        {
          evt.initEvent(eventType, params.bubbles || false, params.cancelable || true);
          break;
        }
    }

    Common.defaults(evt, aux);
    elem.dispatchEvent(evt);
  },
  bind: function bind(elem, event, func, newBool) {
    var bool = newBool || false;

    if (elem.addEventListener) {
      elem.addEventListener(event, func, bool);
    } else if (elem.attachEvent) {
      elem.attachEvent('on' + event, func);
    }

    return dom;
  },
  unbind: function unbind(elem, event, func, newBool) {
    var bool = newBool || false;

    if (elem.removeEventListener) {
      elem.removeEventListener(event, func, bool);
    } else if (elem.detachEvent) {
      elem.detachEvent('on' + event, func);
    }

    return dom;
  },
  addClass: function addClass(elem, className) {
    if (elem.className === undefined) {
      elem.className = className;
    } else if (elem.className !== className) {
      var classes = elem.className.split(/ +/);

      if (classes.indexOf(className) === -1) {
        classes.push(className);
        elem.className = classes.join(' ').replace(/^\s+/, '').replace(/\s+$/, '');
      }
    }

    return dom;
  },
  removeClass: function removeClass(elem, className) {
    if (className) {
      if (elem.className === className) {
        elem.removeAttribute('class');
      } else {
        var classes = elem.className.split(/ +/);
        var index = classes.indexOf(className);

        if (index !== -1) {
          classes.splice(index, 1);
          elem.className = classes.join(' ');
        }
      }
    } else {
      elem.className = undefined;
    }

    return dom;
  },
  hasClass: function hasClass(elem, className) {
    return new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)').test(elem.className) || false;
  },
  getWidth: function getWidth(elem) {
    var style = getComputedStyle(elem);
    return cssValueToPixels(style['border-left-width']) + cssValueToPixels(style['border-right-width']) + cssValueToPixels(style['padding-left']) + cssValueToPixels(style['padding-right']) + cssValueToPixels(style.width);
  },
  getHeight: function getHeight(elem) {
    var style = getComputedStyle(elem);
    return cssValueToPixels(style['border-top-width']) + cssValueToPixels(style['border-bottom-width']) + cssValueToPixels(style['padding-top']) + cssValueToPixels(style['padding-bottom']) + cssValueToPixels(style.height);
  },
  getOffset: function getOffset(el) {
    var elem = el;
    var offset = {
      left: 0,
      top: 0
    };

    if (elem.offsetParent) {
      do {
        offset.left += elem.offsetLeft;
        offset.top += elem.offsetTop;
        elem = elem.offsetParent;
      } while (elem);
    }

    return offset;
  },
  isActive: function isActive(elem) {
    return elem === document.activeElement && (elem.type || elem.href);
  }
};

var BooleanController = function (_Controller) {
  inherits(BooleanController, _Controller);

  function BooleanController(object, property) {
    classCallCheck(this, BooleanController);

    var _this2 = possibleConstructorReturn(this, (BooleanController.__proto__ || Object.getPrototypeOf(BooleanController)).call(this, object, property));

    var _this = _this2;
    _this2.__prev = _this2.getValue();
    _this2.__checkbox = document.createElement('input');

    _this2.__checkbox.setAttribute('type', 'checkbox');

    function onChange() {
      _this.setValue(!_this.__prev);
    }

    dom.bind(_this2.__checkbox, 'change', onChange, false);

    _this2.domElement.appendChild(_this2.__checkbox);

    _this2.updateDisplay();

    return _this2;
  }

  createClass(BooleanController, [{
    key: 'setValue',
    value: function setValue(v) {
      var toReturn = get(BooleanController.prototype.__proto__ || Object.getPrototypeOf(BooleanController.prototype), 'setValue', this).call(this, v);

      if (this.__onFinishChange) {
        this.__onFinishChange.call(this, this.getValue());
      }

      this.__prev = this.getValue();
      return toReturn;
    }
  }, {
    key: 'updateDisplay',
    value: function updateDisplay() {
      if (this.getValue() === true) {
        this.__checkbox.setAttribute('checked', 'checked');

        this.__checkbox.checked = true;
        this.__prev = true;
      } else {
        this.__checkbox.checked = false;
        this.__prev = false;
      }

      return get(BooleanController.prototype.__proto__ || Object.getPrototypeOf(BooleanController.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return BooleanController;
}(Controller);

var OptionController = function (_Controller) {
  inherits(OptionController, _Controller);

  function OptionController(object, property, opts) {
    classCallCheck(this, OptionController);

    var _this2 = possibleConstructorReturn(this, (OptionController.__proto__ || Object.getPrototypeOf(OptionController)).call(this, object, property));

    var options = opts;
    var _this = _this2;
    _this2.__select = document.createElement('select');

    if (Common.isArray(options)) {
      var map = {};
      Common.each(options, function (element) {
        map[element] = element;
      });
      options = map;
    }

    Common.each(options, function (value, key) {
      var opt = document.createElement('option');
      opt.innerHTML = key;
      opt.setAttribute('value', value);

      _this.__select.appendChild(opt);
    });

    _this2.updateDisplay();

    dom.bind(_this2.__select, 'change', function () {
      var desiredValue = this.options[this.selectedIndex].value;

      _this.setValue(desiredValue);
    });

    _this2.domElement.appendChild(_this2.__select);

    return _this2;
  }

  createClass(OptionController, [{
    key: 'setValue',
    value: function setValue(v) {
      var toReturn = get(OptionController.prototype.__proto__ || Object.getPrototypeOf(OptionController.prototype), 'setValue', this).call(this, v);

      if (this.__onFinishChange) {
        this.__onFinishChange.call(this, this.getValue());
      }

      return toReturn;
    }
  }, {
    key: 'updateDisplay',
    value: function updateDisplay() {
      if (dom.isActive(this.__select)) return this;
      this.__select.value = this.getValue();
      return get(OptionController.prototype.__proto__ || Object.getPrototypeOf(OptionController.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return OptionController;
}(Controller);

var StringController = function (_Controller) {
  inherits(StringController, _Controller);

  function StringController(object, property) {
    classCallCheck(this, StringController);

    var _this2 = possibleConstructorReturn(this, (StringController.__proto__ || Object.getPrototypeOf(StringController)).call(this, object, property));

    var _this = _this2;

    function onChange() {
      _this.setValue(_this.__input.value);
    }

    function onBlur() {
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }

    _this2.__input = document.createElement('input');

    _this2.__input.setAttribute('type', 'text');

    dom.bind(_this2.__input, 'keyup', onChange);
    dom.bind(_this2.__input, 'change', onChange);
    dom.bind(_this2.__input, 'blur', onBlur);
    dom.bind(_this2.__input, 'keydown', function (e) {
      if (e.keyCode === 13) {
        this.blur();
      }
    });

    _this2.updateDisplay();

    _this2.domElement.appendChild(_this2.__input);

    return _this2;
  }

  createClass(StringController, [{
    key: 'updateDisplay',
    value: function updateDisplay() {
      if (!dom.isActive(this.__input)) {
        this.__input.value = this.getValue();
      }

      return get(StringController.prototype.__proto__ || Object.getPrototypeOf(StringController.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return StringController;
}(Controller);

function numDecimals(x) {
  var _x = x.toString();

  if (_x.indexOf('.') > -1) {
    return _x.length - _x.indexOf('.') - 1;
  }

  return 0;
}

var NumberController = function (_Controller) {
  inherits(NumberController, _Controller);

  function NumberController(object, property, params) {
    classCallCheck(this, NumberController);

    var _this = possibleConstructorReturn(this, (NumberController.__proto__ || Object.getPrototypeOf(NumberController)).call(this, object, property));

    var _params = params || {};

    _this.__min = _params.min;
    _this.__max = _params.max;
    _this.__step = _params.step;

    if (Common.isUndefined(_this.__step)) {
      if (_this.initialValue === 0) {
        _this.__impliedStep = 1;
      } else {
        _this.__impliedStep = Math.pow(10, Math.floor(Math.log(Math.abs(_this.initialValue)) / Math.LN10)) / 10;
      }
    } else {
      _this.__impliedStep = _this.__step;
    }

    _this.__precision = numDecimals(_this.__impliedStep);
    return _this;
  }

  createClass(NumberController, [{
    key: 'setValue',
    value: function setValue(v) {
      var _v = v;

      if (this.__min !== undefined && _v < this.__min) {
        _v = this.__min;
      } else if (this.__max !== undefined && _v > this.__max) {
        _v = this.__max;
      }

      if (this.__step !== undefined && _v % this.__step !== 0) {
        _v = Math.round(_v / this.__step) * this.__step;
      }

      return get(NumberController.prototype.__proto__ || Object.getPrototypeOf(NumberController.prototype), 'setValue', this).call(this, _v);
    }
  }, {
    key: 'min',
    value: function min(minValue) {
      this.__min = minValue;
      return this;
    }
  }, {
    key: 'max',
    value: function max(maxValue) {
      this.__max = maxValue;
      return this;
    }
  }, {
    key: 'step',
    value: function step(stepValue) {
      this.__step = stepValue;
      this.__impliedStep = stepValue;
      this.__precision = numDecimals(stepValue);
      return this;
    }
  }]);
  return NumberController;
}(Controller);

function roundToDecimal(value, decimals) {
  var tenTo = Math.pow(10, decimals);
  return Math.round(value * tenTo) / tenTo;
}

var NumberControllerBox = function (_NumberController) {
  inherits(NumberControllerBox, _NumberController);

  function NumberControllerBox(object, property, params) {
    classCallCheck(this, NumberControllerBox);

    var _this2 = possibleConstructorReturn(this, (NumberControllerBox.__proto__ || Object.getPrototypeOf(NumberControllerBox)).call(this, object, property, params));

    _this2.__truncationSuspended = false;
    var _this = _this2;
    var prevY = void 0;

    function onChange() {
      var attempted = parseFloat(_this.__input.value);

      if (!Common.isNaN(attempted)) {
        _this.setValue(attempted);
      }
    }

    function onFinish() {
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }

    function onBlur() {
      onFinish();
    }

    function onMouseDrag(e) {
      var diff = prevY - e.clientY;

      _this.setValue(_this.getValue() + diff * _this.__impliedStep);

      prevY = e.clientY;
    }

    function onMouseUp() {
      dom.unbind(window, 'mousemove', onMouseDrag);
      dom.unbind(window, 'mouseup', onMouseUp);
      onFinish();
    }

    function onMouseDown(e) {
      dom.bind(window, 'mousemove', onMouseDrag);
      dom.bind(window, 'mouseup', onMouseUp);
      prevY = e.clientY;
    }

    _this2.__input = document.createElement('input');

    _this2.__input.setAttribute('type', 'text');

    dom.bind(_this2.__input, 'change', onChange);
    dom.bind(_this2.__input, 'blur', onBlur);
    dom.bind(_this2.__input, 'mousedown', onMouseDown);
    dom.bind(_this2.__input, 'keydown', function (e) {
      if (e.keyCode === 13) {
        _this.__truncationSuspended = true;
        this.blur();
        _this.__truncationSuspended = false;
        onFinish();
      }
    });

    _this2.updateDisplay();

    _this2.domElement.appendChild(_this2.__input);

    return _this2;
  }

  createClass(NumberControllerBox, [{
    key: 'updateDisplay',
    value: function updateDisplay() {
      this.__input.value = this.__truncationSuspended ? this.getValue() : roundToDecimal(this.getValue(), this.__precision);
      return get(NumberControllerBox.prototype.__proto__ || Object.getPrototypeOf(NumberControllerBox.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return NumberControllerBox;
}(NumberController);

function map(v, i1, i2, o1, o2) {
  return o1 + (o2 - o1) * ((v - i1) / (i2 - i1));
}

var NumberControllerSlider = function (_NumberController) {
  inherits(NumberControllerSlider, _NumberController);

  function NumberControllerSlider(object, property, min, max, step) {
    classCallCheck(this, NumberControllerSlider);

    var _this2 = possibleConstructorReturn(this, (NumberControllerSlider.__proto__ || Object.getPrototypeOf(NumberControllerSlider)).call(this, object, property, {
      min: min,
      max: max,
      step: step
    }));

    var _this = _this2;
    _this2.__background = document.createElement('div');
    _this2.__foreground = document.createElement('div');
    dom.bind(_this2.__background, 'mousedown', onMouseDown);
    dom.bind(_this2.__background, 'touchstart', onTouchStart);
    dom.addClass(_this2.__background, 'slider');
    dom.addClass(_this2.__foreground, 'slider-fg');

    function onMouseDown(e) {
      document.activeElement.blur();
      dom.bind(window, 'mousemove', onMouseDrag);
      dom.bind(window, 'mouseup', onMouseUp);
      onMouseDrag(e);
    }

    function onMouseDrag(e) {
      e.preventDefault();

      var bgRect = _this.__background.getBoundingClientRect();

      _this.setValue(map(e.clientX, bgRect.left, bgRect.right, _this.__min, _this.__max));

      return false;
    }

    function onMouseUp() {
      dom.unbind(window, 'mousemove', onMouseDrag);
      dom.unbind(window, 'mouseup', onMouseUp);

      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }

    function onTouchStart(e) {
      if (e.touches.length !== 1) {
        return;
      }

      dom.bind(window, 'touchmove', onTouchMove);
      dom.bind(window, 'touchend', onTouchEnd);
      onTouchMove(e);
    }

    function onTouchMove(e) {
      var clientX = e.touches[0].clientX;

      var bgRect = _this.__background.getBoundingClientRect();

      _this.setValue(map(clientX, bgRect.left, bgRect.right, _this.__min, _this.__max));
    }

    function onTouchEnd() {
      dom.unbind(window, 'touchmove', onTouchMove);
      dom.unbind(window, 'touchend', onTouchEnd);

      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.getValue());
      }
    }

    _this2.updateDisplay();

    _this2.__background.appendChild(_this2.__foreground);

    _this2.domElement.appendChild(_this2.__background);

    return _this2;
  }

  createClass(NumberControllerSlider, [{
    key: 'updateDisplay',
    value: function updateDisplay() {
      var pct = (this.getValue() - this.__min) / (this.__max - this.__min);

      this.__foreground.style.width = pct * 100 + '%';
      return get(NumberControllerSlider.prototype.__proto__ || Object.getPrototypeOf(NumberControllerSlider.prototype), 'updateDisplay', this).call(this);
    }
  }]);
  return NumberControllerSlider;
}(NumberController);

var FunctionController = function (_Controller) {
  inherits(FunctionController, _Controller);

  function FunctionController(object, property, text) {
    classCallCheck(this, FunctionController);

    var _this2 = possibleConstructorReturn(this, (FunctionController.__proto__ || Object.getPrototypeOf(FunctionController)).call(this, object, property));

    var _this = _this2;
    _this2.__button = document.createElement('div');
    _this2.__button.innerHTML = text === undefined ? 'Fire' : text;
    dom.bind(_this2.__button, 'click', function (e) {
      e.preventDefault();

      _this.fire();

      return false;
    });
    dom.addClass(_this2.__button, 'button');

    _this2.domElement.appendChild(_this2.__button);

    return _this2;
  }

  createClass(FunctionController, [{
    key: 'fire',
    value: function fire() {
      if (this.__onChange) {
        this.__onChange.call(this);
      }

      this.getValue().call(this.object);

      if (this.__onFinishChange) {
        this.__onFinishChange.call(this, this.getValue());
      }
    }
  }]);
  return FunctionController;
}(Controller);

var ColorController = function (_Controller) {
  inherits(ColorController, _Controller);

  function ColorController(object, property) {
    classCallCheck(this, ColorController);

    var _this2 = possibleConstructorReturn(this, (ColorController.__proto__ || Object.getPrototypeOf(ColorController)).call(this, object, property));

    _this2.__color = new Color(_this2.getValue());
    _this2.__temp = new Color(0);
    var _this = _this2;
    _this2.domElement = document.createElement('div');
    dom.makeSelectable(_this2.domElement, false);
    _this2.__selector = document.createElement('div');
    _this2.__selector.className = 'selector';
    _this2.__saturation_field = document.createElement('div');
    _this2.__saturation_field.className = 'saturation-field';
    _this2.__field_knob = document.createElement('div');
    _this2.__field_knob.className = 'field-knob';
    _this2.__field_knob_border = '2px solid ';
    _this2.__hue_knob = document.createElement('div');
    _this2.__hue_knob.className = 'hue-knob';
    _this2.__hue_field = document.createElement('div');
    _this2.__hue_field.className = 'hue-field';
    _this2.__input = document.createElement('input');
    _this2.__input.type = 'text';
    _this2.__input_textShadow = '0 1px 1px ';
    dom.bind(_this2.__input, 'keydown', function (e) {
      if (e.keyCode === 13) {
        onBlur.call(this);
      }
    });
    dom.bind(_this2.__input, 'blur', onBlur);
    dom.bind(_this2.__selector, 'mousedown', function () {
      dom.addClass(this, 'drag').bind(window, 'mouseup', function () {
        dom.removeClass(_this.__selector, 'drag');
      });
    });
    dom.bind(_this2.__selector, 'touchstart', function () {
      dom.addClass(this, 'drag').bind(window, 'touchend', function () {
        dom.removeClass(_this.__selector, 'drag');
      });
    });
    var valueField = document.createElement('div');
    Common.extend(_this2.__selector.style, {
      width: '122px',
      height: '102px',
      padding: '3px',
      backgroundColor: '#222',
      boxShadow: '0px 1px 3px rgba(0,0,0,0.3)'
    });
    Common.extend(_this2.__field_knob.style, {
      position: 'absolute',
      width: '12px',
      height: '12px',
      border: _this2.__field_knob_border + (_this2.__color.v < 0.5 ? '#fff' : '#000'),
      boxShadow: '0px 1px 3px rgba(0,0,0,0.5)',
      borderRadius: '12px',
      zIndex: 1
    });
    Common.extend(_this2.__hue_knob.style, {
      position: 'absolute',
      width: '15px',
      height: '2px',
      borderRight: '4px solid #fff',
      zIndex: 1
    });
    Common.extend(_this2.__saturation_field.style, {
      width: '100px',
      height: '100px',
      border: '1px solid #555',
      marginRight: '3px',
      display: 'inline-block',
      cursor: 'pointer'
    });
    Common.extend(valueField.style, {
      width: '100%',
      height: '100%',
      background: 'none'
    });
    linearGradient(valueField, 'top', 'rgba(0,0,0,0)', '#000');
    Common.extend(_this2.__hue_field.style, {
      width: '15px',
      height: '100px',
      border: '1px solid #555',
      cursor: 'ns-resize',
      position: 'absolute',
      top: '3px',
      right: '3px'
    });
    hueGradient(_this2.__hue_field);
    Common.extend(_this2.__input.style, {
      outline: 'none',
      textAlign: 'center',
      color: '#fff',
      border: 0,
      fontWeight: 'bold',
      textShadow: _this2.__input_textShadow + 'rgba(0,0,0,0.7)'
    });
    dom.bind(_this2.__saturation_field, 'mousedown', fieldDown);
    dom.bind(_this2.__saturation_field, 'touchstart', fieldDown);
    dom.bind(_this2.__field_knob, 'mousedown', fieldDown);
    dom.bind(_this2.__field_knob, 'touchstart', fieldDown);
    dom.bind(_this2.__hue_field, 'mousedown', fieldDownH);
    dom.bind(_this2.__hue_field, 'touchstart', fieldDownH);

    function fieldDown(e) {
      setSV(e);
      dom.bind(window, 'mousemove', setSV);
      dom.bind(window, 'touchmove', setSV);
      dom.bind(window, 'mouseup', fieldUpSV);
      dom.bind(window, 'touchend', fieldUpSV);
    }

    function fieldDownH(e) {
      setH(e);
      dom.bind(window, 'mousemove', setH);
      dom.bind(window, 'touchmove', setH);
      dom.bind(window, 'mouseup', fieldUpH);
      dom.bind(window, 'touchend', fieldUpH);
    }

    function fieldUpSV() {
      dom.unbind(window, 'mousemove', setSV);
      dom.unbind(window, 'touchmove', setSV);
      dom.unbind(window, 'mouseup', fieldUpSV);
      dom.unbind(window, 'touchend', fieldUpSV);
      onFinish();
    }

    function fieldUpH() {
      dom.unbind(window, 'mousemove', setH);
      dom.unbind(window, 'touchmove', setH);
      dom.unbind(window, 'mouseup', fieldUpH);
      dom.unbind(window, 'touchend', fieldUpH);
      onFinish();
    }

    function onBlur() {
      var i = interpret(this.value);

      if (i !== false) {
        _this.__color.__state = i;

        _this.setValue(_this.__color.toOriginal());
      } else {
        this.value = _this.__color.toString();
      }
    }

    function onFinish() {
      if (_this.__onFinishChange) {
        _this.__onFinishChange.call(_this, _this.__color.toOriginal());
      }
    }

    _this2.__saturation_field.appendChild(valueField);

    _this2.__selector.appendChild(_this2.__field_knob);

    _this2.__selector.appendChild(_this2.__saturation_field);

    _this2.__selector.appendChild(_this2.__hue_field);

    _this2.__hue_field.appendChild(_this2.__hue_knob);

    _this2.domElement.appendChild(_this2.__input);

    _this2.domElement.appendChild(_this2.__selector);

    _this2.updateDisplay();

    function setSV(e) {
      if (e.type.indexOf('touch') === -1) {
        e.preventDefault();
      }

      var fieldRect = _this.__saturation_field.getBoundingClientRect();

      var _ref = e.touches && e.touches[0] || e,
          clientX = _ref.clientX,
          clientY = _ref.clientY;

      var s = (clientX - fieldRect.left) / (fieldRect.right - fieldRect.left);
      var v = 1 - (clientY - fieldRect.top) / (fieldRect.bottom - fieldRect.top);

      if (v > 1) {
        v = 1;
      } else if (v < 0) {
        v = 0;
      }

      if (s > 1) {
        s = 1;
      } else if (s < 0) {
        s = 0;
      }

      _this.__color.v = v;
      _this.__color.s = s;

      _this.setValue(_this.__color.toOriginal());

      return false;
    }

    function setH(e) {
      if (e.type.indexOf('touch') === -1) {
        e.preventDefault();
      }

      var fieldRect = _this.__hue_field.getBoundingClientRect();

      var _ref2 = e.touches && e.touches[0] || e,
          clientY = _ref2.clientY;

      var h = 1 - (clientY - fieldRect.top) / (fieldRect.bottom - fieldRect.top);

      if (h > 1) {
        h = 1;
      } else if (h < 0) {
        h = 0;
      }

      _this.__color.h = h * 360;

      _this.setValue(_this.__color.toOriginal());

      return false;
    }

    return _this2;
  }

  createClass(ColorController, [{
    key: 'updateDisplay',
    value: function updateDisplay() {
      var i = interpret(this.getValue());

      if (i !== false) {
        var mismatch = false;
        Common.each(Color.COMPONENTS, function (component) {
          if (!Common.isUndefined(i[component]) && !Common.isUndefined(this.__color.__state[component]) && i[component] !== this.__color.__state[component]) {
            mismatch = true;
            return {};
          }
        }, this);

        if (mismatch) {
          Common.extend(this.__color.__state, i);
        }
      }

      Common.extend(this.__temp.__state, this.__color.__state);
      this.__temp.a = 1;
      var flip = this.__color.v < 0.5 || this.__color.s > 0.5 ? 255 : 0;

      var _flip = 255 - flip;

      Common.extend(this.__field_knob.style, {
        marginLeft: 100 * this.__color.s - 7 + 'px',
        marginTop: 100 * (1 - this.__color.v) - 7 + 'px',
        backgroundColor: this.__temp.toHexString(),
        border: this.__field_knob_border + 'rgb(' + flip + ',' + flip + ',' + flip + ')'
      });
      this.__hue_knob.style.marginTop = (1 - this.__color.h / 360) * 100 + 'px';
      this.__temp.s = 1;
      this.__temp.v = 1;
      linearGradient(this.__saturation_field, 'left', '#fff', this.__temp.toHexString());
      this.__input.value = this.__color.toString();
      Common.extend(this.__input.style, {
        backgroundColor: this.__color.toHexString(),
        color: 'rgb(' + flip + ',' + flip + ',' + flip + ')',
        textShadow: this.__input_textShadow + 'rgba(' + _flip + ',' + _flip + ',' + _flip + ',.7)'
      });
    }
  }]);
  return ColorController;
}(Controller);

var vendors = ['-moz-', '-o-', '-webkit-', '-ms-', ''];

function linearGradient(elem, x, a, b) {
  elem.style.background = '';
  Common.each(vendors, function (vendor) {
    elem.style.cssText += 'background: ' + vendor + 'linear-gradient(' + x + ', ' + a + ' 0%, ' + b + ' 100%); ';
  });
}

function hueGradient(elem) {
  elem.style.background = '';
  elem.style.cssText += 'background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);';
  elem.style.cssText += 'background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
  elem.style.cssText += 'background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
  elem.style.cssText += 'background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
  elem.style.cssText += 'background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);';
}

var css = {
  load: function load(url, indoc) {
    var doc = indoc || document;
    var link = doc.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    doc.getElementsByTagName('head')[0].appendChild(link);
  },
  inject: function inject(cssContent, indoc) {
    var doc = indoc || document;
    var injected = document.createElement('style');
    injected.type = 'text/css';
    injected.innerHTML = cssContent;
    var head = doc.getElementsByTagName('head')[0];

    try {
      head.appendChild(injected);
    } catch (e) {}
  }
};
var saveDialogContents = "<div id=\"dg-save\" class=\"dg dialogue\">\n\n  Here's the new load parameter for your <code>GUI</code>'s constructor:\n\n  <textarea id=\"dg-new-constructor\"></textarea>\n\n  <div id=\"dg-save-locally\">\n\n    <input id=\"dg-local-storage\" type=\"checkbox\"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id=\"dg-local-explain\">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n\n    </div>\n\n  </div>\n\n</div>";

var ControllerFactory = function ControllerFactory(object, property) {
  var initialValue = object[property];

  if (Common.isArray(arguments[2]) || Common.isObject(arguments[2])) {
    return new OptionController(object, property, arguments[2]);
  }

  if (Common.isNumber(initialValue)) {
    if (Common.isNumber(arguments[2]) && Common.isNumber(arguments[3])) {
      if (Common.isNumber(arguments[4])) {
        return new NumberControllerSlider(object, property, arguments[2], arguments[3], arguments[4]);
      }

      return new NumberControllerSlider(object, property, arguments[2], arguments[3]);
    }

    if (Common.isNumber(arguments[4])) {
      return new NumberControllerBox(object, property, {
        min: arguments[2],
        max: arguments[3],
        step: arguments[4]
      });
    }

    return new NumberControllerBox(object, property, {
      min: arguments[2],
      max: arguments[3]
    });
  }

  if (Common.isString(initialValue)) {
    return new StringController(object, property);
  }

  if (Common.isFunction(initialValue)) {
    return new FunctionController(object, property, '');
  }

  if (Common.isBoolean(initialValue)) {
    return new BooleanController(object, property);
  }

  return null;
};

function requestAnimationFrame(callback) {
  setTimeout(callback, 1000 / 60);
}

var requestAnimationFrame$1 = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || requestAnimationFrame;

var CenteredDiv = function () {
  function CenteredDiv() {
    classCallCheck(this, CenteredDiv);
    this.backgroundElement = document.createElement('div');
    Common.extend(this.backgroundElement.style, {
      backgroundColor: 'rgba(0,0,0,0.8)',
      top: 0,
      left: 0,
      display: 'none',
      zIndex: '1000',
      opacity: 0,
      WebkitTransition: 'opacity 0.2s linear',
      transition: 'opacity 0.2s linear'
    });
    dom.makeFullscreen(this.backgroundElement);
    this.backgroundElement.style.position = 'fixed';
    this.domElement = document.createElement('div');
    Common.extend(this.domElement.style, {
      position: 'fixed',
      display: 'none',
      zIndex: '1001',
      opacity: 0,
      WebkitTransition: '-webkit-transform 0.2s ease-out, opacity 0.2s linear',
      transition: 'transform 0.2s ease-out, opacity 0.2s linear'
    });
    document.body.appendChild(this.backgroundElement);
    document.body.appendChild(this.domElement);

    var _this = this;

    dom.bind(this.backgroundElement, 'click', function () {
      _this.hide();
    });
  }

  createClass(CenteredDiv, [{
    key: 'show',
    value: function show() {
      var _this = this;

      this.backgroundElement.style.display = 'block';
      this.domElement.style.display = 'block';
      this.domElement.style.opacity = 0;
      this.domElement.style.webkitTransform = 'scale(1.1)';
      this.layout();
      Common.defer(function () {
        _this.backgroundElement.style.opacity = 1;
        _this.domElement.style.opacity = 1;
        _this.domElement.style.webkitTransform = 'scale(1)';
      });
    }
  }, {
    key: 'hide',
    value: function hide() {
      var _this = this;

      var hide = function hide() {
        _this.domElement.style.display = 'none';
        _this.backgroundElement.style.display = 'none';
        dom.unbind(_this.domElement, 'webkitTransitionEnd', hide);
        dom.unbind(_this.domElement, 'transitionend', hide);
        dom.unbind(_this.domElement, 'oTransitionEnd', hide);
      };

      dom.bind(this.domElement, 'webkitTransitionEnd', hide);
      dom.bind(this.domElement, 'transitionend', hide);
      dom.bind(this.domElement, 'oTransitionEnd', hide);
      this.backgroundElement.style.opacity = 0;
      this.domElement.style.opacity = 0;
      this.domElement.style.webkitTransform = 'scale(1.1)';
    }
  }, {
    key: 'layout',
    value: function layout() {
      this.domElement.style.left = window.innerWidth / 2 - dom.getWidth(this.domElement) / 2 + 'px';
      this.domElement.style.top = window.innerHeight / 2 - dom.getHeight(this.domElement) / 2 + 'px';
    }
  }]);
  return CenteredDiv;
}();

var styleSheet = ___$insertStyle(".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear;border:0;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button.close-top{position:relative}.dg.main .close-button.close-bottom{position:absolute}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-y:visible}.dg.a.has-save>ul.close-top{margin-top:0}.dg.a.has-save>ul.close-bottom{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{top:0;z-index:1002}.dg.a .save-row.close-top{position:relative}.dg.a .save-row.close-bottom{position:fixed}.dg li{-webkit-transition:height .1s ease-out;-o-transition:height .1s ease-out;-moz-transition:height .1s ease-out;transition:height .1s ease-out;-webkit-transition:overflow .1s linear;-o-transition:overflow .1s linear;-moz-transition:overflow .1s linear;transition:overflow .1s linear}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px;overflow:hidden}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .c{float:left;width:60%;position:relative}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:7px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .cr.color{overflow:visible}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2FA1D6}.dg .cr.number input[type=text]{color:#2FA1D6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2FA1D6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}\n");

css.inject(styleSheet);
var CSS_NAMESPACE = 'dg';
var HIDE_KEY_CODE = 72;
var CLOSE_BUTTON_HEIGHT = 20;
var DEFAULT_DEFAULT_PRESET_NAME = 'Default';

var SUPPORTS_LOCAL_STORAGE = function () {
  try {
    return !!window.localStorage;
  } catch (e) {
    return false;
  }
}();

var SAVE_DIALOGUE = void 0;
var autoPlaceVirgin = true;
var autoPlaceContainer = void 0;
var hide = false;
var hideableGuis = [];

var GUI = function GUI(pars) {
  var _this = this;

  var params = pars || {};
  this.domElement = document.createElement('div');
  this.__ul = document.createElement('ul');
  this.domElement.appendChild(this.__ul);
  dom.addClass(this.domElement, CSS_NAMESPACE);
  this.__folders = {};
  this.__controllers = [];
  this.__rememberedObjects = [];
  this.__rememberedObjectIndecesToControllers = [];
  this.__listening = [];
  params = Common.defaults(params, {
    closeOnTop: false,
    autoPlace: true,
    width: GUI.DEFAULT_WIDTH
  });
  params = Common.defaults(params, {
    resizable: params.autoPlace,
    hideable: params.autoPlace
  });

  if (!Common.isUndefined(params.load)) {
    if (params.preset) {
      params.load.preset = params.preset;
    }
  } else {
    params.load = {
      preset: DEFAULT_DEFAULT_PRESET_NAME
    };
  }

  if (Common.isUndefined(params.parent) && params.hideable) {
    hideableGuis.push(this);
  }

  params.resizable = Common.isUndefined(params.parent) && params.resizable;

  if (params.autoPlace && Common.isUndefined(params.scrollable)) {
    params.scrollable = true;
  }

  var useLocalStorage = SUPPORTS_LOCAL_STORAGE && localStorage.getItem(getLocalStorageHash(this, 'isLocal')) === 'true';
  var saveToLocalStorage = void 0;
  var titleRow = void 0;
  Object.defineProperties(this, {
    parent: {
      get: function get$$1() {
        return params.parent;
      }
    },
    scrollable: {
      get: function get$$1() {
        return params.scrollable;
      }
    },
    autoPlace: {
      get: function get$$1() {
        return params.autoPlace;
      }
    },
    closeOnTop: {
      get: function get$$1() {
        return params.closeOnTop;
      }
    },
    preset: {
      get: function get$$1() {
        if (_this.parent) {
          return _this.getRoot().preset;
        }

        return params.load.preset;
      },
      set: function set$$1(v) {
        if (_this.parent) {
          _this.getRoot().preset = v;
        } else {
          params.load.preset = v;
        }

        setPresetSelectIndex(this);

        _this.revert();
      }
    },
    width: {
      get: function get$$1() {
        return params.width;
      },
      set: function set$$1(v) {
        params.width = v;
        setWidth(_this, v);
      }
    },
    name: {
      get: function get$$1() {
        return params.name;
      },
      set: function set$$1(v) {
        params.name = v;

        if (titleRow) {
          titleRow.innerHTML = params.name;
        }
      }
    },
    closed: {
      get: function get$$1() {
        return params.closed;
      },
      set: function set$$1(v) {
        params.closed = v;

        if (params.closed) {
          dom.addClass(_this.__ul, GUI.CLASS_CLOSED);
        } else {
          dom.removeClass(_this.__ul, GUI.CLASS_CLOSED);
        }

        this.onResize();

        if (_this.__closeButton) {
          _this.__closeButton.innerHTML = v ? GUI.TEXT_OPEN : GUI.TEXT_CLOSED;
        }
      }
    },
    load: {
      get: function get$$1() {
        return params.load;
      }
    },
    useLocalStorage: {
      get: function get$$1() {
        return useLocalStorage;
      },
      set: function set$$1(bool) {
        if (SUPPORTS_LOCAL_STORAGE) {
          useLocalStorage = bool;

          if (bool) {
            dom.bind(window, 'unload', saveToLocalStorage);
          } else {
            dom.unbind(window, 'unload', saveToLocalStorage);
          }

          localStorage.setItem(getLocalStorageHash(_this, 'isLocal'), bool);
        }
      }
    }
  });

  if (Common.isUndefined(params.parent)) {
    this.closed = params.closed || false;
    dom.addClass(this.domElement, GUI.CLASS_MAIN);
    dom.makeSelectable(this.domElement, false);

    if (SUPPORTS_LOCAL_STORAGE) {
      if (useLocalStorage) {
        _this.useLocalStorage = true;
        var savedGui = localStorage.getItem(getLocalStorageHash(this, 'gui'));

        if (savedGui) {
          params.load = JSON.parse(savedGui);
        }
      }
    }

    this.__closeButton = document.createElement('div');
    this.__closeButton.innerHTML = GUI.TEXT_CLOSED;
    dom.addClass(this.__closeButton, GUI.CLASS_CLOSE_BUTTON);

    if (params.closeOnTop) {
      dom.addClass(this.__closeButton, GUI.CLASS_CLOSE_TOP);
      this.domElement.insertBefore(this.__closeButton, this.domElement.childNodes[0]);
    } else {
      dom.addClass(this.__closeButton, GUI.CLASS_CLOSE_BOTTOM);
      this.domElement.appendChild(this.__closeButton);
    }

    dom.bind(this.__closeButton, 'click', function () {
      _this.closed = !_this.closed;
    });
  } else {
    if (params.closed === undefined) {
      params.closed = true;
    }

    var titleRowName = document.createTextNode(params.name);
    dom.addClass(titleRowName, 'controller-name');
    titleRow = addRow(_this, titleRowName);

    var onClickTitle = function onClickTitle(e) {
      e.preventDefault();
      _this.closed = !_this.closed;
      return false;
    };

    dom.addClass(this.__ul, GUI.CLASS_CLOSED);
    dom.addClass(titleRow, 'title');
    dom.bind(titleRow, 'click', onClickTitle);

    if (!params.closed) {
      this.closed = false;
    }
  }

  if (params.autoPlace) {
    if (Common.isUndefined(params.parent)) {
      if (autoPlaceVirgin) {
        autoPlaceContainer = document.createElement('div');
        dom.addClass(autoPlaceContainer, CSS_NAMESPACE);
        dom.addClass(autoPlaceContainer, GUI.CLASS_AUTO_PLACE_CONTAINER);
        document.body.appendChild(autoPlaceContainer);
        autoPlaceVirgin = false;
      }

      autoPlaceContainer.appendChild(this.domElement);
      dom.addClass(this.domElement, GUI.CLASS_AUTO_PLACE);
    }

    if (!this.parent) {
      setWidth(_this, params.width);
    }
  }

  this.__resizeHandler = function () {
    _this.onResizeDebounced();
  };

  dom.bind(window, 'resize', this.__resizeHandler);
  dom.bind(this.__ul, 'webkitTransitionEnd', this.__resizeHandler);
  dom.bind(this.__ul, 'transitionend', this.__resizeHandler);
  dom.bind(this.__ul, 'oTransitionEnd', this.__resizeHandler);
  this.onResize();

  if (params.resizable) {
    addResizeHandle(this);
  }

  saveToLocalStorage = function saveToLocalStorage() {
    if (SUPPORTS_LOCAL_STORAGE && localStorage.getItem(getLocalStorageHash(_this, 'isLocal')) === 'true') {
      localStorage.setItem(getLocalStorageHash(_this, 'gui'), JSON.stringify(_this.getSaveObject()));
    }
  };

  this.saveToLocalStorageIfPossible = saveToLocalStorage;

  function resetWidth() {
    var root = _this.getRoot();

    root.width += 1;
    Common.defer(function () {
      root.width -= 1;
    });
  }

  if (!params.parent) {
    resetWidth();
  }
};

GUI.toggleHide = function () {
  hide = !hide;
  Common.each(hideableGuis, function (gui) {
    gui.domElement.style.display = hide ? 'none' : '';
  });
};

GUI.CLASS_AUTO_PLACE = 'a';
GUI.CLASS_AUTO_PLACE_CONTAINER = 'ac';
GUI.CLASS_MAIN = 'main';
GUI.CLASS_CONTROLLER_ROW = 'cr';
GUI.CLASS_TOO_TALL = 'taller-than-window';
GUI.CLASS_CLOSED = 'closed';
GUI.CLASS_CLOSE_BUTTON = 'close-button';
GUI.CLASS_CLOSE_TOP = 'close-top';
GUI.CLASS_CLOSE_BOTTOM = 'close-bottom';
GUI.CLASS_DRAG = 'drag';
GUI.DEFAULT_WIDTH = 245;
GUI.TEXT_CLOSED = 'Close Controls';
GUI.TEXT_OPEN = 'Open Controls';

GUI._keydownHandler = function (e) {
  if (document.activeElement.type !== 'text' && (e.which === HIDE_KEY_CODE || e.keyCode === HIDE_KEY_CODE)) {
    GUI.toggleHide();
  }
};

dom.bind(window, 'keydown', GUI._keydownHandler, false);
Common.extend(GUI.prototype, {
  add: function add(object, property) {
    return _add(this, object, property, {
      factoryArgs: Array.prototype.slice.call(arguments, 2)
    });
  },
  addColor: function addColor(object, property) {
    return _add(this, object, property, {
      color: true
    });
  },
  remove: function remove(controller) {
    this.__ul.removeChild(controller.__li);

    this.__controllers.splice(this.__controllers.indexOf(controller), 1);

    var _this = this;

    Common.defer(function () {
      _this.onResize();
    });
  },
  destroy: function destroy() {
    if (this.parent) {
      throw new Error('Only the root GUI should be removed with .destroy(). ' + 'For subfolders, use gui.removeFolder(folder) instead.');
    }

    if (this.autoPlace) {
      autoPlaceContainer.removeChild(this.domElement);
    }

    var _this = this;

    Common.each(this.__folders, function (subfolder) {
      _this.removeFolder(subfolder);
    });
    dom.unbind(window, 'keydown', GUI._keydownHandler, false);
    removeListeners(this);
  },
  addFolder: function addFolder(name) {
    if (this.__folders[name] !== undefined) {
      throw new Error('You already have a folder in this GUI by the' + ' name "' + name + '"');
    }

    var newGuiParams = {
      name: name,
      parent: this
    };
    newGuiParams.autoPlace = this.autoPlace;

    if (this.load && this.load.folders && this.load.folders[name]) {
      newGuiParams.closed = this.load.folders[name].closed;
      newGuiParams.load = this.load.folders[name];
    }

    var gui = new GUI(newGuiParams);
    this.__folders[name] = gui;
    var li = addRow(this, gui.domElement);
    dom.addClass(li, 'folder');
    return gui;
  },
  removeFolder: function removeFolder(folder) {
    this.__ul.removeChild(folder.domElement.parentElement);

    delete this.__folders[folder.name];

    if (this.load && this.load.folders && this.load.folders[folder.name]) {
      delete this.load.folders[folder.name];
    }

    removeListeners(folder);

    var _this = this;

    Common.each(folder.__folders, function (subfolder) {
      folder.removeFolder(subfolder);
    });
    Common.defer(function () {
      _this.onResize();
    });
  },
  open: function open() {
    this.closed = false;
  },
  close: function close() {
    this.closed = true;
  },
  hide: function hide() {
    this.domElement.style.display = 'none';
  },
  show: function show() {
    this.domElement.style.display = '';
  },
  onResize: function onResize() {
    var root = this.getRoot();

    if (root.scrollable) {
      var top = dom.getOffset(root.__ul).top;
      var h = 0;
      Common.each(root.__ul.childNodes, function (node) {
        if (!(root.autoPlace && node === root.__save_row)) {
          h += dom.getHeight(node);
        }
      });

      if (window.innerHeight - top - CLOSE_BUTTON_HEIGHT < h) {
        dom.addClass(root.domElement, GUI.CLASS_TOO_TALL);
        root.__ul.style.height = window.innerHeight - top - CLOSE_BUTTON_HEIGHT + 'px';
      } else {
        dom.removeClass(root.domElement, GUI.CLASS_TOO_TALL);
        root.__ul.style.height = 'auto';
      }
    }

    if (root.__resize_handle) {
      Common.defer(function () {
        root.__resize_handle.style.height = root.__ul.offsetHeight + 'px';
      });
    }

    if (root.__closeButton) {
      root.__closeButton.style.width = root.width + 'px';
    }
  },
  onResizeDebounced: Common.debounce(function () {
    this.onResize();
  }, 50),
  remember: function remember() {
    if (Common.isUndefined(SAVE_DIALOGUE)) {
      SAVE_DIALOGUE = new CenteredDiv();
      SAVE_DIALOGUE.domElement.innerHTML = saveDialogContents;
    }

    if (this.parent) {
      throw new Error('You can only call remember on a top level GUI.');
    }

    var _this = this;

    Common.each(Array.prototype.slice.call(arguments), function (object) {
      if (_this.__rememberedObjects.length === 0) {
        addSaveMenu(_this);
      }

      if (_this.__rememberedObjects.indexOf(object) === -1) {
        _this.__rememberedObjects.push(object);
      }
    });

    if (this.autoPlace) {
      setWidth(this, this.width);
    }
  },
  getRoot: function getRoot() {
    var gui = this;

    while (gui.parent) {
      gui = gui.parent;
    }

    return gui;
  },
  getSaveObject: function getSaveObject() {
    var toReturn = this.load;
    toReturn.closed = this.closed;

    if (this.__rememberedObjects.length > 0) {
      toReturn.preset = this.preset;

      if (!toReturn.remembered) {
        toReturn.remembered = {};
      }

      toReturn.remembered[this.preset] = getCurrentPreset(this);
    }

    toReturn.folders = {};
    Common.each(this.__folders, function (element, key) {
      toReturn.folders[key] = element.getSaveObject();
    });
    return toReturn;
  },
  save: function save() {
    if (!this.load.remembered) {
      this.load.remembered = {};
    }

    this.load.remembered[this.preset] = getCurrentPreset(this);
    markPresetModified(this, false);
    this.saveToLocalStorageIfPossible();
  },
  saveAs: function saveAs(presetName) {
    if (!this.load.remembered) {
      this.load.remembered = {};
      this.load.remembered[DEFAULT_DEFAULT_PRESET_NAME] = getCurrentPreset(this, true);
    }

    this.load.remembered[presetName] = getCurrentPreset(this);
    this.preset = presetName;
    addPresetOption(this, presetName, true);
    this.saveToLocalStorageIfPossible();
  },
  revert: function revert(gui) {
    Common.each(this.__controllers, function (controller) {
      if (!this.getRoot().load.remembered) {
        controller.setValue(controller.initialValue);
      } else {
        recallSavedValue(gui || this.getRoot(), controller);
      }

      if (controller.__onFinishChange) {
        controller.__onFinishChange.call(controller, controller.getValue());
      }
    }, this);
    Common.each(this.__folders, function (folder) {
      folder.revert(folder);
    });

    if (!gui) {
      markPresetModified(this.getRoot(), false);
    }
  },
  listen: function listen(controller) {
    var init = this.__listening.length === 0;

    this.__listening.push(controller);

    if (init) {
      updateDisplays(this.__listening);
    }
  },
  updateDisplay: function updateDisplay() {
    Common.each(this.__controllers, function (controller) {
      controller.updateDisplay();
    });
    Common.each(this.__folders, function (folder) {
      folder.updateDisplay();
    });
  }
});

function addRow(gui, newDom, liBefore) {
  var li = document.createElement('li');

  if (newDom) {
    li.appendChild(newDom);
  }

  if (liBefore) {
    gui.__ul.insertBefore(li, liBefore);
  } else {
    gui.__ul.appendChild(li);
  }

  gui.onResize();
  return li;
}

function removeListeners(gui) {
  dom.unbind(window, 'resize', gui.__resizeHandler);

  if (gui.saveToLocalStorageIfPossible) {
    dom.unbind(window, 'unload', gui.saveToLocalStorageIfPossible);
  }
}

function markPresetModified(gui, modified) {
  var opt = gui.__preset_select[gui.__preset_select.selectedIndex];

  if (modified) {
    opt.innerHTML = opt.value + '*';
  } else {
    opt.innerHTML = opt.value;
  }
}

function augmentController(gui, li, controller) {
  controller.__li = li;
  controller.__gui = gui;
  Common.extend(controller, {
    options: function options(_options) {
      if (arguments.length > 1) {
        var nextSibling = controller.__li.nextElementSibling;
        controller.remove();
        return _add(gui, controller.object, controller.property, {
          before: nextSibling,
          factoryArgs: [Common.toArray(arguments)]
        });
      }

      if (Common.isArray(_options) || Common.isObject(_options)) {
        var _nextSibling = controller.__li.nextElementSibling;
        controller.remove();
        return _add(gui, controller.object, controller.property, {
          before: _nextSibling,
          factoryArgs: [_options]
        });
      }
    },
    name: function name(_name) {
      controller.__li.firstElementChild.firstElementChild.innerHTML = _name;
      return controller;
    },
    listen: function listen() {
      controller.__gui.listen(controller);

      return controller;
    },
    remove: function remove() {
      controller.__gui.remove(controller);

      return controller;
    }
  });

  if (controller instanceof NumberControllerSlider) {
    var box = new NumberControllerBox(controller.object, controller.property, {
      min: controller.__min,
      max: controller.__max,
      step: controller.__step
    });
    Common.each(['updateDisplay', 'onChange', 'onFinishChange', 'step', 'min', 'max'], function (method) {
      var pc = controller[method];
      var pb = box[method];

      controller[method] = box[method] = function () {
        var args = Array.prototype.slice.call(arguments);
        pb.apply(box, args);
        return pc.apply(controller, args);
      };
    });
    dom.addClass(li, 'has-slider');
    controller.domElement.insertBefore(box.domElement, controller.domElement.firstElementChild);
  } else if (controller instanceof NumberControllerBox) {
    var r = function r(returned) {
      if (Common.isNumber(controller.__min) && Common.isNumber(controller.__max)) {
        var oldName = controller.__li.firstElementChild.firstElementChild.innerHTML;
        var wasListening = controller.__gui.__listening.indexOf(controller) > -1;
        controller.remove();

        var newController = _add(gui, controller.object, controller.property, {
          before: controller.__li.nextElementSibling,
          factoryArgs: [controller.__min, controller.__max, controller.__step]
        });

        newController.name(oldName);
        if (wasListening) newController.listen();
        return newController;
      }

      return returned;
    };

    controller.min = Common.compose(r, controller.min);
    controller.max = Common.compose(r, controller.max);
  } else if (controller instanceof BooleanController) {
    dom.bind(li, 'click', function () {
      dom.fakeEvent(controller.__checkbox, 'click');
    });
    dom.bind(controller.__checkbox, 'click', function (e) {
      e.stopPropagation();
    });
  } else if (controller instanceof FunctionController) {
    dom.bind(li, 'click', function () {
      dom.fakeEvent(controller.__button, 'click');
    });
    dom.bind(li, 'mouseover', function () {
      dom.addClass(controller.__button, 'hover');
    });
    dom.bind(li, 'mouseout', function () {
      dom.removeClass(controller.__button, 'hover');
    });
  } else if (controller instanceof ColorController) {
    dom.addClass(li, 'color');
    controller.updateDisplay = Common.compose(function (val) {
      li.style.borderLeftColor = controller.__color.toString();
      return val;
    }, controller.updateDisplay);
    controller.updateDisplay();
  }

  controller.setValue = Common.compose(function (val) {
    if (gui.getRoot().__preset_select && controller.isModified()) {
      markPresetModified(gui.getRoot(), true);
    }

    return val;
  }, controller.setValue);
}

function recallSavedValue(gui, controller) {
  var root = gui.getRoot();

  var matchedIndex = root.__rememberedObjects.indexOf(controller.object);

  if (matchedIndex !== -1) {
    var controllerMap = root.__rememberedObjectIndecesToControllers[matchedIndex];

    if (controllerMap === undefined) {
      controllerMap = {};
      root.__rememberedObjectIndecesToControllers[matchedIndex] = controllerMap;
    }

    controllerMap[controller.property] = controller;

    if (root.load && root.load.remembered) {
      var presetMap = root.load.remembered;
      var preset = void 0;

      if (presetMap[gui.preset]) {
        preset = presetMap[gui.preset];
      } else if (presetMap[DEFAULT_DEFAULT_PRESET_NAME]) {
        preset = presetMap[DEFAULT_DEFAULT_PRESET_NAME];
      } else {
        return;
      }

      if (preset[matchedIndex] && preset[matchedIndex][controller.property] !== undefined) {
        var value = preset[matchedIndex][controller.property];
        controller.initialValue = value;
        controller.setValue(value);
      }
    }
  }
}

function _add(gui, object, property, params) {
  if (object[property] === undefined) {
    throw new Error('Object "' + object + '" has no property "' + property + '"');
  }

  var controller = void 0;

  if (params.color) {
    controller = new ColorController(object, property);
  } else {
    var factoryArgs = [object, property].concat(params.factoryArgs);
    controller = ControllerFactory.apply(gui, factoryArgs);
  }

  if (params.before instanceof Controller) {
    params.before = params.before.__li;
  }

  recallSavedValue(gui, controller);
  dom.addClass(controller.domElement, 'c');
  var name = document.createElement('span');
  dom.addClass(name, 'property-name');
  name.innerHTML = controller.property;
  var container = document.createElement('div');
  container.appendChild(name);
  container.appendChild(controller.domElement);
  var li = addRow(gui, container, params.before);
  dom.addClass(li, GUI.CLASS_CONTROLLER_ROW);

  if (controller instanceof ColorController) {
    dom.addClass(li, 'color');
  } else {
    dom.addClass(li, _typeof(controller.getValue()));
  }

  augmentController(gui, li, controller);

  gui.__controllers.push(controller);

  return controller;
}

function getLocalStorageHash(gui, key) {
  return document.location.href + '.' + key;
}

function addPresetOption(gui, name, setSelected) {
  var opt = document.createElement('option');
  opt.innerHTML = name;
  opt.value = name;

  gui.__preset_select.appendChild(opt);

  if (setSelected) {
    gui.__preset_select.selectedIndex = gui.__preset_select.length - 1;
  }
}

function showHideExplain(gui, explain) {
  explain.style.display = gui.useLocalStorage ? 'block' : 'none';
}

function addSaveMenu(gui) {
  var div = gui.__save_row = document.createElement('li');
  dom.addClass(gui.domElement, 'has-save');

  gui.__ul.insertBefore(div, gui.__ul.firstChild);

  dom.addClass(div, 'save-row');
  var gears = document.createElement('span');
  gears.innerHTML = '&nbsp;';
  dom.addClass(gears, 'button gears');
  var button = document.createElement('span');
  button.innerHTML = 'Save';
  dom.addClass(button, 'button');
  dom.addClass(button, 'save');
  var button2 = document.createElement('span');
  button2.innerHTML = 'New';
  dom.addClass(button2, 'button');
  dom.addClass(button2, 'save-as');
  var button3 = document.createElement('span');
  button3.innerHTML = 'Revert';
  dom.addClass(button3, 'button');
  dom.addClass(button3, 'revert');
  var select = gui.__preset_select = document.createElement('select');

  if (gui.load && gui.load.remembered) {
    Common.each(gui.load.remembered, function (value, key) {
      addPresetOption(gui, key, key === gui.preset);
    });
  } else {
    addPresetOption(gui, DEFAULT_DEFAULT_PRESET_NAME, false);
  }

  dom.bind(select, 'change', function () {
    for (var index = 0; index < gui.__preset_select.length; index++) {
      gui.__preset_select[index].innerHTML = gui.__preset_select[index].value;
    }

    gui.preset = this.value;
  });
  div.appendChild(select);
  div.appendChild(gears);
  div.appendChild(button);
  div.appendChild(button2);
  div.appendChild(button3);

  if (SUPPORTS_LOCAL_STORAGE) {
    var explain = document.getElementById('dg-local-explain');
    var localStorageCheckBox = document.getElementById('dg-local-storage');
    var saveLocally = document.getElementById('dg-save-locally');
    saveLocally.style.display = 'block';

    if (localStorage.getItem(getLocalStorageHash(gui, 'isLocal')) === 'true') {
      localStorageCheckBox.setAttribute('checked', 'checked');
    }

    showHideExplain(gui, explain);
    dom.bind(localStorageCheckBox, 'change', function () {
      gui.useLocalStorage = !gui.useLocalStorage;
      showHideExplain(gui, explain);
    });
  }

  var newConstructorTextArea = document.getElementById('dg-new-constructor');
  dom.bind(newConstructorTextArea, 'keydown', function (e) {
    if (e.metaKey && (e.which === 67 || e.keyCode === 67)) {
      SAVE_DIALOGUE.hide();
    }
  });
  dom.bind(gears, 'click', function () {
    newConstructorTextArea.innerHTML = JSON.stringify(gui.getSaveObject(), undefined, 2);
    SAVE_DIALOGUE.show();
    newConstructorTextArea.focus();
    newConstructorTextArea.select();
  });
  dom.bind(button, 'click', function () {
    gui.save();
  });
  dom.bind(button2, 'click', function () {
    var presetName = prompt('Enter a new preset name.');

    if (presetName) {
      gui.saveAs(presetName);
    }
  });
  dom.bind(button3, 'click', function () {
    gui.revert();
  });
}

function addResizeHandle(gui) {
  var pmouseX = void 0;
  gui.__resize_handle = document.createElement('div');
  Common.extend(gui.__resize_handle.style, {
    width: '6px',
    marginLeft: '-3px',
    height: '200px',
    cursor: 'ew-resize',
    position: 'absolute'
  });

  function drag(e) {
    e.preventDefault();
    gui.width += pmouseX - e.clientX;
    gui.onResize();
    pmouseX = e.clientX;
    return false;
  }

  function dragStop() {
    dom.removeClass(gui.__closeButton, GUI.CLASS_DRAG);
    dom.unbind(window, 'mousemove', drag);
    dom.unbind(window, 'mouseup', dragStop);
  }

  function dragStart(e) {
    e.preventDefault();
    pmouseX = e.clientX;
    dom.addClass(gui.__closeButton, GUI.CLASS_DRAG);
    dom.bind(window, 'mousemove', drag);
    dom.bind(window, 'mouseup', dragStop);
    return false;
  }

  dom.bind(gui.__resize_handle, 'mousedown', dragStart);
  dom.bind(gui.__closeButton, 'mousedown', dragStart);
  gui.domElement.insertBefore(gui.__resize_handle, gui.domElement.firstElementChild);
}

function setWidth(gui, w) {
  gui.domElement.style.width = w + 'px';

  if (gui.__save_row && gui.autoPlace) {
    gui.__save_row.style.width = w + 'px';
  }

  if (gui.__closeButton) {
    gui.__closeButton.style.width = w + 'px';
  }
}

function getCurrentPreset(gui, useInitialValues) {
  var toReturn = {};
  Common.each(gui.__rememberedObjects, function (val, index) {
    var savedValues = {};
    var controllerMap = gui.__rememberedObjectIndecesToControllers[index];
    Common.each(controllerMap, function (controller, property) {
      savedValues[property] = useInitialValues ? controller.initialValue : controller.getValue();
    });
    toReturn[index] = savedValues;
  });
  return toReturn;
}

function setPresetSelectIndex(gui) {
  for (var index = 0; index < gui.__preset_select.length; index++) {
    if (gui.__preset_select[index].value === gui.preset) {
      gui.__preset_select.selectedIndex = index;
    }
  }
}

function updateDisplays(controllerArray) {
  if (controllerArray.length !== 0) {
    requestAnimationFrame$1.call(window, function () {
      updateDisplays(controllerArray);
    });
  }

  Common.each(controllerArray, function (c) {
    c.updateDisplay();
  });
}

var color = {
  Color: Color,
  math: ColorMath,
  interpret: interpret
};
exports.color = color;
var controllers = {
  Controller: Controller,
  BooleanController: BooleanController,
  OptionController: OptionController,
  StringController: StringController,
  NumberController: NumberController,
  NumberControllerBox: NumberControllerBox,
  NumberControllerSlider: NumberControllerSlider,
  FunctionController: FunctionController,
  ColorController: ColorController
};
exports.controllers = controllers;
var dom$1 = {
  dom: dom
};
exports.dom = dom$1;
var gui = {
  GUI: GUI
};
exports.gui = gui;
var GUI$1 = GUI;
exports.GUI = GUI$1;
var index = {
  color: color,
  controllers: controllers,
  dom: dom$1,
  gui: gui,
  GUI: GUI$1
};
var _default = index;
exports.default = _default;
},{}],"components/imagesLoader.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function imageLoader(name) {
  if (name === 'logo') {
    return 'data:image/png;base64,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';
  }

  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAC/CAYAAABXCvbxAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAhGVYSWZNTQAqAAAACAAFARIAAwAAAAEAAQAAARoABQAAAAEAAABKARsABQAAAAEAAABSASgAAwAAAAEAAgAAh2kABAAAAAEAAABaAAAAAAAAAEgAAAABAAAASAAAAAEAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAtKADAAQAAAABAAAAvwAAAADSP8prAAAACXBIWXMAAAsTAAALEwEAmpwYAAACaGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNi4wLjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgICAgICAgICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpSZXNvbHV0aW9uVW5pdD4yPC90aWZmOlJlc29sdXRpb25Vbml0PgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+MjY1PC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjI1MDwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+MTwvZXhpZjpDb2xvclNwYWNlPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KnGT3ywAAQABJREFUeAHsvQd8XOWZPXxumT6jmZE06s2SLNuSuzHGNMuU0CFA7EASSN2EJKRv2jZEdrNpuxt+2Q27kLIJ6TghgYRQjUUzNsa4y92WrN6l6eWW7zxXNtnwz2ZNkt0vNr4wmvGUO3PvPe/znuc85dXwOtw6OjrU9vZ2pbOz83V49GcO+bQ+A2vW3K+d1gd45uBO3zOwZs0aB7w3Xv/Ot7/15g9+7V3XviskR7vmfgfUyul75K+fI3s9XUQ5Vru9rT1YNq/ucV8wstLt8nXmU8k7vvvDrz8jNEQuO++t18/lP/2O9HUDaLHO69atMy++4NqF5bWx9QXbLFVVL4KeQEpTtb+595tfvksu74n3/R9daoUDiFweHEyd/Mp2bNhwh6koiv1/9P2n3dc4Vum0O6rfcUCjo6PO4HW5rYCm6W6vx4OJidFCIp0MuDzur37wfZ/9Kj+mCOhPUJPfsZs/1VMCZNW2bWdG6OzsMOig8tZhnAHzH3eKXzcWmqqGLqC59qq1q4ui4V/ZquJPJBN2wbDsWEmFVVxUrOcLxn133/3su2ktjWXL3uvauvXewh93en/70ycGigyaE69cf/0t80zTXqop9tma7oHu8v7Tj398dy9fdyjSifeduT+5M6Cf3NtOn3fZluVVLJvOoW37vV4ULFPN5NJKJusxymMVt37201e4xycPvPvee+9NixXlTab/P4YCOLSC+5B9GXIm2xe/MRKsCVymqXiTqrjOU3W7AoqthIsj8Li82/iW7/C98rk/5nvlq1532+sI0O28uJ1w6UpU1XSXaZu2x+1RAm4XkpmsUjALmqbBKC2tvEnVP9xw3dWfuYuA+glpAVmA8odYy+Ozn9AKRRxN66Jzb6iPlIXepGjKzaZpLtN1DZZlwjQKlgXbUGBbLpc69rpD4Z/wgF83gG5vJ5w7gUAkWurz+9VkKmEW8nk1l8tBJ6g9Hl1JpdOa5ooX5s5uOWds8LZvAv+hE8s/2LBhg07KYvHx/6iAyADgN2mKslpoBf+5VvvIbZ9s1H2+W5LZ/M2ZdKI5nU6Bfp9lGHmOFk0xbQu+AKm81zcwPRrf/ye8vq+7Xb1unMLW1lZn+narropgIAgqG1Y2l3W4hN/rw8TUBDLZpDI5OekyC6n87bffGrztPW/54o//7daW1atX01kTcG7Q7RlnzrG+At7jN9Xe0KHL6wQ9QbpaqIX95U/f+MG/eNvIBsWjP+7xB/42EPA1q4pi0BCbHo9XVVRNI5hVjhI7HIlC191Hv/PDzgFB4R133HGGbvwBw/H1AmiFDplYV8Xt885SOdW7yZ+9Hh9vHsLJgltX4fH7EQqFsP6ZHW7d5TE/+pF310xl9Z/adv+b96yZ7xKgktiKpSaOHSoif+RmKatFoVht2Hs2FtuJve2bH3vw7q6ezD/vGCi5IJHXG5LJuFnIJk2f36d7fQFNqEaAA8vP7wxHInYoWCQjhtZ5Z+rEvv+A6/m6/8jrgnKIgyWgu/76W0s8unuemc/D5dKUQCAgU78DAl8ginmNxWhrrsdDBQuPPfGS9r7brrbKahcu2Pzs5h+tuP+5JzMjx77vNXIbUH12nwBZBkjPsz+IlMaqmlw+3zwV2vKCap9zeFd368btOwKKZxrvvmaVedaiFjUScmnPvXQQz+0cRiDoQyatoIiDR2YGr9eDSDiMicmpA/JjqIKIoXlFCZHnzmwndwZeF4Des2ePQxHCAf8CVVVaFFWxfV6fVsgbdMosuEg5SqMhrFrWgKbGGrg8Afzn/dvQ2z2ovuHKq82vf/kLytzW2ZeGi0svtRPxQ8rI7n1mwUjathnk56sM02y0VS2ied1Ix5OgsUfYkyrMrW3Qb75muebz+cDvRf9IHOtfHoKfGksoXAQfgYwp2P5Akaq7XAb35wC6qyt23KE8uYt45l2/OQOvF8rhHHF5eekbvX7Cyx+wAsEQQWMjSu4aKIri3CW1aKiJIZ/NYsnCKrzpusV48ond8Hl82jVr3qx84a/fZybGRi3F420mEq9Wg/6bNK/vatXlWko3MJLLF+zpqbhpkx9XlYdsVTVdK5adq3i9fiRSWRQMUygFFQ0DHFAI+n2wbBWVFeWor6slj1bSfLV/5tI8/ZsrdObRazoDrwNAd6gSyHjX+z/WODJu3JDPWAiEgiplCIQ55Wvk0H6PhgXNldDcbsdJNHNpnLeyEf6gGy++sBvzFixSrn7Th7Vv3/dt1abEhkzOLMQTZj6dNrOZrEUJziYPF6uq6fxvx+49yqPP3Ifi4ihM06IDKqdZgWUajvUu5fPTyRxCfh0fu+1Ke8G8GjqkRq65oSz9mq7emTf/P2fgtAf0hg2rnGMMoejtb752Se373nm+1VBdrGh0CIOhAJLpPObVh1FWEqISbFJp0GGIlGfl8cbrl6O7exxTQ0M4f/V5qK5qxLe//XXVgKExXE7HziBWxd5KVM92NGWh1ulsBssXXI/q8gqQjpCnq7wpYMgdbo8beWLf6/PizZcvQE1zLRqbaqErupXJcGCc2f6oM3BaA9pmWqhIbn//N38/++MfvfKdl121HM1t9XZlObNGVY0WWZesICydU0knUXf4NNU5hp915OLTCBd5cP75rThyaBSgxHf9lZfB44vhX+75DySNArz+AEyqFQJpQaKbFv7w0SN44InvYeG8uXC7XDDI0QXu8h4XZwOV3zuVyOLmy9rQ0lQJUOAjFUKspMi1b9+g64+6mmc+7FzP0/c0rFnjWLwP3H7DB+ta6mvtVMLg3K75vRrMQoEyggutjaWorYySDoioIKxBcawp7S0KU1OoaSxDTVUx4pMpaC4Fb3v7WzGnuQ1fu/tfyY2nEfAFnIFgkR8XCnns2b8XxYFGNNY3IE/Qk1JDAieyX52gHk2ZuPrCZiyaVwVDYjBEeijoxaz6mHfH/qnw6Xsx/m+O7LS10HTAGMNg1sb4zpXF0cC7s6OjBC00iKXUZkBrEVDnLa2Dz++hgybYInEgMPkHGv9h5bMAncSy6hJQhKZDx9cyGVx39WVonb0Qf/ePn0P/6DBCdCoDPj+27ngZv37mR3jT1deioryM+3TGE0FNis3H08kMLlpchdVnN9Oy21B1N2cK/q/qZn1dmX/xglkNM5d91f/N1T8Nv+W0BDSxQyw7wQ81r7g/vf2lo8Gnn91rqmIi+aLP60Iqm0dDhR+z60ocC6uK40aQOTaajxnEc4BdSMb5vEHQu6BxRBCasPM5vPHGa/DOW27D5/7xTjy98VkMDg2gc+PzuGjFWtTV1DqqhiSHKNyXxiwkYcfC06+7aK54jhxcHDQMuctPpeRsz2qswtIFNbMFY3fc0T4zEk5DwP1vH9JpqUN3dm4gGlcb3TufumnXvsnrtuwasJYtqnDyjxnXQzDgRYDKxtnzKhgd9MIqkAcLgIktZuM551xgJhbboOKhucl9yYdhZfmcBuY1EdQGFi5bjE985FP4/g++h8nkBDPl3LjoggvobIaQpWNJXcN5rwwOKiGop6XXODvkSXdcdBAVucmXkPwEGClsa6trPH7BZziKeJpnttd0Bk47QEuuhUJHcO+TD5Rs3DL0yWSmgOKo2ybNoHnmxj8aIx/L5pSiaVaM870AixSEVnRmU8WI82aRCqiOSpFPxeENFfOD4rPRptK5s8mXLSYZzWmdi9tvuw0PPvIj1NTVwkPrL/lJboJbHEYTBcfqyxdLbpOMF9mvRsdToaIi+7PtAicUFY0NjoUO8x/TpCgyyxz/TWfuTvYMnLiKJ/v+P/v3rWttdVDQuWv03YZpL2EOkpnLG5SdiVI5WtIKn1vDWfOrKZ35nX8z781x3k4cnGnkYQhgTQGjjXwuQ0udAnNPCWqhIgyDODAVS51HMBhg+DqKZ7c8gaO9Bx2VRKyyUA6Hdjjmnl9FgFvHBwp1PzDNj18pkp7srIBotKj2x/d9o+r47ziD5hMX5DXcn1aAZs6GunbtWrPjM19o8Hg87y8QqNSBlWye+rIwCptKBqf+IK1oaWkRESbRu5mbgHQGcIzkCcIcey5WlZ/jLZ8hoLk/anM8vTNPKo5TpzJQE8Ilq96AInclbIWWl4NApcWXm05LzbA2v0f4uYNc56/qmqE4zr7EU6U67Q/o5Zeed3bra7h+Z976qjNwWgGaKaIEBlBVEXuny+1tSAuiFagGAyYeas6c62WCPw42AoqPxWkTXiyWk4ESPjXjrLnImzUCkbUAkMdkw8iTYoiFdyy1YNqx1NwN6YJOgIYiHuzv3oJD3XtpmWfYnABZ8kUcCkOKoXNAiFPo0A3n1wpNFkCbtu4qQqQqOodPSIaS86rz+Myfkz4Dpw2gT1jnj33sY9VEzU0FASY9QEngLzD87PGQ/xK8znYCKo75pSWlFVUJNgGhOIcCPvlP7olaYQXOICgUsjDIpzlISBeO818OAglpFxcX46wFl2DbNgHzTEqqaNuyj5n98DP8TdQSuS8CWigHVUQZVDM32Slfd7nb+EDKz/lu55ucf575c3Jn4LQBNA/XOZaIXv5Gn9/bwgQKs8DaQZMOmhhVyddwgCP/IABf2YRy8N82wSeUQwIhBgMiDv1wQM2BIVaceBMnL81gipVlysXxQSFasxMt5A6bZ9XhkvaL0TfUDalKkcjhibC3kA2ZHcRiq5TraNKP/4TjO3KAzd+laXNZKBAh7ZGR8MrPPPPg5M7AzLx4cu/9s33XcUVAUBp42zsuWAtTxa+fPugELwwaWV0X1YF4FyALrXAUDXlMgIkFdoBDwDkW+ThW+Zzkdezas4Mh8GJUV1Yz+p3hVyjIJKfgD0QcsIrMJ3Qll8uja+/L8HsVDE8NYMPzj6D9/CuYwB9AlsEYpnw473P4NSmMjBDn+2SPMlr4S8Qx5Lis4dCo5YMpeUle4O3MdpJn4DSx0E5CPHZ1PnDurObKld6AZmeTCerOIufSwko1ilhoAS6ne4ey8hVLrLOAmhRWaIA4cGzZQe7sdnjz+MQYDvTuxcZdmzDEBCU3LatYbglxZ9Jxh2qIvpwl0LdufxFHe3YRgSrKK2swOHoUTz79cybtj/K76UhyEAl31j1els2IY0mlhEBmTSEfS9hdeHSBP8YTJY7r+QS3ztPk+swczf/F39PqhM2Z23yt4va63JpteT1kqwSfSassCfdMjpsBtFjo49tvgiiiPYtTOEM5nHuCbHfXNlreLJOJpvCrJx9CIpl0QGlyH7l8GsnUJNJUP3bu3oatO9eTojOAQroiBjcUKsF0fNQBdf9QLwfIjDrCHOrjA0pDKpHAkYNd/G6ZKCX9lPOJonLUYMYxRPuJn3rm/iTPwCkPaNvuIHLXmvbB79cQyVegkOO071ICPgY2aJAzGZZbES+OynFi9nam+xk+65wnAlkMpKgdMgCEkYyMDGHPvq10LIGSKCN8fhWdmzYgxyiftB/IM/ydTk/jwOE96CPFaG5bTPVDo7VO8vv4haQYLs2NVHIav/jld7D/wG46nkwlobWeGUgu7Nm9A1te+BUtvcwk/CLo/MXivOonpDv++8z2Ws7AKQ9oZj7MHEO0dTWJchOSSdvjUpVgQEecFlB8Ky+tM/td0EI7hJrYEfCIZCd9MWZUCj4gpGYoijiGBw/tQzzei0iolCFtD0umShDPTWPjS88ilU7y8xaGB3txeOggqpsaUVnXjFjNLOZXp8CsfxRFijE5Pib9YxAtKUb3yEFMcwA436t5kSbQd259nBHHMaQ4IIhiWmrBL3+bqdTbvf/iIyVhBYxw6zPbyZ6BUxrQvP5ysQWF2Ltv5GrHAFsFQ1SxqsoQchm2KSCIQwS3LqaWVlMw49ACclmNld9OeifBLFw4z+w6ybWYZi70nn3bUBFr4GBwQ+h3iPkfTbPnwXTb2EhLPTU6yBrBXumPh6HeIxibHEE4VoGSqmYqIQmn8FVVPCzvimDWvKW04MswkR5FIj7JX+smmJ+nmjLEn6RiamKYzzlcmtdDFBZv9Zh5YUSOi9sZQM+ch5P6e0qrHOvW3c/IoGK+7y2fnL39wPjKWc3l8Kps80XQ1lVFWA+oY5r1fMKfHamMOnOBlGTP3m0EskblogphVn6zxpDDQpw9sdIaBgf7WJpFyx6M4Zmdm5iZl0VpKIJIURFc/iBluV6MxOPwsxKwkEmj/+h+aL1ulNc2oqq6AUZmJjo4b/kK+EL8DDmPlUlidOAI0lNxlJbHsXXjT1BcXccyMKogyUn5escxFUCzILHU1PKlvIKDZwB9Ujh+5U2nNKBPHIUnGlhFJaNWU8kfxMNiIWos6kV9RQDP70mSibAyRQIZtL5GxsDk1BB6+w/hpS0Ztg+oQkVVAypKy1DFHGa2JkXPyDGMTmYxsnkTfOPjiFrMtjMPIe1mGqjqgZv8fDC7G3HTjWSIr3EGKArwMS375BgtdaQU4SgHQLQUWQZixkZ7YdCxTGQSpC276Po9g3kLFxHojEYyXySbGeesESeg/cx5FU1cCxppvezE8Z25P/kzcEoDWvI25FCraqsud0m+hMn2cASkRWrhDfoxqyGGDTsGHBrhRPxoud0S0ma1dXFJDcbzvRglt917cDO8jO5V17UgFCzDyHNbMOvQEVxQHoW3vJwf5QcllM39Smae7Ctb8BP0SQwOx9GfyaGXjGGqLopJgrqmto6/oQa0y8hPjtPBHMAEn0eW4fOjxxCqr0NyPIZ9h3ejslhB6zw3Ne5plmj5SO85NbDkcDqnlp/8ZTzzzhNn4JQF9PFgiv2Fz3RIe63zphNJmHlDhY+AEwWMqZ7NsyvhUbeTkxYoYlDVoJogwPeQO4P5y5X1c9HXcwDVgTJO9Ab27ujCgj3rcFbtHATm18LNqmxxyUQtkbC5ygDNTAqojSBfKCr1oJ5VLKm0gdHhaXQPJnC0oONA9ijCpTEGdgxWtAwhefgYyoc5G+RszgSl8CUNJB/diEBBw3ZrFL7iBizyhJhIpSoTQ3utUFEJ87SDQjnObK/xDJyygD7RXSgQK79Q83grkqmkXSiYio8eHDHolE7VVJbgrIWM8BUMAlqATg2a0pkk0x87zKheqByj41PUmScweXQc1+U8aKQD54pIQSv3Q/1OGsSwJJs7nBkQM6VTjPJxwGiuNAdLgoOELcTC5agitVjauhxdhhebH30SbcvPQnPZXISOJBEODyFSW8ngjcpZgpa+vhh5AnvuVJCzyDHsmLsdiWP7MT30OC5+81cpDUaCr/Fannk7z8ApC+gTV48Nwtsl8WgiWbAyBUsrIi2QZCElzwT9gA8rljVSKx5ytALJcRaN2OsJOlUjRw8dRP/AIfT3JvDWXAAt84qgFQngyLkJYpXgI4zppPHbuF8BNuN9tP58Pj0MtXEp3K3nIvXyehSGjjLMXcY2SAaqlq5EddfzCI/GMb+9DbnhLrZFKON+uRvmcEg00k3qkqe27SZ3X3pkGC88/W00VZWgrG6ZXVRcg57+AZL+M9trPQOnJKA7juc9f+r2T1Uxtrcyzyy4AgMeCdYJluvMcxZAC9dl8v2chjKUFPmo9xozQRO+xq5JMCipZfn6gcEcbkh40NYagyvscQpoJW1a85BeiGUW/Zp3sj+Njy3SGfbhhXvFNXDPvxBalNQkVo/EE/fAnKCenBsifw9gyYXLnTCJNIGEJ8XwN53J+vlQJoegMvii0MKrDLtLXWGkJAAto1P1mI1IbJaMJKRS0zKMzmyv8QyckietcqBSRFvKXxXzmZBRm0kmqBRk1aFh5vMQQFL/pzAfg6RUooaoqy2lH2c5faAF/JJ0VBQpR89UEmd1p3EOWxVInoVK2c5mMYB81ElnlkAMLbQk46uU/myWazEWw6ghLeycs+EuroVCRcVdPgvBi99D617GffTAZWbgLiO9iIb5XfxeZRo6Ay2u82+Ffvb13N8UFPbBUyPk8myNECoOof/AERzt2kKJMUT3QGcwx/lypkW/xiv6On/7KQnolqoWcdNoZXGeyAKZXM5g2Fs5xC5HadYQKpTphCo4vJcKxUwbARpsWlYJWQt7yBK11v4jeENTFa0nk/hpgXUOBhcdQd1LjkvrrPDfTvEs3y8BEPINBvGoCrIdQXbHs7ByCYayqa6wRMtFUHvOvpav7UIhPgEX9WV3lDWL6SnuLwv3ylsBXz3QcDbQtoY/ZpK/k6ODXN3P7o0qOyYMjByhbl3K+cBGJBI8vr7LGUS/ljHKS3TKbcrqjtVGc3Ozx+3yr5C2clz4h7xYw4FjE+gdmKA2JxKe8AZhVDxEp2LEdnRfsc7dfcfYP2MTFo8nURphZ1DiyuURy87KE4JZ42ONQRnNR0tPdURSPl+5Z9KSQg5eOLgeqa2P8Xvy/A5GGkkjDCYvWRb72U0x8sdZAsEIufVhqE3XQ6leyLcxj1r4i5v+HmcK+V2UQkhlXPDrfaiYfRkpRz2/izy8qiQnV4Z9reXuzHaSZ+CUAzQvsPObL7/8piqWM82zKckxXK2wIJacOIcXt/UwP4kyHSmEA2oGKkStMKhwDA4P4ImnnsCvf3U/4sf6EKLuy5eIPVpi4ckq6QUDJKyedSq7nSJXoSK01I5zKAODIT2F3e3USANyu36J1M5nuANGIKdGkN29gbSEjiGnAJNrIJq8N1JTMNIJTicEs1j5od3Arp8S1MwSFZ7Pm6LZmD13NhYtv5jvmfEFPQEPEX9me61n4BR0CsViOdPwAiK2TlEtk4BV46kU/JTDtu0fwoK9fVi8qA7GdJzdiuKcygdxpHs/Dux/mUEVtk/yFiE5lkKIPe5IVSQW4xhzPcjaQVpONTdKusH4BoGqe4MEZ4ADgqAnkGfqAwlEMwfbFUP6hR+R+lCxSDA/enoECpUOvW4ejCPb4OI9Kvh4x7/AOvtGqL4o7C33cT+03nQK+ftJOQhgRgkXr7gKJdX15EnCNOh4muQxZ7bXfAZOOUC3tXXZ4iidt6h+yWRGRTyZtVW2svWwebjJPA3mcuChzgN0qqTRyzRefnkL4lPdtHw6SsLM7ygqx/3PbkGgdxiRpnrHaAoLEJpi5eLQaubBw4ALuzISW7SqyT5Yo/ugFWhlvSUMskhPDoKODqclrcHsAHKbfgLLzbZ0NlNL60nrmfhUOPRreMJUTqLlKCglKOzdAL2QAqh5q75iOpNkFDZBLUoKm90I7ZGAJDcGJmXWUfmFZ7bXegZOOUDLYjqU7bBiefOCjS/3UUfOKEE6VdINP0tsGKz3S6Wz+N6vd+McrhNU00BqUKhBjimf0m9jf88YHtyyBR+trEHINxM80XzSFZQBktZL4D/7UqeiRGGIXGdTcpsqhmt8ALnu7cgdeR52dgyqN+agzzKZzSfOozvkUBabQRa9oRX5/qPUqUl9xvugl7LNRrAe5qGNM/tlZbcMCF0sNFJ0KOkc+rg0xcBuDO+qxpJzrqYgoxSSk1NE/x+2cWBIMYxko8pQxZ0OcQda1/Hf5ORdneuU1nbHaz7+BWtm5jxaCvqrM8Pq+Ct38EidnRz/N/fwW6+fePrP5f6UAvSJcPfmB/6xpCoWao2EuARE3mAyv8pmMDl2+zRZSUKqoKTpugWweRc7G1UeZN5GKYK0lnwJW375ONWGAOr4GS+5s+YjrdCpUtTOhU2H7NgDD6Aw0g9PjJ9pnY8gU0b9zKJz1TTD1XIu0rs6kdv/CC1rmJbYD5PZdiLdST8OMIPPopLCJh4E7Tg16srj/54i564TeZxJTlygyMX3sK2YXbaEEcMLYHmLMf7E95HY9SBqKpqUcPVSY/P2/ck/BCQnQNxBd4ATmdLV2a5UhhLKoC+rBJfklOHuLUqRZ6XS98Jv9h6t3GK3dQPFS5ptHAIm8h67stXrAPdOhOwOeWsnB0R7p7gSWEOQr+W+7+c9B4uzCfCPP3TunEHw/wP4TylA09bIeWJjw5Y6ritYV1XK/syEr5xlaRkQn+YszVC1VGlrRgY55kfsHTTQpvQjl2T3UV8ZHUAGXuIpVFAn1iQEzdwP9tdlk+ZGDD36KKY2/BSF4gZkUgPIfj8PX/McNLzxVtRcsAq+SlKUVW+GWtGEzPaHYU0cYQi8lFRHcqTkV9AJHO6Dd1YLDM9s6JWzkOt6gStsMe9apbNp04IjDqX8LNiNlzNpewE/50U+NYFdw2nMrYwh2b+FxxQs7OnLOxaaIX4HICfz5wSYCTI5T2pXV5s63XxIC0wUqz7NUHeqlmonLNUTjjt4c/bJnKmhhMVl5VQ7LZEepmvXBg0rO5q105ZmB4b3oqig2alm1e7qbnBA+6+GbrcR9PweVGa89uCyrfadnQJ4OHRQrHyH7JwzxP8D9P9lkJ9igJ5pJOPTQi1MivDX1UXtmlK/kqZ1lk2S86VLkXT7TDO5X6fTNWV4sHegBHXBbjp4aRRxcSD0MUNvRRDuMBs1aqw5LG1AoncAkzs3Il25nFY+B4N5zAbVtf6+BPa9469RccUCLHvXe1G/qh3+tpXQyuqQ3fsCMvvW0z+ks6iSnqhBGOPHYNY1wLXorZTy0sj1bmHAJczHR+EqbgZa3gI0rqRjyIaOA0f5+c0Y3LEJL256BC033Wz7fC5l58ubss/u9InGd9KbgJlWU6X1BLratKKiaa2gGXoRyxn1WFrL5qlr5kxdNwNajt2kvJKgxTzvLF0Flx6wc3mutjGu2H533hob44RDF8FtWWTzQQ5DzconVbus4LJypmanzbhdbOTsTESzB33H7MDOcjsVqrFf6HPbVy732D3d3WhtCFhdXcC9tPTMYbRHEbO7sM6hQTIQBOhCi076AE/yjacYoGdWh3IHgpz/daWk2G+cu7RW/9kTXQiSQpDNOusN0s44SUU5UgHKyTg8ABwzPaiLjjiJ/m9ZXMustwBU9oUGE/QsasgFllPp/kqEKMv52To3xajhYXbaT5BL95w1Fw9vHsTDD3wIaz77Vpx3y00ItcyDtvIaKAR2chOtKKu7TZcsa8F9EcjeGHl7/z6qIuTO0bdBa14LT9M5NMhsdD45iO5Hv4s99/0TmqwBDEcbsHU6g7UssD3Ql8bRibrs4qpC+mcneREFzASJ0iaWmVY5wBUzcpNRt5W23UxycjMz1U0izPnI62Klu66qtmpmCwqY7cecFRsZw3bpXJZZuuuoNNNBVi5kFSunFyyFsGaA3nLlC1bapPhJkLtDuplJKbabIPd4yimcZuxgKGHJvycnNTvM9ZCOHMnYPs1lGV1Z+wD7yae6D9nFsWbr3uYwiR8tOkkXf7ez/SmBfSoBWgHanVPAvnONQi2obWHRnAps3zeIniGGk3k90sxNlrKrPF/jCplUD5iyGfNj72GWPe0YRq7cxkfLglwjUKwzdWHKcSKVuRnO5vJqmGLOx/Pdw/jZswewc8VZTM0gF2blt0k9GUsX4r6nDuOvfnkN3vb5u1B/4XmkF4tgewOIv/Qo7AMboFSupuTHVgj8/hxpD2Z/HN5zboKvpJkV5DlsfewhbPu3DpT8qguNa5ZCDc3BgcQkVjBiWYiPYe/UbFguTzKUP+JY6K6urpOyYqyq5QlpU3tKNJc2bnq8OcOb0V0+y6X6GM73k4axf4Lh4c4ou+uaxUQu2+WwNeKKZfIU2C1VMXVTt+iVSpMbS8uR8btUkzks9KepY2psIK+T3OUVk337OPR5Yy9ixQpZbC9sKVl+0muYTIO1ldEgnYWcVXClzUyiYPqro2Z8NGXldhaM+qIGsycdsNa17jFpxLlyCLnaOjqmx9nVOqwj6P8w682TcGps4hDylypb2chi8bFNv9SKw5fJEhNk0Pqh7hF87/F9VNmSTng7kaajRsALoMUKSLrmMPOSd23dhgN7uvD4m9qwqJWNFbkApk5QK16m4vONfYeSuPvhg0hcuhyrVy7Ftx7bidTgAPas78SVixdj3i1vw4vcjy9xBJ5NL+EDa96A5WvXQI9V0ylNIbWtk23H2APELTkkjBLSyfSXzmKjGibz7z2A737rO/jiV+/BG259CxaXUJN+5OuoaliKLcyJXnZ+GwLRCw3TP09Xreym7kM9l3/pS5850Vb3vwU1f7ZCHKiTW5epcVfBremcigoFX6GgBAnQoK7qIbb7CNmaQi3I9snpIFoYSnVyCHmn8CWpAKO2osmyzVyrWYpzacr5DGNDvOe/VfaE4CumLThWNENhfzUWUjj/1rm6M1EtvIs2XrF0D3HOEW2amqmzsaCquIw8XQUzYxU8IbMQ0o3C1KDLUlMeK+WOmx2ru38riERvRLmzXdE6OmUFmte2nUoWWrQoa+KJe0IMwJWy361Dmi3eN9VE8Kb2JjzwzGEn/OzSyYFpsMRiixFOsvo7ncrQCdRYGxiAnzId505aZ44QhrmlXZc4iFX1Ply1uAg/PMaMuQvZ3b8sgu1UMkovU3D733SQa5fj6Hf+HbfccD3u4/NXfOab+H7PMZx969uYSdcMpfU8BKhl5zd/G8Gz34NRTwwDfb34xXO/wO3v/wyWv+FSSgRX4YbVq3DrTW9BRySCj93xebzx0hYMZxZw4aA6lLgVFtIa8eHN/+E4BqK//c/bGgyWbNG84+zQV/B4CprmJ0sIsVNfhKJ2hNJimEAtYjA1wINmHqHlIkipfDPcT/QQ5DL2Tdpr4ppjm5F8vmaQmhC8znOCXhpkxaBfSQbO57gQI88clXiCms6KImCn9SZhMc2Cwu5ouskvKFguvaAYWkHNm1ndrWftrJWbyqiFSGsh8b7i/Y7W/pGbV5QbvXY4ZfKFfMFFq7WLqoqo/CeO/r8d0K8+N6cOoO+8U66sbYSjPi4ySL5ANAqonbOvYsHsMrkK+N6jXTQFPNXMeDOpdrDklFZTUkdZk0I2WMGzLCmd4p1IaNxWRA/m2OB7fVEfLjy/GY1H+/HsD74Gr1WBsSkFc1adj58dPgrzxU1Ye/FKDI+MonvDs7ikpRJP3vs4Jl56EdWXXYHGN94AFxOWzGM7MeQ/hAdeeghP9k1h2+A43vWpj+OG938Ak3ffhaUtrdTNg1g5d6b9RkppIrcuJ16IJHEA7MLUdzq7cx0dttrRQZj9nu1OXvRKHFED8YymhMIupBn5gRYgTaacYxdzHZkSoraEBxzRVC2oIuJj/p8kwrKzlEHzbNBUCzPm/7TOnNNodQ2eKumtJ20UZG0jApXZBWKz+SnmhNHzIA0nU6FF52nmjYOFYOb7abVp1aUhNwHJTu6mkmfkK8sJkxldrOgs6Jniefrw4KNq5aduWvzmdG92vro3ucrO5cryybQVLit2f/rilb9mgs63lGe2PCOg5uELsH/veThxik4dQN/Bn9wBxJoaXN0Hx9xhplxGIx6Fl4HGQmUeRxaLWiooMXtw38M7sP9QP6K0RwXyX2nVJeVQZHcIc1aUs1NgsayiMjOvyM9/CzXh+WKoGyyrqo204E3ktBeMTmLNNOsFe36Nvqe/gMDsN6BnfxgHv70Oy2o1FJfHEClrQIhW1bP1UQwN7yeWUijOu/DYp2/Hj/iTi+bMQ82ShXixrBy7HnwIH1x8NhrnzsMzzz6PJ3/0A9x6zYVIVcxi1it9M/bACzLK6HPrzLCC3drqtDjjyP3dG3+y0A2lix6czxOh/aSIoWoe28oLZw7xuCK0t6XEWoxoL85bejBnPu8juNz8rFTHcxqrpLEuoTvhsTTFTf6s0atQLd05sxzxihhkyZQh5WDzeOKUSziTUkhbKksATWvsNN7WqLBDrLLQBEMoC+/zoG/J78pwqKRVjxr3VysDh7+RXZW9X/mUr+Cd7+WHkiwkzjHoVczloqUhEBdsvJWN5G/68MKWLyg7D3TIqgy8CbL/R1CfOoA+fk2nj4y4nnppwNUwqwQXndcE9st1ko+kN520zW2pL8GHbjobjz23F0++1IMBalCF9CSDGnTQxKrzjEuSvsEoi+bmuXfGP68NQ9FUXZ28jjylP7MkgmjIjwCdzNoU5be55ZgamWArgh0oua4VKVp8lQ5kKTshlZUEuX43K1IibhRVlXFF+2msvLkVZdNJxCf2wtuzF+bRn8DgZBC+4lP4xZ2PMvT+Q3z4whvxzQMh9HmKWJwb5ACj5MDfuHBO9fDM4Toi3PEj/913XZ1yBCnVHYGWV03dLvioaNhegtlPsIUIxDD/GU0ZW6KVXpTPiX2yrMhd480Y43bGGDVThSkzYwyaKfOQkTX7jAy7p7HDHh87kwWBLOyNgFeKCPQALbWP1ETlAKCFVjQCnHRDzihHja3yCph53tOKc7LhZwloJcuznvGE7PFCQvX13JW5KPtz4yba8uiYmmL2AI/YMBU2jSf55hqOk1PSncpkpb6bzuwdtzXV9CsdHd+4573LXPY9WyVt5veC+pQB9Lp1Mxr0o5t36mkjpncdncLCudNcdJ7rBJIPS3adbFlWrRQXeXHjpfPR2hTF+o0anns5j8NHE0jQ2vpz9FtIU2YyS3WYDLj4z7oCCjsk5bb/HGowTMznOCF7GBxhOzEaKZNatiygqfG7ov5Z8LK9WFGSdYfwIEo918c8EBftkT8a5GKcVDhYDlgulzNkIRGd5RQZFBeFCNoQ1OSDCNbGUHP+u9BnBvDTRw7hikWkO+T1A8Np5eyFTVi2ot4B9Jo1nTLc/oetHUWeQ0pWIylg3qtqMVzJrCouyUxXV2EvVJ/PtrcG2ss/07SwbG1DyNvMrn8Un0nGKE0QtQXWDudsw06xqCdhZc2ElReQm5Nm1pg0UsaEEc8fNlKFQ5zUthkpnpAcOw6z3tfgukkO+GlHnK7CZHKWy11vuLQAlREYXHQsT/9E1o5OTmwyG/MPaYunH880JwOs2HHTa2TSopurnLqYm84FQLhT9t8mUZmcStM+GUbfSFL/7Dvbv/jvX7qhX3nT1379vnuZ50ITdMJSH38s5+cVkJ9CgObkym3Dxh579uIiTnoePLe1B1dzmTTpnm9JyJsOoHTbzwjFIGhnN1bIgkGY1xzGlp378fxLbHm7dcSx5DLbsoE0TyKBWjYL7pom5PvYM2Oql6FxBl/EAjOcLU0WxWNy0jypuLpIWTyUBUzSExdnBS/zq1009CrNmov50+SR/LgXJQypqyztKmIY3KAerlAQp81EuHg+X+f+SyrYPiHJRP4Y11aJ4MhAwl5OynT+yjlU7TDmHCzaZ+5+z99VfG0bbx6NIgXvyYoVehYUeZw6d9IKr8ax5moIr4iFfUtEthO+zFd9lI18Tg0DT9/MwOFY/M1XCUZoW+mZGGaCNwLeSll5M2nljDhvCZ6hlJlnmCVvJXlLGGljoDCZOmRMJsbNZDzHuBLRr9uZxAuu8MDnUrMM5FVXExWRFH0bhiHFsBQI4Hw6gwT195IKUn3+FIPpv97KiG5OR83SsK/YyuR+kv3exz7redu/3CM/yO7s1DDablPew4ZYTBkdHbVPtLQ4ZQDd1tbGsOo6DKdzhfp8vhAp9mP7AVlK7QAuXd0GnQWxBk+MNB+XpY0NRu8y0gqMKC+PhbGorZoEL4muTD8vkVwoXi4mCRnMaCqQOui0wH6qFInn/pN8mgESvi6N0MknGa7mvzhYtICftIF0JE/r5iP/5pOUC6BynpYednS6HFvhYpg7GCC/oPUOUWahRODQIg+tsCyn7OeKWgXdj86dhzGV81NqtHDlyjo6pPPZD8fHeNAklwmQrdP5+/v+jLbH7Gh3ty3hazfnfx4axx/1YuGwdNpUJWkoRmuus+8Th1dRIa+NXFTEtWtll+I6vLKJCyGHSUfOeY7V7kKz+Ra2ANZK5EZP3AH8K6DPpXNspDPNBjsz7dCS/brdu7/fHjmctQt9nNmmSJ7ZNztxIKNlGizEs2mrKCVsSGcNM9N05bTyD11QpHjLDYzBH2SmIs9Z98E+HOT37dl0zKwpBILRkrp/DXzqq22Br+D9/IEzF/CVX8/ffXzVsFMG0Cd+ez6fynJgcxqTBTRV+8kXj7E4toBLLpxDp4LiB0Fd4Fxo0SqadBTzYq35Xslui5Kn+tn6K09w6rI8MvOSjcQI8kz816vqSSmq4Jp1DvKH15M/1NLa0tY5gKZKxQANYcmACcmiWGjaQwGzToaYJ+GUqhOT3+miuXPRSdVpraX63OaMwUYgvHAEBh+7XD64mRl4dCyBKX8IX3nrQrZaaEX9rFqbzTiIonyOtvw4oEdn0HXi4H/n/TokjGabCLEUnX/gKig2PSzhrpaaYaZ2WtNcqd6sb+TB7jfaC6MfraoILAm69SLdq0d0jxKimhZSXbqfLMDPo+U0AjdvPDjuLZvNITHJhpLse5KIJzAxMow4/ZL4xAT6Dx3G8OF+TO4fxXDPZvmUIp/UEFV9Mc4AjN5KPoLeSDOczNM/cKkpnscsfRIXQSuLKolFlv7dMRYKp2goGLTEQdaIvukv3oPPrWpHeXEpFXTdyth5VS0k3zP5ngXDkZa5zyWmxvybX9jyxpaWNp0+w084Sh6W03PKAJopoxyEdMgVZWrZ0mUj/kKhlfbIjkX92Lx7CD2D07j03FmYQ2cxSB6bkEqVHEO7PGXScNHLRPoIwVzDnOiETetAb1omZTVShtRT32fyHHOlWxbC07YKBfJqZWgH85YrOMFRDqaSYkv+M5OQxGmTlbNIKjF4iGt95xQEIgHavgImjSmESoMI0obJANADYrGlJwi/h2mm4rg6g4QDYFAJ4PrLlmBR82xezHIHPxLvoNFM5bMFpgzJNrNW+czj3/2XbqN9JxOFYj6YaQ/TN3JmXi1oGepnSTpb0l+MHLrg8upuktnzrM7hu5L8VWxeRnvAsUeRh+3PytjKbw4F7FqvkqzwKckST2bIpU/0p9Wx7j5l8sB2jD/zEhLkLvzfkTEEOAJ9X5kXURqDKBOtsuyZrUukhiQ7PZVgc1cPx5WN4kixUh7T8fz2fcjTLyFJ54xmkW7Rp6ABSHLYMUyJHOn/dCGDmsXz2MWqGosXL8Ls5mYW8XgZqqT3KPOcWbgjPjlp9veNorm5Rautq6EamLtlcmDyE9Gq6L+cMoDmubPvvPNO+b3ZZCq9rago2C5NYKR4NUrgDLIHxjce2I5Fs2M4l+tpN3LJ40hUkOWEV5jFkHAaM7ZUVWC85xDzmAVstLy0mlrrlUgf2ELzQlbZtAiBlWuQ3sqAWz97OjM/w2SykpNRR7Q5JpPZn9P9abbH5aKedWFaYn6OCocW9sPNho5yYRJ9IywgYJ8Pfo3UD0oZmJVj72hOtRPlyzBJoDczRZXKBnkkLbvXz12T/7Pp9DOPb5IWpeDxyt1/u5EP2B00cZLxliofNrV42CBlz/tsiwwVCYLFTe2Y8wlnI3ZlVex4JqStDNI38LnpF1J6U/cdTJQ8/ejh+hcPPRt6wwTctS/BxS8X3s1GDwALxRCoq0do3hwU8WBcnF2ksp5rPzJAxV7XdJrZvZijKYvMCGdE5kBV1IhfUIyp8Wm2JE7h2NQ0ptgyYoj0Q+GsxQaujmfnIuXjEEBzXREqw25KqTnsHAQOJLO442/vxOEjvfj0xz+MuuoahhwMFvKzCabXbe/evYOhe+Dsc1c48qHP53N73J73J5PJ9acSoLFnzx4HT5OT04+wa+ft/pCXiQckYTR/fk7xJvvHbdnVg11sLLN0bgXOaqtEJfM2ZhqUM52Uuctza6t5okdIN3ilpMcGgeWfvwwudlNCNkErzCgsm8EwXcfh2AyY8Y1kk7S4RAWvNC0tE5qypBpt82JomF2CBLkk09tgkdLIlSphBNAWj51qiB6heibUg9RHV9iveu512JtkeNweYeIUW/Xy5vTlo20mgcHYWGLq8htvcSJoJ4oZ+AP+2+0O/rh1y7ZauUeaLRTnDNPHWFxe0wsqPQmeGeKdG0V4W2HnD2R0T0KftHKul54bnX1sU6q56uVw/Tn5isAKavbPvjSNfH0AS2nukWeDPTq3XvJ+hkYcjTzH0UICweOgJkdrLM0p/VR+6MPxObZGo7pjE9DT9F2GphI4vL+XPUrY8oGFEsGQz14+tw77+4ZpUU3Wc7qVafovH7ykDue31rCbg4Kp4QmUbj+IfHAWV5mpRXdPN3p7pUc3i5L5GaEoXq9bCRcxbYDzZL6Q0/w6w7/0F/hacyAQuO6UAjSdQqcBOK/Qhk/+Zcd63eO6nOgyvH6/Luv/CfA81KXFe36pizkYR8bQWB3EnPowu5G6UVJSghaC68WRGhybHEBjWZQnl9IVOZs7FCX4WOBKrp1kGqlxcD0Th6ppffPicDh8WLdpIWilJVQWYjHtnn3j6B/PoqHCh2LSmXQizTYJbGRDl0VlvzvHOvO3qAStwgY07tbr0c+gzZ4XvodFcxeSc7PUitxaHFeF3NpkydeLL3b18ECS/E7qcJyvT2KTBB/4asyi6kMFfUxXC35vWsvwwxrnfw4nNqekRK3khsPpgUP7EjW1DwTX3pCds7StsVSveV8RO6VydqBTNnJsWPnu4zuxsyeJeeyqmh5iFTvpVChCnTwQYtyc+ee0yHbWYAtin6wIQ3lTdWjW8PAk9u8/yoKLPOmdi0U65WyFNpdJXSn+DNMOuANqZoKOYpLOd0TDMNMZr1oQw4rqItsn8XQertR3NlcUYzYt9LqpDD56Havl+R2T5OuSnqC7Ob/lMtbo2KhSGiuhNsMLwWMXR3Ym0cEqnFKAll/PaViOwsgks19iHWE7e9B5jDyjq+xoLm2+RHlIsDBWEsmIGBzsjWPnoTGUBmw01dIp5HzX0FCHZ/dnUSKROWpumTgrSjjqVZ2BtXiSFSnPspCW4ObnxaEUL1yny+OSSZjCFwkdHVACn3nyz27qxlO8wNddPg9KMbuIEtAaAysxdu33BVRkWOfIK0qnlIEfdjZ9YdfLTp62tFPwcWlmZxFOqiE5WvPnnz+IbfuGt88cp/zllfofNl5TGW9Ae6d179ZlBmdsxcN0OI0BbsY4zKDtMnOalX3av3/wg13nnPuWrsB7axeHWsLMQFQ8zFPisCEfoqhuo76mBG9ZORs7+g/AZM5Lamia5WwFmIkCPOUM/JCm2TwXBf5WF9s/5KwcDvXQCg96MNI/hlB1DE0cAFEO7kiR3yZNsLK6qvW/MKjkas1keknuoKdWdec2Go3TMH3nlBexH0keo4PsY6JrBp1Dta66FKt7hoxI2KvEIiFmQenqeJLfx/kmwoSbQj6njo8zduAPmNNTcctd7rPc5I0U0jewOv+bwvBOqa2zs5Pphvdrn/z0R46uXH5epdfvO1tcNroM1JjEMaduxZvTGIZHxjwFxzEcnkxj14ER7D/KyhVekCRB1MPIX4uLqaMkZFZ5PVy0QhaXbMsd2MwoIothZUyQZlAOYzKxzAAkBVKHSEVOVIxI1EN64cE0QfxS1yj6BycRY/C3blYZimcVc1AwMEN+bDBK6Y/WYXfWi+d2bUVzjTQ6Z+ieXUaLWB6Wylr2k0/tV/oGp5OFzPg/rF//WF97u6LIsZ7MxenoYD70nVDqbh6kWlNl+/o0RgETljelq0eC6eTBdDz/b9su+kDTZOgzZX5vueJRRIJnjI/2VYybHCilS4k2yWphew4eQz+zZaltUzunQsPuTpJlG2eDnTiNwATLzI4eG6CeTzeW68hUVrOvNrNDasuKEQuHOIuRxCcySqo7qabosWlX69sqP+D5xdy1xU+1XlL8lG+OvokT42iZV93hypoZJWdGCsmcN58TnqwpVdGwNpv5gaGpHsUzOWHUKnFW2sRfmlACP+f56KkoL7cmJhMVpGqazxdgSpQ1mUmlP+wL+HY7NvtkTtqf03vYm0MT+rHm6jXVzfPndwYiERbDGaaHfrtBAIoSIfcF0gWZIifGmHxPfVoe5/n8yPgkOwdMgBMkrteZODTfh/D8C+A553LGj1NIP/UdynAa98FrzAEhqTzUDhwu6GWuCCdaJNkbemKU0hvbieUYnIlPUd5iBcjiubVomVPDfndhcvI8W5QlOaDSSEfa8PV9dBRpFOc2zkYli2drq8gd2VLh8ed7jKFxW/e7zMdvueVN1/ALyFqdCfWkAC3Xhph0ruWdnaIVN+hky+7Ns5H7/LbKojlTsX/3WdqNo9Nc/4Xsye3z0KZJ91RKibS6YtUk+U4NMTOfKx7c8+ONLDgIIkZ/Ik7UxpMp0gueTx5JdmyKa8pUO23T/Fymg3nQCFI7ziQytMgcJiSzKuODjMra1ll4qfgqV2flSvdBMrkci97z7E417SvVRxnRjG+P8CqsH1bP/b53diTpOotZJB/lrEV1T3vE79YrXGphSYmerF2yqAX91uxMd/fUVed/7b4NI0ePVvziiUfeXlZa3V5RWXlgsLf/B9evvf5FoWmnHOWQiydgpoyn89b/gcpq2ifl+x6/R+XsypPr57Sfp6yWZqKLi86b6NU+0hA6fASzh0GXMoaox2mVayby+Gq3zrUEE7g9+QAqSQGs+SugBEphJ2X9E1ppclwuSEuVhHghj+vrj+PYIG9DGYwlaH35tI80pIIWH8KrJ20cY3XL8vOLEOP0i8QY9FAMjx4dwwib0TQ0NTpEQn5nKp3HE+u3Yizlo+MT4qoCQ7/g4eU7NmzQldWrxRs92U1Zu3aN+ulLjqh3vPca5ld0SH5x9mjH4kjYH/2G26dcN5FJGVxnUSNfp3pI8IpVFjmSb7TpbBn0PdS4KBYqSooDGKAkaVDefHp/P2YzVyXAWaqIvfrKa8pRVhphQCqPCUpnpDXwuTgv0brnk3ktOcbq+iZ1a/Am/Zf1V/t2eAKaUUhZ0gUir3o0xg6t9FR3Jqe6DXPeiKZGWyPJt6079DR/xtN/sarxmdJUYfoLz+06wH/r76hoqLn4/OrztB6cXyjzlNvNiyRpC2WzZg3x7ksE8D9zVnbOEx/zoUI3/xTeCGiVN+tjH/7MPZGS4vfKKins8ukKMGtrjCmeGh1FCW5It1D2j+aNTRQZghaZLEmAj49POEUBT7Mq5Sp1Gp9cSQnp0huRi7NKZYrrrHAgCF/MpU22P5jElsEUVZQRjKdtlFaFEGGpVnVJkTgrmKBl8zMnIUSqMjzCJpBzSnDLpc1MWspgE0Pg/9p1DEuqy1k9Q2WkspqDLIxfbuhG0ghYzfV1dG0xnBgfueiv/urDXTwmGay/F9BikdcRxBL+ZQBVcHkiesZRhJYIYos/sbrs7UVuddXIdNaYVRHUlrTElLa5ZWBXJmdwS+CEMOA0xBmIgJaWDR5a7EdfPIorvv4C3tZSTZ7tQ00pG/LwfT0HeiXcgrKqmOOs5aczViAWtjiD6WMDUxjPxLe7LnL/cO5t4WdLat256RHTZ+WZfUqVhYEnJ8qtW7kc4zjZLKPoeSVYCKiDhaJjmh3NRI21a/dQEAXu5wy8lkZLHr96E+DyOYVGjYOYy/nN/FscaOf9p6SFfvVB7tzT9XdLFy9c6Q36FsSnJo1cvqC3UIcWD7xnJMVlIiiZuRgAKJYLSflHIogEexGt4jT/fWFZGC+P27jtF4P4Yu5nVCCamKvB7qCcZpnMSPCnKP7n0TdSYMuuSsxnPsfwRBLD01PoHR0jCJjDQetdQqubYbfTbtKR5IZhvHlZFEMMJHxtRz+qWWin6Tq1Wy+ZiIFfrN+JgWkPWuqKCURdNXLpA4cObe+VY6NcJzPQqw9T4TPKqo52tb01RpDIBf/NRf/mLefOp+29prrYe1nEryx4et9o8fOb46LKmOGgoW/fdBA/wz7c8JaFWPPGRWzATjmRrT+cjA86egabXEqPEYY0EWZgahaDPA0cgKkUZ7vpLHLU7MXPLmYWImVntvST9FGGkwqGOpEpHBwpn7qn5a+iD7ZeFogP7bZCk305zatrCXp6TDAtWFRWDacjPfOgcm5PIVxjFfypKSPfUGNGFzZaUkDLUiyNhbX22g7nuJzjbV2zRlnDtIc7eTZ4TsQMO5OKnJzjVlkevgJ+QfspvfEgHWv2znfeflEsFv0VNXbfwHjaetf1i9RF1BT/BbwAAEAASURBVDf7WGs4ODKFw/2TGJ7MIc4AwBTF/ilaa52DOpuYRpaacZrh3UFy7a6Bcdx7QRHaF5AHkyOy8oNws+DTdRxjMOW5g0xXlfAaTeQkZbqpJAMsyRwC5KRVvNgVlAYlcHBeDTVr1oz8465BTJJAzq2tZMQsgqpYGbZ3cdm4YwbKmZRUWlJuVMYqabgy933wg7e+XRzeE4k23I1yZ0eHgs5O9Y4NnaQSv6V6RNfMKztrfK9+2aKVpW2lJd5lzG6LkciiPKJi/pzSgrfIrz750pDW35tnNNBgm4ck9r3cjWvfshTvXnsWXAxkOFaaCDA4aCnmOjPYvkMDuO2LL2DJ3GrYjIj6KdHl6cVJD25vKGBQtdFyk1klYRTGkpnM3dM3T3zribvW9H+n+2Bo4PC0hzF0C5TkZXOzIsDLcoMEK8aVfMoK+Xxmrmja1LNeyzMdtqLU0EV2vIO3Vx3fzA5e499THtByvCdA/Z53fegT1bUV/zQwnjJvvHi2elk7U06JCgmapuidTxOAAr6h8RStbRyD4wn0UjIanWD/Oybzjw4OY4xBl3HmJ/z1JSV487kNtGQshqNREEczx4Gw78AUupgL52JNIGMPpNUUCnklfLToRUw8sgsq2mdpqCpT8feU9HaZOhZWlSJSTBJAQB/uTuKlvVk2lCkh9w5SG4+ZQW+RtnRe5VcuveKqT9HhdbeNjlqtsZj9qmlX+8ZbV1QurAktYmzn2ljQczZX3lqwpy+u/et392B0bAjVVaVmeiJtD2TTqqwu8/G/vRgrzmrArzd24/knjtEPsMnXucjR7l584QvXcSZiIxzmwUgzSovBkCw5PZ01HOkbwwe+tgmL6mucBCKWjjs5yjyXlOkVPcV85Ymx9A+nw8qXHz88vNu2O9R/evwBX6pkzC4qr7fjWo+SHOWv5BaMUbMcqGR24bhVzH4e0sQGrTGrFZ1sazADZHnfnwLMzn7kz2mwKQS13OwP3PaRb6ue0DsWthQbb71mCQMu1NhIB4g73nOW5ExpkGZI5ClJ/VgAPskGNcNjVD3Y727vwV5s33UYW7kS1o1NOv7yxmWoqgiDBXF0NrkEG+lEYjqNvoFp9MWpbhDAJJEsbPKigk7h/BovGupC+NrWXvyE+deXz6pkBC3CjL9iVrSkcf9jfZhdSx7rDaGBUctMRjGvvXi5dvFFbZ/3BRr/5lXXInjF0vL5lbq2fLwncalPCyy4/MK6SnaM8kgxQzjgIf+O2P6QR9m8j5Xq9x9S3UwksZh/UkTr37WlG3/7pStx9tI63P2fm7DjyW5yBuJrXxof/9hyXHZBI5O5KGuSakiyV4azFmv/sPfAID523y4srivD1FjCDvo9zJalN03UTWbTL1Al+odH4+lfy28lM3JjFaw97bDbOmeUFrS3y0u/tQmAJQG4jSCWF8Qiy/2fCsiyL9lOCw7N45CTI5C1B/Y9/bFY06p5w2OBFeOT8UJFLMLQCT0oOj7848h5NELk1C4nN0HaGVTFAswniGDp/GpMnNOEnr452M9Aya+e2YF33r0ZX711MdqY9OQrCkKjHCeJNdW01g3MmEtStisiT64sLqImHaZmq+Prz+zB5w+O4FZKePwiJ8F/hDPCLx4/Cp2ungwmFkYizVBbjJ9b3b6IaaUs9+P217etqe7btqvtnefXXF1R7DuPSkRLxOcKUmHDD5/rwTt+vN2uYsJpHYnQEElCa1GJevu7luDa9nlobirHP33pGQY8TJTENCw5vwU/+ubLWPjlSlx2YQue+uFuMGDKeB9LE4gkMGQvKxYYFAmllpELfjIRSGFZIjPi2OWApSRWPp3WCnT6UgVzIFnI3/WzgZG7+TNTbJEnap8A2nHkxElFuzwjW6fz99V//mv9zZ8ayCe+63QBNE9sh3Vcn556R1XrLbsPWo/0DdQ2lZWEWGzCEmSef5YO0eeRrDdeVTmj7AskPfHEYktVv87no+Ews/NcLKsqQtOscrxALv3ZjXvwkWQBK+aUoojBA5vo8lKzLaNiUlZZhDLSiWLmcpiUCL/28y34q19tx9UXzGXJBuOLfG+BwN0oaa7cRxXD7XFGI0MBSocM79505TLFzzySI117Ll4B3LNrw+728f3Ds7aW+lyVpW7SJGYbUUJvKAvaVy6tUlYtq1Z/sP6Qa8f6PixpizLd0sLf3fUkRrnvW29ehttuX4HPfvrn5MIqyioYtDlocem6cTpzflS1MrOQUbYRTKCcfQHZSYlrjmedQFSegRWVyUaSGtE/nTY0j0fNG4aWzps5puPe15PM/PNLicR+AU47hymVFXHEHCsrz/1vAVT2/Vq20wbQctCiT7/3ve913XvvvQeBc29Z2hL7eWtTabnLozNtgmoruaLkJUtRreR7SPjZKQaQaJ5DQyRpf+YqBTmlV1UouOR8H739Mjy28wieeKKP+T/bUFYWk1xsBzQugr8kOk0rTUcxmsdus5dN08PI8PNBCaXxkm+jyrFhyyDm1IacooMgwZynYjqfOSALGktombOMsgXOfvS+m8+eYirlwb4p+6Gn9hifeLhHbYef84qljfM9SzhLfPDW5firt5+F/2Ta5tM/6kVtWwirz23Dt77ZiZaWGM5e3IBLr1qA5x/eiwCVjAH00gLnkU6rdqo/Y/UmUli2qEIpZe7oAFNuczmeGLZwYFDbZqRe6R1O2z/f1MOcKg+OjU09OpHOfeXFdOopOb+0sBppg9U5k0EqT/3Zbc608Wf3q/6IH7R161ZLQL116y96ntyQ7jpvRc01jbXFPlobKnas3SRwpQJcNpl15Y8EGgTgkigkffGcwINoU5Q8VcaepBq5vryY7aGL0WNQhvvpVoy6s5ik/HeYGvbuQ8fwtz/Zh6XtUcyrKcbPf3oYtbPCdPrczJ7LYv2mISYwhaiaMHeB3xfh/qYtL95xxVzMm1VBrZcZgZ6A7U0cMyMB025qKFdWL6rWlsa8ytY9I8psArWROQ5J5lF/6MHtuIqzxjWr5+AQl1se3EnpzUfakOawoOa+akWD4/w+v/EQilkZPzY6ba25bpF1oGdC/dn6bcyVCKo3nMU+8SxMjcfTDLOQaPAws9mCuu/YhHr3kwfU7++dfrGlSP3kI0PTf9MP63AHxbwYbwTzK/KYnL8/x+20A7ScZAG1yF/r1t114P6tqQNXntVwSTk7zHAZN6bvzoB6Jt9DErZmtDDRiAW8Yr3lOQG1pHVKvw6hh8y5pSUO08pWYkFzFX74wMuw40xZndSQn2YHFwZffFW00kTHi3vHEStn1386jPsOMlef/DRASiIJSgHq1PunFbz7sjloXzGbNYt+pkQynO4OKvb0uIrpw4RYQJG1EufVRDmYLDzwSC9ipV7q3ZTjWNlx189expsvmYP5TaV4qnOQZUvk4yNpBoI0rDq3Hj294/ZjLxyla6hY7efVa00VIfWeX+6emBiafuSKs2r2M+9ifHQ6PZIrmD3JtLH1wMD08w9t7d36gYf3924fSf1bxxWNf/mNrQNbObmIEqGRNDvS2p8jgF/9m04ryvFfD0603A0MIa9evfqBL/xHRfvnPnLlhxpqo0ayYDAfnW4ivRiHXzCDTkAs/54Bs3BpqaOT0iAmJZFTBlivKD0z8kxQz0byqKmpRn1dLd734a844bkKqiA+Sq8bvncIEVIA5iQxCplhSX6aoXeFucABlh2l2J0li52jXnzk2gacv4y97GhRM+kULbmslBXGtIvNIjmDCMXnGKCD6cLlXDj06NVT+MGvutE2p4wyYggL2Ahp05ZjuPyiOWg6O4ojLw1ySeZpzK+ssyQyt/kgtW/y3Aj9g6Cu9/386QMPfHf7sftkrL/w1BE5Td53NES83+meEoeOtv23tw5Worfz85zAxCL/2Vvl//rrT1tAy0GuZgqabCNTmWNf+fZT+OBNK5RGVoIzDZ4ZcCYDIDOZeW7mYUhdi+RtSDrn4d4x7D44PMOzCewgM+ykq5EIJUUMG8vyFxe2r8ATD30Nn//CPXj4hT04tzQMTzaFoT2U9ZiqmsxNSSCe1jPAyhZSHIJrXmMZPn1+k7NcszTGiXNdFsZs4GUeRNg/hSMpL6qzUZT7WNnB2ULqtzXKgdctn4Wnd/UxKJRjhh+zkpmrPDbJQAeThagL26MTkxbTRtWVc0vVXfv68bmH9tpX1xZvYuLGj/79kT2P7IXUmzqbkCwOFWQJZsn3cDZHoeCj45MVj9LRKWZ4mfOOU+fPaQ3ojvZ2dHR2Ym5d+Bhjr8ad//6wevvNF9iLF8yiIk1pigWgGrVlaTPgIaWQ/Gm2nSZYUnjwhV4n+kc8E+r8Tyw4r6vU/pQV6YwIBlkVU4vPfOr9KP+P72H7Y5sRZj5wkTnO4AVT2gjq8jKpRtGpnATR2BBDM9NKZzcxJM99xdlvT6c+zu6KdDD90Ef70T2QZippI8plome+ptRdC6oqmUux5oIW/MP3tyPMbL0XmWtyedFs9gfIWDuYI8LeqNoV3Pfw0NSxLz+w90l+5EEuitv5g0PjTrEtz4PO88ChwwOZ2Zz4saCb26sjdCfeM/PqKfb3tAY0Omeuxsho+lhdfTBFbhy+9mPftu76+BXK6pVtUhZEKyfT+0zKKTkHlQtWtlAdqCn2EtxuJuywYoUcQBbgFK12ih0G9vUn8fLhSTy0sQcXzK/F0lWXgvwUfTv2sei2CP5MHBMJWvSoSZ2ZCUyVAZSXSDdbA5NcGxGsdZQWMNIUJ62xCbtfHEwDvd39GPSVoC0dRjF1Ddtkk1AqJcLnW2dxASKCL53OWBJVrom41Re292jPHR3HeXWlW5M+7Ru3/mTb43zpqBz1Dw5NoIO0YQ8/QzC/2to6GT7yvtNtOy2dwhMXKbY8pkh/5aa6Oi8Tj29itXbYq2Wt7/7wQXWK0cEo83hlKThZw1BypeUmM7KYqO37BxzOLCX2Eml04jIMWFDwYwqqhjCXgCvlagBHmNQ/miFGK2owyRL/1MgI1YygQw/izH3wMO2U1RgcHOyuxAEinS58rEBno6MZhYU0RyrSE6Ql29kOIMO1ym2E0eim/Mf/TKlX5DMjedN47KmDCp1KbV5dlF35rOzdT+59trKo6IvjAc9fP7Fv8Fn+7ClJ8FnXBq1jgxP0sLrufMUqnzgtp/X9aQ1ogtm5eOxrYlSW1V5t2Ebd1PSkVV5Woq5/5mWs+9UzKKKaIBl14vsY7AUkCThMcOIindNsoh6XxomU1DgeSB2IK/JMOpAMNWqSYUdlJCBBFoJVDTBXY9YcBkuYBDXUzxW2AkxXZaYa5wAP98c1YRxn08UBIj2pRQMXBUUUFT/TVPs5KrYdSaGMAY8JVzkC5NAV1iEwj9jmcs3W+t0D+oatfUq0JvT8qIJvfX3jsc8PXlnxlWObhzczJyX9oQ81e/xfWqgEruq2N7TDWn0Cth10D07c7jzx5Ol7f1oDmpdNkejhc889l52/cNkqtq5flEpN24lEQi0uDqKBc/hDz+3CfnYwSnOdS4uAlqJYMcqiV2/cPUzASmSRp4kA4+4IZrJvBk1Ib3nPxwx7sJETP8BADblw3ey5zIcextGRQU4KASQSOUxMcIkKAtpPqy4KitN+gUCWe9lkJdveoQR2HZkg/aB0yAhmr12GsuSUHcOQ8vzRpPoP9z2/rXx28d/hnNLPPvxE7xP8WM89981WlGuqvJfdsljNnWda4wcG9dTBefq6x2v1tX0rlfa2tXY7OhUaazhYFmCf5qA+3QHNqN5arbu701q5eNlcJvdfksokMBhPKq6JMXjpmEmzxxRXnH305SPYt30vua/0ccuz5s9NYE4zM4+l+wS4TedNgO2076V1Za0R+fSkA0rphCTNHKWIIBgKo75pDiaP7Ect124pooIyzCy2/4+9NwGzqz7PPP9nufu9tW+qUpV2CSQhEBIS4GALLywGA3Yi2rEz8RLHnk4m6Z44maQTP49F93TS3el2nnSnnYl7uv10EicdZGxjE9tgAzKbWGQEEhJoQWuVVPty9+Us83vPrbLABpzMZNpRyQeu7q27nuU933m/7f1mzuWp12BQfQtjlwGYQoQCtHoOVbF37NS0ef7IeHR1UESljB864y6xDxw48uqdf/TNzw5/7JbfO/bAi49t+s9rnQ0392Y27OxPngs6rXZS6bXZ2Vit0Wrf/7P7qndv/ETj8IPD3p7dh/0dVnfs0MSG8PCGu42AvYffjaz1Igb1ogf0Fz+6w/7vePjP918bo+kbHl2KxcbGw5bqlEWDGzXSdXNGze8xeCz1EEePDpvH9hwgFowzhmLsy2c0u0WPASBWVe1dcThvGqndCvXEpTxAJfCMnHJERxSKy7a0mSs2bDLB0ecRTafAjROik6RH5dSMyfNTLag9aWKXKIz+EbiPAuhXTk2Z/iU9zFSUAqoXlELXnum6bOSGm1d/5rF/9Rejr66+eYnv1qzMUL9pTTTsxqzNXIeq/cWbHyscWHXCe/6yDy5/+4bVN79zw7qf2b69f+7f/McHJ951w7L4yTNz4cThDdaGhdvODfbh3X+32S1aw4tpkbFYtEsI3aBXJ0oMfPdT7/qFYjzzf6X8uYxfnIMGB0qvQDU8M4v4+Vihbl6ZrJg9Z+hEoVeQ1r5I7b91ABF1lEKXDPabHGpAGWqeXfgxesY4eshYIahSYqYLHfho6jEoiD7RRFwlpCvN3KlXzZP/5Y8BaDvhwQIpaiRzp0vGvaLPbLhqGe1Y7Yi2t0Z9kI89N2qOjlTNiqElZmjZchzJGEmduL9syVJnenz8hUPJZz8Ye/8r46l9gy2BUwwsSjqPvCdVKO3JO1s+P32tGa58MJFIviPekhzKoCHHleHMdNj45L+97/EHf/PPN2X2+R3+no/tUSJFDoP55L5PxvoL/eGuG3f9cAREL1+0y6IFNIrvtkUF3sl/flVbqmfJ5yC/H27Uq/FqjdZPrvIaTxHxYexvtBP4pwogx+C8R8eK5gB6HsfOl81Yvm5OE59uQxXpsg2Xm46lg9CKLEIr3HhOjbjqJC9RS1yjMRdDTTob1VF0pjtbO82rex83x751H6nvNmOV55hw4przdIF4VNJdhgbGOmLZSZzOh58YQZw2hp5Hi+lC7T/LnMRW5htmsi2NXDwZK5dnH3+x4y8+lb6mK59oWxUMnxx2rri/us09Xv1YfbJ2M45vrES3yky1GHD1aGzoW4bqRnjgj+478q6RcGQK5zN89OSjyQMPHegpNUZLv/u//cGUUKvifJpqI5BftCh+zYovSsqBw2ZZN+4JX3nbulz39hX3dranf67KeCo621ATIqMLKbagGwvdJqrjcGihSiER3odM7/plHWYzmnWbBjJm09IWs3UJXc+Igz938ATyYGTxSMKIT1dQOtVNoTxFK1TzQR9ds28QOqLmgs6+ATOHWufMyOlIWMYnmdOCIHsniZMzB86ZAsMB88Sjj9NNnmDV1DIn/1N+KIFERV4cJgQ2evv6Vwwmtq8cG3/hhdj/GH73yse8306MeZ+m3evyRF/KqbdZCJNXQjPVoOkkcFaviHvvu7Gn/8PvWzHXs+XuFznm144VT/yHgpX/TH3Su/a9t950/l98+nc6V6/75LnX4OGif7gYLTQJtl3ga1cw+/u3/GFrT+tvIrfbaNBsTLrbapBSkAOnaThRpIKkimw0eIxAKf00CQkpXlym/3CG4ZtFGkhnsdxPn5w2f/PEsGlZQl305RupMe5UchFKkYtALIndDKluCdOUURyqUm/c0U5CBEry/T/+fQZ70qRLplFFT7kWNOFoPJ1BEqFAKeokE7csxBtzjJqTmn87LV4xLHdrR0ckAYyVDjoo6B7b/8i5YHKqp629k5GCJkR5OQgG4nahVLNqdMjk86F5Vx9a0zclw95Mh1WuerPHTraffvBsx6qBzkR2rjhtvv/8YTO4qa/0tq3bawPJoX92+/vf/5fzDacRq7+YUY0tWFxLeO9OXUL9kX/57s2ZjpaPS0yceR4YYcwfPFet+oKwWo64i7Jw4sKq4VCyQ9aanHMUfchR1hnIVLqMWSYBc2Oyh8IjZkQ+f85MPfuk8TZfY7q7u6MCI43EiNPt4SmziIOZI9volGpmcnrUrBxcaTZ8+OPmpS/9N5NC06KB+IzPTBft/DSqmxlat/rQFJmaGTVjCKDXOlA0JcVtGoy7oJGlM6Bib2LYHp05HDippf2JZZ1hzQ29iualtTlO0a9Gyp1pKvJqgxap+bipJhPWi85keJnT3XbVZUHb0PI+cy61zm/nhHn79hvsL/7VXyefzjyX2TLo3cJq/OViQcGioxy78ODvwYO/57YNv5ZszdwEbtGXcqiF4xIOb6YZP7qHJygB2KQdJE3UqZGgtDNOxAIFcCw0YFeGj5ukdPVZsZUlFEmksOIvjZZMQLy54ErEHF1nzL1ODGURZwkD1mg+TfCdfCyqmsu1d5qZl16kFqSIAhPC4nyXehQHaftatZouGAqO0lj6PoAcUtyMarlZmbbN0qDAtG1q55LEvHNdVqwd5bqkb5VcRKBbQgt1dDKankHtK0qlS0tk1eak2ZTrM4cQ3wvTtbDLSgU99jgtZ3Gnnu63O3r6rPZ0Jtzz7b12Op5Mbd2y9fB733vbCWJ67JE9F7WVXlSAls21dh8Ovsjhv/KOjb/DJX4FoxmiuJjmoQhwYrpNqgEAAWuC2o0081AYGg/ISHFzE0AVoosWWXW+WNV5So1reGcPCRKHdPmriJ1b4yjYI72b4mSow49dvi8Jxy5TbqqYtX5ecj5JnLx4R7spPfO8cajMc7HIc7zwnndfbt65uS+q9agi3dvgs0P0LQ6kLQYSwaEdkj0tCVOnY7tGXKaW8O1a1rIqNE9r0E6dkw3hzqgtTPJnnUs6zZI1MRxK36wo95rvB1OWnfbsPq/DStRPo+d/HlqigUgt9slXjjROhsPdWzZe1fHQNx/+651mjx0F8+65eO21rnqLZ5GGBZ3fV330qj5iXisxx8rMQTWohUC64JXhGUJjc+Ys4bkiQ4bkfPWhIrqyK2U2UCy/kpFwLkkSKY4K0Oo5xMY2U9f03Em6Da5icrmY2YE2dCGkzBSxmOoICRku5T39S0wRvtxDI0AHdSJl1JR8rCeTtZEImDbtS3tMYcNyLH4BB5CCJYLUJ1mnEsPuz3MynEcbI0eUI9WRIr5N4RKZTJ+rQc1WCh0xmIyCic1BRym6Xd2QKV7Md5FGXUCttrSZa6ryqMXMiCmYpZ0xc+P0kHmidBatz9PmuhAlp/JJqMxRU4t9wKzdeLW9e9+fIaT3Tsn3WtY9XBbmz+OLFRSLC9DzR2HF6v4uRizlxIULxar1wDMnzZcfO0JvXcJcT2H9NavbTY5Ex8mxvNlLVdp9X30VFSXL3H7TWvO+d64xywC2vEQ3XmMyLFoVZO48hmn6gDpA31hFRq0tlrmmr2pOo06fICY9/uKLEkI0NSjL8Mg504MDmJDHOJs3PpMB8pUShUfUcCR4DovqLmWwEF0tZSzto6fPmhGulato3yLEbWoZTh7JfbKOumpocgozJqgohTJh8Z0sQ5G4UmgdG4Tq6MRBV45RrZO+KTE5oBctkaTbYeot05ysgdkxMWCewTI/ET9orrXXmC5riold5aCrv89Z4a1AML/0rxXWM7siOLMVF++yKAHNRZgZQY5TIt77b/7iWfMqtRTXXU78GImr3hboAbTDw9q2kPG7YqDDDGEVZcgPnpgyT3z7rPnV37zWDA60MiSHsBxd0bMzFUS3q5wcZAZLHqI1dXOeMtJx5MDcyTIajcSP4cSJ557FiuPo9cYNom7q1jY2PPj8cGCS65aYVppufbdsprHwfgt0ge7vDq4IXYOtJFK4KnQ41Enj4El7lDEbmmYpPWpZXgwvJxXuLOuZxPmT3EB+tsx91gy0ELcmtJjdzDmMSuoMqqj7CTFevpZ5gEuo2Gv3zLZzbeapxqh5xn7Z3Oh3IZUbC8se/Yj4vas7V48Jwrvm/7t44cwV+WJe+Tdb94lyvdzO8JzH9p6kSbQYblvVax16ddYUER/feiXK8gOExODGc0Q8RucaZmS8QPQiYYa6Osw5Zuj96T1Pm+4+xM+ZW5GfICLBf0nG7ISE3Mpw5wozGMrQALfVIWQHn0aCNCXZMPr9ktAXF62NGcBfxunLQT2Wb2YQzvp01ORayAbmhRfQkTtWNh1MiTqf4CTppcC/zSVryUBPuHwFy65hOg6/iWKnsbHUCWqyXVEerDti1Uzhotm2pQ+Bmy6TtJMoFJG9RO00Np00K1ctN8Mnes1j33vUbNuaN/VB+h3bLDM42WJejp8z12Q7gsnRM84rZwvjtfTJ3/r4xz8+sfPenc6unbsCMH1RL4sM0M2jMdQan8ZKFUYmit2lWd8cR+L18nXtqPgnzWC31EJR+SfdXa07popUri2hc+LM4zS3knE2vWuJQlDHoRYoEnwERFysIfKyOHkan+pSnL+EoqYKPLfCrJVsd8LMQCUmZDUpSJo9iHopVwE8OrNqFdZ7I4DtmTOHD1N1R4QjR0uXoesl24KjSsFSJJIIaCUnYHFzeN0ByC7hPFaP5lcOExV5ZIZg0DANaqhTDvohLtcadDnCVqhQB+tSkLuANDRhvHYAnghXmu8+8rS5c+egqaLTUWL9mDjMlSNmPXDwKfPoy4368mO1aJ7Lhu4Ja7c85ot8WVyA/iwHBEynYrNTZ8fiI0dG51Yu3dAWbuxvM8fPVc2ERiu01s1KxBafPlIyX36G5tREYFa2UqAPCGpkAz2sbZVLucJmQCc6vHGctBRyAyq2T1I5l0XSoEGoz69Oa3yZOU4h0zQRkMYI06xI1i2TwAUArU8gPdtnm++fQ76XoZ07bsuaV18NzasZRjR7RFMAtQAtCxzvxonUb2J5MccRzQgBMWcGsXA4N1zacmqcSJxMVPTlcTgnuAJU4fYOI1IKkwr3QSEczV70+YqkWXX5gDn/DM0G6NaFcO68UzdLUGEdnXa8vzh5PlY7N5Wf7e6a5oxvNvfIJWxu8kUL7EUFaLAgQNvWb+ytfO6aoUfTHakb1vS2hN+mQ3qgp9PcsrXdXH/lEvPQ/nFmrOQNarGIB2G5mOZk4VhpeE+S8BtBAgTAOaY4czU4sITM1fE9QxRi+FTZ3DJESnwjjbDYtgpW/5k9MyZ93EVJFMvJpT1HBCLUVQBejNyFyfI82gRmDotep2Z6cI3N1QBxcSIsDllCl0SImyUGzk+JJ6vJT9V9DoCOEVJU/XU6xWzz3jazbfD9NNFuMvnaGfPC+EPmhdlpqAxp/CLyv9ARhHzpU0yYONQlgX61B6eGWcHHSdAzrK032eYfO5aPvfrVl868964NH/7m1w4dvO7epakdO/bU9kSn78X9z6ICtA7FvYeMdTf3T80Wzt3Q3muePHjeWjPUwWDKuDW4sst8/cCU+d//5IS5aiOoJVWNBH00O88jWqCRvNLm0HW9lkSpk8jHaZxB62wRJ484MN+7bBn47hojde2YPc9T/7wSZSUczWHQmMoxh5UC/RQDedJw6TQVfFL0tAZw8NpCM0p+pEQ8W1MEEu38lgZzksSxAJ8PGGOMU1aGkGw84jPqYRRdrpjlHQVz3eA7zFX9HzBdyS0Y0VbTRx9iR2opZOjPzdNjk4xspgcygM8DXLV8KToygQDlXAP64y6P+iYJSIaJRsIZGy8MsykfAcwv3HH/23JX3xGrHNo9bCGNJMus20W7LDpALxyJgXRq+alTssIt4VBPzrr5tnVoOTfM5790wtywhZkgxIcbhMNqmieIdXZQNSowRMjCUqaW5NDPmGKgfNWsRbVCHSWZVteUZgLmEibN8+cAYXvCvP8jLebgiwwMCsom2wV/lUjiqg6ToylWpaQJwn0EhrGu0AX+mxyPU+PRzFRm+B2b8Js4s6iFxmOqVM8FyNhnnEnbLOksm8s7l5it/Z8wy9reCbiH2Dzey3/EOgD39eaagRkzWvy/zauUEOJB8nqzJ/L4yTPhyclnze13DRo0dsJ8ueLTsR6zJr0x0x3+kglv3fvpBypdZzprpd27u+2dO3d595pdinRqVS9aUC86QCMiGC3HzxWTl7W3oEuXM7fduT7S1viPXzpkPJIZoolU30WTnWQGNUSyk4GTbXDhzIoucxqH8ejBhlnGZZ/IHgkMY7r6GGsWIDZDSpvZjzwmPwHvplvWrNkQmv2jjKRYylB4MnqkpwEGvwNHdjRdiu/J0wjIGB04PM9BMyIAC8hYUl9cg7CfrGucjGYmUzWX9YXmumXvAdC30/d4JWuMzEK0LBBdYY4wZGabWd+7j6TMK4QMGVDZCMJKaTQsVQ/amzfZiJ+nyJr71pRTsJcRI0/PWHPtt3afNM+ezZatuN8+VbfWbzhsDu1mtzQt9PzvXJx3iw7QC4cB1a/RTgC14wbmUHNp3/fiefPw/lmztJ9BQoBZlW42lXeaATywqdX0DzE0Bzpw/4tTJoN+okCfICogw5mE0zIE0eT6mPo02zDuIMmOuIfMF/FpwhA9HfQL8pkY1MOBD0sg3WWCqo1lTlDr4QFkxbkRJaBlFkBCM/TFcvZUU6JMn6S/Ygk4btskVnej2TLwATOQu4HGAcTCo0UA1lrp1lwiSFudUI8VfP9+aV37ybDgZOITVmt/rpGoxwMPzl9IBVSpOsXhiWrhaKLypXtNS/UTozm30uLX4rl+NJtPGOQOFsWyaAH9nbnCmV/bdkW4tDdre/ly+OwrU1ZIw2uaJMjJaUYUQ5RJZXCZJ+SFdfwaFvmffniV+ei6grn3O1OmfQnd3Dh9GUJocfhtDS7cujRLEb9nOmMMH8LSj0+liHM36FgJzXKSHUkiFQ5zC+XdVbHMFhZY360pUxIo19QcPcYQRwkShQ/jnCiqD8lmCC32Jsz2wV8wl3XdSnPu5QAM51InQAS1BSDrGT2nky4whcYRc7r4Mg5rg0Ggo2N2iwe5SJTqlnvI9usF1FHZeudVmPy544PB2MnBzPht5bpd4tMeivpxw8TdxYJm9tOiA/SGHTus3agl3b2qrbJpYy/FdYEzyeiJx1+aQfgQYKkWg66RIlELDytdR9O5RjH+2HnAhw5dRjHmpYx6A3ze81haRGFSpLFzqIcKqJr4GhSz5siTDcbBNUzn6ix6cxCCnrRJIE6jctUAfs6keBIzQA5Ai04ok00NUwRe8eaYbjhvMQqQBjpmAPJ2czVOX2+GsXKmY95aLtCL+T8Bsiy0/mMMphmrPm2ePX+fefLVl8LqGXxbGhsnelufDRPhLJnsKb8tNmW5iWnmcM/x0QJyHf6mUpCuhHYR6YWgnpsOZ+rx8MTKLeH7tnxBX37RL4sO0J/9lW6UglAO/40dq9q6mdqDvToxXHD2DVfNViISFRIjGEkycnEiDmT9AJZNzHbb9rj5zoPHSWjYZuW2QV6bNUf3IaRIJjCuugwGuquqLYA/675/Jf2AxIKJxjE2mD5DKuIqNAQECpxgOYkGcsIASMyxmgaU8Ysj2qjRrQSMoRfEKnJz5sol3ebawQ+ZVR3voXRjJYBSSuaHrbJw1gSzQjA1/6Q5Pvdts3fkG+YACk6lcU5Grhx2nHpCqowcCD4tk6qZZeCwHyPxSMoxsGvkzS078JB/Zyi2F6aw0HXE9baY7+sHotOEfy5qYC8qQEf4YdxZ/uf7u5jh8Iuk8TjQFSZbofzJlqq8Uny2xj0To6LG1iQ8Ow9t6KPewcbKksEwI6/MmdmTvulfl2b6E2lvai9UT6H4cBqpryrWnTHaJtHFMHfAU+eHkek1hJyxzNhP7qnBJiMJMeCEQe4oapDV9NaQ9Hs8VjereurmuqF3mit67zRdqauBU24esj9qlZvPyCoXzWTlOfM8VvmZM0+h5ZGhHgSzz0mqSfKWw0pFo+WtKha6wtnE0GWnSvKQWAs1TnShkb5n/miMmx1M5luYPJAP+2sUjJhdfD+35o9dtKBeVIA2DKLU7D53w+XvCmuNTV69FpTqdfsQgF5DU2qUsCCqoLnURaIVctAivlv0zJlDsBOoyNQUZaWEwBJc9bPUWGQZ2p7pyWAX0cqgA8Wl6s0h5OZzYpQRprHg2LLK0qnTqAp9n833C8jRTY9JXbt8NzlIGmfHzdala6AYHzDLWt9BRnsQIMksLgB5gSvz9A+ehRYFp+H+D5q9p+8zLwxPwZdzZCrpW8fB5Qw1FuOZg6Sdx9ksANsqpdYQKICtwKECLICZchDOtyQjEatBLERgfXk1GBtJhadSFbMjAvT8quinL9JlcQF6J0eBsB21dhulk2FsPxyZrthPna2Y1Z0JQMEhBogYUWiABtKTWaMWIkM8uMBYYHHfZcuz1B6TBYRXy5r7UayaFDP0xIaOSNJWI9Ai4BLJ0OsqGFK9hQAcjXeAG4sn6/1y+BwmmyXcGXN5j8Eq/xxTzW5DV+MKVpaoCf8Kzk1evICiBXjr2ZKZrnzf7Mcq7z39PXN6EiH1CnKNrKsG/lio+rNhjLDyLX8gdRphxwLeZ5VMYwmtBoLPpuo07HrAAMMwsBoMm8db9f1GvBYUzsyE2Uo1zN66Ptyls2cRLIsL0PMHpM7Y1zQUgZSJB5icAWjFDCnldqxpqaSC+GYcWFYW3sGNIUFLE2acsssyllu1FHF1pZB2pr/WlKYbcGKcPNLINqlxm+8hYBxRDIE4FhUWqbhIN9EM3ctCc0/RUl/rFCnrq8zWKBT3MxhRcu7RsgDk11tlQVzPNIKz5uTMQ+ap0/eaF89NUFraSsMA0RkoT0iJaYhlDmucUSXPDtxw1OlPH8Zi1/zQKjJtqxw4djlEtSEgm281XIgJY600IstO+939Nb88ngviS0w4o9i9jMEiWBYVoOdzKub8icn/kfeCj6Zb3JVUYDZ+84ZO598/MW2fh1q0EcUocJlWFIL6oEhXo0JkIoeVDgoUzhORULgtgRSYQGxJaw5wqkhISZAQq+sD+KigCKscm7fCeo8+J8sc9SQSIsxkiwwGypprhz5i1nbearKxdUDmjUJxQpKs8gKUy+hr7Dcvjt5nnjolq5xiWDxgphgpwCoLyAATcFPuX/Ftula82FVtj9ppdxzFgzr9itTdmSIuYNl2fJKiTo2umXra8es2s+TDVMrzKrmg1HMiODXeHe7YuSG8l0sbV66L3kq/1jRor16ciwwdi47GF76wxf3Up77fePCfrNrY3dH6Z10d6esZlm6YvuD98WOT7ikq0fDlTEEZQkCdAJSKRnSk4KBQhwLjg+NQCaWjHcAs0AukgQDLey0ArPS0rLJArOZavS4KEnWP83csSfNrR4XoxXbqL+4wPYTi7NeE4gTb1y4XoEziJRhmXb9jnjqz27wwMhpZ5YCri1q5QhUuRY+p0IZqAGSohmfZy7IPZ7d1Pch7Gnwz40BNkVFABavhF8lcllzbLdMDWSmHcOpqst6WKTXKy2l6mSr4MydWBht27m5Sjp8C+rWH5Sf0eB7Mu0DJod07rQnqej+wdNj59TXHa1t2trf+5yUrP93WkfydjrZ47PhU1f/is1PW987XrYGsYsNEPQBxLImWPvXPHTkHKQGG7wBOrF1UAceEYaguFW/z8eQEYBZlEYgv3HgO602Rm2lvmTNXLemDYtw5H4pbwY75u1wImckSWeWvAuZHzMnJJCDmKiGiAHjFl6MhmVjmOn9bFS+0K/S0WAzkumnJn8Zb3XFoCCFmq0DcsISPUESqgX6EACvtVFIpC7/Vq/vZeCM/Me4lV1a9ifHuoHuiG+WH3XgXLD8FtPbCT2h5jVW+x+wCzIes9pUn7JkTVauYHbK2m+lEZqDV/61ND5a//ulrPtAbd/+gozW2Rkr53z1RNA+eKZu8wnfUXjgJcIEoR4LALQYW7k3foOqUKb90qYCLrDGOnUCrKjgBWfzYglaIXihEF0+Vzeouj6q4d0EzbsfibwYfF0JxP2yVm9cTwQjqEzCOYvYR89TZ3WY//Yj54jxXhmLIIiuKAb0wDZoJPO7lCMarfujiCIY+SZSb+j/nDKVO4NTWI0Abt4SYTiVlB7iw2OSkVQ3zbiMWG69Xgk7vbJyzY4fxunc3wawjuBjoRrQd+ueiWuaBrHXe9RqrrL9TlZTTm2J4dj3uBK2O01asx7oDO7ELUcNf/vz5Ve85Hf5Se9K5iajt0hMz1eTBiZp1CktHy7PtJWwyEvQDxkIroTLOCKzUtGGdXSyyaqPVNRJyrxCcAK02KTUIdLcWyfIxDGjgTjPUuoO3DbA2kc3Tav3QskBT9bqs8ovmwNhXzZOnv2NOTJBprMbhyVhl0QvASwgOC418gcJyANnlZgvQ/C0rTUjbMtd1fq5xY/dDzgxtCVANOsUrYeiRA7WqDSuoZWuJ+kwq0YiZWTWOe6WJiWCiuzvYsWNH8FmzCyPPsgisc3Mz9O/FsnCEFuAgq7znnj02g9NNd8+E3Rcfsk694jrd7dNOgKx+nGYUiuhcerYTHYGbmu4O/b+CErz7eGXgiil/VU9o9REoyI3HLH/4wPSNtdHqdSbjMofetpM4iLLOmvsn+qFi/QXKEVXFCcw8l06XzGXUX1w3eGtUf5GLr2dPXgjF/SiotfZNoHviynOPmKfP3Gf2DZ82M3nUkgiwiGJE3bUAOgDQcv4aAFjgjvHYpRLQ5TUb+QKLVAkaqI6/IvtX0x9Z+p8S4+T/oBrxGDa8TmQDitHIZpByL3ikX7wMvLn03OIFs2D8dyF3et9PdnkdvVjgynustbcXrLOtPVSyr7dnM3N2MtmADGed2pQXg10iW+GiZVhP5B07npgLUr8S+ul8e9o9ucQ5d8g2U/GGn2mJ2cmWoWSx9PBoZzjrraVLmxpPcn3UjKIdh1UmzAyPVgRDFrlpleumvz1vtg1sMZv77zJLstcSiu6e30daWYG2CdzmkxfiypFVrh0wB0e/ap7AKh+fiFMfQkMuLCBQkkSNsIBXAG4AYDl/jIgFzNy4F91waRNzcf9s7jUSrjJS6S/P1uqZRKyCPgetklbVTjXqrp8lmFFpxMSqEzW/VM4HG7DMBsus69tr13B+5S/6u3/sgP7BhXAXCLmH3S3HT1zZpKrW0fFuey2BZG/inIO4CoFhP1bz0tTihHHPd+JU18Xj1MWR807Sepds+Myeojappehl260AbSIr3SgxVCrlOKm3L/le9fnJNsDUw98hJZ5kXnAcRTcAdRTBIOTXkp0zm/o6yPR90KxW/YW7krXiDT+IeP0wTJpWWc96wTlzJv+oeebsfZQjnzBTssq0emFHAbMiGE2LLMvsCbyyyNyLYujeoWBKNRtIqAJk6YRg0jkJ7LLfFR/nxaV2wUX62m23q3Ur7s1MVfxcLO5VE7WgODsRbK8tDQ7hBG4AzLsWVvgHe5gVXATLP15Av84qN50+RTDWrjxhnR3vsbNtszY20ZmZqThICLgc1FjWTcWCRiNuBWK42FmixpRtpsIwoLKIsnrLyoROkCZKl/YRyEJchfbugDGvYc5OO7HUVe3P148VboDXZARqyjuZfynnz8Xpq5kVHTWK7t8BoO8wnVH9hSZWyRZfoBIXMPFaq1w1c7WD5qWx+83jp79pjo+jtoRVloMn3bwoLDcPZhIlkXV24M1xnEDRC4vXIlBjkb0KtdV4cEFQM408yqi8P9mSaWujHmV6fbKYGfcZvZipWwXoSNr3nem6X6xMhJXUUj8CMzHnXWa3VnhhxS+s8iJ49I8P0PNA1r7dFVnlXVjlQ1E4rrun266P0y7X49pxr80NSwWn0UI6r1GLV9NUZPpunFQ07p2VgHIkqThLcfRTADmNxp1aPjLoe0mjgHueC4M07j0yocg/e0HGzsat+OrWY95oeQNNJjEbnTqXup3Olhlz9cByCu/fTyvUjT+ov9A6Nu3xm1tlPxw1Z+f2mGeGKSg6e5Spti0AmDYsrLIvnszNB7Ckr5vcGW7sYI05Ew0NNFEDgk3pnk122yW4lqDn0aUslWQ2PSwxq1Iukg+tJBLnKu7MkqXl5JmppF3I+pke16szmFMOYKV7aRSea8abFy+YdTz+cQEaMDdNh6Y2LVhluPLOgpXZk3PilRM2zaBOZ6FAnQ3GK+O6iYofa6Bf67ge2ZA69WwmEdh2KrQDEtRWiu4jajaNercBsIVVFqiZ84qVFuUA0CngyOMwSXd1ys5Q9N6fGQ3yjaXpVMla10MQYdldZn2PWqE2sMuku6Sz7o2tchPiAnjdFOq0No3fb5449U1zdByB9ErHPJCbVlkOX1SPATg1VoC4MtaY0lLYQwJaQfoa4GKdye6QcEcgEl6PyI2LLodHw4FPbbZPwZRtxa30uBXu6W6vfZIZRzNLZxvTrW3BoCkEp2ggVDRDB3sxW2Ztn5Z/HIB+Hb1oOn1m5yEjrtwHvXD3dtuMtwTE7Q7BKBfmiLHC6fNw+mKNOKW+NC+ZhBfYKSS1kgTg0iQV0rwnFQHYg2rYcGaqP6l8yERUA6FZfjbFGcRYqsh6K6GtiHTCzYVBb3upuLXj8tzVA3eZ/pzqL3oiCIt6Np2+5g688O8CxaBiOZwww4XHsMi7ub1sxmbhyvNWOXL+ZJWhG3L8QqzxQrUcWT8Sezh6lnoROWUAax0FJsZ18rOcEDNMoeUksPEMShNzWG04fQZBGcn5nkT3zPyZV2m92WuPL/cmho+GR4mDK3EiKO9apJz5wv5vPvrJAxp8LFjlu3dT/kmRTPsMCZLDVate6LYrju/EgnNwhJjTKNNmES+6sVqCFjkGPhC9wGClQugFmbGEjVXGxmFtAS43B0sMXDK8JhWCjLgxDqMsM0C2U+AhST28LHQCtkxsIyTrPZO8siOb2t73ocSq1pvDlLOGl+X0vRm90CtNa410oik1XjEvT3zdPH7qG+bQqI+MQTs6enBlLG8YdbMIyE2ebAHoGNlrFRoFZVliLDJ/N6qolsoJJAaNmi4Uh04bmgnqeYGbNHyddAl8mthLmEA4khEUXukcInxsXPXepQGJk1BAFsX4LCun60W0NC8rC38tyvufHKDnrfLCXhWY5fR1H56wz75zyMpOzNp2vuFCOZ2WalLHFQFarsYY4cDBKjvoeNb9lAOYCcUm6cOAUgisBhrBLbQyAfyYvyN6QZ1RGuCnscBYZCvJY5zFEG9S9XFWImZXk0O5fHJ733WpTZ3vS3antpMUb5uHahOwC+t64X7BKuOkmWlzvvCEeXYYq3zmgBmfw+mjGjlYiGAAXvFl0YwovgxgxYPJuEfRCx/rrCL9BiOSFZaLEzl04MrkIZk70TB11Jyw29HU2ioikkXA7XK5aSFsZyVjxcnZPPkhNEnuafW7178mA6iVvQSAvHBMfjKAngezYCKufPdrnD7CAU5XwbdjmW672jFNZjrlug0vVqeCt0CvdbyuIk1q3MIggdAEFMIichxALQCrbafpbsrSaYQjCFcWsAMq2cWRbYuMB5bahCkoCcqKlChbKMjZQbw1MZvc3Nmb3tb3oeTy3LsIbizDmL9ZK1Rz112AMnWa6C2/MvUN8+Sp+1H2RzMPqyxHT7cmT5bz13ysbF90w/lTgb6oB91QkW6dAJ20UFBSvFthPJoGPHiyDbApAkUJCWtMkVJ9rmqyZDDT9HMxIZE2MHd0t1uZlVHY+Vnj7zTztRla1UsIzNrc/7mAfo1V3sWuBsxmz5499tqVOH0FOX1Ve3TCRvOlDlf2HdpO3Qro9bHGMWLLfmAx/4EAQN2ndAirHDpQCyIVAWAmDIc5zVgu3BgQY+AiJ5CrckQxUNOXGgGKGMSiCRaggYFyQBlaUUlt73lnemPn7Yn2xFUY9OyPtcpCSZNHS+TlKazyvWbvme8jsdtBKK4ZH16wxqrFEIAFbnFmSu4jymGLC3NT0kSAjcGRY5FVxlBTgcFEzchCx1BEClB1kmaHZBc8hhFlqB/J0ueo72yoHcyDLo+ZUvvM7tjd95BEgWdEyyUGZm3z/zxAz4N5F2hQcuQQPz7RvcdSKG5mrttJdszZpZFxJ5Fow3Dixhdr8bCDfIbnEb0CyCRFxJGdgHhyHP6L3BtWWSK3ohdpRj9kIrqh0BxUA/tGZEPOnoOoF48tdLKUsMYq23Y90ZWeSG7tWp2+pveu5ED27YxPGeDj/A+cm2DV49cusslNKKsNtuIdM0en/pZs39fMgXPoSJe6ouQIcXB17/2AJ0cWGiArwycHkBltEcUIxakBdIwwnGiHxfP1QilyEKXlQbcJ68HpB+apcY7kwwIsNrVU0RyYagm10WKVHQVztwONbTNRr+sXYD+7or8uyX/+/wf0D9GLKKZ8mAQJaesiaevqXNXpDqad6emYk0r1wJMLbqUSjyXSiXi9TJKEcBoXf0Jx4rwA1fJTyANAIaATCB0RsxJnxuHTPeCOohhYZfINvJ+BggH5PQuHj6oMlT/HZxOXt5n0tT3vT13WeRvJmPVE9FR/oRVtQvZHkbBAMAT3OTNe2mv2jezGKj9nRqbboA30HEoREVAKmNRYAF7+BsCKYAjgkWVW/YWyfTwnMIs3qwOdguzmSYBzGKOjVZY4kskF1JLvFflxaC+vQz9q8GnYhymUG3qLpirXrcCLAM3ocV65tJcfNkP/cHvjDYActfnsPuwUszUr29aNyAWRMs91CDlEoThoxetCcbYbS9DnmuL5JO1SUEYAzS0CbwRmAC1+DJAVV8bOYa2jEJw4c0JOHxfqBGG6hIMjOZCZTm7vuSp9Vfcdyb7U9RSMNkNxbw5kARiwATBL3d3BifDIxAPWE6fuMwfHqsgWoCsN4CI6AZCbxUTiyABanBlAL1AMgVcWWrRDwJdik3gxSfYoWSKg67HNvU6KWqFiYkRHWlsoQUW0ZpYwHTMHo0gJal9I7yI4Ansm/vKKkzFv/1bRTLAvdHpc0qD+hwf064DcpBdRyjpXsGaov8hQfxHP5ezSOKIQgc31P+9abjLmpUM3oC9Z/aR+2IAeuCQ6CKm5dpI5xgKouHFWYEZ4AipBylr0AosM2jgnsOBkPeDHuscqgxOpbOD0ZWKzyU1dudS1fbelVrXcEmuG4iAr/NfcAW+0Gy5YZYm6TFafDV6Y/Erl8VNPWKfPZdNhHQdNYuOATelodZQs0AuF3BYoRhPQAFu0Y95SC9AJ5BIUrnOIHSpRIo09gZzJoMSeKyRMqhB9jYlLmALx56liHWrR3Dghll+W9IeTDc3XHjDm/TyljWDTL+3lH5ZyvAmYVd6pQqLuely1yjb1F24q3rTKdTQBEkQwGiXqL3D4OFAUEKH84tKUj8XFmYNK4PDh/JEoyXKJhk4QuVDKmuewnSRIpGSojB/RC04IWWTS3XHXKSdW5Aqpa3vflr6i645EV/Ka14Ximlz5RwGwAGUF4+rB6fDE3Le9vee/UnlhulQu1ftpAC/3BuV6CmcUkX/MKpZTcWRFMiKaAaAdPRaABWRAGigkR2GRAE6V0nzTLVsLdwqo9RSo6dg2VWasVOeYnUI8mt5sM1srR5MDqnSpuyAZG00OEuSykgg2wbrMEW0B4Xt7d/Sn/rp0l38YQC8YOvbjrteE4VRIpKq4TLrbbo+scsqt0p9MRo+5rqGrUFwYeKSuNQKnkbBrDuUJOH2ob5EsAMCAV3FlHD4Uu9NwhIhihDYcmZgzQBZ/VmIEJRdOBLJ8kVV2vHhbYjK1uWtpalvfRwjF3ejGrKEfG4qTgZOJawK9YKZq+4IDE1+rPTX6VPl0MUcramsdLo9YtBv4E9UVAjNXjygB0oxgUAkHiD1iyQIzPX3QBq41RDAaPJYuno81DxGv8aVLzWcFZE5Q6q2x+IyR05QApt6SJqf4iM8QS9cZGulTA95Io5oNYcSXsbgJ0PKvxTfe6DKjly6p5f8boF8HZO3QC4VEa3cUrDr1F6a+0iqNTzglr+K4NCcnbKrikikekulLEIqEN65aAABAAElEQVSrqfZC1hirjEBAQM0yNg2Q2kQtFMEAzLLCRDQwZ4pkNGmFEiW8j6MVxZSx5sSUqXt2i8nVbY3UtT23ptZ33JZoi2/iI3yUN74VV46u1hFXxgIGJ82pwncbe8/fV9k/Oc2Q1o4qthj1C+Ye0ydCZV4e9HWFRa9F5pPqPsuOsn0CNEVEcOMgSpQQkgPMssge4ud1RmL44sj8rayhCo7iTAfAseM9yiryHpxFOYENfUZrPG+V+Ra+q4lavZ3Lk57CTTSnuf/pMr8H/t8D+ofA3GxQJQxnJuxUZQgwI2dCK1S8UnTCXIYMRuBWQrrwwjizUH00sfwkHRoJDmoz04fTh5RVFMlAn43oBTFmRSyowWBdI1DLKgO8FIIpohjEkzkRlLLmsWPX4z2p6eQ1PetTW7rvTPVnbyAUh+gEoBCQm1YXbP/IIqusV3nNKpnZ+v7gwORXak+ef6J8spCpeH4nFcu4dwHVGKFdhdfjrdl54t4zAjQFTXwBUWKAzN8Rl1bbVBRnJpZMuwAJFAQeCb3JYocadQFKI10N1kXgFlCrQLNIOQZdgSL/0fmlKbQ6QJHq7jyYcS50BqsTDENtyqx8nqdMd/QJPbq0l78/oOeBzM4ky3chphwV3dOgmunutpN1utpiUnoj5MoVN0HRPaQwRnsTGb56IgxULEcEwnJSYZwKN+ox8M+JVDgZUtkAlmyfAK7UddNCy9GTRQbQZPxUuxHVXxCwpZwhE8snN7QncPo+lFzTdkss467TyxxrrazW9I2ArAO/AGYsYjAcni5+13vm/Fer35+aKOer7YgEyCpTeCxZLZtGU1Qw+K4KDGAuLCOOi9VFJE7ai9ACGmoBoya7etwU6ZBQupw+D47tqXYooiE4goIitzjSvhZceU51zeLWrCZtBXpbtG6qINGaC/DRY/6Ad+E6LByEEP3UaAP1gZ8u7IG/H6AX9iMfvId9vSAbsJYIRoKY8tKls/ZwjUuhDWKLtELVvFgsG7o+pZ0OTju7nk5N6iY8myxfM11N5AIgN+uSdbzCqNxzvryzSSsAtgLFygbKOMkih5Hj5zrVxFA2n7qm95rUVTh91F9wuJkCGy1aWcHhjRYBWWDRf2UzVz8QHJz6Klb50fKJfBo99BYBGX04m4IfwMxkY064MidalWxzgVcajfFqhsmVpDFlbbnhbjK6EFOLw4eDqMo5/YLGKTewzgFUAxUjjDsghzfbNOEq3jw9S/iPCEmzaH8ewAI8/+vggHeCODxgiaw15hqxJCuDA0lVUhx/IklN1E85dHMX/T0ADT4EAgGZmoGo4H7B6ZuZY4LO/ooTzwZ2LMe4dTS0amWUkbPYXzuIUWSToD05GaNuOfCxyjbUIrK2zTpljFuUrub4NpMkeg3rrGIjfo5MHx0nFBRxXOUfkbZmskN8OrGpqzO9tXdnelXLe+hnXcHLPy4Up61esMrQ1nAkPFN8xH929KvVfRPDpdlqG1bYAcwIbqHcyVubVjm0KjwucSJVOR0n/bP5vmC81kUFXUgdRuQYwh0ANO1UgFkhOy4dUWRDseeoco6VVtWcMoBEYLgxJYuaDMWWYzoZsMqcqWwcwoycD7CWaCHFSfOMFelOx6nfSHGLUc1Cs2QY1MNkuh4idGfMDm57uF3qy4+30K+zyrsi/YuoKo5QXJ1QXPv5fttTp3U3V9d01mHedAzvLxa4AJk6ZWhznJBVMrSdFHKCRDDsFDEruDFgnQ/Jcd2MapShjFFBEceKKvrIassyy0GkTlmTISx0Xkrxla315LU9b09v7HpfvD2xmcN9oRXqra1y0yZjdJEDk1W+v/7U6Hcrr86lyzWvA+lZVRv7Nd6FGqOpAGCmDnLvhCVS7wgPWWV8wFn/pakbrXydQA1s3ieFp7AcUQsfXTykuego4dMKu6kIH0C7AFnDMusaHQdnlsxuhddEMyQYqVSIqJEwLOPOW6IMicCp1yX9Kx3qbEsyOiksODkHjn7YSLOpS+/bo39+uryFhX4dkF9fSFSk6N7MtTDxIG6XHM+pFwOGq9JVSgiO+ZKID/tx+CcUgzCaj/PnqMJN8WLCctRgcPQyXL7VRUI8WZm+KIqhtLUeK3Ih5zClbB8WFYvM9zh+sjM5k9zStTy1pffO5GD2HVTFLQUEWD3+awIZcLzhcuEdXnjOnC3u8faNfrXy3MSZyjRcGSAj2yJ3LWRyWyjLDFcOy0grlcFiiROtBHhrJueO1p4c22QOF7YquhFHz0NcWVlAi6J8l41BOc7UAatCEJGZBdgxionqUBOVhmqWYIWSUuls4EhE1xQGbXHeAl5unJ3RZSjNA80nVJcKER6T4juUkKlD2Il3W/ii9ADL6pshnRA/XZp74I0t9DyYd83TC701KiSaIEFi6LSmp8+jLmaaWs4W38GTo+Dek7Z9gmxtnasmITTVKVsUBlFQREdJVBVHvJV+PgA93zWCXYuiFxxO6AUAVueIUtfMv8SmKa4cp1iBGZKF5LpWJ31t752pdR23MJtnI+eCWqGalk3/vvGyAGTBXVb5YPDS9NfrT55/CKuclFWuQWsUZAPM6L4FWGa4Mt9V4bepFOKxZlk2cAxbYuONI3Od4Z7xOx0PefyGkirElgnFxZh3qKE/Cr3J+fMAeCRGA62Qdh6YjKIf4sn4DAims16AUM6hgKwblDqiFno9OkV5XZ+T7p7u+RpCftATzWTBQ6TOBauPU5GMraB+VZQj2MMKX+rLjwKaI8v+i7iyMbt4dMicoBWqR1Z5aYs9WMAqj4+T/WhzczkqaapomFSTMaoPaIOSs6YyTWLK3OMOpkJPRfYq5yTbF/gA2FWHCVEMeLOyfUqQCMwcM/6GKxOKk2UXmN1aoj87l9zWdUVqc8/7k33pa13H6ps/Zj/eKgvogrofnjcjpce8Z0bvq+4bP1GeqrZDL2yE/ImCg3R+FwCHohY4fvBlrDInHXN1whIGsUZ19aR3vmJXvnb2F2L5RoedcH0mZjm1gjJ/WGf2IgQjii3HoBbsnGh+ivajB3+g+QDOzJbzD1rj0YkYgVkrx5sUitNDyDv1HABdjwGyntcijh19iNc0ZIgSWdWK2LLg6HJs3LmhEd91KEogzn9j83OX4r8XAD1vlXUQolYo7iOrvGHCzsGV1WmdwyoHWGXP9EATmdRRrSbi6F8QuWC2B2Yaa0zEDqdPbVEkQLDIFNOrIi6qhiPNi/M3X4Oh3EBkla2ohapZSERVHFNubILVWeovNnZm09t7/5fk6tabYmlXrVBvJkX72kMnq7wA5ZrJNw6Gr0x/o/7E6HfLx2Zj5YbfDZjJ6xFXFpB5K1J2EVcGwBYWmRtih3hpRYHcySUmsLpe7cunf8UaLq1yWtJ05dpOheIhxZYz1FpojLFS3IpaaBKty5pqRIWsrRY5gsSvI4uKkeYcxgrrPbxM4CPiySo40mOG10a0QxuxELaThaH6MNLv8Dg5MvC6SqFm1ThZMimzpWe2Z4sx43t/mv5uUjh2YXPZBQ5UdC8gKxRnUitJWyOF3BF3UuMV188QiiPbl3G8GOMY4nH6+phxkLAbjMcjCkEmGMmWKEtLvQUWGX5MWCnbjCfzmEwfQFHkohnlEL2InD1FLvgekiQuVnlZtpS8tnd7VHTflVL9Rfs8SBes8sIa//C9wLxglUcjq/zs2O7qc+OvlicrnZUgcIleBIpcYJkVxQjRfwsrRB1KfFAUo8TVg0KKsETUoVx33dnKw+c2hc9N3OKeq15GuC2IN0j/kAQJSWOrn08WWSIxgYqU5M1BQ1QDAobZu9haOYRQD4FYlloglxUWsLVRKIo1LTfPyxLTRsMPEwnRy7yHjzGFizZZApIVvps+Sk4GuDNvrFTqeN+EM+u1O3j73g187W4eXMoLbCC62olcvC6uLImtQbTicPqoiis4dKrGYlaG4nsMFMErxj5INoJ8AvXKaF5gfVOM/Eu7AFa9fOLJ7Nhmh7W4shw/WWVx4yi6odiy4sqyysxvsrxkR3o2sUmtUD13JZe3qBVqSPaKr+GTzdXk/s2WhffU4MqHIqv81NiD5VdmnUqtkcUqUwtHDynWTnyZMBwUA44sAEOHIjCLZoDDEr161WkcwM1PTG07/PUzn56cq1tLUjEMrQ27AGpRp4jqlLHMALkBwFVGKl7LWY4eHslrQEyjArNX4NQAWYuaZRkIGllnGW8YA2Bu+o6cWSaHhyfuVQDQchh10ySC1lSCi0gT5OrwTmOt69R8lAooIzF6ljnhL50NYjd+o1CY3MUpxE2n0yW5uLvmkbLnnh322tspJiLbV8fxyxYQLkk2a5XjUSsUaS2sMtU5iTDlx0mAMCcV502qREqG4NDhmKeJbij0FnVXz4MYuuEAZmUAlRwJo+wtdpTSTsDMfdwtJNa0eenrem9OXd5xW7wtfgVf/eNaoRaO14JVll2cCM+Vvuc/M/rliCtPVtokOqtQnCyxJhMTxVApMeMa5PDphvNH6K0E2CNQM/Gs6uViE6nDc10D+wu/mGnPWP9tstToxRVTEZElq0tKW8VIxTK0g6SIrWgEyJRcGKdm06wCTE3dolqQPUzoDXDX+YwsLkYdd4Jf5z0RsAVu/vR5v+LPbHwUftJ9NpPgBOC7dSUQF+f3iSJFdsjFbDvxGGQ63NhaLLyHt/81N33s0gW0HD91kQjMZ8fn7OzSzXapNkHNOFQQc1DB6fOwynHbizPsQKlmpawpuKc5Neqcdgmz+UhsAVgBG6vMYRXVgC8D7Mj5g2YonmzZOIsBMWXJH3JzvERfeiZ5dfea9Nbu9ycG0j/Dce+P7LGscpM8cNTfcBGQhQn9R0y3cTg8Mv1A/Ymxb5aPzNpY5Q4SamHNs4jHRFxZsWUsNBZYYBao+WAEYnCEpbYLDmBuJJ2Z2mw9ePvDU/8UYdqeFXgJH+xpj335+LS5up0iJ2UFAVQFzYzSHMEPmsASWFBxZM0jrBKSU+ERkmPoSCMPw3P6W8hVwgQDHYX3OLGjC48ArO3gNMBsyObjEHIF4NIVURBtnQYcSTJMMNXeaKh5lg/G1GnJ36lU0mQbjc98LFd/YhdRyV2XsJV26VK122lSFcXomup0g9miU7drqE3lqJFUA7JFptqlcyRMouiSJGCV4gCh/NakFmQX0gynoeaiSTGweFF/HztfHBqujFWOYmxRDQbRC4runTCejs0l1rfH09f27UytbbtV9Re8TdlxHbTmvzx8k2XBKgsnE+Z86XF/38R91WfGXi5PlDsrfkC2TxZZFEPJEVLWALiCoSvD48vY8gjIdtikGti7smv8IqMqSxNlr3zL34x+urvoX1lq+NTZB87mlpSp9rWYB0dQ52/LEnYjsgHAchpLwdpG9RwAVtZWq25BOaAxGGZRDikb8RrOong1sU3ObYqOBHR2knoGlSRX3UcMK59E+6mODnBkpSWwzorzFlMDxLnWlgjcHk2zStIkEziKyNcFyYTnurH1TiX4Nb7t/3iTnXZJPO2ew/k7Ssf14BQ7BpFwB5FwxZU5FrFGRY2lhNPI9Mky4/RBHXyoBqE4S/pwJiOnW10kvC9D2EtF73pehffN0k5Are/gsknHPapEqr/I5FPbe7ekruy+6wf1F00I/32scsOUvSPiyo29Yw+UDs8g89borvHbRL9IjkSAVjwZ8W+sMaeAKtOiUByKQyVYQwkLHjmBXLLLjD6r7O+wJ375S1M/3zHl3YT0st8GbZ0iSZKnj++GDoZw0kXy0GjeXNXO7ELUi6rULAvF6lwBd6YByJBQAOJORB/UA6hQBkN8ol5AqggNzkJkZgVoNQSq5nkhGqIvIbLCcCHuKWqyAXTEv9mAGNO3fKpXPU5VWXIVNkVOJnAPNFGT9WjNJu8oXLvmD3Pf2j+h80rnziWB4tdspFsXmKV4T4JEYA6oU2ZCVNz1fekCAmT6o6AWOCVpl8gFFz45eBmsRpMnQyu4JPJckObSHdUr8zog5iSYj2BwgKNWqLbEdHJTZwed1r+UWtX6buJzq9jnqv4VkLU0/33N+r3m4WusMqIuE+Un/X3jX6nuHT1QHi13EMFQwSbRCwDN15CyVhSDeyuAK8sSE8kIsMw4gEQ6IguN9S6jg1eiZLnMiIfG/lRyJl4O3RyO1yRCLiUCe3ArQMuQ+GrJvLuv1XQh4Pi1s0UziAOnohIYSLTWUTsWb1W9MyyXjxCGU4wa4AJ3EiKyuWyDAA6QBVYlWsSzBXpRc5WQUrNn0jl2uxgGYFeTbJy/0QjmhGGUMyIzDT4Lf44iHjVS66lGw5op18NNQ93rzlueuPRfmR07HK6+Mv6X1OL6hOSq4wHS4FhmJLbyCawoNcs4SUnGQiPIGqhTJGX7bhbniiIvh7R1MxSHJQTIdoZ7dVnPp62x0gKzIiA4feLKCbeaWN5STF3f947UhvY7kh3JzSD3wvwR2bS3WgRlwYbDz3zJY+Gx2W82njx/f/mlab9SbTTjyrwDAFuiGVH0gg9oNDBgBsg4fKyfYswRsIFQie8syzLjjZW54lTRYCr97NHZ+MMvjm+8q70FFb24GSmXSFxAAwQ8QjgFePPW1rTpwvH7xokpTdYyK+hhYGo8HJc1AGjiu9ocVJ2iTdLfGoksRy4SmyE0J2oiwCsUp61STFqPlBZnHaNoiBpmKfsjzs3pwQnlJJOky8kUAmRdBbRP6Pvhuwgh8iMzXe3e8vYWt1Rt/Dw//Ddmx54g3KNvi3ZetC6Xwj9uMILYd5xZDE45AjMtRMyEgl5ggSXkQpguA5duAhmnmwOh6i6cP9LYoUWMOaqIE+Ug4gSQOf48H0UvGIqW6ExPJrd0L09v6flYcll2B8GAQRilDuOPoxfa/Tpseq/ePWvGq0/7+8cpvh/dVzpXaqsGfkpxA5V4Mt6Ve5twXCCrLJ4shw/rjOPXBDD1GLRPAaey4s6chADeqXBpqtC6502tbRvL/bujvxpMNm54JD/t376syx5qy5gZGlTp5Y2sap0Q3CQWuBuA/uK6HrNvumy+cWTS9PJjLfDpSMMOcCuU4UNDEpSBx1TzzJZE1IEHUbYQs15jrdLsNWIn0ahuIS96jXqPJBxcYjIYkohvi4/rSxQCjPHdDql2WWgHQLvEqM+M5w06Bnb6sm7eFr7765t632HtGnvk0R2Y+z0RRdfOvCQWosl1cgNWrF4ipuF6FATBmR0iGD7Ape2J1HWWa2gGIJPEsnmOv4krYx+iFikcHCwznxFnVmlnVICPPniskFjX5tOgejuhuNvjF+ovBNGmxX3rPdx8j1yiWnAifHUussqVl6bqNKr2KNtHiQ4gVq2yyjyb6WsBucmVZZlJf3DDAkM5oohGUKJXGkBjmRl1Rh6doETYSA21zNT+5PDy+Kn6JzRsc5qYx8OnZqw7VvcYl07Uyek5Nrvp6CnCMUtnSktLxrynv82syCbNQ2enzePjZXMF4KRDwdSw1s3TkH9ldQGhNlkWWYac7HcU1eBNUVmo2IgvKsKpLhArlq2tF42JtSFxDXirxJ0J3VCoyAGCn2gkcw3QFyaqpvTua81nr99qJx/6SsNKJJNdueynjBnbc+MlBmbhiWYRicRXmesERWiYpA+YkaKVJc7h+OUAcwv3bQC9FYC3cQw4xDa3gL+p2zR2jsPHaEuujqGdcWwvszQ3lbt1cFXrz676rdzW3l9JtMSuASZKCjYPdGRu3hTNvEsA0NGO5AMeCR4f+Vz1y8f/e+HZsTBfrGXI0YVlwFwkeoFTx1w+Okh49xw4mcN8zcDnZ8hIzvIFs6z7NO+dQZxmzvj0Alphni5ACo7Q8/SIbiSD8p6lqXzukfwnCdv1lgt1rzOVsM/DyL91fIzNY8OzMCt+TChTJCLObQ76MT5XMn2puPnEpkHzz68cMFqR04xe1qor1iwrrc8oChI9ZoWquqZg4V14sbi0K/LMEgfVstIoXfNbWG3Aq3mIXO34PuLYvK+FzykunSRMKO49w34a4bMESM26991ksh/5NTf/vROYmsx7Htk8cIW+N9wVBUz08JJYiNf7sViDQRwJFO8bNvUXyuaFGaISWGOILmBlf+aoWc7xNwCGK6ugKCosUoknLXD4TtK/SCNFu7EzQVXc3ak1rbdQf6FQ3N+l/mJhX89DHkuFVTYn8w9GjaovTBXBGVwZWgG3h15QMITjp/gy4IdikO2zrCKHXwPbywCiCFpKALmMLSsRNy9bLtSCwiMlrnm+5ljxWqoEKm7KTlz94Se2unP+z03PzsF3FZGEQrAOR2eQFCDs9u6hzkiTuVahnZB6LC+ypurcZl7RbDHSmdtOWG851vqZc9MMmZ8xRb6jj3rQJBZdQjSy1AJ2LEW0Aoz5yBWErapvhqpgbZXS9gkZiaLEcTylwSFxcxzdJodmg8WldbIrhOck46gnVcyIVNKee8Y8dfCguWPbNVbi524Kyideavd7elcbM/Li7kM6vS6dxXUriIWjrUxLPqE1FdMjDg5X9p2oIk6WlxkK3CxSd1hj6AJglgMIZxaYA5srYCW5NEdVXM81qBLdmexJXYft6ZBx4mMLVvmtdqqArPfqv5KZRj7gxYmv1J4ae7J8qtBS8f127KUqjynjpMRTYObdAnMzORICWHFlwnA8TySDks8woMNEmvhwZxpbKV0m7c2AtDBWs5h7HdZr9WTGeJ8ndvDx56u/bHmNLI6Yl04S4EGfrkGpZjfWdxRAf+WVEXP9knazvKvNVAATpXbwXsDHzsHam7E55G2JUHS2pM2NA21mfVvavIz87aHxgjk3iyyBICVjjXUtYtnjA52m/6rLzdQzL8KzKUECpFAoDLE0Ongj9/FkgqpVnoNuKI0e4sgQ72dkM9dSrLX4c2VqzhSYyJE7b8zBRx81V6+/wgze8b6w9osPmUM7mP5pzH07d0e79q12/qJ6zVn/i2t6w5jBbgQ4gTZNVBR8WVYLJE1UA4tsiWoAZKuF45Jlv2O96dXEB+F4ptpSU5lreluzNw19KLO588PJtsQ1YEuhaAFZy1sbiAtQhk8Gp82r+fsbjwz/l/Kec8eKY+XOMnkDAVkRjGaUwiZVDXj5XJEDXwANBQBRIGFSwArmeR9/WwXWDb1kv4QXijNItwnOIiG6aiwTVtEbqzqzJkjelpoZ+pl92zIzwf9Zr3OZIlyHNbdkCQUuyAHOASlu2qReGSsyASthugGlnLc6ITRCKmwdpyKbWOczArWsbAYOPNiaMatxKjvJJCqWOEyKcDiVorKgZv7DX/6RuWLrZvNX9/6t6exgV8OPU+kk/JmtkbUmYaKvVeLFAcBoYUdREul1RHuV3/cwGWeJi58kC/m5qwaNd2S/mblyq7n8snWmeuq4tfd7+5bXNl723f91fPLcTuj74egbFxV233BjSNopIkFUA43lwPFFN1CXUljOBrwh/BjnMETTJFR0I8wSWsriZTMSr5q5rGM6d9eKHa3vW/472cvbPkzL2zp2uJK42u0C8luBWVBuvk9Weab+ZLD3/B9Xvnz884Unztfy+VpHiSu79IgAr1Xk+DKPIShAd/KAc451gh+HM5x8M2BwmpMOShnO0qw6SwVRxKeJf+e5vBcRneWziOs7frlRhW4kEvUUFaH/yfpWrX0k+Ci1zWmXIS1elexKnvMBa0h3FTScDhHkaoEXZ7xl7j1w3jxyZoo0e2D6OrJw6zQNtvwC9ERbrbgyugc4jRVTKuKHktEbyqXMO7DaOzf2m8tm8+bXP/0Rs/7KDYTkcNu0h1zmzVG9HwEX8FJoRMEea8y+8UkEyErXUOyv8b0eiC9wQozlaezlCrKfsN7vrm43m5d0mNWIGbz49FNmBu4S3P4+b8I3bRu84MP8RCQpqPtLYWFQJUOABWpU8AGNMn1qUI1oB39n8eaIPwNknD6sl5y+VFdyMr2le2V2CwmSpZm3U+cxyL5SKvfvAmTt1oV3Sj7gtDldfBiu/JXq/skxyiMUwWBYg+QDSJQA2IgnA1jVLjejFlYzZU3SRFONiTXPx5XhzLAG6IctHo1lR7bFiyFBZNUhSwyiDCSa5/ljvvnTDz8x++tru99byNc+yHiLMJGIR2WhVQCqjB4EOeKwSoToOXBmBnOuOXSuYM4iO7B9SatZ15Uzy7pbzYnR6YgXp+EgfDICNhhn9QEmddHqE4RIMEHLNtvetsUU4c+zrxwzO3huhLDHHHIIlwHeLJ9nDJ1kPkwickSbJkFXDI4Lz6NvCcf2WJkHCf19ZP2guWWwDQe1YpYvX2aWPfYN88KN7zKbN26I0rT5l49+4GeHev/k7jNjJ2Sld7NV/OSiXlCpihotsdKGMWhwaCVIJFGrm8TElcYmRKHkStKtpNe2NVqu77sjS1VcIheTFK3eoh2/AOa32l8Cst6r/8qIurwQHJxEPmD0e4i6ZCvEF2jUaEoeYoGlf6Fu6wonFV0kFhYb548QHN9BFBeO7GO5o0ygo45sjCMF+XEH/DSq6DLVYm6mzvSResp2GvWERzcTObXpafOl9z+T//W3d6+pn6p/nrLPNAPqfdLIjg+IWbGo+EgAFoox1lESRJJcqnprzzK8B4DvPjxurhyomG04g4NdrVhmPFVoSIHipOg7ACHrG4UYYjQBnDt4zuQ+ygCiZctMabZgSi8cMLcPQYd7M+Z8mzEnAPlxspNUfpjp87NmlLj7Wy3bePG20SmTZyZBkMqaDujQ1tG4+dvvfMes/9gnnJ/5/d/zHvjdf72sIx6/i7d+7q2+azG95qrdyW8ESWrVCRiRFGEkGpEEYmzoZshiM1wHw0DrWi19TU9r646BD7YOZW+kZqnvh4AsBLz5cgHKsspnzJnSo41nkNr6/sRoZbbWIY5MiafArAgGVllFRdyoacDqgn5CdOgTFSlxwEpz43kQRtZDcWfeZwNmODLX6moDGaXA8mpsmzLTDaoFvSyahxOJrC/eolDWR/608K/IiC6j/BJFHCum0k1ZQnWGRBVygJvXiCnjAGJFcy1UJ3P6RiAFqAO5mDk1UWK0cdlsXd5uLu/MmXayeirYn4VPKBohZBOakZhHtNJXb7uSkFvWnHjpoDnxwCOm7/J+012tmFXIga3Kxs01PcY8+cKIGfjwu8y1129jfbicUB+CcWZR6I8eRtZTdRxrcSbb4dojDz1pgkPfN7WeftPX3mVWPf2Y2bf9ejPARnXwqbBU/uBKY/4r1nkuWiGe0rct1oWrMJTDDWl8oGif8k6ssSgjxQSUeqoWAzCjfp9a01LPvmPg7tYVuTuQ8Vpw+gTitway9t8CU1bOo2mVkQ8Ye7h8cg6rHCAfQP4WMANo6i8AswDKh7DGAm2ANbZL4IQILzUY850lxHCJRRPBgIqoqi4gUWKVsZ3JeA0VyDqFwvV4ynj5UXRuWm2vHMesmmHrW+/dW/vlZe47K6HzgTjZDIeC6TiFRo2aGI7S0ZzWMs8cdjllrJtJ5ugYwdFTJAK+HcWAlfRoQ1YA38M8fHTSfM9MmS1DLWYDwO7tkOYkwXGcxAnGsk2PDJvY9VeawbWrKC5qmJP7DkTxTxWQTxXK5jz7UJlBChkZU2TMB//JLeaa668z01MzgBh5MbVz6bcJ8ele68hJbhK5nEl1dJpXP/CIcZcspWKGOHUlY576zB+YJeem7cSStqAyl796m2PeecI3X91BfceeRV7fQSg3JJtqESxGLo1iMMChOTR6LBrCzYq3JKZRJ3pbbiizYx7MKrf5cUBesAHNd3rhMJfV+xrfOv3vSveffnTu2ExHoeYnoRG+0tCR44fDh0dm8gB7jhNJFmVWzh81F7PUWs9hcZt/O02njxR9nuxbgdAhEQ/AnYiXbI8iSqo9wXM9nEg02lemGm0rkSPNFfzivglsHpeAmnMXivgx+U+JhPRrVPhDIoNwmJxBRTh0GtaxztpSLk9RZk4a0PNIj+qRxXf12YGsy1BOYx4/M2f+ZP+w+faZaXMEERlqxk1nZ5spzhiz4rqrTWtXl5kcGTWjD3zbdK/uQnUJfQ3ASWs7HQeW2f/yiOn90FYzBB+mDp310e9qPeSkKg7NFYK/y1T51aVOWiqb1rXLTOLuHSYYH+eUQu+HrOVSPhdf0c92Mdcum3LoevyAtru7uzvcuZM3LeKF/UlUlq57LHQk88DlnghewOFRj6ZFm1uNtqju9OXt70259pLoQMMmf8wuERx0qAV6SW0hHzB5f33v+CPl48gHSAARIEtui3YoaAKyW7yzTHMt4TW1RCmObOkYl7CLyr2VmBNM2hquHAbUayiuHFSY1Vf13EaFsWZ1vqoRpuP1WsF48VTK85khW0ogN73F+BNmIlj7BWN9a/p444Hbhtp3Pz9xHWZ2PiTWLPXU5Ckcz4hSKCvoYRmVjXNUHMS9xhirKwUqHaWwie1hOXkOy1qjvkNVdkvp9q7jRB4ZnjXPnZ01S1rjZmlni8IzZsd1W6AbaTP68qsmefKcSVy9jI5xlHm5GrDyJu9TPUdD+zvfe4vJtXXwG1htij2Ualc4MQ4npEuddcJDgIbECOGxugRP02bZXbeakX+2xzwXb4/Ch4qQVEm65GdKtsPJSNb+1o9tufL2L+7e/cD8gdOBWZTUw6ZNn5AyRY4hm82x4katORW8RKIIezm52EzssrZr0+2JK3iNAzq/R978bgHKxErDEazyV7wHz/xbrPJ35l6ZbinUGgA6QP1NXSKE43Dm8vzqHJnHKH3N95OiJueNVdZNYTgc0lkG61BQEaL6qbBd0yojM1ZGJr0Cg67WK37Noeo9l0008hPjnoa2m9bD/sSeiWCH2RHQFm3MLuJ+5xqr6DpYJUtHAxORNS7pGvTDgnZMdN9QYgWrqD+jQnwBmhNAdcu65OuznHRRMRLd19FzoilVuLb4d2c2Zla2EtPG8n73xKQ50NuqmkMzSyJk/yNPmtYB9Q9SIANQs2T87GTKTJ8cN1f97HuIT2+JaI4oUBV+HfHmWpXfImsop5XfTwPitBR9+Lwc2fYNa8xz2643f7jvqKnlsmaYuDbFv2blULu9vq81PFv3O4OrNnzpt3/v0//1sk1rv/CZz/z66mhDI69g/tEiuUPsByjJlKqkC6SIqrFtXHUjjUy7J+3F+rMbsNQMoeQAy0K92bIAZVVy5usHw0OIuuwde7h0jEbVutcVheIUxeDXyPbBlanJ4MRRwoTQG1yZx+oiYZ0ihw/owJkdaElAmpuQHPdIySFmH9bgskRn3Xq26tfrhJApkOAZ2yslJgLP6QniufHg1Hh3NFH1s2ZX+IX5lU6E9oZW120ftwLfpTCjVq5Gllrln5LbijZSwGVDVUwkVJcYBxHH2xOY69Qfi0uLW6sNiv+VuItOdOFNUX1eiiw65QBmDfy7MDZn/vR3/73pX7faPP3sfpMlHXSlPWWGcOx6iU6wByJRjRtuebdJZ1tNoQCDYj8rLS7JgjhjzOsAPNr/nDgxOH/zCsJJxonmA+IbP3CL+eLfPmXaqCtx61WTYaWYmqR2LuvFo6PhTL3WMpSKfzxNcofd9D229NjOnTut3btxFxfRAuUgmO8jRiD7y4GgiAeIQ9gi5NasJel+tzU2xKvNhEnz0L12DzTphZ4X1v1wNBwu7vGfG/syEYwz5QkEEP2o+P6CfABcmZBcEDWqwlGphoNSUNLZvBefVtFRWEKKtuyHHhEMQni2U6aSqka0vGbKbsN2/TojzrxyAptvhV6ylNFIYL+7NR8MMhp45sRK5PaMuXcnQyjvwbZ/1vif+pQC6/Y7lNJ+YZZMOfWxUspXQb+2Qg6YnC2llWHTkYWdRX9DllnbJiVRVcWxPtG+QoyE13geIMNGABozUXDMRAs0ggIHhVYtz7S3p03hyHHz4sEjZglkmzI/8+dn5SIYs2Wwyyw/O2nu/JcfNZdfsckUi0VOlDqijKnoFqcOGv1hU1OWEIDacgj5nK6VstBRVpPn18LRq7dvN8mZc9AQZR8p9eaEZKYjRQjGenx4JNy2cVM9EUsnjh45cTVf8SXAHPkUWo/FstCYQlcF5i8S7sYI0UZFZJ9gGTdFvdKxpajWtXO4FkiXdufCosPcBDKulil6h4OXp79OXPnb5VdmYlhlpLYiCRbKPDEWHAXxX1VPYomVwo6Kin4QuVDUwrF9ivEp8eQGuMpY4yqNI1UYddWnxp2gTJ3/GxB8D+0Eb8aj9CLR7RdXFoO1c4WgH6t86IfmXO+kQAds+Z9ImaWo4dzQyuWeJjzyJ9oWQRn+Q6uVx6YrrEP6tAkWAZNoht6ljF0EJJIfamKVk+YCYMnpqrskKvukNlkdKhqcKe6tsB/8JKINaTKGWWjH6Ylpcwywb4SWvK23xaztbjOzAJorT1Tn7HvM9MZBVZe3jyXWr+p35ZzWoR4yNDrhkgkiLHBpnYQO/FrhQapaGThUJMKijjnxR30n3H6w1Rx+5QUrvPnm2JYtV5pjx49dwbbjM1FfqQO4cGh5cLEv4IrrIj1JgE0lthSiqSCcw0glD3N3alOVYm22doINn8PioKfG7hWEm1CWqEoFR4S4cvEbje+c+cPiV179xuxLk7m5eiNTVPQCPESAbUYwqLcgmsXZMUu6eoYTZwYwzfKN4ssznEuzgH2OYzkHuElbe0UiBUVCLiWmE5ZJpXAyVKpWtVZ3k5k6xRkenQaeGT7sV4YrvqzyAph3cZC0jqxgSJYsWt61vP9mbNzqPtSPAINN1RPOllRBaTrFzGJ8Cd9hpcUZWNT+JDoBGYvYJkIhEbiklCRrHDmJWGv9jksU31amj+9iWwF7LAJepM3Bp45Tavrdc9AMKux+e123+TVi0NtIn8fgyeGafvPwZ79oXnrhRdaHqwMnRVTvzBD7KhV+NdLd/ExUqCS6IyCL54s/ywcgy2nO7X3eFL79jPE6lpDZZCgn66HPiacs5WQyw1VzYmTEXLF5k7npPe++8jf+xa8u0zbu2rUr2k16vBgWtarh41gehwreoYZ7lUjTMR3CSFE8Pp4vzH739Bfd9V0vtHYkl8XTbjujHqTyRXFOUAhK9Ul/pHiocXDqucrRvOSOuyTRRkyAmBT37K2FCIYSJXBm+LF4cgR0rDQZQJV8AiFRDWiIi/VG855GVxz9GhOx6syCqGUdvx52242qnfLsDt8vlCaCvpVtQQ2rfMo0ufKGnbvDXaz8D1ihzj4WKs6iS2tnJvZecc/ObMrcsabH/MGLw+bOzozJY52JqGDN+DArr/CdLF+VmLG4tBAbaW6IavCVioJgu8nYcDqTClI1nSyyCotkz60MlxKo3BR8+zB1FyvhyjuW5MyVXWQVSaJUK6S+SVefpvJOZ0uS93NimscI5y0ZHEDgMYMqU1MCQRRDW6ErqSjGwmM90Dr+P92dS2xc53XHz9x5c97kDEnxJZuSY1sPOEocC3bqhk0BB01atBsnBbposml33bdAofGi26BAURRddFMX6IPIxs2mWRh2iywaNKgdW4ocWYwlUQ9yOOSQ87xzH9Pf/xsqCeRF0sYpIF5hOKOZO3fuvd/5zvc///PKYCAGB0f20T++YamLi9x1EnVZZVyLA/avAK8usjL8KazHu+/+wOCjiZms/HgccHEncEv8wb998bcIM69gEFFva1ID99W4fxXGqIwAEr2gJFi/UM4cwnSEuVJ6hgpKWWqYh5PheDA5QkIORkUksEKKs5KPCc1EkMHAY5Y01khXNFwua3n0JLjTqDk5SRBifkdFXhR7gYMkyeesuYIYYQotPAJieMGQ/puFaBjQ5iJq5WajuS4Tab4R14ZbDitrXB4Ks1677ViYm5wUj/jvnl5dWi0n3kLoniLGPp6dK3nfftCxv7963y4ReKTcQWnFDDSXhFdaO0Bli5rTViA0VNaeemvLWyjpHzNtyU1VyKHLG1R5A+Udhsr94zsr3LwLzyzYCgH58lhxeHIiY2sTJadNMEI4W1BnP0yRw7hjf/zXf2HnPy2Ii+bnM/p4OMwurCzWRJNGmz7rYTymCTM9ePt7tv2NP7fq7z5PbxeSeBB0TZQxhtGAVeYIIb/dGYTb7aNU/0H/X//G7OscYp+r0HTl6eRsck8xpWM8a2RNK50JjpfLy6CxpL3VLg9lPRPuDwp+e4BHEUnjHRZhFdXXPEAUE+w2gYlN0AaIVRs1Ju0MfkY7Kw4DThn6TcKrBFbqLSPAHm7sEPYiqXhlvHyEBiUmlAdHK1NOzPe9eIw8SEWydgZhNJ8J+/1GHO724sw8WnmXX2itT86/eh57rzmFFxqXY0HWS21XmlpWjVjlzBNxHCxKKOFzEwd44V4huKh24ZR96/oO7urITuuqJKgIrQw/BSkJWrj1nuVdgUrKPIEqZJGBqtEyI41ObiFEhZOMSt2z+rkz0HRJW1lesdntW+Ba4paFkdG2fN0JqThlrm8qUWj6CnDmwZYBO963Tz17DsqOEmOULSiVqMUhvMEmA15QQ1KYJJgpi+b1eyN7/fVv27CBNt56gLGKAYnyJfDbjpi58KSi3BWMMymBtf3VwoHd2d1vTq/qRAmz7lEK3i5AnWJk4dwgblj3W/fOuRAkzIIk5CvzSmsZHl2ZTAwxYqyPeUAWMDpATuAE7oUECMEUR+FqyAFnYDQixjsU1BhQYWlAUSHSqBIDEkSJsICGQ5ip+eHoOLJnxlQ4DfL55NhH/eeqgWMwHK88fw0GI+e08gaCjKjyz8GMjwmyLk7bw4yNGS+maWciPw4QLGkvtJi/17EL8MBrLNU/pBn8+3td2zrCOOQq5CaVIi6yRvnUfI7JpEVGsGwVxTWFHhk0wNzqrIVzNWusLFl9eclU8X1nbxdhwvmxftbu32nZme49q9ZqDtJQ7NJJfpLvqoh5CfjjDw+tx4pQXVu1t9/4d/vSb3/ZFlaW7bDTAcpoJKjPgSCH4yGYnuHRuWH2ZCg9+uF3r9t/vPmfNj7NAvveXStCt6SR4BrZM3lWmwZYvkBlJQYySbVY/FP+F/9wtXKmeefwZpNx5MFVnZxNzUl9ekfAPhDREU8IJxWBR6gPksqaSNwkRhfRjBpLNAMeRXqnKIUCqWXZw0bhW+zJPZYwS0MTGARPrK5RlOIiXB62gomiqDmMO/YZEv8wRBkOaEmv31W46AitDD1KHymqcREtFHqUxQ8KqTC450e94la8Wqo4XpnSqGjlTbTyphuIpsbiEa2stx7d7hHmsaJS7Jy3iojryxgNxFvA2TLoL9eLZKVUrUVRmRbc9D5xGF2yU5jyzGiC+rnAPK9nyL5UUb88DER0eNc+eu45637qrFv+B1BtMhHv7h/ZfKVkpQyV0xbqFt14z/wyURoIs3OEAEGK0HGCESOMuradskOMudKpnHX+64a98c/fsc9+/gXgDYYqWlo0oDQyBWXQ8BiwTBadf4VglYPv3LBfW3vObo+vW4lMGO43K4vCXfFw6gEF6ODKtDRfRHLCSimVeZGv3zznpsajd+rx/j8lv4g5RpgRNhZE1iXmvthkUEWEcCPMMhBxFyh4yXkPAQn8BwFFNngH6MmKyHrsuiSg/xB8hJpdXOlapB1jMIl2hocGK+PxQ5iTONUQYuwuCtv4ITZUJiZyoqhw4ELgdfGJEcxZgFfeKVYnw3wWBqMxeaiVr0hBPbzvP0eYr20iYWzvdwZnl5araardUVeGr2sZZ+1xWBTt2CZCTjXiSkCOAvk7qwiuR3Eo7eYCllizVI9ZQUc9aDnFJHdZlwJ46mJuhvWH7JEbN3GE4Ljod+0ALbl6lh+uVs0nlqO0QioQUKVaKMJAhJRkiOz7xF8Msmv2uaeeJWGT/MS927ZwumzXvvm2vfnN123dnrf6C+vCKBa3e3Zw/Q6YkEAnq/N8SC+KNTv/lWdtdqlhW9ffJUexxiWJpaFpEZM0R9iqzhOdw8iifdBeHkkHhWzmNzmzf/iqYPwJ28jkR5uqzxh1jzF50D0oYNQlOhipjqHuuHdgajBjBgkGP7Mfwuzug0Sa28dfGfcSZpSeeqmq4ItgB3EazjCMRKDyehoZxzHwFE4Ivsfbl0qMC0ZRU2BPfoB4p/pRq4pWblTjVRgMuRMbTiv/FCs39eM/R5Dd+bHXW8cvbnSC33jlCUJDKeI89kNkdGp0SdXpYqF5oLmIPkUAoIld/IQqfSp5tY+wClOxtLA7Sw2WQ4gWxHwlUKRjKYRX3HC7vWf7+6RGbd+0z178DJcL5oaFmEMm5/EI7h317Metrl2nl/f39n3b5nt/9ulTNotWpdq2BcWqw83zX1iwC/nLNjM7S0DTAm0vjgg6rJv34jqNH5FBNxEndm/vLiGJpKYUapYtqFcp8xRNTrtpIBLQBsychOkImGCKySY0lurYlPxNpl5+dW5uebPdvsulCpLzdDI2NDSCxzCipMklVXETmuC5DiJUtKPWJsw09ZsJWFJUnhgq7hlXDwp1m2a44AZfgsdDKBFkACc1OsHRElrJCVzyCAto5IUe/luEeSY1TiNXfCcoptNjP3EUAkSiYbJCiA6yg7dvuJ2NDzD6Nhy84Fu2ac3pNPqFb36TweIRfmM2v9pPJi99f6djn6PSEbNYJ+UuQMPpy7QFirjwTIRY5XFdRVFmzRBhFkkvbleaWoINKcJR0e6lmmUOdkm1IiW+XLZnnn7KfvijG3bp0ku2fvZJApXYG8Fvk8H2AUH77+wc2QPKg9VZAZYhTZ7w6lbPlbBQPNsbdQhTrdopvHysYk7KCuU6KVopu/XBNVt85jmrSLu32wguEIizWm6sTTE1Grl4awEocohWVhATGJAbLwqS4eLcWVmwGSi84hEsLvt9fangvQTW2URLayh1WSdio8Io6y3CHLL+01tCiIP7QRd1OqmTzYKWpblj7KktnmLNAKHcKoFnLl9RC+4lioi1OQSHEHaBpoayYyCh8FLICt37osD3xmnwtO+Pk6lxdhAGvXAcAOBDr5hlERyGK9VT0fXGf6OVp1h5Y2ODn2jaFcbFyfH/UpiPR0eDFR9NEhcXsunT7x/S2I88pgsE51PvjCRDCpDL5EWTKhoroIG8tKqMNTlIBEFE04h7zqCpKRHM55yI1m7ugAdllv7wAVFtlANZmLNisWjPQ7lNhIvv3CfzBCpmZ9daN7vU7ECAiet4mgemtbXk3oaBoKmzpWrENXcnNoumdR5CNKxq3/HTQBpKiIwG5h/uc7PIBpeBp4sCOBUyRescHWDOA3sKs7bTv8PK0uBzli/ws7B3lnMUG+ICm/hdyTpaKZmdhF/iMJvnuZKf8Pa88bhvVORPj0Pp0Ay50ES7I7zM1jDAOhzTN4VYabqXJXR7o9SEhC1qd0y5fmSZLGqQCCYHnoYIMy7NvOBlwJsBOQOwJ5GElhAIaqgDLSmWHngicoGc6UQ5zCWSYVAaxAVS8vqZrejy9srk6gZYGYPvir3lBLmpO/yLwYuPjcXV46U0l0m/zGTLllJe8OZOP/2ACh6X5masiuDmyLaGNbNDluIecR1iFJTsyrVw4jAVYFFhUsmwklcp1AeTgCBzR2Rc1j+zYB99dMM+gNno3d2xAYmwvQ9uwVVO6aIUz6pguUxZMHkP5dgR/0zxfbuwushEkprIkELVQFPjAdTah8Tm8wVqb2Rt9+Yt4hED63P82gxlUviussAzuL67vSNr398mWbeC7UrZAyYhPSr4Or/AYVT7TjdRpRB8HCsEgDtopPNGUX3h1bytNYd2u8muPKSjHvuNOLUBNb5LuAgJBqfQG+ADHIwHg2yfRDZOh6MJncSo0sGUlwR7asaH1LsbhqJO0IRQZjQNg6TrYpRLmKJ7N+H1wNJEOMYuyRey4wBilWkT9iluOmnjrvA6UQCtXNjPThR8L7f1ElTcvxxzyk3d2v+jIB+PijSPltIcTpPLiismlYr6DLF9iP/y5r2ePY3X7uycZ8sUMl8ky0RuZOHmQRefD4IlAQGJUg8jSRQcrmwJm2AHz4cIv0rt9sCst955h/pyLGrsC3qhzS2QgNuEUqd3QAgHzOEQJkmZMK1CQnnbKllyknnvQWfH6sU6hhysCEJP6gHZJxSQYSL12ruW2t+xzNqytKuj/uQ42dm7Zd12y5U80GCUgC7IqTMKqRUtKUawGRpGRRPpaL8LeuwRY53xuA0xDT3PzBXyL9lweJvT5kxPiECXfLx75RnksBPjpaX8UT7y6EUDEZtMjhOpkGLEAQGZ3CL1YYdShv6AZOb/mv20GGG5ZrqzpAHD0xTlZRQCoAcNg1kyw5iVLzEkN4X3uWthPl2mGD0ZU0C9fqUlKi5ubMlBIj75mFPm2L+kMANWHH6evFIrnkU7X1B1IuH/FJq1xgAL336XAubfut2xJygj8CQu8KW5olWJi8AyQ3NC1fDM5UHZECWFYPSAKEc8djDqWvQnVJSViB6EhFSoAt5G+BxO3DUQgsmQc0bUgryP0pKKldZ50CDRihw/j1bNzVSYIxM8jPuU8ClT+2Peef8ktEr3WnrmonXIQ1x48gxaGLc53PT9rRv4mjDumExQURSvGTIZSPuaOQWnvYdFi3ZnoVUsCousgx05eGneABm6SLQwk/DS1cLMV2xv+E9XmAfcrxOxpbpoSfM7kxq9gQ6QRoJ/QlpZBT2CcdP4TrHbeJHycBEme+AKosuot8sgc/mENdE7SBqMNjuMI1G7tNsBZNCCPkNBJnphx9RdjgZ4sCmTF3nLSFH5KNoLtycPsfJDBkPC7O7oL6eVPzYo9UzyMst6g9gyHIXiMphlCIvUWQ2nRZmLgPWwHyDcb/PgcqyBgKcRgDbVj5jA09gOBBr2jP/jEMELOEvFIlYqx4ZIEypgSMBMxWA0CZjlTojlTkd2ZXa4Z7WWOITrrlGNf2l+GaMOx82gS4Te0HbJSG/du2PFyqzNNuaBNzPKtrDZ9ac4NjhYlfvBy6W5eWAPeJih64Ohu/1Dm2P/cnXe7t+/b5kGp4agS8PrejST81xPCHRxme0EDVPQHfou++t/dHb+TOLD3YdOlscedqRgFKICIZdWy8f+3X0Iy7w3yI2izIiUB+KTJskMzcyglYM03lwsRhq4+bpJbKrZRgumSZiNJzloCx9kkqvQGRm03BeNgFYu5fCbUJF3VOrELeBFI9WKL59bia9u/pRX/lUJs84xn0y9pHZpQ3nmZfghkBLKKfuFR5DZKROXOFprIOCKoMuhcRUIVCRXUKAFlt7VxBDiUIwHi5XAFa+hcOTtR+got4ow8z6fylWth/YRke2Wfck/+ymqT/j6dKZEyzDghSAGftpo0AMXZzE+c2hejsP5OFYlANogpKdWz7iJVVhYUCnYac0QBDWHa/z2zevud+qVOdvmN7hQ55DBq+s8jIoBEQyJZeyy6qR5A7shKmbTa/Nh4suczl/xOBFbqsWSXyt1Jwf5RjxbTsPf570cELmYGScOZ4telg6q43qYCPwsIXlxIqd01J/ZBnnI6dCbjPvhJEvkRa8YTEr5UayA+86IZKeD/qR3KQl7MY5bfnbC75md24jPvyoGY1M2y3T7ZDWz6LqYUk8NlpgXJEha/mHQXAMfpVoNmIw5ouBUjNz3hwi8jDi0L1jDdX/Fp+QhBIqncA3nUc86WZQiwoGQctYKXKJSK7HJ03rN/AybmBBWAThrVz0UmCGBloaWttZrrW6LaOEsnkVoUyBI14prazh0ylbM42JhX93lBJWZiEW0/t07Fi6S1c05KC1L62iCCRcDQTKwpQuNRUpiJoExJcvNcQac5IQOIBJkNRhShos2MSNiZ9TJS4ZlWskDw7Hqdvxtc7ro8quano/v5m1Aj8kga+22SFvqRrn1rXAv2iLwAsQVd4L2anecHMzQaIQY5GTk5+PAz9d46JmH3iOSzC8uDv0M+1qhP46DdKBj6Fi19XH4MFZZ8GKDyvIKJmpy43T33PbJCrNKX8nIsd9bqZ9PJ1PrQ1QpwVAEohEnzHIfoJ5FQ4vSckXKERARXvBjTQAAA9BJREFU7GIunOChHaVdZQS6zDSghcPDTAplaUswRxxHy7mKkyt+WfsrEm6CBg6w+BRxB3HpjidIIqwt17U2XXcFA1CRdPt796DuclavAz/AbSHRcgOyTfr9ng122zbYazNxyC8EligeIakgf65HGN9jvzThq7VqHYouoNxu3mYyK3yXCYrrfqR9ZbjoetifyvaU8S1aqVGzYq3iDbgfeA5f/JPl6ud1Xg/vm14/rht0TdMZZBI2J9ibjXiYX4kk3LXMOMzlR07Ae8V8QMxuWDhXHhcWePAcl9Puvb0oGd7ZnY8O2Fffee9H3UjHkPbXMSXEMvqUDtV8VJA/YWHWQIhb1TOcwWXgzwyBSPDjcIdUxxfUkAsb64CdhJ8VJsq4u/wzBI/PXUQWOFt4U8S6tLAMPUmHSDF9R7+gxvTS1tNYaPZB6wsjT5kFtLa0OkKuSaLNQRCgRxmLmgwDeHD8TcCLYo61xH2PE0GD92AvDnbvaQmgqSfZaTAkI/IEFbCvOZHC+5hhMshlG+IR1PE7gw7XFhFDsoprHqOW3x4SpwJ55c5PK0qGuOu8YrWpBTLYP0r4owGLbkQcmPc1nR8lDh77jdsr9wVjiMC9xjBd4b7THpmusleno8BFDndbvKZ+Gvu+tS0E+MiWn75XvHpucsD+61t83prGKHM8t4TpYE197VcgwDrsz2z6KY1fGgfHSz7aKl3ITtTOQZpZXajkxkSeHX3mvGrsjHngTlR5gyhqoIX0qoSTvwiZGAcFByg5Vm0khHNR2E7ARMwrKTNQtV/ti8ZWkoBc0fzXHUszBflTPAFaPWWzYN809HydkgXS5MTGTs+Bz4sFcgL5l0AoY9iMHFSRD+ecxIj04J9VRFIT0wNKqCAkesZKMCEjBHVhgX2uSWvw+5wjdjk1qtkfxiOCrkwJd+EKULQDuf3eIcm3XNPvfH2u9Jdf3exeZ/ge6xp4WETHAif3EvehyR9Eb8L6o9cS8MlrG+4z98mG+/vxP83pd93+ieOZDg/8/yXEPzkhfppVx6LfX6yuEVV9URWPJHAswRRkBFM6rYaW4xtT7ezmG5BCsICL4H15DiV4wrIy7pSxoGRTCpSSaoWQSZEqJ0f78LkMLbLCZYvpCzqAJq7T5nqpCTGgwKPoIeGsHGUDayU1QVDdMkrpZmDHEVwdQJBFlJ2y4sjzdDBFkXbgECaU6kYTbnpA9pqMUzS4PJfC+Ol0DlqxbaVCA7ZjiQKOLYKh1O6GuOjDQ1YSnDFiYPiOLoD5RowHxj5YZenJU0v5TPprlHF6jUxwe5wzwf8HevPJaPVvXMcAAAAASUVORK5CYII=';
}

exports.default = imageLoader;
},{}],"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"App.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"components/Particle.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var __classPrivateFieldSet = this && this.__classPrivateFieldSet || function (receiver, privateMap, value) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to set private field on non-instance");
  }

  privateMap.set(receiver, value);
  return value;
};

var __classPrivateFieldGet = this && this.__classPrivateFieldGet || function (receiver, privateMap) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }

  return privateMap.get(receiver);
};

var _x, _y, _size, _color, _originX, _originY, _pointer, _maxDistanceToMove, _density;

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Particle = /*#__PURE__*/function () {
  function Particle(x, y, size, color, pointer) {
    _classCallCheck(this, Particle);

    _x.set(this, void 0);

    _y.set(this, void 0);

    _size.set(this, void 0);

    _color.set(this, void 0);

    _originX.set(this, void 0);

    _originY.set(this, void 0);

    _pointer.set(this, void 0);

    _maxDistanceToMove.set(this, 50);

    _density.set(this, Math.random() * 10 + 300);

    __classPrivateFieldSet(this, _x, x);

    __classPrivateFieldSet(this, _y, y);

    __classPrivateFieldSet(this, _size, size);

    __classPrivateFieldSet(this, _color, color);

    __classPrivateFieldSet(this, _originX, x);

    __classPrivateFieldSet(this, _originY, y);

    __classPrivateFieldSet(this, _pointer, pointer);
  }

  _createClass(Particle, [{
    key: "draw",
    value: function draw(ctx) {
      ctx.fillStyle = __classPrivateFieldGet(this, _color);
      ctx.beginPath();
      ctx.arc(__classPrivateFieldGet(this, _x), __classPrivateFieldGet(this, _y), __classPrivateFieldGet(this, _size), 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }
  }, {
    key: "update",
    value: function update(ctx) {
      var dx = __classPrivateFieldGet(this, _pointer).x - __classPrivateFieldGet(this, _x);

      var dy = __classPrivateFieldGet(this, _pointer).y - __classPrivateFieldGet(this, _y);

      var distance = Math.sqrt(dx * dx + dy * dy);
      var forceDirectionX = dx / distance;
      var forceDirectionY = dy / distance;

      var force = (__classPrivateFieldGet(this, _maxDistanceToMove) - distance) / __classPrivateFieldGet(this, _maxDistanceToMove);

      var directionX = forceDirectionX * force * __classPrivateFieldGet(this, _density);

      var directionY = forceDirectionY * force * __classPrivateFieldGet(this, _density);

      if (distance < __classPrivateFieldGet(this, _pointer).r) {
        __classPrivateFieldSet(this, _x, __classPrivateFieldGet(this, _x) - directionX);

        __classPrivateFieldSet(this, _y, __classPrivateFieldGet(this, _y) - directionY);
      } else {
        if (__classPrivateFieldGet(this, _x) !== __classPrivateFieldGet(this, _originX)) {
          var _dx = __classPrivateFieldGet(this, _x) - __classPrivateFieldGet(this, _originX);

          __classPrivateFieldSet(this, _x, __classPrivateFieldGet(this, _x) - _dx / 10);
        }

        if (__classPrivateFieldGet(this, _y) !== __classPrivateFieldGet(this, _originY)) {
          var _dy = __classPrivateFieldGet(this, _y) - __classPrivateFieldGet(this, _originY);

          __classPrivateFieldSet(this, _y, __classPrivateFieldGet(this, _y) - _dy / 10);
        }
      }

      this.draw(ctx);
    }
  }, {
    key: "pointer",
    set: function set(pointer) {
      __classPrivateFieldSet(this, _pointer, pointer);
    }
  }]);

  return Particle;
}();

_x = new WeakMap(), _y = new WeakMap(), _size = new WeakMap(), _color = new WeakMap(), _originX = new WeakMap(), _originY = new WeakMap(), _pointer = new WeakMap(), _maxDistanceToMove = new WeakMap(), _density = new WeakMap();
exports.default = Particle;
},{}],"App.ts":[function(require,module,exports) {
'use strict';

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var dat = __importStar(require("dat.gui"));

var imagesLoader_1 = __importDefault(require("./components/imagesLoader"));

require("./App.scss");

var Particle_1 = __importDefault(require("./components/Particle"));

var gui = new dat.GUI();
var image = new Image();
var canvas = document.getElementById("ctx");
var ctx = canvas.getContext("2d");
var mouse = {
  x: null,
  y: null,
  r: 100
};
var particles = [];

function getPixel(x, y, width, offset) {
  var ch = 4;
  return x * ch + y * ch * width + offset;
}

function positionXY(axis, wrapSize, imageSize) {
  var offset = 2;
  return axis + wrapSize / offset - imageSize * offset;
}

function createParticle(canvas, mouse, imageData) {
  var item = [];

  for (var y = 0, y2 = imageData.height; y < y2; y++) {
    for (var x = 0, x2 = imageData.width; x < x2; x++) {
      if (imageData.data[getPixel(x, y, imageData.width, 3)] > 128) {
        var posX = positionXY(x * 4, canvas.width, imageData.width);
        var posY = positionXY(y * 4, canvas.height, imageData.height);
        var r = imageData.data[getPixel(x, y, imageData.width, 0)];
        var g = imageData.data[getPixel(x, y, imageData.width, 1)];
        var b = imageData.data[getPixel(x, y, imageData.width, 2)];
        item.push(new Particle_1.default(posX, posY, 2, "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")"), mouse));
      }
    }
  }

  return item;
}

var frame = null;

function animate() {
  frame = requestAnimationFrame(animate);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < particles.length; i++) {
    particles[i].update(ctx);
  }
}

function drawImage(ctx) {
  var data = ctx.getImageData(0, 0, image.width, image.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  return data;
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function updatePointer() {
  for (var i = 0; i < particles.length; i++) {
    particles[i].pointer = mouse;
  }
}

function onMouseMove(evt) {
  var e = evt.touches && evt.touches[0] || evt;
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  updatePointer();
}

function onMouseLeave() {
  mouse.x = null;
  mouse.y = null;
  updatePointer();
}

window.addEventListener('mousemove', function (e) {
  onMouseMove(e);
});
window.addEventListener('touchmove', function (e) {
  e.preventDefault();
  e.stopPropagation();
  onMouseMove(e);
}, {
  passive: false
});
window.addEventListener('mouseleave', onMouseLeave);
window.addEventListener('touchend', onMouseLeave);
window.addEventListener('touchcancel', onMouseLeave);
var data = {
  imageName: 'logo'
};

function init() {
  ctx.drawImage(image, 0, 0);
  dataPixel = drawImage(ctx);
  particles = [];
  particles = createParticle(canvas, mouse, dataPixel);
  animate();
}

image.src = imagesLoader_1.default(data.imageName);
image.onload = init;
var dataPixel = null;
gui.add(data, 'imageName', ['logo', 'jedi']).onChange(function (value) {
  cancelAnimationFrame(frame);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  image.src = imagesLoader_1.default(value);
});
},{"dat.gui":"../node_modules/dat.gui/build/dat.gui.module.js","./components/imagesLoader":"components/imagesLoader.ts","./App.scss":"App.scss","./components/Particle":"components/Particle.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56507" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","App.ts"], null)
//# sourceMappingURL=/App.7a936cda.js.map