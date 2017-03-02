/**
 * 这个包 主要用于 查询 模版 需要的基本blog 信息
 * @type {[type]}
 */
var path = require("path");
var debug = require("debug")("baseInfo");
var dbBase = require(path.join(__dirname, "../dbBase"));
var pool = require(path.join(__dirname, "../dbPool"));
var stateCode = require(path.join(__dirname, "../../stateCode"));
// var until=require(path.join(__dirname, "../../until/until"));


var baseInfoModel = function() {};

var fn = baseInfoModel.prototype = dbBase.prototype;

/**
 * 获取blog的基本信息
 * @return {[type]} [description]
 */
fn.getBaseInfo=function(themName,func){
	var sql="select name,value from options where user=0 and (type='custom' ";
	var valArry=[];
	if((typeof themName)!='function'){
		sql+= " or type=? ";
		valArry.push(themName);
	}else{
		func=themName;
	}

	sql+=" );";

	this.query(sql,valArry,function(result){	
		// debug(result);
		if(result.state===200){
			var rst={};
			for(var i=0;i<result.opRes.length;i++){
				rst[result.opRes[i].name]=result.opRes[i].value;
			}

			func(rst);
		}else{
			func({});
		}
	});
}

module.exports = exports = baseInfoModel;