/**
 * 模版里面使用的函数
 */
var debug = require("debug")("templateHelper");
"use strict";

/**
 * 模版里面使用的函数
 */
var funcs = {
	/**
	 * 返回某个文章的链接
	 * @param  {[type]} postId [description]
	 * @return {[type]}        [description]
	 */
	getPostLink: function(postId) {
		// debug(this);
		return this.blogConfig.static.siteUrl + "/post/" + postId + ".html";
	},
	/**
	 * 返回页面的链接(暂时没有用)
	 * @param  {[type]} page [description]
	 * @return {[type]}      [description]
	 */
	getPageLink: function(page) {
		return this.blogConfig.static.siteUrl + "/index/page/" + page;
	},
	/**
	 * 生成某个目录下第几页的链接
	 * @param  {[type]} page        [description]
	 * @param  {[type]} catalogSlug [description]
	 * @return {[type]}             [description]
	 */
	getCatalogPageLink: function(page,catalogSlug) {
		return this.blogConfig.static.siteUrl + "/catalog/"+catalogSlug+"/" + page;
	},
	/**
	 * 获取某个目录的链接
	 * @param  {[type]} catalogSlug [description]
	 * @return {[type]}             [description]
	 */
	getCatalogLink: function(catalogSlug) {
		return this.blogConfig.static.siteUrl + "/catalog/" + catalogSlug ;
	},
	/**
	 * 获取后台地址
	 * @return {[type]} [description]
	 */
	getAdminLink: function() {
		return this.blogConfig.static.siteUrl + "/admin";
	},
	/**
	 * 格式日期函数,传入一个时间点的秒数，
	 * @param  {[type]} intTime  [description]
	 * @param  {[type]} format   [description]
	 * @param  {[type]} showZero [description]
	 * @return {[type]}          [description]
	 */
	formatTime: function(intTime, format, showZero) {
		var str = format;
		var data = new Date(parseInt(intTime) * 1000),
			Y4 = data.getFullYear(),
			Y2 = data.getFullYear().toString().slice(2, 4),
			MM = data.getMonth() + 1,
			DD = data.getDate(),
			hh = data.getHours();
		mm = data.getMinutes();
		ss = data.getSeconds();

		function addZeorn(dd) {
			dd = parseInt(dd);
			if (dd < 10) {
				dd = "0" + dd;
			}
			return dd;
		}

		if (showZero) {
			MM = addZeorn(MM);
			DD = addZeorn(DD);

			hh = addZeorn(hh);
			mm = addZeorn(mm);

			ss = addZeorn(ss);
		}

		str = str.replace("YYYY", Y4);
		str = str.replace("YY", Y2);
		str = str.replace("MM", MM);
		str = str.replace("DD", DD);

		str = str.replace("hh", hh);
		str = str.replace("mm", mm);
		str = str.replace("ss", ss);

		return str;
	},
	/**
	 * 格式化一一篇文章所属目录
	 * @param  {[type]} catalogs [description]
	 * @return {[type]}          [description]
	 */
	formatEassyCatalog:function(catalogs){
		var catalogObj;
		debug(catalogs);
		try{
			catalogObj=catalogs.split(",");
			for(var i=0;i<catalogObj.length;i++){
				var item=catalogObj[i];
				item=item.split("&");
				debug(item);
				catalogObj[i]={
					name:item[1],
					mid:item[0]
				}
			}
			
		}catch(e){
			catalogObj=[{
				name:"无",
				mid:0
			}]
		}
		debug(catalogObj);
		return catalogObj;

	},
	/**
	 * 格式化一篇文章的所属标签
	 * @param  {[type]} tags [description]
	 * @return {[type]}      [description]
	 */
	formatTag:function(tags){

		if(tags){
			return tags.split(",");			
		}else{
			return [];
		}
	},
	/**
	 * 返回 from - to 之间的一个随机数
	 * @param  {[type]} from [description]
	 * @param  {[type]} to   [description]
	 * @return {[type]}      [description]
	 */
	rand:function(from,to){
		from=parseInt(from,10);
		to=parseInt(to, 10);
		var rand=Math.random();
		debug(parseInt(rand*(to-from))+from);
		return parseInt(rand*(to-from))+from;
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