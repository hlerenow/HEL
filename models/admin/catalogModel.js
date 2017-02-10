var path = require("path");
var debug = require("debug")("adminModel");
var dbBase = require(path.join(__dirname, "../dbBase"));
var pool = require(path.join(__dirname, "../dbPool"));
var stateCode = require(path.join(__dirname, "../../stateCode"));
var config = require(path.join(__dirname, "../../config"));
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

	let resObj = until.filterObjFiles(fields, obj);

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

fn.deleteCatalog = function(obj, func) {
	if (!obj.mid) {
		func(stateCode.parMiss());
		return;
	}

	this.query("delete from meta where mid=? ;", [obj.mid], function(result) {
		if (result.state !== 200) {
			func(stateCode.sqlDeleteFail());
			return;
		}
		func(result);
	});
}

fn.getCatalog=function(func){
	this.query("select mid,name,slug from meta where type='catalog';",[],function(result){
		func(result);
	});
}

module.exports=exports=catalogModel;