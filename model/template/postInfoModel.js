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

fn.getPostList=function(page,perPage,func){
	if((typeof func )!="function"){
		throw new Error("参数缺少");
		return {};
	}

	perPage=parseInt(perPage)||10;

	debug(perPage);

	var index=(page-1)*perPage;
		index=index>0?index:0;

	var sql="select * from eassy where type='post' order by created desc limit "+this.pool.escape(index)+","+perPage+";";
		sql+="select count(eid) allEassyCount from eassy where type='post';";
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

fn.getPost=function(eid,func){	
	var postSql="select * from eassy where type='post' and eid= ?;";
	var recentPostSql="select * from eassy where eid in ((select eid from eassy where eid < 71 limit 1 ),(select eid from eassy where eid > ? limit 1));"
	this.query(postSql+recentPostSql,[eid,eid,eid],function(result){
		// debug(result);
		if(result.state===200&&result.opRes.length>0){
			if(result.opRes[0].length>0){
				var postInfo=result.opRes[0][0];
				//判断是否有上下一篇文章
				if(result.opRes[1].length>0){
					postInfo.rencentPost=result.opRes[1];
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

module.exports=exports=postInfoModel;
