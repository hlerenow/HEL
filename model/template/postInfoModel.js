/**
 * 这个包主要用来查询 文章列表 以及 文章信息
 * @type {[type]}
 */

var path = require("path"),
	debug = require("debug")("postInfoModel"),
	constVar = require(path.join(constVarPath)),
	dbBase = require(path.join(constVar.modelPath, "dbBase")),
	stateCode = require(path.join(constVar.configPath, "stateCode"));

var postInfoModel = function() {};
var fn = postInfoModel.prototype = new dbBase;

/**
 * 获取文章列表
 * @param  {[type]} page    [description]
 * @param  {[type]} perPage [description]
 * @param  {[type]} func    [description]
 * @return {[type]}         [description]
 */
fn.getPostList=function(page,perPage,func){
	if((typeof func )!="function"){
		throw new Error("参数缺少");
		return {};
	}

	perPage=parseInt(perPage)||10;

	debug(perPage);

	var index=(page-1)*perPage;
		index=index>0?index:0;

	var sql="select * from eassy where type='post' and status='publish' order by created desc limit "+this.pool.escape(index)+","+perPage+";";
		sql+="select count(eid) allEassyCount from eassy where type='post' and status='publish';";
	this.query(sql,[],function(result){
		var opRs={
			postList:[],
			postCount:0
		};

		if(result.state==200){
			opRs={
				postList:result.opRes[0],
				postCount:result.opRes[1][0].allEassyCount
			};
		}else{
			debug("查询出错");
		}

		func(opRs);
	});
};

/**
 * 获取单个文章
 * @param  {[type]} eid  [description]
 * @param  {[type]} func [description]
 * @return {[type]}      [description]
 */
fn.getPost=function(eid,func){	
	var postSql="select * from eassy where type='post' and eid= ?;";
	var recentPostSql="select * from eassy where eid in ((select eid from eassy where eid < ? limit 1 ),(select eid from eassy where eid > ? limit 1));"
	this.query(postSql+recentPostSql,[eid,eid,eid],function(result){
		// debug(result);
		if(result.state===200&&result.opRes.length>0){
			if(result.opRes[0].length>0){
				var postInfo=result.opRes[0][0];
				//判断是否有上下一篇文章
				if(result.opRes[1].length>0){
					postInfo.rencentPost=result.opRes[1];
				}else{
					postInfo.rencentPost=[];
				}

				func(postInfo);
			}else{
				func({});
			}
		}else{
			func({});
		}
	});
};

/**
 * 获取最近的文章
 * @param  {[type]} obj {
 *                      	count,       //文章数(非必需)
 *                      	catalogSlug //目录别名(非必需)
 *                      }
 * @param  {[type]} func [description]
 * @return {[type]}      [description]
 */
fn.getRecentPost=function(obj,func){
	if(typeof obj =='function'){
		func=obj;
	};

	var count=parseInt(obj.count)||10,
		catalog=obj.catalogSlug;
	var sql='select * FROM eassy ';
	

	var sql='select * from eassy where type="post" ';
	if(catalog){
		sql+= 'where eid in (select nid from relationships WHERE mid in (select mid from meta where type="catalog" and slug='+this.pool.escape(catalog)+' )) ';
	}

	sql+=' ORDER BY eassy.created LIMIT '+this.pool.escape(count)+';';

	this.query(sql,[],function(result){
			func(result);
	});
}

fn.getAllPost=function(func){
	var sql='select * from eassy where type="post";'

	this.query(sql,[],function(result){

		func(result);
		
	});
}

module.exports=exports=postInfoModel;
