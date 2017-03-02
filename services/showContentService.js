var path=require("path");
var themPath="theme/";
var themName="default/";
var until = require(path.join(__dirname, "../until/until"));
var debug=require("debug")("showContentServices");

//数据模型
var bim=new (require(path.join(__dirname,"../models/showContent/blogInfoModel")));
var pim=new (require(path.join(__dirname,"../models/showContent/postInfoModel")));



var showContent=function(){};

var fn=showContent.prototype;

/**
 * 获取首页信息
 * @return {[type]} [description]
 */

fn.getIndexInfo=function(req,res,next){
	var resObj={page:req.params.page};
	
	function renderView(){
		//检测所需结果是否都已经拿到，拿到了就渲染视图
		if(until.objLength(resObj)===3){
			debug(resObj);
			res.render(themPath+themName+"index",resObj);
		}	
	}

	//获取blog的基本信息
	bim.getBaseInfo(themName,function(result){
		// debug(result);
		resObj["baseInfo"]=result;
		renderView();
	});

	pim.getPostList(req.params.page,
					req.app.locals.blogConfig.postPearPage,
					function(result){
			resObj["posts"]=result;
			renderView();						
	});

}

fn.getCatalogInfo=function(req,res,next){

}

fn.getPostInfo=function(req,res,next){
	var resObj={};
	
	function renderView(){
		//检测所需结果是否都已经拿到，拿到了就渲染视图
		if(until.objLength(resObj)===2){
			debug(resObj);
			res.render(themPath+themName+"index",resObj);
		}	
	}

	//获取blog的基本信息
	bim.getBaseInfo(themName,function(result){
		// debug(result);
		resObj["baseInfo"]=result;
		renderView();
	});

	pim.getPost(req.params.eid)
}

module.exports=exports=new showContent;