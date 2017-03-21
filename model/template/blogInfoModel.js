/**
 * 这个包 主要用于 查询 模版 需要的基本blog 信息
 * @type {[type]}
 */
var path = require("path"),
	debug = require("debug")("baseInfo"),
	constVar = require(path.join(constVarPath)),
	dbBase = require(path.join(constVar.modelPath, "dbBase")),
	stateCode = require(path.join(constVar.configPath, "stateCode"));


var baseInfoModel = function() {};

var fn = baseInfoModel.prototype = new dbBase;

/**
 * 获取blog的基本信息
 * @return {[type]} [description]
 */
fn.getBaseInfo = function(themName, func) {
	var sql = "select name,value from options where user=0 and (type='static' ";
	var valArry = [];
	if ((typeof themName) != 'function') {
		sql += " or type=? ";
		valArry.push(themName);
	} else {
		func = themName;
	}

	sql += " );";

	this.query(sql, valArry, function(result) {
		// debug(result);
		var rst = {};
		for (var i = 0; i < result.opRes.length; i++) {
			rst[result.opRes[i].name] = result.opRes[i].value;
		}
		if (result.state === 200) {
			func(rst);
		} else {
			func({});
		}
	});
}

module.exports = exports = baseInfoModel;