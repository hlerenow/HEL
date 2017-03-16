var path = require("path"),
	debug = require("debug")("tagModel"),
	constVar = require(path.join(constVarPath)),	
	dbBase = require(path.join(constVar.modelPath, "dbBase")),
	stateCode = require(path.join(constVar.configPath, "stateCode")),
	until = require(path.join(constVar.untilPath, "until"));

var tagModel = function() {},
	fn = tagModel.prototype = new dbBase;

	fn.getAllTags=function(func){
		var sql="select * from meta where type='tag';";
		this.query(sql,[],function(result){
			func(result);
		});
	}

	fn.insertTags=function(tags,func){

		var sql="";
		if(tags.length<1){
			return func(stateCode.parMiass());
		}

		for(var i=0;i<tags.length;i++){
			sql+="INSERT INTO `meta` (`name`, `slug`, `type`, `count`) VALUES ("+this.pool.escape(tags[i])+","+this.pool.escape(tags[i])+", 'tag','0');";
		}
		debug(sql);
		this.query(sql,[],function(result){
			func(result);
		});
	}


	fn.updateTagsCount=function(func){
		var sql='update meta a,(select count(mid) num ,mid from relationships WHERE type="postTag" group by mid) b set a.count=b.num where a.mid=b.mid;';
		debug(sql);		
		debug("执行relation tag");
		this.query(sql,[],function(result){
			func(result);
		});		
	};

	fn.deleteEassyTags=function(eid,func){

		var sql='delete from relationships where type="postTag" and nid =?;';
		this.query(sql,[eid],function(result){
			func(result);
		})
	}
module.exports=exports=tagModel;