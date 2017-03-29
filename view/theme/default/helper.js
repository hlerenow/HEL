/**
 * 模版里面使用的函数
 */
var debug = require("debug")("selfHelper");
"use strict";

/**
 * 在这个对象里面定义方法后模版里通过helper.XXX即可调用
 * 函数内部的this指向模版的上下文
 */
var funcs = {
	test:function(){
		console.log("test");
	}
};

/**
 * 自定义函数结束
 */

//绑定辅助函数的上下文为 content=app.locals，不要修改
var templateHelper = function(content) {
	var res = {};

	for (let i in funcs) {
		res[i] = funcs[i].bind(content);
	}
	return res;
};

module.exports = exports = templateHelper;