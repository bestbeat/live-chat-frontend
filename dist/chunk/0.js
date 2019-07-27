(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,,,,,,,,,function(t,e,n){var r,o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};!function(){"use strict";var i={}.hasOwnProperty;function classNames(){for(var t=[],e=0;e<arguments.length;e++){var n=arguments[e];if(n){var r=void 0===n?"undefined":o(n);if("string"===r||"number"===r)t.push(n);else if(Array.isArray(n)&&n.length){var s=classNames.apply(null,n);s&&t.push(s)}else if("object"===r)for(var u in n)i.call(n,u)&&n[u]&&t.push(u)}}return t.join(" ")}t.exports?(classNames.default=classNames,t.exports=classNames):"object"===o(n(40))&&n(40)?void 0===(r=function(){return classNames}.apply(e,[]))||(t.exports=r):window.classNames=classNames}()},,function(t,e,n){"use strict";n.d(e,"a",function(){return a});var r,o,i=n(1),s=function(){function defineProperties(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(t,e,n){return e&&defineProperties(t.prototype,e),n&&defineProperties(t,n),t}}(),u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};var c=function objectToString(t){if(t&&"object"===(void 0===t?"undefined":u(t))){var e="";return Object.keys(t).forEach(function(n){var r=n.replace(/([A-Z])/g,"-$1").toLowerCase();e+=r+":"+t[n]+";"}),e}return t&&"string"==typeof t?t:""},a=(o=r=function(t){function AtComponent(){return function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,AtComponent),function _possibleConstructorReturn(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(AtComponent.__proto__||Object.getPrototypeOf(AtComponent)).apply(this,arguments))}return function _inherits(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{"constructor":{"value":t,"enumerable":!1,"writable":!0,"configurable":!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(AtComponent,i["a"].Component),s(AtComponent,[{"key":"mergeStyle","value":function mergeStyle(t,e){return t&&"object"===(void 0===t?"undefined":u(t))&&e&&"object"===(void 0===e?"undefined":u(e))?Object.assign({},t,e):c(t)+c(e)}}]),AtComponent}(),r.options={"addGlobalClass":!0},o)},function(t,e,n){t.exports=n(82)()},function(t,e,n){},function(t,e){t.exports=function(t){var e=[];return e.toString=function toString(){return this.map(function(e){var n=function cssWithMappingToString(t,e){var n=t[1]||"",r=t[3];if(!r)return n;if(e&&"function"==typeof btoa){var o=function toComment(t){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t))))+" */"}(r),i=r.sources.map(function(t){return"/*# sourceURL="+r.sourceRoot+t+" */"});return[n].concat(i).concat([o]).join("\n")}return[n].join("\n")}(e,t);return e[2]?"@media "+e[2]+"{"+n+"}":n}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var r={},o=0;o<this.length;o++){var i=this[o][0];"number"==typeof i&&(r[i]=!0)}for(o=0;o<t.length;o++){var s=t[o];"number"==typeof s[0]&&r[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="("+s[2]+") and ("+n+")"),e.push(s))}},e}},function(t,e,n){var r,o,i={},s=(r=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===o&&(o=r.apply(this,arguments)),o}),u=function(t){var e={};return function(t){if("function"==typeof t)return t();if(void 0===e[t]){var n=function(t){return document.querySelector(t)}.call(this,t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}e[t]=n}return e[t]}}(),c=null,a=0,f=[],l=n(79);function addStylesToDom(t,e){for(var n=0;n<t.length;n++){var r=t[n],o=i[r.id];if(o){o.refs++;for(var s=0;s<o.parts.length;s++)o.parts[s](r.parts[s]);for(;s<r.parts.length;s++)o.parts.push(addStyle(r.parts[s],e))}else{var u=[];for(s=0;s<r.parts.length;s++)u.push(addStyle(r.parts[s],e));i[r.id]={"id":r.id,"refs":1,"parts":u}}}}function listToStyles(t,e){for(var n=[],r={},o=0;o<t.length;o++){var i=t[o],s=e.base?i[0]+e.base:i[0],u={"css":i[1],"media":i[2],"sourceMap":i[3]};r[s]?r[s].parts.push(u):n.push(r[s]={"id":s,"parts":[u]})}return n}function insertStyleElement(t,e){var n=u(t.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=f[f.length-1];if("top"===t.insertAt)r?r.nextSibling?n.insertBefore(e,r.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),f.push(e);else if("bottom"===t.insertAt)n.appendChild(e);else{if("object"!=typeof t.insertAt||!t.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var o=u(t.insertInto+" "+t.insertAt.before);n.insertBefore(e,o)}}function removeStyleElement(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var e=f.indexOf(t);e>=0&&f.splice(e,1)}function createStyleElement(t){var e=document.createElement("style");return void 0===t.attrs.type&&(t.attrs.type="text/css"),addAttrs(e,t.attrs),insertStyleElement(t,e),e}function addAttrs(t,e){Object.keys(e).forEach(function(n){t.setAttribute(n,e[n])})}function addStyle(t,e){var n,r,o,i;if(e.transform&&t.css){if(!(i=e.transform(t.css)))return function(){};t.css=i}if(e.singleton){var s=a++;n=c||(c=createStyleElement(e)),r=applyToSingletonTag.bind(null,n,s,!1),o=applyToSingletonTag.bind(null,n,s,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function createLinkElement(t){var e=document.createElement("link");return void 0===t.attrs.type&&(t.attrs.type="text/css"),t.attrs.rel="stylesheet",addAttrs(e,t.attrs),insertStyleElement(t,e),e}(e),r=function updateLink(t,e,n){var r=n.css,o=n.sourceMap,i=void 0===e.convertToAbsoluteUrls&&o;(e.convertToAbsoluteUrls||i)&&(r=l(r));o&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var s=new Blob([r],{"type":"text/css"}),u=t.href;t.href=URL.createObjectURL(s),u&&URL.revokeObjectURL(u)}.bind(null,n,e),o=function(){removeStyleElement(n),n.href&&URL.revokeObjectURL(n.href)}):(n=createStyleElement(e),r=function applyToTag(t,e){var n=e.css,r=e.media;r&&t.setAttribute("media",r);if(t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}.bind(null,n),o=function(){removeStyleElement(n)});return r(t),function updateStyle(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;r(t=e)}else o()}}t.exports=function(t,e){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(e=e||{}).attrs="object"==typeof e.attrs?e.attrs:{},e.singleton||"boolean"==typeof e.singleton||(e.singleton=s()),e.insertInto||(e.insertInto="head"),e.insertAt||(e.insertAt="bottom");var n=listToStyles(t,e);return addStylesToDom(n,e),function update(t){for(var r=[],o=0;o<n.length;o++){var s=n[o];(u=i[s.id]).refs--,r.push(u)}t&&addStylesToDom(listToStyles(t,e),e);for(o=0;o<r.length;o++){var u;if(0===(u=r[o]).refs){for(var c=0;c<u.parts.length;c++)u.parts[c]();delete i[u.id]}}}};var p,h=(p=[],function(t,e){return p[t]=e,p.filter(Boolean).join("\n")});function applyToSingletonTag(t,e,n,r){var o=n?"":r.css;if(t.styleSheet)t.styleSheet.cssText=h(e,o);else{var i=document.createTextNode(o),s=t.childNodes;s[e]&&t.removeChild(s[e]),s.length?t.insertBefore(i,s[e]):t.appendChild(i)}}},function(t,e,n){"use strict";var r=n(48),o=n.n(r);e.a=function omit(t,e){for(var n=o()({},t),r=0;r<e.length;r++)delete n[e[r]];return n}},function(t,e,n){t.exports=!n(30)(function(){return 7!=Object.defineProperty({},"a",{"get":function get(){return 7}}).a})},,,,function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e){var n=t.exports={"version":"2.6.9"};"number"==typeof __e&&(__e=n)},function(t,e){var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};t.exports=function(t){return"object"===(void 0===t?"undefined":n(t))?null!==t:"function"==typeof t}},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},,,,,function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){var r=n(37),o=n(38);t.exports=function(t){return r(o(t))}},function(t,e,n){var r=n(65);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},function(t,e){(function(e){t.exports=e}).call(this,{})},,,,,,,,function(t,e,n){"use strict";e.__esModule=!0;var r=function _interopRequireDefault(t){return t&&t.__esModule?t:{"default":t}}(n(49));e.default=r.default||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}},function(t,e,n){t.exports={"default":n(50),"__esModule":!0}},function(t,e,n){n(51),t.exports=n(28).Object.assign},function(t,e,n){var r=n(52);r(r.S+r.F,"Object",{"assign":n(62)})},function(t,e,n){var r=n(27),o=n(28),i=n(53),s=n(55),u=n(35),c=function $export(t,e,n){var c,a,f,l=t&$export.F,p=t&$export.G,h=t&$export.S,y=t&$export.P,m=t&$export.B,d=t&$export.W,v=p?o:o[e]||(o[e]={}),b=v.prototype,g=p?r:h?r[e]:(r[e]||{}).prototype;for(c in p&&(n=e),n)(a=!l&&g&&void 0!==g[c])&&u(v,c)||(f=a?g[c]:n[c],v[c]=p&&"function"!=typeof g[c]?n[c]:m&&a?i(f,r):d&&g[c]==f?function(t){var e=function F(e,n,r){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,n)}return new t(e,n,r)}return t.apply(this,arguments)};return e.prototype=t.prototype,e}(f):y&&"function"==typeof f?i(Function.call,f):f,y&&((v.virtual||(v.virtual={}))[c]=f,t&$export.R&&b&&!b[c]&&s(b,c,f)))};c.F=1,c.G=2,c.S=4,c.P=8,c.B=16,c.W=32,c.U=64,c.R=128,t.exports=c},function(t,e,n){var r=n(54);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e,n){var r=n(56),o=n(61);t.exports=n(23)?function(t,e,n){return r.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var r=n(57),o=n(58),i=n(60),s=Object.defineProperty;e.f=n(23)?Object.defineProperty:function defineProperty(t,e,n){if(r(t),e=i(e,!0),r(n),o)try{return s(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e,n){var r=n(29);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,e,n){t.exports=!n(23)&&!n(30)(function(){return 7!=Object.defineProperty(n(59)("div"),"a",{"get":function get(){return 7}}).a})},function(t,e,n){var r=n(29),o=n(27).document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},function(t,e,n){var r=n(29);t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},function(t,e){t.exports=function(t,e){return{"enumerable":!(1&t),"configurable":!(2&t),"writable":!(4&t),"value":e}}},function(t,e,n){"use strict";var r=n(23),o=n(63),i=n(74),s=n(75),u=n(76),c=n(37),a=Object.assign;t.exports=!a||n(30)(function(){var t={},e={},n=Symbol(),r="abcdefghijklmnopqrst";return t[n]=7,r.split("").forEach(function(t){e[t]=t}),7!=a({},t)[n]||Object.keys(a({},e)).join("")!=r})?function assign(t,e){for(var n=u(t),a=arguments.length,f=1,l=i.f,p=s.f;a>f;)for(var h,y=c(arguments[f++]),m=l?o(y).concat(l(y)):o(y),d=m.length,v=0;d>v;)h=m[v++],r&&!p.call(y,h)||(n[h]=y[h]);return n}:a},function(t,e,n){var r=n(64),o=n(73);t.exports=Object.keys||function keys(t){return r(t,o)}},function(t,e,n){var r=n(35),o=n(36),i=n(66)(!1),s=n(69)("IE_PROTO");t.exports=function(t,e){var n,u=o(t),c=0,a=[];for(n in u)n!=s&&r(u,n)&&a.push(n);for(;e.length>c;)r(u,n=e[c++])&&(~i(a,n)||a.push(n));return a}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e,n){var r=n(36),o=n(67),i=n(68);t.exports=function(t){return function(e,n,s){var u,c=r(e),a=o(c.length),f=i(s,a);if(t&&n!=n){for(;a>f;)if((u=c[f++])!=u)return!0}else for(;a>f;f++)if((t||f in c)&&c[f]===n)return t||f||0;return!t&&-1}}},function(t,e,n){var r=n(39),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},function(t,e,n){var r=n(39),o=Math.max,i=Math.min;t.exports=function(t,e){return(t=r(t))<0?o(t+e,0):i(t,e)}},function(t,e,n){var r=n(70)("keys"),o=n(72);t.exports=function(t){return r[t]||(r[t]=o(t))}},function(t,e,n){var r=n(28),o=n(27),i=o["__core-js_shared__"]||(o["__core-js_shared__"]={});(t.exports=function(t,e){return i[t]||(i[t]=void 0!==e?e:{})})("versions",[]).push({"version":r.version,"mode":n(71)?"pure":"global","copyright":"© 2019 Denis Pushkarev (zloirock.ru)"})},function(t,e){t.exports=!0},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e){e.f=Object.getOwnPropertySymbols},function(t,e){e.f={}.propertyIsEnumerable},function(t,e,n){var r=n(38);t.exports=function(t){return Object(r(t))}},function(t,e,n){var r=n(78);"string"==typeof r&&(r=[[t.i,r,""]]);var o={"sourceMap":!1,"insertAt":"top","hmr":!0,"transform":void 0,"insertInto":void 0};n(21)(r,o);r.locals&&(t.exports=r.locals)},function(t,e,n){(t.exports=n(20)(!1)).push([t.i,"body,\nhtml {\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n  user-select: none;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n}",""])},function(t,e){t.exports=function(t){var e="undefined"!=typeof window&&window.location;if(!e)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var n=e.protocol+"//"+e.host,r=n+e.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(t,e){var o,i=e.trim().replace(/^"(.*)"$/,function(t,e){return e}).replace(/^'(.*)'$/,function(t,e){return e});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i)?t:(o=0===i.indexOf("//")?i:0===i.indexOf("/")?n+i:r+i.replace(/^\.\//,""),"url("+JSON.stringify(o)+")")})}},,,function(t,e,n){"use strict";var r=n(83);function emptyFunction(){}function emptyFunctionWithReset(){}emptyFunctionWithReset.resetWarningCache=emptyFunction,t.exports=function(){function shim(t,e,n,o,i,s){if(s!==r){var u=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw u.name="Invariant Violation",u}}function getShim(){return shim}shim.isRequired=shim;var t={"array":shim,"bool":shim,"func":shim,"number":shim,"object":shim,"string":shim,"symbol":shim,"any":shim,"arrayOf":getShim,"element":shim,"elementType":shim,"instanceOf":getShim,"node":shim,"objectOf":getShim,"oneOf":getShim,"oneOfType":getShim,"shape":getShim,"exact":getShim,"checkPropTypes":emptyFunctionWithReset,"resetWarningCache":emptyFunction};return t.PropTypes=t,t}},function(t,e,n){"use strict";t.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},,,,function(t,e,n){var r=n(88);"string"==typeof r&&(r=[[t.i,r,""]]);var o={"sourceMap":!1,"insertAt":"top","hmr":!0,"transform":void 0,"insertInto":void 0};n(21)(r,o);r.locals&&(t.exports=r.locals)},function(t,e,n){(t.exports=n(20)(!1)).push([t.i,".taro-text {\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n.taro-text__selectable {\n  -moz-user-select: text;\n  -webkit-user-select: text;\n  -ms-user-select: text;\n  user-select: text;\n}",""])},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e,n){"use strict";n(19);var r=n(0),o=n(22),i=n(15),s=n.n(i),u=(n(77),Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}),c=function(){function defineProperties(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(t,e,n){return e&&defineProperties(t.prototype,e),n&&defineProperties(t,n),t}}();var a=function(t){function View(){!function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,View);var t=function _possibleConstructorReturn(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(View.__proto__||Object.getPrototypeOf(View)).apply(this,arguments));return t.timeoutEvent=0,t.startTime=0,t.state={"hover":!1,"touch":!1},t}return function _inherits(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{"constructor":{"value":t,"enumerable":!1,"writable":!0,"configurable":!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(View,r["k"].Component),c(View,[{"key":"render","value":function render(){var t=this,e=this.props,n=e.hoverClass,i=e.onTouchStart,c=e.onTouchEnd,a=e.onTouchMove,f=e.className,l=e.hoverStartTime,p=void 0===l?50:l,h=e.hoverStayTime,y=void 0===h?400:h,m=function _objectWithoutProperties(t,e){var n={};for(var r in t)e.indexOf(r)>=0||Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r]);return n}(e,["hoverClass","onTouchStart","onTouchEnd","onTouchMove","className","hoverStartTime","hoverStayTime"]),d=s()("",function _defineProperty(t,e,n){return e in t?Object.defineProperty(t,e,{"value":n,"enumerable":!0,"configurable":!0,"writable":!0}):t[e]=n,t}({},""+n,this.state.hover),f);return r.k.createElement("div",u({},Object(o.a)(this.props,["hoverClass","onTouchStart","onTouchEnd","onTouchMove","className","hoverStartTime","hoverStayTime"]),m,{"className":d,"onTouchStart":function _onTouchStart(e){n&&(t.setState(function(){return{"touch":!0}}),setTimeout(function(){t.state.touch&&t.setState(function(){return{"hover":!0}})},p)),i&&i(e),t.props.onLongPress&&(t.timeoutEvent=setTimeout(function(){t.props.onLongPress()},350),t.startTime=(new Date).getTime())},"onTouchEnd":function _onTouchEnd(e){(new Date).getTime()-t.startTime<350&&clearTimeout(t.timeoutEvent),n&&(t.setState(function(){return{"touch":!1}}),setTimeout(function(){t.state.touch||t.setState(function(){return{"hover":!1}})},y)),c&&c(e)},"onTouchMove":function _onTouchMove(e){clearTimeout(t.timeoutEvent),a&&a(e)}}),this.props.children)}}]),View}();e.a=a},function(t,e,n){"use strict";n(19);var r=n(0),o=n(22),i=n(15),s=n.n(i),u=(n(87),Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t}),c=function(){function defineProperties(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(t,e,n){return e&&defineProperties(t.prototype,e),n&&defineProperties(t,n),t}}();var a=function(t){function Text(){return function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,Text),function _possibleConstructorReturn(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(Text.__proto__||Object.getPrototypeOf(Text)).apply(this,arguments))}return function _inherits(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{"constructor":{"value":t,"enumerable":!1,"writable":!0,"configurable":!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(Text,r["k"].Component),c(Text,[{"key":"render","value":function render(){var t=this.props,e=t.className,n=t.selectable,i=void 0!==n&&n,c=s()("taro-text",{"taro-text__selectable":i},e);return r.k.createElement("span",u({},Object(o.a)(this.props,["selectable","className"]),{"className":c}),this.props.children)}}]),Text}();e.a=a}]]);