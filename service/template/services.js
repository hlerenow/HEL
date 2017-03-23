var path=require("path");
	fs=require("fs"),
	debug=require("debug")("templateServices"),
	constVar = require(path.join(constVarPath)),
	until = require(path.join(constVar.untilPath,"/until")),
	themePath=constVar.themePath+"/",
	hPromise=require(path.join(constVar.untilPath, "/hPromise.js")),

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
	debug("获取艘也信息");
	var resObj={page:req.params.page};
	var themeName=req.app.locals.blogConfig.system.nowTheme+"";
		themeName=themeName.replace(/\//ig,"");

	var hp=new hPromise({
		unsysnc:true
	});

	hp.add(function(){
		//获取文章
		pim.getPostList(req.params.page,
						req.app.locals.blogConfig.static.postPerPage,
						(result)=>{
				res.locals.posts=result;
				this.next();
		});
	}).allDone(function(){
			res.locals.pageType="index";
			// if(res.locals.posts.postList.length>0){				
				res.render(themePath+themeName+"/index",resObj);
			// }else{
				// next();
			// }
	});

	//执行
	hp.start();
}

/**
 * 获取分类目录信息
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
fn.getCatalogInfo=function(req,res,next){
	debug("获取目录页面信息");
	var themeName=req.app.locals.blogConfig.system.nowTheme+"";
		themeName=themeName.replace(/\//ig,"");

	var hp=new hPromise({
		unsysnc:true
	});

	hp.add(function(){
		//获取目录下的文章信息
		cm.getCatalogPost(
			req.params.slug,
			req.params.page,
			req.app.locals.blogConfig.static.postPerPage,
			(result)=>{
				res.locals.catalog=result;
				this.next();
		});
	}).allDone(function(){
			res.locals.pageType="catalog";
			res.locals.page=req.params.page;
			var template={path:""};
			if(res.locals.catalog.catalogInfo){
				template=until.jsonParse(res.locals.catalog.catalogInfo.value);
			}
			
			debug(template);

			// if(template&&until.isEmptyObj(template))
			// var postTemplatePath=path.join(themePath,themeName,"/catalog.html");

			var templatePath=until.getExitsPath([
					path.join(themePath,themeName,template.path+""),
					path.join(themePath,themeName,"/catalog.html")
				]);
			debug(templatePath);
			if(res.locals.catalog.postList.length>0){							
				res.render(templatePath,function(err,data){
					if(err){
						debug(err);
						res.send(err);
					}else{
						res.send(data);
					}
				});
			}else{
				next();				
			}
	});

	//执行
	hp.start();



	// function renderView(){
	// 	//检测所需结果是否都已经拿到，拿到了就渲染视图
	// 	if(until.objLength(resObj)===2){
	// 		resObj.pageType="catalog";	
	// 		// resObj.app=req.app;
	// 		// var ss=req.app._router.stack;
	// 		// debug(ss);
	// 		// ss[ss.length-6].handle=function(res,req,next){
	// 		// 	debug("哈哈我被修改了");
	// 		// 	next();
	// 		// };

	// 		// debug(ss[ss.length-6].handle.toString());

	// 			// ss=ss[ss.length-2].handle.stack;

	// 		// for(var i=0;i<ss.length;i++){
	// 		// 	debug(ss[i]);	
	// 		// 	// debug(/^\/?(?=\/|$)/i.toString().toString());	

	// 		// 	// debug(ss[i].regexp.toString()===/^\/?(?=\/|$)/i.toString());
	// 		// 	// debug("");

	// 		// }

	// 		var postTemplatePath=path.join(themePath,themeName,"/catalog.html");
	// 		if(fs.existsSync(postTemplatePath)&&resObj.catalogInfo.postList.length>0){
	// 				// debug(JSON.stringify(resObj));
								
	// 				res.render(themePath + themeName + "/catalog", resObj);
	// 		}else{
	// 			next();				
	// 		}

	// 	}	
	// }

	
	// //获取目录下的文章信息		
	// cm.getCatalogPost(
	// 	req.params.slug,
	// 	req.params.page,
	// 	req.app.locals.blogConfig.static.postPerPage,
	// 	function(result){
	// 		resObj.catalogInfo=result;
	// 		renderView();
	// });
}

/**
 * 获取单个文章信息
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
fn.getPostInfo=function(req,res,next){

	var themeName=req.app.locals.blogConfig.system.nowTheme+"";
		themeName=themeName.replace(/\//ig,"");

	var hp=new hPromise({
		unsysnc:true
	});

	hp.add(function(){
		// debug("文章id",req.params.eid);
		pim.getPost(req.params.eid,(result)=>{
			res.locals.post=result;
			this.next();
		});
	}).allDone(function(){
			res.locals.pageType="post";
			var templatePath=until.getExitsPath([
					path.join(themePath,""+themeName,"/post.html")
				]);

			if(until.objLength(res.locals.post)>0){							
				res.render(templatePath);
			}else{
				next();				
			}
	});

	//执行
	hp.start();
}

fn.getArchive=function(req,res,next){
	var themeName=req.app.locals.blogConfig.system.nowTheme+"";
		themeName=themeName.replace(/\//ig,"");			

	var hp=new hPromise({
		unsysnc:true
	});

	hp.add(function(){
		cm.getAllCatalogs((result)=>{
			var allPosts=[];
			if(result.state==200){
				allPosts=result.opRes;
			}
			res.locals.allPosts=allPosts;
			this.next();
		});
	}).allDone(function(){

		res.render(themePath + themeName + "/archive");

	});

	hp.start();	
}
module.exports=exports=new showContent;