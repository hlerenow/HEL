var path = require("path"),
	debug = require("debug")("eassyModel"),
	constVar = require(path.join(constVarPath)),
	dbBase = require(path.join(constVar.modelPath, "dbBase")),
	stateCode = require(path.join(constVar.configPath, "stateCode")),
	until = require(path.join(constVar.untilPath, "until")),
	tagModel=require(path.join(constVar.modelPath,'./admin/tagModel')),
	catalogModel=require(path.join(constVar.modelPath,'./admin/catalogModel'));

var eassyModel = function() {};
var fn = eassyModel.prototype = new dbBase;


/**
 * 插入文章
 * @param  {[type]} obj  [description]
 * @param  {[type]} func [description]
 * @return {[type]}      [description]
 */
fn.insertEassy = function(obj, func) {
	var self = this;

	//检验必要的字段		
	let dataField = ['title', 'content', 'created', 'modified', 'authorId', 'status', 'thumbnail', 'belongCatalog', 'excerpt', 'type', 'attachment', 'templateContent',"tags"];

	let resObj = until.filterObjFields(dataField, obj);

	debug(resObj);

	if (until.isEmptyObj(resObj) || until.objLength(resObj) < dataField.length) {
		debug("参数缺少错误");
		func(stateCode.parMiss());
		return;
	};

	//目录变量
	let cataLog = resObj.belongCatalog;
	cataLog = cataLog.split("&");

	if (cataLog.length < 1 || cataLog[0] == "") {
		debug("参数缺少错误");
		func(stateCode.parMiss({
			morInfo: "文章目录不能为空"
		}));
		return;
	}

	delete resObj.belongCatalog;
	//标签变量
	let tags=until.jsonParse(resObj.tags);
	delete resObj.tags;

	//数据校验 end

	//插入数据库,并且调用回调函数
	self.insert("eassy", resObj, function(result) {
		var eid=result.insertId;
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
				//更新目录下的文章数
				var cm=new catalogModel;
				cm.updateCatalogCount(function(){debug("更新文章目录文章数")});

				//更新文章目录冗余
				var sql="update eassy set catalogs =(SELECT GROUP_CONCAT(CONCAT(meta.mid,'&',meta.name)) from relationships , meta where relationships.nid=? and meta.type='catalog' and relationships.mid =meta.mid group BY relationships.nid) where eassy.eid=?;";
				self.query(sql,[eid,eid],function(){debug("更新文章目录冗余")});				
			});
			// self.insertMulti("relationships", objArry, function() {});
			

			//插入文章标签
			debug(tags);
			if(tags){
				debug("插入标签");
				var tagsNew=[];
				var tm=new tagModel;
				tm.insertTags(tags.slice(0),function(result){
					//插入文章和标签的关系
					self.insertTagsRelations(eid,tags.slice(0),function(result){
						debug("标签文章关系");
						tm.updateTagsCount(function(){debug("更新标签文章数")});
						//更新文章标签冗余
						var sql="update eassy set tags =(SELECT GROUP_CONCAT(meta.name) from relationships , meta where relationships.nid=? and meta.type='tag' and relationships.mid =meta.mid group BY relationships.nid) where eassy.eid=?;";
						self.query(sql,[eid,eid],function(){debug("更新文章标签冗余")});					
					});
					//标签文章数量统计
				});
			}
			//返回结果
			func(result);

		} else {
			func(stateCode.sqlInsertFail({
				moreInfo: "文章发布失败"
			}));
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
	var dataField = ['eid', 'title', 'content', 'modified', 'belongCatalog', 'authorId', 'status', 'thumbnail', 'excerpt', 'type', 'attachment', 'templateContent',"tags"];

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
	//标签变量
	let tags=until.jsonParse(resObj.tags);
	delete resObj.tags;

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
		if (result.state === 200 && result.opRes.affectedRows > 0) {

			//检查是否需要修改文章所属目录

			if (!cataLog.length) {
				func(result);
				return;
			}

			//删除旧的文章所属目录
			var sqlDeleteCatalog="delete from relationships where type='postCatalog' and nid=?;";
			self.query(sqlDeleteCatalog, [eid], function(result) {
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
					//更新目录下的文章数
					var cm=new catalogModel;
					cm.updateCatalogCount(function(){});

					//更新文章目录冗余
					var sql="update eassy set catalogs =(SELECT GROUP_CONCAT(CONCAT(meta.mid,'&',meta.name)) from relationships , meta where relationships.nid=? and meta.type='catalog' and relationships.mid =meta.mid group BY relationships.nid) where eassy.eid=?;";
					self.query(sql,[eid,eid],function(){debug("更新文章目录冗余")});
				});
			});

			//插入文章标签
			
			//删除旧的标签
			var tm=new tagModel;

			debug("标签修改");
			debug(tags);
			if(!tags){
				tags=[];
			}
			var tm=new tagModel;
			//删除旧的标签
			tm.deleteEassyTags(eid,function(){});

			tm.insertTags(tags.slice(0),function(result){
				//插入文章和标签的关系
				self.insertTagsRelations(eid,tags.slice(0),function(result){
					//标签文章数量统计
					tm.updateTagsCount(function(){debug("更新标签文章数")});
					//更新文章标签冗余
					var sql="update eassy set tags =(SELECT GROUP_CONCAT(meta.name) from relationships , meta where relationships.nid=? and meta.type='tag' and relationships.mid =meta.mid group BY relationships.nid) where eassy.eid=?;";
					self.query(sql,[eid,eid],function(){debug("更新文章标签冗余")});								
				});

			});
			//返回结果
			func(result);			

		} else {
			func(stateCode.sqlUpdateFail({
				moreInfo: "文章不存"
			}));
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
			//更新目录下的文章数
			var cm=new catalogModel;
			cm.updateCatalogCount(function(){});

			//删除文章实体信息
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

fn.deleteEassyMulti = function(eidArry, func) {
	var deleteRes = [];
	var len = eidArry.length;
	var scuessCount = 0;

	for (var i = 0; i < len; i++) {
		debug("循环删除");

		this.deleteEassy(eidArry[i], function(result) {
			deleteRes.push(result);
			if (result.state === 200) {
				scuessCount++;
			}
			if (deleteRes.length === len) {
				func(stateCode.success({
					opRes: deleteRes
				}));
			}
		});
	}
}

/**
 * 获取文章所有的信息
 * @param  {[type]} eid  [description]
 * @param  {[type]} func [description]
 * @return {[type]}      [description]
 */
fn.getEassy = function(eid, func) {
	var sql = "select c.*,d.nickName from eassy c,users d where c.eid=? and d.uid=c.authorId;";

	if (!parseInt(eid)) {
		func(stateCode.parMiss());
		return;
	}

	this.query(sql, [eid], function(result) {

		func(result);
	});
}

fn.getEassyList = function(obj, func) {

	var sql1="select c.*,d.nickName from eassy c,users d where d.uid=c.authorId ";

	var sql2="select count(eid) as resCount from eassy c,users d where d.uid=c.authorId ";

	var sql="";

	if(parseInt(obj.catalog)>0){
		sql+="and c.eid in (select nid from relationships r where r.mid="+this.pool.escape(obj.catalog)+" ) ";
	}


	if(obj.seachWord){
		var searchWord=this.pool.escape('%'+obj.seachWord+'%');
		sql+="  and  (title LIKE "+searchWord+" or excerpt LIKE "+searchWord+"  or content LIKE "+searchWord+"  or tags like "+searchWord+" )";	
	}

	//查询的结果集
	sql1+=sql;
	var eOffset = parseInt(obj.page) * 10 - 10;
	eOffset=eOffset>0?eOffset:0;

	sql1+="  order by created limit "+eOffset+",10;";

	//查询查询结果的总条数
	sql2+=sql;
	sql2+" ;";
	this.query(sql1 + sql2, [], function(result) {
		func(result);
	});
}

//获取文章的一些数量信息
fn.getEassysInfo = function(func) {
	var sql = "select * from (select count(eid) allEassy from eassy where type='post') a ,(select count(eid) pubEassy from eassy where type='post' and status='publish') b,(select count(eid) draftEassy FROM eassy where type='post' and STATUS='draft') c;";
	this.query(sql, [], function(result) {
		func(result);
	});
}

fn.insertTagsRelations=function(eid,tags,func){
	for(var i=0;i<tags.length;i++){
		tags[i]=this.pool.escape(tags[i]);
	}
	var sql="insert into relationships (mid,nid,type) select mid,"+eid+",'postTag' from meta where type='tag' and name in ("+tags.join(",")+") ;";
	debug(sql);
	this.query(sql,[],function(result){
		func(result);
	});
};

module.exports = exports = eassyModel;