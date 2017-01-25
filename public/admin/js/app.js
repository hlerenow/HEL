/*!
 * **********Created By HL ;*********
 * 
 */
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
/***/ function(module, exports) {

	eval("// The Vue build version to load with the `import` command\r\n// (runtime-only or standalone) has been set in webpack.base.conf with an alias.\r\nimport Vue from 'vue';\r\nimport Vuex from 'vuex';\r\nimport VueRouter from 'vue-router';\r\n// import App from './app';\r\n// import routes from './routes';\r\nimport storeOption from './store';\r\n\r\n// var VueCookie = require('vue-cookie');\r\n // var Cookies=require(\"Cookies\");\r\n\r\nVue.use(Vuex);\r\n\r\nVue.use(VueRouter);\r\n\r\n\r\n// 创建一个路由对象用于管理页面的路由\r\nconst router = new VueRouter({\r\n  mode: 'hash',\r\n  routes: routes\r\n});\r\n\r\n// 创建一个 store 对象用于管理应用状态\r\nconst store = new Vuex.Store(storeOption);\r\n\r\nwindow.__lendApp__ = new Vue({\r\n  el: '#app',\r\n  router,\r\n  store,\r\n  render: h => h(App)\r\n});\r\n\r\nwindow.Vue=__lendApp__;\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanM/OTU1MiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEIiwiZmlsZSI6IjAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgVnVlIGJ1aWxkIHZlcnNpb24gdG8gbG9hZCB3aXRoIHRoZSBgaW1wb3J0YCBjb21tYW5kXHJcbi8vIChydW50aW1lLW9ubHkgb3Igc3RhbmRhbG9uZSkgaGFzIGJlZW4gc2V0IGluIHdlYnBhY2suYmFzZS5jb25mIHdpdGggYW4gYWxpYXMuXHJcbmltcG9ydCBWdWUgZnJvbSAndnVlJztcclxuaW1wb3J0IFZ1ZXggZnJvbSAndnVleCc7XHJcbmltcG9ydCBWdWVSb3V0ZXIgZnJvbSAndnVlLXJvdXRlcic7XHJcbi8vIGltcG9ydCBBcHAgZnJvbSAnLi9hcHAnO1xyXG4vLyBpbXBvcnQgcm91dGVzIGZyb20gJy4vcm91dGVzJztcclxuaW1wb3J0IHN0b3JlT3B0aW9uIGZyb20gJy4vc3RvcmUnO1xyXG5cclxuLy8gdmFyIFZ1ZUNvb2tpZSA9IHJlcXVpcmUoJ3Z1ZS1jb29raWUnKTtcclxuIC8vIHZhciBDb29raWVzPXJlcXVpcmUoXCJDb29raWVzXCIpO1xyXG5cclxuVnVlLnVzZShWdWV4KTtcclxuXHJcblZ1ZS51c2UoVnVlUm91dGVyKTtcclxuXHJcblxyXG4vLyDliJvlu7rkuIDkuKrot6/nlLHlr7nosaHnlKjkuo7nrqHnkIbpobXpnaLnmoTot6/nlLFcclxuY29uc3Qgcm91dGVyID0gbmV3IFZ1ZVJvdXRlcih7XHJcbiAgbW9kZTogJ2hhc2gnLFxyXG4gIHJvdXRlczogcm91dGVzXHJcbn0pO1xyXG5cclxuLy8g5Yib5bu65LiA5LiqIHN0b3JlIOWvueixoeeUqOS6jueuoeeQhuW6lOeUqOeKtuaAgVxyXG5jb25zdCBzdG9yZSA9IG5ldyBWdWV4LlN0b3JlKHN0b3JlT3B0aW9uKTtcclxuXHJcbndpbmRvdy5fX2xlbmRBcHBfXyA9IG5ldyBWdWUoe1xyXG4gIGVsOiAnI2FwcCcsXHJcbiAgcm91dGVyLFxyXG4gIHN0b3JlLFxyXG4gIHJlbmRlcjogaCA9PiBoKEFwcClcclxufSk7XHJcblxyXG53aW5kb3cuVnVlPV9fbGVuZEFwcF9fO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ }
/******/ ]);