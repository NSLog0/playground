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
})({"../node_modules/stats.js/build/stats.min.js":[function(require,module,exports) {
var define;
// stats.js - http://github.com/mrdoob/stats.js
(function(f,e){"object"===typeof exports&&"undefined"!==typeof module?module.exports=e():"function"===typeof define&&define.amd?define(e):f.Stats=e()})(this,function(){var f=function(){function e(a){c.appendChild(a.dom);return a}function u(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a}var l=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000";c.addEventListener("click",function(a){a.preventDefault();
u(++l%c.children.length)},!1);var k=(performance||Date).now(),g=k,a=0,r=e(new f.Panel("FPS","#0ff","#002")),h=e(new f.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var t=e(new f.Panel("MB","#f08","#201"));u(0);return{REVISION:16,dom:c,addPanel:e,showPanel:u,begin:function(){k=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();h.update(c-k,200);if(c>g+1E3&&(r.update(1E3*a/(c-g),100),g=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/
1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){k=this.end()},domElement:c,setMode:u}};f.Panel=function(e,f,l){var c=Infinity,k=0,g=Math.round,a=g(window.devicePixelRatio||1),r=80*a,h=48*a,t=3*a,v=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r;q.height=h;q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");b.font="bold "+9*a+"px Helvetica,Arial,sans-serif";b.textBaseline="top";b.fillStyle=l;b.fillRect(0,0,r,h);b.fillStyle=f;b.fillText(e,t,v);
b.fillRect(d,m,n,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d,m,n,p);return{dom:q,update:function(h,w){c=Math.min(c,h);k=Math.max(k,h);b.fillStyle=l;b.globalAlpha=1;b.fillRect(0,0,r,m);b.fillStyle=f;b.fillText(g(h)+" "+e+" ("+g(c)+"-"+g(k)+")",t,v);b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p);b.fillRect(d+n-a,m,a,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d+n-a,m,a,g((1-h/w)*p))}}};return f});

},{}],"components/Particle.ts":[function(require,module,exports) {
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

var _x, _y, _size, _color, _speed, _alpha, _alphaLoseSpeed, _direction, _ROffset, _GOffset, _BOffset;

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Particle = /*#__PURE__*/function () {
  function Particle(x, y, size, color) {
    _classCallCheck(this, Particle);

    _x.set(this, void 0);

    _y.set(this, void 0);

    _size.set(this, void 0);

    _color.set(this, void 0);

    _speed.set(this, 1.5);

    _alpha.set(this, 1);

    _alphaLoseSpeed.set(this, 0.002);

    _direction.set(this, Math.floor(Math.random() * 4));

    _ROffset.set(this, 1);

    _GOffset.set(this, 1);

    _BOffset.set(this, 1);

    __classPrivateFieldSet(this, _x, x);

    __classPrivateFieldSet(this, _y, y);

    __classPrivateFieldSet(this, _size, size);

    __classPrivateFieldSet(this, _color, color);
  }

  _createClass(Particle, [{
    key: "draw",
    value: function draw(ctx) {
      ctx.beginPath();
      ctx.fillStyle = "rgba(".concat(Object.values(__classPrivateFieldGet(this, _color)).join(','), ",1)");
      ctx.fillRect(__classPrivateFieldGet(this, _x), __classPrivateFieldGet(this, _y), __classPrivateFieldGet(this, _size), __classPrivateFieldGet(this, _size));
      ctx.fill();
      ctx.closePath();
    }
  }, {
    key: "deduceAlpha",
    value: function deduceAlpha() {
      __classPrivateFieldSet(this, _alpha, __classPrivateFieldGet(this, _alpha) - __classPrivateFieldGet(this, _alphaLoseSpeed));
    }
  }, {
    key: "reborn",
    value: function reborn(width, height) {
      if (__classPrivateFieldGet(this, _alpha) < 0) {
        __classPrivateFieldSet(this, _speed, 1.5);

        __classPrivateFieldSet(this, _alpha, 1);

        __classPrivateFieldSet(this, _x, Math.floor(Math.random() * width));

        __classPrivateFieldSet(this, _y, Math.floor(Math.random() * height));
      }
    }
  }, {
    key: "changeColor",
    value: function changeColor() {
      if (__classPrivateFieldGet(this, _color).r == 0 || __classPrivateFieldGet(this, _color).r == 255) __classPrivateFieldSet(this, _ROffset, __classPrivateFieldGet(this, _ROffset) * -1);
      if (__classPrivateFieldGet(this, _color).g == 0 || __classPrivateFieldGet(this, _color).g == 255) __classPrivateFieldSet(this, _GOffset, __classPrivateFieldGet(this, _GOffset) * -1);
      if (__classPrivateFieldGet(this, _color).b == 0 || __classPrivateFieldGet(this, _color).b == 255) __classPrivateFieldSet(this, _BOffset, __classPrivateFieldGet(this, _BOffset) * -1);
      __classPrivateFieldGet(this, _color).r += 1 * __classPrivateFieldGet(this, _ROffset);
      __classPrivateFieldGet(this, _color).g += 1 * __classPrivateFieldGet(this, _GOffset);
      __classPrivateFieldGet(this, _color).b += 1 * __classPrivateFieldGet(this, _BOffset);
    }
  }, {
    key: "move",
    value: function move() {
      if (__classPrivateFieldGet(this, _direction) == 0) {
        __classPrivateFieldSet(this, _x, __classPrivateFieldGet(this, _x) + __classPrivateFieldGet(this, _speed));

        __classPrivateFieldSet(this, _y, __classPrivateFieldGet(this, _y) + __classPrivateFieldGet(this, _speed));
      }

      if (__classPrivateFieldGet(this, _direction) == 1) {
        __classPrivateFieldSet(this, _x, __classPrivateFieldGet(this, _x) + __classPrivateFieldGet(this, _speed));

        __classPrivateFieldSet(this, _y, __classPrivateFieldGet(this, _y) - __classPrivateFieldGet(this, _speed));
      }

      if (__classPrivateFieldGet(this, _direction) == 2) {
        __classPrivateFieldSet(this, _x, __classPrivateFieldGet(this, _x) - __classPrivateFieldGet(this, _speed));

        __classPrivateFieldSet(this, _y, __classPrivateFieldGet(this, _y) + __classPrivateFieldGet(this, _speed));
      }

      if (__classPrivateFieldGet(this, _direction) == 3) {
        __classPrivateFieldSet(this, _x, __classPrivateFieldGet(this, _x) - __classPrivateFieldGet(this, _speed));

        __classPrivateFieldSet(this, _y, __classPrivateFieldGet(this, _y) - __classPrivateFieldGet(this, _speed));
      }
    }
  }, {
    key: "changeDirection",
    value: function changeDirection() {
      var newDir = Math.floor(Math.random() * 4);

      if (__classPrivateFieldGet(this, _direction) === newDir || __classPrivateFieldGet(this, _direction) === 0 && newDir === 3 || __classPrivateFieldGet(this, _direction) === 1 && newDir === 2 || __classPrivateFieldGet(this, _direction) === 2 && newDir === 1 || __classPrivateFieldGet(this, _direction) === 3 && newDir === 0) {
        this.changeDirection();
        return;
      } else {
        __classPrivateFieldSet(this, _direction, newDir);
      }
    }
  }, {
    key: "update",
    value: function update(ctx, width, height) {
      this.deduceAlpha();
      this.reborn(width, height);
      this.move();
      this.draw(ctx);
    }
  }]);

  return Particle;
}();

_x = new WeakMap(), _y = new WeakMap(), _size = new WeakMap(), _color = new WeakMap(), _speed = new WeakMap(), _alpha = new WeakMap(), _alphaLoseSpeed = new WeakMap(), _direction = new WeakMap(), _ROffset = new WeakMap(), _GOffset = new WeakMap(), _BOffset = new WeakMap();
exports.default = Particle;
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
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"App.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var stats_js_1 = __importDefault(require("stats.js"));

var Particle_1 = __importDefault(require("./components/Particle"));

require("./App.scss");

var canvas = document.getElementById("ctx");
var ctx = canvas.getContext("2d");
var currentDate = new Date();
var color = {
  r: 72,
  g: 52,
  b: 212
};
var particles = [];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  particles = [];
  particles = init(canvas);
});
var stats = new stats_js_1.default();
document.body.appendChild(stats.dom);

function init(canvas) {
  var item = [];

  for (var i = 0; i < 100; i++) {
    item.push(new Particle_1.default(Math.random() * canvas.height, Math.random() * canvas.width, 5, color));
  }

  return item;
}

var mode = 'lighter';
var modeTimer = 80;
var directionTimmer = 30;

function animate() {
  stats.begin();
  modeTimer -= 1;
  directionTimmer -= 1;
  requestAnimationFrame(animate);

  if (modeTimer < 0) {
    if (mode === 'lighter') {
      mode = 'source-over';
      ctx.globalCompositeOperation = 'source-over';
    } else {
      mode = 'lighter';
      ctx.globalCompositeOperation = 'lighter';
    }

    modeTimer = 20;
  }

  if (directionTimmer < 0) {
    for (var i = 0; i < particles.length; i++) {
      particles[i].changeDirection();
    }

    directionTimmer = 30;
  }

  ctx.shadowBlur = 0;
  ctx.fillStyle = "rgba(0, 0, 0, 0.09)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.shadowColor = "rgba(246, 229, 141, 1)";
  ctx.shadowBlur = 25;

  for (var _i = 0; _i < particles.length; _i++) {
    particles[_i].update(ctx, window.innerWidth, window.innerHeight);
  }

  stats.end();
}

particles = init(canvas);
animate();
},{"stats.js":"../node_modules/stats.js/build/stats.min.js","./components/Particle":"components/Particle.ts","./App.scss":"App.scss"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56884" + '/');

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