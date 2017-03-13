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
	 * 返回文章的链接
	 * @param  {[type]} postId [description]
	 * @return {[type]}        [description]
	 */
	getPostLink: function(postId) {
		debug(this);
		return this.blogConfig.static.siteUrl + "/post/" + postId + ".html";
	},
	/**
	 * 返回页面的链接
	 * @param  {[type]} page [description]
	 * @return {[type]}      [description]
	 */
	getPageLink: function(page) {
		return this.blogConfig.static.siteUrl + "/page/" + page;
	},
	getCatalogPageLink: function(page,catalogSlug) {
		return this.blogConfig.static.siteUrl + "/catalog/"+catalogSlug+"/page/" + page;
	},
	getCatalogLink: function(catalogSlug) {
		return this.blogConfig.static.siteUrl + "/catalog/" + catalogSlug + ".html";
	},
	getAdminLink: function() {
		return this.blogConfig.static.siteUrl + "/admin";
	},
	/**
	 * 格式日期函数,传入一个时间点的秒数
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
	}
};


//绑定辅助函数的上下文为 content=app.locals
var templateHelper = function(content) {
	var res = {};

	for (let i in funcs) {
		res[i] = funcs[i].bind(content);
	}
	return res;
}

module.exports = exports = templateHelper;