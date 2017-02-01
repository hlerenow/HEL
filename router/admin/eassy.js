//路由公用
var express=require("express");
var router=express.Router();
var path=require("path");
var stateCode = require(path.join(__dirname, "../../stateCode"));
var until=require(path.join(__dirname, "../../until/until"));
var debug=require("debug")("eassyRouter");

//自定义
var eassyModel=require(path.join(__dirname,"../../models/admin/eassyModel"));

/**
 * 博文发布接口
 */
router.post("/post",function(req,res,next){
	let em=new eassyModel;
	let nowSecondInt=until.getNowTimeSecondInt();
	let exObj={
		authorId:req.session.uid,
		type:"post",
		created:nowSecondInt,
		modified:nowSecondInt,
		attachment:JSON.stringify(until.getMediaUrlInHTML(req.body.content)),
		excerpt:until.getCharsByNumber(req.body.content,50)
	};

	let resObj=until.mergeObj(req.body,exObj);
	debug(resObj);
	em.insertEassy(resObj,function(result){
		debug("插入文章");
		delete result.opRes;
		res.json(result);
	});
});

/**
 * 博文修改接口
 */
router.post("/modify",function(req,res,next){
	let em=new eassyModel;
	let nowSecondInt=until.getNowTimeSecondInt();
	let exObj={
		authorId:req.session.uid,
		type:"post",
		modified:nowSecondInt
	};

	let moreField={};
	if(req.body.content){
		moreField['attachment']=JSON.stringify(until.getMediaUrlInHTML(req.body.content));
		moreField['excerpt']=until.getCharsByNumber(req.body.content,50)
	}

	let resObj=until.mergeObj(req.body,exObj);
		resObj=until.mergeObj(exObj,moreField);

	debug(resObj);
	em.modifyEassy(resObj,function(result){
		debug("修改文章");
		res.send(result);
	});

});

router.post("/delete",function(req,res,next){
	let em=new eassyModel;
	debug("删除文章");


	let exObj={
		authorId:req.session.uid,
		type:"post"
	};

	if(req.session.role=="admin"){
		em.deleteEassy(req.body.eid,function(result){
			res.json(result);
		});

	}else{
		res.json(stateCode.notAuthority());
	}

});

module.exports=exports=router;
