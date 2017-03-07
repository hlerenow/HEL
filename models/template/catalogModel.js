/**
 * 这个包主要用来查询 目录 文章列表 以及 文章信息
 * @type {[type]}
 */


var path = require("path");
var debug = require("debug")("postInfoModel");
var dbBase = require(path.join(__dirname, "../dbBase"));
var pool = require(path.join(__dirname, "../dbPool"));
var stateCode = require(path.join(__dirname, "../../stateCode"));

var catalogModel = function() {};
var fn = catalogModel.prototype = dbBase.prototype;

/**
 * 获取当前catalogSlug目录下第page页的文章数据,
 * @param  {[type]} catalogSlug [description]
 * @param  {[type]} page        [description]
 * @param  {[type]} perPage     [description]
 * @param  {[type]} func        [description]
 * @return {[type]}             [description]
 */
fn.getCatalogPost=function(catalogSlug,page,perPage,func){
	
	var index=(page-1)*perPage;
	index=index>0?index:0;
	//每页文章数

	perPage=parseInt(perPage)||10;
	var catalogSlugEscape=pool.escape(catalogSlug);
	//首先根据别名为slug的目录的基本信息
	var sql="select * from meta where type='catalog' and slug="+catalogSlugEscape+";";
	//目录显得文章信息
	var	sql2="select * from eassy where eid in "+
				"(select nid FROM relationships where type='postCatalog' and mid = "+
					"( select mid from meta where type='catalog' and slug="+catalogSlugEscape+")) "+
						"ORDER BY created desc limit "+pool.escape(index)+","+pool.escape(perPage)+";";

	//当前目录下总的文章数
	var	sql3="select count(nid) allEassyCount FROM relationships where type='postCatalog' and mid = ( select mid from meta where type='catalog' and slug="+catalogSlugEscape+");";
	
	this.query(sql+sql2+sql3,[],function(result){
		var resObj={
			postList:[],
			cataloginfo:{},
			postCount:0
		};
		if(result.state===200){
			resObj.cataloginfo=result.opRes[0][0];
			resObj.postList=result.opRes[1];
			resObj.postCount=result.opRes[2][0].allEassyCount;
		}else{
			debug("目录文章查询失败");
		}

		func(resObj);

	});
}

module.exports=exports=catalogModel;