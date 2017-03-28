/**
 * 这个包主要用来向模版注入数据
 * @type {[type]}
 */

var path = require("path"),
	debug = require("debug")("templateInjectDataModel"),
	constVar = require(path.join(constVarPath)),
	until = require(path.join(constVar.untilPath,"/until")),
	dbBase = require(path.join(constVar.modelPath, "dbBase")),
	hPromise=require(path.join(constVar.untilPath, "/hPromise.js")),
	stateCode = require(path.join(constVar.configPath, "stateCode"));

var templateInjectDataModel = function() {};
var fn = templateInjectDataModel.prototype = new dbBase;

//获取目录下所有的文章
fn.getCatalogAllPost=function(){

}

//获取所有的分类目录信息
fn.getAllCatalogs=function(){

}

//获取所有文章
fn.getAllPost=function(){

}

//获取所有文章的第几页文章
fn.getPostPage=function(){

}

//获取某个目录下的第几页的文章
fn.getCatalogPagePost=function(){

}
//更根文章id获取单个文章
fn.getPostByEid=function(){
	
}

//获取一定条件的文章
fn.getPost=function(){

}

const mapFunc={
	catalogs:"getAllCatalogs",
	recentPost:"getPost",
	allPost:"getAllPost",
	catalogPost:"getCatalogPagePost",
	post:"getPost"
}

function factortData(injectObj,func){
	var tim=new templateInjectDataModel,
		dataInject=["catalogs","recentPost","allPost","catalogPost","post"],
		injectObj=until.filterObjFields(dataInject,dataInject),
		hp=new hPromise({unsync:true}),
		res=[];

	for(var i in injectObj){
		hp.add(function(){
			tim[mapFunc[i]](injectObj[i],(res)=>{
				res.push(res);
			});
		});			
	}

	hp.allDone(function(){
		func(res);
	});
}

module.exports=exports=factortData;