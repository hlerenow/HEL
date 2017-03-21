var path = require("path"),
	debug = require("debug")("pageModel"),
	constVar = require(path.join(constVarPath)),
	dbBase = require(path.join(constVar.modelPath, "dbBase")),
	stateCode = require(path.join(constVar.configPath, "stateCode")),
	until = require(path.join(constVar.untilPath, "until")),
	tagModel=require(path.join(constVar.modelPath,'./admin/tagModel'));

var pageModel = function() {};
var fn = pageModel.prototype = new dbBase;

fn.insertPage=function(obj,func){
	var nowTime=until.getNowTimeSecondInt();

	var vals=this.pool.escape(obj.title);
		vals+=","+this.pool.escape(obj.content);
		vals+=","+this.pool.escape(nowTime);
		vals+=","+this.pool.escape(nowTime);
		vals+=","+this.pool.escape(obj.authorId);
		vals+=","+this.pool.escape("page");
		vals+=","+this.pool.escape(obj.template);
		vals+=","+this.pool.escape("0");
		vals+=","+this.pool.escape(obj.templateContent);
	var sql="INSERT INTO `eassy` (`title`, `content`, `created`, `modified`, `authorId`, `status`, `type`, `template`,`commentsNum`, `templateContent`) "+
				"VALUES ("+vals+");";

	this.query(sql,[],function(result){
		if(result.state==200){
			func(stateCode.success({
				moreInfo:"页面创建成功"
			}))
		}else{
			func(stateCode.fail({
				moreInfo:"页面创建失败"
			}))
		}
	})
}	


fn.modifyPage=function(obj,func){
	var sql="UPDATE `eassy` SET `title`=?, `content`=?, `modified`=?,`status`=?,`template`=?,`templateContent`=? WHERE (`eid`=? and type='page');";
	var val=[
		obj.title,
		obj.content,
		until.getNowTimeSecondInt(),
		obj.status,
		obj.template,
		obj.templateContent,
		obj.eid
	];

	this.query(sql,val,function(result){
		if(result.state==200){
			func(stateCode.success({
				moreInfo:"页面修改成功"
			}))
		}else{
			func(stateCode.fail({
				moreInfo:"页面修改失败"
			}))
		}
	});
}

fn.deletePage=function(obj,func){
	var sql="DELETE FROM eassy where eid =? and type='page';";
	this.query(sql,[obj.eid],function(result){
		if(result.state==200){
			func(stateCode.success({
				moreInfo:"页面删除成功"
			}))
		}else{
			func(stateCode.fail({
				moreInfo:"页面删除失败"
			}))
		}
	});
}

module.exports=exports=pageModel;