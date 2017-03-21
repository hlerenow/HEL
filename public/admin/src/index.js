// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import Axios from 'axios';
import VueCookie from 'vue-cookie';

import App from './app';
import routes from './routes';
import store from './store'
// import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
// Vue.use(ElementUI);

// Tell Vue to use the plugin
Vue.use(VueRouter);
Vue.use(VueCookie);
// Vue.use(Vuex);


const bus = new Vue();
Vue.prototype.$bus=bus;

Vue.prototype.$http=Axios;


// // 创建一个路由对象用于管理页面的路由
const router = new VueRouter({
  routes: routes
});

//Axios 全局设置
Axios.defaults.baseURL = './api/';

Axios.interceptors.response.use(function(res){
	if(res.data.state===401){
		//清除本地cookie
        VueCookie.delete("username");
        VueCookie.delete("mail");
        VueCookie.delete("nickname");
        //跳转登录页
		router.push({
			path:"/login"
		});
		return Promise.reject(res);
	}else{
		return res;
	}
});

window.__lendApp__ = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});

window.Vue=__lendApp__;