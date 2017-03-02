var path = require("path");
var debug = require("debug")("adminModel");
var dbBase = require(path.join(__dirname, "../dbBase"));
var pool = require(path.join(__dirname, "../dbPool"));
var stateCode = require(path.join(__dirname, "../../stateCode"));
var until=require(path.join(__dirname, "../../until/until"));


var catalogModel = function() {};

var fn = catalogModel.prototype = dbBase.prototype;

fn.createCatalog = function(obj, func) {
	if (!(obj.name && obj.slug)) {
		func(stateCode.parMiss());
		return;
	}

	let val = {
		name: obj.name,
		parent: obj.parent ||0,
		slug: obj.slug,
		type: "catalog"
	}

	this.insert('meta', val, function(result) {
		if (result.state === 200) {
			func(result);
		} else {
			func(stateCode.sqlInsertFail());
		}
	})
};

fn.modifyCatalog = function(obj, func) {
	if (!obj.mid) {
		func(stateCode.parMiss());
		return;
	}
	let mid = obj.mid;
	delete obj.mid;
	let fields = ['name', 'slug', 'parent'];

	let resObj = until.filterObjFields(fields, obj);

	this.updateOneRecord("meta", obj, {
		mid: mid
	}, function(result) {
		if (result.state !== 200) {
			func(stateCode.sqlUpdateFail({
				moreInfo: "目录分类修改(更新)失败"
			}));
			return;
		}
		func(result);
	});
}

fn.deleteCatalog = function(midArry, func) {
	if (!midArry) {
		func(stateCode.parMiss());
		return;
	}

	//将删除目录下的文章的目录关系
	let sqlR="delete from relationships where type='postCatalog' and mid in (";

	//删除目录信息sql
	let sql = "delete from meta where type='catalog' and mid in ( ";

	let questionMark = [];
	for (let i = 0; i < midArry.length; i++) {
		questionMark.push("?");
	}

	sql += questionMark.join() + " ) ;";
	sqlR+=questionMark.join()+") ;";

	debug(sql,midArry);	
	//删除目录与文章的联系
	this.query(sqlR,midArry,function(result){
		debug('文章与目录关系删除结果',result);
	});
	
	//删除目录
	this.query(sql, midArry, function(result) {
		if (result.state !== 200) {
			func(stateCode.sqlDeleteFail({
				moreInfo: "目录删除失败"
			}))
		} else {
			func(result);
		}
	});	
}

fn.getCatalog=function(func){
	this.query("select mid,name,slug,parent from meta where type='catalog';",[],function(result){
		func(result);
	});
}

module.exports=exports=catalogModel;