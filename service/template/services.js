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
	tid=require(path.join(constVar.modelPath,"template/templateInjectData")),
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
		unsync:true
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


			var templatePath=until.getExitsPath([
					path.join(themePath,themeName,template.path+""),
					path.join(themePath,themeName,"/catalog.html")
				]);
			


				if(res.locals.catalog.postList){							
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
		unsync:true
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
		unsync:true
	});

	hp.add(function(){
		//获取所有的目录信息
		pim.getAllPost((result)=>{
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