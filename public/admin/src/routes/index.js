/**
 * @file
 * Created by hanan on 16/10/15.
 */
const Login = r => require(['views/login'], r);
const NotFound = r => require(['views/notfound'], r);

// 根目录
const rootPath = '';

// 页面路由
const routes = [
	  {
	  	path: '',
	  	redirect: {
	  		name: 'login'
	  	}
	  }, {
	  	path: '/',
	  	redirect: {
	  		name: 'login'
	  	}
	  }, {
	  	path: '/login',
	  	component: Login,
	  	name: 'login'
	  }
].map(route => {
  route.path = rootPath + route.path;
  return route;
});

// 404 页
routes.push({path: '*', component: NotFound, name: 'notfound'});

export default routes;
