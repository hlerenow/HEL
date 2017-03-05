var path=require("path");
var themPath="theme/";
var themName="default/";
var until = require(path.join(__dirname, "../../until/until"));
var debug=require("debug")("showContentServices");

var templatePath=path.join(__dirname,"../../views/theme/");
var fs=require("fs");

//数据模型
var bim=new (require(path.join(__dirname,"../../models/template/blogInfoModel")));
var pim=new (require(path.join(__dirname,"../../models/template/postInfoModel")));



var showContent=function(){};

var fn=showContent.prototype;

/**
 * 获取首页信息
 * @return {[type]} [description]
 */
fn.getIndexInfo=function(req,res,next){
	var resObj={page:req.params.page};
	var themName=req.app.locals.blogConfig.system.nowTheme.replace(/\//ig,"");
	
	function renderView(){
		//检测所需结果是否都已经拿到，拿到了就渲染视图
		if(until.objLength(resObj)===3){
			debug(resObj);
			res.render(themPath+themName+"/index",resObj);
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
	res.render("");
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
	
	function renderView(){
		//检测所需结果是否都已经拿到，拿到了就渲染视图
		if(until.objLength(resObj)===2){
			debug(resObj);
			var postTemplatePath=path.join(templatePath,themName,"/post.html");
			if(fs.existsSync(postTemplatePath)){
				res.render(themPath+themName+"post",resObj);
			}else{
				res.send("文章模版不存在");
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