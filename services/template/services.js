var path=require("path");
var themPath="theme/";
var until = require(path.join(__dirname, "../../until/until"));
var debug=require("debug")("templateServices");

var templatePath=path.join(__dirname,"../../views/theme/");
var fs=require("fs");

//数据模型
var bim=new (require(path.join(__dirname,"../../models/template/blogInfoModel")));
var pim=new (require(path.join(__dirname,"../../models/template/postInfoModel")));
var cm=new (require(path.join(__dirname,"../../models/template/catalogModel")));



var showContent=function(){};

var fn=showContent.prototype;

/**
 * 获取首页信息
 * @return {[type]} [description]
 */
fn.getIndexInfo=function(req,res,next){
	var resObj={page:req.params.page};
	var themName=req.app.locals.blogConfig.system.nowTheme+"";
		themName=themName.replace(/\//ig,"");
	
	function renderView(){
		//检测所需结果是否都已经拿到，拿到了就渲染视图
		if(until.objLength(resObj)===3){
			resObj.pageType="index";
			debug(resObj);
			if(resObj.posts.postList.length>0){
				res.render(themPath+themName+"/index",resObj);								
			}else{
				next();
			}

		}
	}

	//获取blog的基本信息
	bim.getBaseInfo(themName,function(result){
		// debug(result);
		
		resObj["baseInfo"]=result;
		renderView();
	});

	pim.getPostList(req.params.page,
					req.app.locals.blogConfig.static.postPerPage,
					function(result){
			resObj["posts"]=result;
			renderView();						
	});

}

/**
 * 获取分类目录信息
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
fn.getCatalogInfo=function(req,res,next){
	var resObj={};
	var themName=req.app.locals.blogConfig.system.nowTheme+"";
		themName=themName.replace(/\//ig,"");

	function renderView(){
		//检测所需结果是否都已经拿到，拿到了就渲染视图
		if(until.objLength(resObj)===2){
			resObj.pageType="catalog";	
			resObj.app=req.app;
			var ss=req.app._router.stack;
			debug(ss);
			// ss[ss.length-6].handle=function(res,req,next){
			// 	debug("哈哈我被修改了");
			// 	next();
			// };

			// debug(ss[ss.length-6].handle.toString());

				// ss=ss[ss.length-2].handle.stack;

			// for(var i=0;i<ss.length;i++){
			// 	debug(ss[i]);	
			// 	// debug(/^\/?(?=\/|$)/i.toString().toString());	

			// 	// debug(ss[i].regexp.toString()===/^\/?(?=\/|$)/i.toString());
			// 	// debug("");

			// }

			var postTemplatePath=path.join(templatePath,themName,"/catalog.html");
			if(fs.existsSync(postTemplatePath)&&resObj.catalogInfo.postList.length>0){
					res.render(themPath + themName + "/catalog", resObj);
			}else{
				next();				
			}

		}	
	}

	//获取blog的基本信息
	bim.getBaseInfo(themName,function(result){
		// debug(result);
		resObj["baseInfo"]=result;
		renderView();
	});
	
	//获取目录下的文章信息		
	cm.getCatalogPost(
		req.params.slug,
		req.params.page,
		req.app.locals.blogConfig.static.postPerPage,
		function(result){
			resObj.catalogInfo=result;
			renderView();
	});
}

/**
 * 获取单个文章信息
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
fn.getPostInfo=function(req,res,next){
	var resObj={};

	var themName=req.app.locals.blogConfig.system.nowTheme+"";
		themName=themName.replace(/\//ig,"");		

	function renderView(){
		//检测所需结果是否都已经拿到，拿到了就渲染视图
		if(until.objLength(resObj)===2){
			resObj.pageType="post";			
			debug(resObj);
			var postTemplatePath=path.join(templatePath,""+themName,"/post.html");
			if(fs.existsSync(postTemplatePath)&&until.objLength(resObj.post)>0){
				res.render(themPath + themName + "/post", resObj);
			}else{
				next();
			}
		}	
	}

	//获取blog的基本信息
	bim.getBaseInfo(themName,function(result){
		// debug(result);
		resObj["baseInfo"]=result;
		renderView();
	});

	// debug("文章id",req.params.eid);
	pim.getPost(req.params.eid,function(result){
		// debug(result);
		resObj["post"]=result;
		renderView();
	});
}

module.exports=exports=new showContent;