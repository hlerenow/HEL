var path=require("path");
	fs=require("fs"),
	debug=require("debug")("templateServices"),
	constVar = require(path.join(constVarPath)),
	until = require(path.join(constVar.untilPath,"/until")),
	themePath=constVar.themePath+"/",
	//数据模型
	bim=new (require(path.join(constVar.modelPath,"template/blogInfoModel"))),
	pim=new (require(path.join(constVar.modelPath,"template/postInfoModel"))),
	cm=new (require(path.join(constVar.modelPath,"template/catalogModel")));


var showContent=function(){};

var fn=showContent.prototype;

/**
 * 获取首页信息
 * @return {[type]} [description]
 */
fn.getIndexInfo=function(req,res,next){
	var resObj={page:req.params.page};
	var themeName=req.app.locals.blogConfig.system.nowTheme+"";
		themeName=themeName.replace(/\//ig,"");
	
	function renderView(){
		//检测所需结果是否都已经拿到，拿到了就渲染视图
		if(until.objLength(resObj)===3){
			resObj.pageType="index";
			if(resObj.posts.postList.length>0){				
				res.render(themePath+themeName+"/index",resObj);
			}else{
				next();
			}

		}
	}

	//获取blog的基本信息
	bim.getBaseInfo(themeName,function(result){
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
	var themeName=req.app.locals.blogConfig.system.nowTheme+"";
		themeName=themeName.replace(/\//ig,"");

	function renderView(){
		//检测所需结果是否都已经拿到，拿到了就渲染视图
		if(until.objLength(resObj)===2){
			resObj.pageType="catalog";	
			resObj.app=req.app;
			// var ss=req.app._router.stack;
			// debug(ss);
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

			var postTemplatePath=path.join(themePath,themeName,"/catalog.html");
			if(fs.existsSync(postTemplatePath)&&resObj.catalogInfo.postList.length>0){
					// debug(JSON.stringify(resObj));
								
					res.render(themePath + themeName + "/catalog", resObj);
			}else{
				next();				
			}

		}	
	}

	//获取blog的基本信息
	bim.getBaseInfo(themeName,function(result){
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

	var themeName=req.app.locals.blogConfig.system.nowTheme+"";
		themeName=themeName.replace(/\//ig,"");		

	function renderView(){
		//检测所需结果是否都已经拿到，拿到了就渲染视图
		if(until.objLength(resObj)===2){
			resObj.pageType="post";			
			
			var postTemplatePath=path.join(themePath,""+themeName,"/post.html");
			if(fs.existsSync(postTemplatePath)&&until.objLength(resObj.post)>0){

				res.render(themePath + themeName + "/post", resObj);
			}else{
				next();
			}
		}	
	}

	//获取blog的基本信息
	bim.getBaseInfo(themeName,function(result){
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