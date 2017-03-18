/**
 * @file
 * Created by hanan on 16/10/15.
 */
// const Login = r => require(['views/login'], r);
// const NotFound = r => require(['views/notfound'], r);
// const Admin = r=>require(['views/admin/index'],r);
// const Welcome = r=>require(['views/admin/welcome'],r);
// const EditorEassy = r=>require(['views/admin/editorEassy'],r);
// const ModifyEassy = r=>require(['views/admin/modifyEassy'],r);

// const CatalogCreate = r=>require(['views/admin/catalog/create'],r);

// const Media = r=>require(['views/admin/media'],r);
// const MediaAdd = r=>require(['views/admin/mediaAdd'],r);

// const EassyList = r =>require(['views/admin/eassyList'],r);

const Login = r => require.ensure([],()=>r(require('views/login')),'login');
const NotFound = r => require.ensure([],()=>r(require('views/notfound')),'notfound');
const Admin = r => require.ensure([],()=>r(require('views/admin/index')),'admin');

const EditorEassy = r=>require.ensure([],()=>r(require("views/admin/editorEassy")),"editorEassy");

const ModifyEassy = r=>require.ensure([],()=>r(require("views/admin/modifyEassy")),"modifyEassy");
const Catalog= r=>require.ensure([],()=>r(require("views/admin/catalog")),"catalog");

const Media = r=>require.ensure([],()=>r(require("views/admin/media")),"media");

const MediaAdd = r=>require.ensure([],()=>r(require("views/admin/mediaAdd")),"mediaAdd");

const EassyList = r=>require.ensure([],()=>r(require("views/admin/eassyList")),"eassyList");

const BaseSetting = r=>require.ensure([],()=>r(require("views/admin/baseSetting")),"baseSetting");

// 根目录
const rootPath = '';

// 页面路由
const routes = [
	  {
	  	path: '',
	  	redirect: {
	  		name: 'login'
	  	}
	  }, 
	  {
	  	path: '/',
	  	redirect: {
	  		name: 'login'
	  	}
	  }, 
	  {
	  	path: '/login',
	  	component: Login,
	  	name: 'login'
	  },
	  {
	  	path:"/main/",
	  	component:Admin,
	  	name:'main',
	  	children:[
	  		{
	  			path:"editorEassy",
	  			component:EditorEassy,
	  			name:"editorEassy"
	  			// meta:{
	  			// 	keepAlive:true
	  			// }	  			
	  		},
	  		{
	  			path:"catalog",
	  			component:Catalog,
	  			name:"catalog"
	  		},
	  		{
	  			path:"media",
	  			component:Media,
	  			name:"media"
	  		},
	  		{
	  			path:"mediaAdd",
	  			component:MediaAdd,
	  			name:"mediaAdd"
	  		},
	  		{
	  			path:"modifyEassy",
	  			component:ModifyEassy,
	  			name:"modifyEassy"
	  			// meta:{
	  			// 	keepAlive:true
	  			// }		  			
	  		},
	  		{
	  			path:"eassyList",
	  			component:EassyList,
	  			name:"EassyList"
	  		},
	  		{
	  			path:"baseSetting",
	  			component:BaseSetting,
	  			name:"baseSetting"
	  		}
	  	]
	  },
].map(route => {
  route.path = rootPath + route.path;
  return route;
});

// 404 页
routes.push({path: '*', component: NotFound, name: 'notfound'});

export default routes;
