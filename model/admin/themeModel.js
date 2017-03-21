var path = require("path"),
	debug = require("debug")("themeModel"),
	constVar = require(path.join(constVarPath)),
	dbBase = require(path.join(constVar.modelPath, "dbBase")),
	stateCode = require(path.join(constVar.configPath, "stateCode")),
	until=require(path.join(constVar.untilPath, "/until"));


var themeModel = function() {};
var fn = themeModel.prototype = new dbBase;

fn.updateNowTheme=function(themeName,func){
	var sql="UPDATE `options` SET `value`=?  WHERE (`name`='nowTheme' and `type`='system');";
	this.query(sql,[themeName],function(result){
		func(result);
	});
}

module.exports=exports=themeModel;