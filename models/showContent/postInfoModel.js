/**
 * 这个包主要用来查询文章列表
 * @type {[type]}
 */

var path = require("path");
var debug = require("debug")("postInfoModel");
var dbBase = require(path.join(__dirname, "../dbBase"));
var pool = require(path.join(__dirname, "../dbPool"));
var stateCode = require(path.join(__dirname, "../../stateCode"));

var postInfoModel = function() {};
var fn = postInfoModel.prototype = dbBase.prototype;

fn.getPostList=function(page,perPage,func){
	if((typeof func )!="function"){
		throw new Error("参数缺少");
		return {};
	}

	perPage=perPage||10;
	debug(perPage);

	var index=(page-1)*perPage;
		index=index>0?index:0;

	var sql="select * from eassy where type='post' order by created limit "+pool.escape(index)+","+perPage+";";
		sql+="select count(eid) allEassyCount from eassy where type='post' order by created ;";
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
		}

		func(opRs);
	});
};

fn.getPost=function(eid,func){	
	this.query("select * from eassy where type='post' and eid= ?;",[eid],function(result){
		if(result.state===200){
			return result.opRes[0];
		}else{
			return {};
		}
	});
};

module.exports=exports=postInfoModel;
