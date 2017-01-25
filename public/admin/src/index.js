// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import App from './app';
import routes from './routes';
import storeOption from './store';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

// var VueCookie = require('vue-cookie');
 // var Cookies=require("Cookies");

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(ElementUI);

// // 创建一个路由对象用于管理页面的路由
const router = new VueRouter({
  mode: 'hash',
  routes: routes
});

// 创建一个 store 对象用于管理应用状态
const store = new Vuex.Store(storeOption);


window.__lendApp__ = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});

window.Vue=__lendApp__;