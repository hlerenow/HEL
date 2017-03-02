var path = require("path");
var debug = require("debug")("optionModel");
var dbBase = require(path.join(__dirname, "../dbBase"));
var pool = require(path.join(__dirname, "../dbPool"));
var stateCode = require(path.join(__dirname, "../../stateCode"));
var until = require(path.join(__dirname, "../../until/until"));

var optionModel = function() {};
var fn = optionModel.prototype = dbBase.prototype;

/**
 * 创建多条options记录，并返回每条记录的创建结果
 * @param  {[type]} objArry [description]
 * @param  {[type]} func    [description]
 * @return {[type]}         [description]
 */
fn.createOptions = function(objArry, func) {
	let self=this;
	let resState = [];

	for (let i = 0; i < objArry.length; i++) {

		(function(i) {
			debug(i);
			objArry[i].type = "custom";			
			self.insert("options",objArry[i], function(result) {

				if(result.state!==200){
					resState.push({
						optionName:objArry[i].name,
						state:result.state,
						info:result.info
					});	
				}else{
					resState.push({
						optionName:objArry[i].name,
						state:result.state,
						insertId:result.insertId,
						info:result.info
					});					
				}
				debug(resState.length,objArry.length);
				if(resState.length===objArry.length){
					func(resState);
				}
			});
		})(i);
	}
}

fn.deleteOptions = function(oidArry, func) {
	let sql = "delete from options where type='custom' and oid in ( ";
	let questionMark = [];
	for (let i = 0; i < oidArry.length; i++) {
		questionMark.push("?");
	}

	sql += questionMark.join() + " ) ;";
	this.query(sql, oidArry, function(result) {
		if (result.state !== 200) {
			func(stateCode.sqlDeleteFail({
				moreInfo: "option删除失败"
			}))
		} else {
			func(result);
		}
	});
};

/**
 * 修改多条option 记录，并返回每条记录的修改结果
 * @param  {[type]} objArry [description]
 * @param  {[type]} func    [description]
 * @return {[type]}         [description]
 */

fn.modifyOptions = function(objArry, func) {
	let resState = [];
	let self=this;
	for (let i = 0; i < objArry.length; i++) {
		(function(i) {

			let modifyObj={};
			let tempFileds=['name','value'];

			Object.keys(objArry[i]).forEach(function(key){
				if(tempFileds.indexOf(key)>=0){
					modifyObj[key]=objArry[i][key];
				}
			});
			debug(objArry[i].oid);
			self.updateOneRecord("options",modifyObj, {
					oid: objArry[i].oid
				},
				function(result) {
					if (result.state !== 200) {
						resState.push({
							oid: objArry[i].name,
							state: 400
						});
					} else {
						resState.push({
							oid: objArry[i].oid,
							state: 200
						});
					}
					debug(resState.length,objArry.length);
					if (resState.length === objArry.length) {
						func(stateCode.success({opRes:resState}));
					}
				}
			);
		})(i)

	}
};

fn.getStaticOptions=function(func){
	var self=this;
	var sql="select oid,label,name,value,description from options where type='static' and user=0 ;";
	this.query(sql,[],function(result){
		func(result);
	});
}

module.exports = exports = optionModel;