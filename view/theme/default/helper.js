/**
 * 模版里面使用的函数
 */
var debug = require("debug")("selfHelper");
"use strict";

/**
 * 模版里面使用的函数
 */
var funcs = {
	test:function(){
		console.log("test");
	}
};


//绑定辅助函数的上下文为 content=app.locals
var templateHelper = function(content) {
	var res = {};

	for (let i in funcs) {
		res[i] = funcs[i].bind(content);
	}
	debug(res);

	return res;
};

module.exports = exports = templateHelper;