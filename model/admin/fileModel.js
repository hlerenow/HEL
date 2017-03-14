var path = require("path"),
	debug = require("debug")("adminModel"),
	constVar = require(path.join(constVarPath)),
	dbBase = require(path.join(constVar.modelPath, "dbBase")),
	stateCode = require(path.join(constVar.configPath, "stateCode")),
	until=require(path.join(constVar.untilPath, "/until"));


var fileModel = function() {};

var fn = fileModel.prototype = new dbBase;

fn.uploadFile = function(fileArry, func) {
	var self = this;
	if (fileArry.length < 2) {
		self.insert('files', fileArry[0], function(result) {
			func(result);
		})
	} else {
		self.insertMulti('files', fileArry, function(result) {
			func(result);
		});
	}
};


fn.getFile = function(obj, func) {
	this.query("select * from files where fid=? ;", [obj.fid], function(result) {
		func(result);
	});
};

fn.getFileList = function(obj, func) {
	var page = parseInt(obj.page) - 1 || 0,
		size = parseInt(obj.size) || 10;
	debug(size);

	var sql = "select * from files order by created desc limit " + (page * size) + "," + size + " ;select count(*) total from files;";
	this.query(sql, [], function(result) {
		func(result);
	});

}

fn.deleteFile = function(obj, func) {
	this.query('delete from files where fid=? ;', [obj.fid], function(result) {
		func(result);
	});

};


module.exports = exports = fileModel;