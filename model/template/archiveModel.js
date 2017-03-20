var path = require("path"),
	debug = require("debug")("archiveModel"),
	constVar = require(path.join(constVarPath)),
	dbBase = require(path.join(constVar.modelPath, "dbBase")),
	stateCode = require(path.join(constVar.configPath, "stateCode"));

var archiveModel = function() {};
var fn = archiveModel.prototype = new dbBase;

module.exports=exports=archiveModel;