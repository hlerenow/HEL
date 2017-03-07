/**
 * 模版里面使用的函数
 */
var debug=require("debug")("templateHelper");
"use strict";

/**
 * 模版里面使用的函数
 */
var funcs={
		getPostLink:function(postId){
			debug(this);
			return this.blogConfig.static.siteUrl+"/post/"+postId+".html";
		},
		getPageLink:function(page){
			return this.blogConfig.static.siteUrl+"/page/"+postId;
		},
		getCatalogPageLink:function(page){
			return this.blogConfig.static.siteUrl+"/page/"+postId;
		},
		getCatalogLink:function(catalogSlug){
			return this.blogConfig.static.siteUrl+"/catalog/"+postId+".html";
		},
		getAdminLink:function(){
			return this.blogConfig.static.siteUrl+"/admin";
		},
		formatTime:function(timeInt,format){
			var date=new Date(parseInt(timeInt, 10)*10);
			format
		}
	};


//绑定辅助函数的上下文为 content=app.locals
var templateHelper=function(content){
	var res={};

	for(let i in funcs){
		res[i]=funcs[i].bind(content);
	}	
	return res;
}

module.exports=exports=templateHelper;
