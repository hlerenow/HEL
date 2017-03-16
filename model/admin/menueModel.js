var path = require("path"),
	debug = require("debug")("menueModel"),
	constVar = require(path.join(constVarPath)),
	dbBase = require(path.join(constVar.modelPath, "dbBase")),
	stateCode = require(path.join(constVar.configPath, "stateCode")),
	until = require(path.join(constVar.untilPath, "until")),
	tagModel=require(path.join(constVar.modelPath,'./admin/tagModel'));

var menueModel = function() {};
var fn = menueModel.prototype = new dbBase;

fn.insertMenue=function(){

};

/**
 * menue Json 结构
 */
// [
// 	{
// 		label:"",
// 		type:"",
// 		name:"",
// 		path:"",
// 		children:[
// 		]		
// 	}
// ]
fn.modifyMenue=function(menueJson,func){
	var sql="update `options` SET `value`=? WHERE type='system' and `name`='menue';";
	this.query(sql,[menueJson],function(result){
		func(result);
	});
}

fn.deleteMenue=function(){

}

module.exports=exports=menueModel;