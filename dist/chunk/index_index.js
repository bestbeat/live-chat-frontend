(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{"11":function(e,t,o){"use strict";o.r(t),o.d(t,"default",function(){return f});var a=o(0),n=o(117),r=o(1),c=o(118),l=o(80),s=o(119),i=o(81),p=o(124),m=o(115),u=(o(43),function(){function defineProperties(e,t){for(var o=0;o<t.length;o++){var a=t[o];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(e,t,o){return t&&defineProperties(e.prototype,t),o&&defineProperties(e,o),e}}()),d=function get(e,t,o){null===e&&(e=Function.prototype);var a=Object.getOwnPropertyDescriptor(e,t);if(void 0===a){var n=Object.getPrototypeOf(e);return null===n?void 0:get(n,t,o)}if("value"in a)return a.value;var r=a.get;return void 0!==r?r.call(o):void 0};var f=function(e){function Index(){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,Index);var e=function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(Index.__proto__||Object.getPrototypeOf(Index)).apply(this,arguments));return e.config={"navigationBarTitleText":"圈子-登录"},e.state={"loginName":"","password":""},e}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{"constructor":{"value":e,"enumerable":!1,"writable":!0,"configurable":!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(Index,r["a"].Component),u(Index,[{"key":"login","value":function login(){console.log(this.state),Object(n.a)({"url":"https://118.31.108.252/backend/login/permission","header":{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},"data":this.state,"method":"POST","success":function success(e){console.log(e),200==e.statusCode?r.a.navigateTo({"url":"/pages/home/home"}):console.log("用户名密码不正确")},"fail":function fail(e){console.log(e)},"complete":function complete(){console.log("请求中")}})}},{"key":"loginNameChange","value":function loginNameChange(e){console.log(e),this.setState({"loginName":e})}},{"key":"passwordChange","value":function passwordChange(e){this.setState({"password":e})}},{"key":"register","value":function register(e){r.a.navigateTo({"url":"/pages/register/register"})}},{"key":"render","value":function render(){return a.k.createElement(c.a,{"className":"components-page margin-top-v"},a.k.createElement(c.a,{"className":"at-row row-height"},a.k.createElement(c.a,{"className":"at-col at-col-1"}),a.k.createElement(c.a,{"className":"at-col"},a.k.createElement(l.a,{"className":"image-style","src":"https://118.31.108.252/login.jpg"})),a.k.createElement(c.a,{"className":"at-col at-col-1"})),a.k.createElement(i.a,null,a.k.createElement(c.a,{"className":"at-row"},a.k.createElement(c.a,{"className":"at-col at-col-1"}),a.k.createElement(c.a,{"className":"at-col"},a.k.createElement(p.a,{"name":"loginName","title":"登录号","type":"text","placeholder":"手机号/用户名","value":this.state.loginName,"onChange":this.loginNameChange.bind(this)})),a.k.createElement(c.a,{"className":"at-col at-col-1"})),a.k.createElement(c.a,{"className":"at-row"},a.k.createElement(c.a,{"className":"at-col at-col-1"}),a.k.createElement(c.a,{"className":"at-col"},a.k.createElement(p.a,{"name":"password","title":"密码","type":"password","placeholder":"6位以上","value":this.state.password,"onChange":this.passwordChange.bind(this)})),a.k.createElement(c.a,{"className":"at-col at-col-1"})),a.k.createElement(c.a,{"className":"at-row"},a.k.createElement(c.a,{"className":"at-col at-col-1"}),a.k.createElement(c.a,{"className":"at-col"},a.k.createElement(m.a,{"type":"primary","onClick":this.login.bind(this)},"登录")),a.k.createElement(c.a,{"className":"at-col at-col-1"})),a.k.createElement(c.a,{"className":"at-row"},a.k.createElement(c.a,{"className":"at-col at-col-1"}),a.k.createElement(c.a,{"className":"at-col font-position"},a.k.createElement(s.a,{"className":"font-style","onClick":this.register.bind(this)},"用户注册")),a.k.createElement(c.a,{"className":"at-col at-col-1"}))))}},{"key":"componentDidMount","value":function componentDidMount(){d(Index.prototype.__proto__||Object.getPrototypeOf(Index.prototype),"componentDidMount",this)&&d(Index.prototype.__proto__||Object.getPrototypeOf(Index.prototype),"componentDidMount",this).call(this)}},{"key":"componentDidShow","value":function componentDidShow(){d(Index.prototype.__proto__||Object.getPrototypeOf(Index.prototype),"componentDidShow",this)&&d(Index.prototype.__proto__||Object.getPrototypeOf(Index.prototype),"componentDidShow",this).call(this)}},{"key":"componentDidHide","value":function componentDidHide(){d(Index.prototype.__proto__||Object.getPrototypeOf(Index.prototype),"componentDidHide",this)&&d(Index.prototype.__proto__||Object.getPrototypeOf(Index.prototype),"componentDidHide",this).call(this)}}]),Index}()},"43":function(e,t,o){}}]);