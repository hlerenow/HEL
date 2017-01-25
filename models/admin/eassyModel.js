var path = require("path");
var debug = require("debug")("eassyModel");
var dbBase=require(path.join(__dirname,"../dbBase"));
var pool = require(path.join(__dirname, "../dbPool"));
var stateCode=require(path.join(__dirname, "../../stateCode"));
var config=require(path.join(__dirname,"../../config"));
var until=require(path.join(__dirname, "../../until/until"));

var eassyModel=function(){};
var fn=eassyModel.prototype=dbBase.prototype;


fn.insertEassy=function(obj,func){
	var self=this;
	pool.getConnection(function(err,con){
		if (err) {
			debug(err);
			func(stateCode.notConectDb());
			return;
		}
		//检验必要的字段
		var dataField=['title','content','created','modified','authorId','status','thumbnail','excerpt','belongCatalog','type','attachment'];
		
		var resObj={};
		for(let i=0;i<dataField.length;i++){
			let filed=dataField[i];
				resObj[filed]=obj[filed];			
		}
		
		debug(resObj);

		if(until.isEmptyObj(resObj)||until.objLength(resObj)!=dataField.length){
			debug("参数错误");
			func(stateCode.parMiss());
			return;
		};

		//数据校验 end
		
		//插入数据库,并且调用回调函数
		self.insert("eassy",resObj,function(result){
			debug("插入文章");
			func(result);
		});
	});
}

module.exports=exports=eassyModel;



