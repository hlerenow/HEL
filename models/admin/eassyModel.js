var path = require("path");
var debug = require("debug")("eassyModel");
var dbBase=require(path.join(__dirname,"../dbBase"));
var pool = require(path.join(__dirname, "../dbPool"));
var stateCode=require(path.join(__dirname, "../../stateCode"));
var config=require(path.join(__dirname,"../../config"));
var until=require(path.join(__dirname, "../../until/until"));

var eassyModel=function(){};
var fn=eassyModel.prototype=dbBase.prototype;


/**
 * 插入文章（没有事务处理,后期完善）
 * @param  {[type]} obj  [description]
 * @param  {[type]} func [description]
 * @return {[type]}      [description]
 */
fn.insertEassy=function(obj,func){
	var self=this;

		//检验必要的字段
		var dataField=['title','content','created','modified','authorId','status','thumbnail','excerpt','type','attachment'];
		
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

		let cataLog=resObj.belongCatalog;

		delete resObj.belongCatalog;
		//数据校验 end
		
		//插入数据库,并且调用回调函数
		self.insert("eassy",resObj,function(result){
			debug("插入文章");
			if(result.state===200){
				cataLog=cataLog.split(",");
				objArry=[];
				for(let i=0;i<cataLog.length;i++){
					objArry.push({
						type:"postCatalog",
						mid:cataLog[i],
						nid:result.insertId
					});
					
				}
				//插入文章所属目录
				self.insertMulti("relationships",objArry,function(result){
					if(result.state===200){
						func(result);
					}else{
						//文章所属目录插入失败
						func(stateCode.sqlInsertFail());						
					}
				});

			}

		});
};

/**
 * 修改文章
 * @param  {[type]} obj  [description]
 * @param  {[type]} func [description]
 * @return {[type]}      [description]
 * eg:
 * obj={
 * 	eid:xx,修改文章的id
 * 	title:xx,
 * 	...
 * 	attachment:xx
 * }
 */
fn.modifyEassy=function(obj,func){
	var self=this;

		//检验必要的字段
		var dataField=['eid','title','content','created','modified','authorId','status','thumbnail','excerpt','type','attachment'];
		
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

		let cataLog=resObj.belongCatalog;
		let eid=resObj.eid;

		delete resObj.belongCatalog;
		//数据校验 end
		
		//插入数据库,并且调用回调函数
		self.updateOneRecord("eassy",resObj,{eid:eid},function(result){
			debug("插入文章");
			if(result.state===200){
				//删除旧的文章所属目录
				self.query("delete from table where type='postCatalog' and nid=?;",[eid],function(result){
					cataLog=cataLog.split(",");
					objArry=[];
					for(let i=0;i<cataLog.length;i++){
						objArry.push({
							type:"postCatalog",
							mid:cataLog[i],
							nid:result.insertId
						});						
					}

					//插入文章所属目录
					self.insertMulti("relationships",objArry,function(result){
						if(result.state===200){
							func(result);
						}else{
							//文章所属目录插入失败
							func(stateCode.sqlInsertFail());						
						}
					});					
				});
			}

		});
};



module.exports=exports=eassyModel;



