/**
 * @file
 * Created by hanan on 16/10/15.
 */
const Login = r => require(['views/login'], r);
const NotFound = r => require(['views/notfound'], r);
const Admin = r=>require(['views/admin/index'],r);
const Welcome = r=>require(['views/admin/welcome'],r);
const EditorEassy = r=>require(['views/admin/editorEassy'],r);

const CatalogCreate = r=>require(['views/admin/catalog/create'],r);

const Media = r=>require(['views/admin/media'],r);
const MediaAdd = r=>require(['views/admin/mediaAdd'],r);


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
	  		},
	  		{
	  			path:"catalog/create",
	  			component:CatalogCreate,
	  			name:"catalogCreate"
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
