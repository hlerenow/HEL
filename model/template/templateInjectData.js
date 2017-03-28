/**
 * 这个包主要用来向模版注入数据
 * @type {[type]}
 */

var path = require("path"),
	debug = require("debug")("templateInjectDataModel"),
	constVar = require(path.join(constVarPath)),
	until = require(path.join(constVar.untilPath,"/until")),
	dbBase = require(path.join(constVar.modelPath, "dbBase")),
	stateCode = require(path.join(constVar.configPath, "stateCode")),
	hPromise=require(path.join(constVar.untilPath, "/hPromise.js")),
	bim=new (require(path.join(constVar.modelPath,"template/blogInfoModel"))),
	pim=new (require(path.join(constVar.modelPath,"template/postInfoModel"))),
	cm=new (require(path.join(constVar.modelPath,"template/catalogModel")));

var templateInjectDataModel = function() {};
var fn = templateInjectDataModel.prototype = new dbBase;

//获取一个目录或者多个目录下的文章
fn.getCatalogPost=function(obj,func){
	//数据检查
	var slug=obj.slug||"",
		cid=obj.cid||0,
		start=parseInt(obj.start)||0,
		name=obj.name||""
		end=parseInt(obj.end)||0;
	//拼接sql
	
	var sql="select * from eassy WHERE  eid in "+
				"(select eid from relationships where type='postCatalog' and mid =";
	if(!slug){
		if(name){
			var tempRes={};
			tempRes[name]="";
			func(tempRes);					
		}
		else{
			func({});								
		}
		return ;
	}
	sql+="(select mid from meta WHERE slug ="+this.pool.escape(slug)+")) ORDER BY created DESC ";

	if(start>=0&&end>=0&&end>start){
		sql+=" limit "+this.pool.escape(start)+","+this.pool.escape(end)+";";
	}

	debug(sql);
	this.query(sql,[],function(result){
		var tempRes={};
		if(result.state==200){
			tempRes[name]=result.opRes;			
		}
		debug("查询完成");

		func(tempRes);

	})
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

//字段和函数的映射关系
const mapFunc={
	catalogs:"getAllCatalogs",
	recentPost:"getPost",
	allPost:"getAllPost",
	catalogPost:"getCatalogPost",
	post:"getPost"
}

var factortData=function (injectObj,func){
	debug("哈哈");
	var tim=new templateInjectDataModel,
		dataInject=["catalogs","recentPost","allPost","catalogPost","post"],
		injectObj=until.filterObjFields(dataInject,injectObj),
		hp=new hPromise({unsync:true}),
		resArry=[];

	for(var i in injectObj){
		hp.add(function(){
			tim[mapFunc[i]](injectObj[i],(res)=>{
				resArry.push(res);
				this.next()
			});
		});			
	}

	hp.allDone(function(){
		func(resArry);
	});

	hp.start();
}

module.exports=exports=factortData;