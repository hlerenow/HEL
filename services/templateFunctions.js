/**
 * 模版里面使用的函数
 */
var debug=require("debug")("templateHelper");
"use strict";

/**
 * 模版里面使用的函数
 */
var funcs={
		getPostLink:function(post){
			// debug(post);
			// debug(this);
		}
	};


//绑定辅助函数的上下文为 app.locals
var templateHelper=function(content){
	var res={};

	for(let i in funcs){
		res[i]=funcs[i].bind(content);
	}	
	return res;
}

module.exports=exports=templateHelper;
