var path = require("path");
var debug = require("debug")("eassyModel");
var dbBase = require(path.join(__dirname, "../dbBase"));
var pool = require(path.join(__dirname, "../dbPool"));
var stateCode = require(path.join(__dirname, "../../stateCode"));
var until = require(path.join(__dirname, "../../until/until"));

var eassyModel = function() {};
var fn = eassyModel.prototype = dbBase.prototype;


/**
 * 插入文章（没有事务处理,后期完善）
 * @param  {[type]} obj  [description]
 * @param  {[type]} func [description]
 * @return {[type]}      [description]
 */
fn.insertEassy = function(obj, func) {
	var self = this;

	//检验必要的字段		
	let dataField = ['title', 'content', 'created', 'modified', 'authorId', 'status', 'thumbnail', 'belongCatalog', 'excerpt', 'type', 'attachment','templateContent'];

	let resObj = until.filterObjFields(dataField, obj);

	debug(resObj);

	if (until.isEmptyObj(resObj) || until.objLength(resObj) < dataField.length) {
		debug("参数缺少错误");
		func(stateCode.parMiss());
		return;
	};

	let cataLog = resObj.belongCatalog;
	cataLog = cataLog.split("&");

	if(cataLog.length<1||cataLog[0]==""){
		debug("参数缺少错误");	
		func(stateCode.parMiss({morInfo:"文章目录不能为空"}));
		return;		
	}

	delete resObj.belongCatalog;
	//数据校验 end

	//插入数据库,并且调用回调函数
	self.insert("eassy", resObj, function(result) {
		debug("插入文章");
		if (result.state === 200) {
			objArry = [];
			for (let i = 0; i < cataLog.length; i++) {
				objArry.push({
					type: "postCatalog",
					mid: cataLog[i],
					nid: result.insertId
				});

			}
			//插入文章所属目录
			self.insertMulti("relationships", objArry, function(result) {
				if (result.state === 200) {
					func(result);
				} else {
					//文章所属目录插入失败
					func(stateCode.sqlInsertFail({
						moreInfo: "文章目录插入失败"
					}));
				}
			});

		}else{
			func(stateCode.sqlInsertFail({moreInfo:"文章插入失败"}));
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
fn.modifyEassy = function(obj, func) {
	var self = this;

	//检验必要的字段
	var dataField = ['eid', 'title', 'content', 'modified', 'belongCatalog', 'authorId', 'status', 'thumbnail', 'excerpt', 'type', 'attachment','templateContent'];

	let resObj = until.filterObjFields(dataField, obj);

	debug(resObj);

	if (until.isEmptyObj(resObj) || !resObj.eid || !resObj.authorId) {
		debug("参数错误");
		func(stateCode.parMiss());
		return;
	};

	let cataLog = [];
	if (resObj.belongCatalog) {
		cataLog = resObj.belongCatalog.split("&");
	}

	let eid = resObj.eid;
	let authorId = resObj.authorId;

	debug(resObj.belongCatalog);

	delete resObj.belongCatalog;
	delete resObj.authorId;
	delete resObj.eid;
	//数据校验 end

	//插入数据库,并且调用回调函数
	self.updateOneRecord("eassy", resObj, {
		eid: eid,
		authorId: authorId
	}, function(result) {
		debug("插入文章");
		if (result.state === 200&&result.opRes.affectedRows>0) {

			//检查是否需要修改文章所属目录

			if (!cataLog.length) {
				func(result);
				return;
			}

			//删除旧的文章所属目录				
			self.query("delete from relationships where type='postCatalog' and nid=?;", [eid], function(result) {
				//新的目录数组
				objArry = [];
				for (let i = 0; i < cataLog.length; i++) {
					objArry.push({
						type: "postCatalog",
						mid: cataLog[i],
						nid: eid
					});
				}

				//插入文章所属目录
				self.insertMulti("relationships", objArry, function(result) {
					if (result.state === 200) {
						func(result);
					} else {
						//文章所属目录插入失败
						func(stateCode.sqlInsertFail({
							moreInfo: "文章目录插入失败"
						}));
					}
				});
			});
		}else{
			func(stateCode.sqlUpdateFail({moreInfo:"文章不存"}));
		}

	});
};

/**
 * 删除博文
 * @param  {[type]} obj  [description]
 * @param  {[type]} func [description]
 * @return {[type]}      [description]
 */
fn.deleteEassy = function(eid, func) {
	var self = this;
	//删除博文
	debug(eid);

	this.query("delete from relationships where type='postCatalog' and nid=?;", [eid], function(result) {
		if (result.state == 200) {
			self.query("delete from eassy where eid = ?;", [eid], function(result) {
				if (result.state === 200) {
					func(result);
				} else {
					func(stateCode.sqlDeleteFail({
						moreInfo: "文章删除失败"
					}));
				}
			});
		} else {
			func(stateCode.sqlDeleteFail({
				moreInfo: "文章所属目录删除失败"
			}));
		}
	});

}

fn.deleteEassyMulti=function(eidArry,func){
	var deleteRes=[];
	var len=eidArry.length;
	var scuessCount=0;

	for(var i=0;i<len;i++){
			debug("循环删除");

		this.deleteEassy(eidArry[i],function(result){
			deleteRes.push(result);
			if(result.state===200){
				scuessCount++;
			}
			if(deleteRes.length===len){
				func(stateCode.success({opRes:deleteRes}));
			}
		});
	}
}

fn.getEassy=function(eid,func){
	var sql="select c.*,d.nickName ,group_concat(CONCAT(a.mid,'&',a.name)) as catalogs from meta a ,relationships b,eassy c,users d where a.type='catalog' and  a.mid=b.mid and b.nid=? and b.nid=c.eid  and d.uid=c.authorId GROUP BY b.nid;";

	if(!parseInt(eid)){
		func(stateCode.parMiss());
		return ;
	}

	this.query(sql,[eid],function(result){

			func(result);
	});
}

fn.getEassyList=function(obj,func){
	var catalog=" and b.mid=? ";
	var searchWord=' and  (title LIKE ? or excerpt LIKE ? or content LIKE ? ) ';
	var valueArry=[];
	var valueArry2=[];

	var sql="select c.title,c.commentsNum,c.modified,c.eid,c.status,d.nickName ,group_concat(CONCAT(a.mid,'&',a.name)) as catalogs from meta a ,relationships b,eassy c,users d where a.type='catalog' and  a.mid=b.mid  and b.nid=c.eid ";
	var sql2="select count(eid) as resCount from ( select c.eid  from meta a ,relationships b,eassy c,users d where a.type='catalog' and  a.mid=b.mid  and b.nid=c.eid ";


	//是否有目录筛选
	if(parseInt(obj.catalog)){
		sql+=catalog;
		sql2+=catalog;
		valueArry.push(parseInt(obj.catalog));
		valueArry2.push(parseInt(obj.catalog));
	}

	//是否有关键词搜索
	if(obj.seachWord){
		sql+=searchWord;
		sql2+=searchWord;
		valueArry.push('%'+obj.seachWord+'%');
		valueArry.push('%'+obj.seachWord+'%');
		valueArry.push('%'+obj.seachWord+'%');

		valueArry2.push('%'+obj.seachWord+'%');
		valueArry2.push('%'+obj.seachWord+'%');
		valueArry2.push('%'+obj.seachWord+'%');		
	}

	var eOffset=parseInt(obj.page)*10-10;
	valueArry.push(eOffset<0?0:eOffset);

	valueArry=valueArry.concat(valueArry2);

	sql+=" and d.uid=c.authorId   GROUP BY b.nid order by c.modified desc limit ?,10;";
	sql2+=" and d.uid=c.authorId   GROUP BY b.nid order by c.modified ) f;";

	this.query(sql+sql2,valueArry,function(result){
		func(result);
	});

}

//获取文章的一些数量信息
fn.getEassysInfo=function(func){
	var sql="select * from (select count(eid) allEassy from eassy where type='post') a ,(select count(eid) pubEassy from eassy where type='post' and status='publish') b,(select count(eid) draftEassy FROM eassy where type='post' and STATUS='draft') c;";
	this.query(sql,[],function(result){
		func(result);
	});
}

module.exports = exports = eassyModel;