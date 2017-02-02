var path = require("path");
var debug = require("debug")("eassyModel");
var dbBase = require(path.join(__dirname, "../dbBase"));
var pool = require(path.join(__dirname, "../dbPool"));
var stateCode = require(path.join(__dirname, "../../stateCode"));
var config = require(path.join(__dirname, "../../config"));
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
	let dataField = ['title', 'content', 'created', 'modified', 'authorId', 'status', 'thumbnail', 'belongCatalog', 'excerpt', 'type', 'attachment'];

	let resObj = until.filterObjFiles(dataField, obj);

	debug(resObj);

	if (until.isEmptyObj(resObj) || until.objLength(resObj) < dataField.length) {
		debug("参数错误");
		func(stateCode.parMiss());
		return;
	};

	let cataLog = resObj.belongCatalog;

	delete resObj.belongCatalog;
	//数据校验 end

	//插入数据库,并且调用回调函数
	self.insert("eassy", resObj, function(result) {
		debug("插入文章");
		if (result.state === 200) {
			cataLog = cataLog.split("&");
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
	var dataField = ['eid', 'title', 'content', 'modified', 'belongCatalog', 'authorId', 'status', 'thumbnail', 'excerpt', 'type', 'attachment'];

	let resObj = until.filterObjFiles(dataField, obj);

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
		if (result.state === 200) {

			//检查是否需要修改文章所属目录

			if (!cataLog.length) {
				func(result);
				return;
			}

			//删除旧的文章所属目录				
			self.query("delete from relationships where type='postCatalog' and nid=?;", [eid], function(result) {
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

module.exports = exports = eassyModel;