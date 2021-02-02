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
})({"components/imagesLoader.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function imageLoader() {
  return 'data:image/jpeg;base64,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';
}

exports.default = imageLoader;
},{}],"../node_modules/stats.js/build/stats.min.js":[function(require,module,exports) {
var define;
// stats.js - http://github.com/mrdoob/stats.js
(function(f,e){"object"===typeof exports&&"undefined"!==typeof module?module.exports=e():"function"===typeof define&&define.amd?define(e):f.Stats=e()})(this,function(){var f=function(){function e(a){c.appendChild(a.dom);return a}function u(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a}var l=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000";c.addEventListener("click",function(a){a.preventDefault();
u(++l%c.children.length)},!1);var k=(performance||Date).now(),g=k,a=0,r=e(new f.Panel("FPS","#0ff","#002")),h=e(new f.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var t=e(new f.Panel("MB","#f08","#201"));u(0);return{REVISION:16,dom:c,addPanel:e,showPanel:u,begin:function(){k=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();h.update(c-k,200);if(c>g+1E3&&(r.update(1E3*a/(c-g),100),g=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/
1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){k=this.end()},domElement:c,setMode:u}};f.Panel=function(e,f,l){var c=Infinity,k=0,g=Math.round,a=g(window.devicePixelRatio||1),r=80*a,h=48*a,t=3*a,v=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r;q.height=h;q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");b.font="bold "+9*a+"px Helvetica,Arial,sans-serif";b.textBaseline="top";b.fillStyle=l;b.fillRect(0,0,r,h);b.fillStyle=f;b.fillText(e,t,v);
b.fillRect(d,m,n,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d,m,n,p);return{dom:q,update:function(h,w){c=Math.min(c,h);k=Math.max(k,h);b.fillStyle=l;b.globalAlpha=1;b.fillRect(0,0,r,m);b.fillStyle=f;b.fillText(g(h)+" "+e+" ("+g(c)+"-"+g(k)+")",t,v);b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p);b.fillRect(d+n-a,m,a,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d+n-a,m,a,g((1-h/w)*p))}}};return f});

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

var _x, _y, _size, _color, _ctx, _originX, _originY, _velocity, _pointer, _maxDistanceToMove, _canvas;

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Particle = /*#__PURE__*/function () {
  function Particle(x, y, size, color, ctx, pointer, canvas) {
    _classCallCheck(this, Particle);

    _x.set(this, void 0);

    _y.set(this, void 0);

    _size.set(this, void 0);

    _color.set(this, void 0);

    _ctx.set(this, void 0);

    _originX.set(this, void 0);

    _originY.set(this, void 0);

    _velocity.set(this, void 0);

    _pointer.set(this, void 0);

    _maxDistanceToMove.set(this, 100);

    _canvas.set(this, void 0);

    __classPrivateFieldSet(this, _x, __classPrivateFieldSet(this, _y, __classPrivateFieldSet(this, _size, size)));

    __classPrivateFieldSet(this, _color, color);

    __classPrivateFieldSet(this, _ctx, ctx);

    __classPrivateFieldSet(this, _originX, x);

    __classPrivateFieldSet(this, _originY, y);

    __classPrivateFieldSet(this, _velocity, Math.random() * 50 + 2); // 2-10


    __classPrivateFieldSet( // 2-10
    this, _pointer, pointer);

    __classPrivateFieldSet(this, _canvas, canvas);
  }

  _createClass(Particle, [{
    key: "draw",
    value: function draw() {
      __classPrivateFieldGet(this, _ctx).beginPath();

      __classPrivateFieldGet(this, _ctx).arc(__classPrivateFieldGet(this, _x), __classPrivateFieldGet(this, _y), __classPrivateFieldGet(this, _size), 0, Math.PI * 2);

      __classPrivateFieldGet(this, _ctx).closePath();

      __classPrivateFieldGet(this, _ctx).fill();

      __classPrivateFieldGet(this, _ctx).fillStyle = __classPrivateFieldGet(this, _color);
    }
  }, {
    key: "update",
    value: function update() {
      this.moveWithForce();
      this.draw();
    }
  }, {
    key: "dx",
    value: function dx() {
      return __classPrivateFieldGet(this, _pointer).x - __classPrivateFieldGet(this, _x);
    }
  }, {
    key: "dy",
    value: function dy() {
      return __classPrivateFieldGet(this, _pointer).y - __classPrivateFieldGet(this, _y);
    }
  }, {
    key: "collision",
    value: function collision() {
      var distance = Math.sqrt(this.dx() + this.dx() * this.dy() + this.dy());
      return distance;
    }
  }, {
    key: "force",
    value: function force(distance) {
      var velocityX = this.dx() / distance;
      var velocityY = this.dy() / distance;

      var movingForce = (__classPrivateFieldGet(this, _maxDistanceToMove) - distance) / __classPrivateFieldGet(this, _maxDistanceToMove);

      if (movingForce < 0) {
        movingForce = 0;
      }

      var moveX = velocityX * movingForce * __classPrivateFieldGet(this, _velocity) * 0.6;
      var moveY = velocityY * movingForce * __classPrivateFieldGet(this, _velocity) * 0.6;
      return {
        moveX: moveX,
        moveY: moveY
      };
    }
  }, {
    key: "moveWithForce",
    value: function moveWithForce() {
      var distance = this.collision();

      var _this$force = this.force(distance),
          moveX = _this$force.moveX,
          moveY = _this$force.moveY;

      if (distance < __classPrivateFieldGet(this, _pointer).r + __classPrivateFieldGet(this, _size)) {
        __classPrivateFieldSet(this, _x, __classPrivateFieldGet(this, _x) - moveX);

        __classPrivateFieldSet(this, _y, __classPrivateFieldGet(this, _y) - moveY);
      } else {
        if (__classPrivateFieldGet(this, _x) !== __classPrivateFieldGet(this, _originX)) {
          __classPrivateFieldSet(this, _x, __classPrivateFieldGet(this, _x) - (__classPrivateFieldGet(this, _x) - __classPrivateFieldGet(this, _originX)) / 20);
        }

        if (__classPrivateFieldGet(this, _y) !== __classPrivateFieldGet(this, _originY)) {
          __classPrivateFieldSet(this, _y, __classPrivateFieldGet(this, _y) - (__classPrivateFieldGet(this, _y) - __classPrivateFieldGet(this, _originY)) / 20);
        }
      }
    }
  }, {
    key: "pointer",
    set: function set(pointer) {
      __classPrivateFieldSet(this, _pointer, pointer);
    }
  }]);

  return Particle;
}();

_x = new WeakMap(), _y = new WeakMap(), _size = new WeakMap(), _color = new WeakMap(), _ctx = new WeakMap(), _originX = new WeakMap(), _originY = new WeakMap(), _velocity = new WeakMap(), _pointer = new WeakMap(), _maxDistanceToMove = new WeakMap(), _canvas = new WeakMap();
exports.default = Particle;
},{}],"App.ts":[function(require,module,exports) {
'use strict';

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var imagesLoader_1 = __importDefault(require("./components/imagesLoader"));

var stats_js_1 = __importDefault(require("stats.js"));

require("./App.scss");

var Particle_1 = __importDefault(require("./components/Particle"));

var image = new Image();
var canvas = document.getElementById("ctx");
var ctx = canvas.getContext("2d");
var stats = new stats_js_1.default();
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

function createParticle(canvas, ctx, mouse, imageData) {
  var item = [];

  for (var y = 0, y2 = imageData.height; y < y2; y++) {
    for (var x = 0, x2 = imageData.width; x < x2; x++) {
      if (imageData.data[getPixel(x, y, imageData.width, 3)] > 128) {
        var posX = positionXY(x * 4, canvas.width, imageData.width);
        var posY = positionXY(y * 4, canvas.height, imageData.height);
        var r = imageData.data[getPixel(x, y, imageData.width, 0)];
        var g = imageData.data[getPixel(x, y, imageData.width, 1)];
        var b = imageData.data[getPixel(x, y, imageData.width, 2)];
        item.push(new Particle_1.default(posX, posY, 1, "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")"), ctx, mouse, canvas));
      }
    }
  }

  return item;
}

function animate() {
  ctx.fillStyle = 'rgb(0, 0, 0, 0.5)';
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  requestAnimationFrame(animate);

  for (var i = 0; i < particles.length; i++) {
    particles[i].update();
  }
}

function drawImage(ctx) {
  var data = ctx.getImageData(0, 0, image.width, image.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  return data;
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('mousemove', function (e) {
  mouse.x = e.x + canvas.clientLeft / 2;
  mouse.y = e.y + canvas.clientTop / 2;

  for (var i = 0; i < particles.length; i++) {
    particles[i].pointer = mouse;
  }
});
image.src = imagesLoader_1.default();
document.body.appendChild(stats.dom);
window.addEventListener('load', function () {
  ctx.drawImage(image, 0, 0);
  var dataPixel = drawImage(ctx);
  particles = createParticle(canvas, ctx, mouse, dataPixel);
  animate();
});
},{"./components/imagesLoader":"components/imagesLoader.ts","stats.js":"../node_modules/stats.js/build/stats.min.js","./App.scss":"App.scss","./components/Particle":"components/Particle.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51343" + '/');

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