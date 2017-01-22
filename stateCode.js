var path=require("path");
var until=require(path.join(__dirname,"until/until"));
var debug=require("debug")("stateCode");
const stateCode={
	success:{
		state:200,
		info:"操作成功"
	},
	fail:{
		state:400,
		info:"操作失败"
	},
	// 参数错误 State:0xx
	parMiss:{
		state:001,
		info:"参数不完整"
	},
	//数据库错误 State:1xx;
	notConectDb:{
		state:101,
		info:"没有获取数据库连接"
	},
	sqlFail:{
		state:102,
		info:"sql操作失败"
	},
}

var stateCodeFunc=function(){}
var fn=stateCodeFunc.prototype;

/**
 * 混合两个对象，将基础对象的值混合到扩展对象上，基础对象不改变
 * @param  {[object]} obj  [基础对象]
 * @param  {[object]} more [扩展对象]
 * @return {[type]}      [description]
 */
fn.mergeObj=function(obj,more){
	for(let i in obj){
		more[i]=obj[i];
	}

	debug(more);
	return more;
}

// 批量注册函数
for(let i in stateCode){
	fn[i]=function(obj){
		if(until.isEmptyObj(obj)){
			return stateCode[i];
		}else{
			return this.mergeObj(stateCode[i],obj);
		}
	}
}

module.exports=exports=new stateCodeFunc;