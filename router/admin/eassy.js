//路由公用
var path = require("path"),
	express = require("express"),
	debug = require("debug")("eassyRouter"),
	eassyRouter = express.Router(),
	constVar = require(path.join(constVarPath)),
	stateCode = require(path.join(constVar.configPath, "stateCode")),
	until = require(path.join(constVar.untilPath, "/until")),
	//自定义
	eassyModel = require(path.join(constVar.modelPath, "/admin/eassyModel"));

/**
 * 博文发布接口
 */
eassyRouter.post("/post", function(req, res, next) {
	let em = new eassyModel;
	let nowSecondInt = until.getNowTimeSecondInt();
	let exObj = {
		authorId: req.session.uid,
		type: "post",
		created: nowSecondInt,
		modified: nowSecondInt,
		attachment: JSON.stringify(until.getMediaUrlInHTML(req.body.content)),
		excerpt: until.getCharsByNumber(req.body.content, 50)
	};

	let resObj = until.mergeObj(req.body, exObj);
	debug(resObj);
	em.insertEassy(resObj, function(result) {
		debug("插入文章");
		delete result.opRes;
		res.json(result);
	});
});

/**
 * 博文修改接口
 */
eassyRouter.post("/modify", function(req, res, next) {
	let em = new eassyModel;
	let nowSecondInt = until.getNowTimeSecondInt();
	let exObj = {
		authorId: req.session.uid,
		type: "post",
		modified: nowSecondInt
	};

	let moreField = {};
	if (req.body.content) {
		moreField['attachment'] = JSON.stringify(until.getMediaUrlInHTML(req.body.content));
		moreField['excerpt'] = until.getCharsByNumber(req.body.content, 50)
	}

	let resObj = until.mergeObj(req.body, exObj);
	resObj = until.mergeObj(exObj, moreField);

	debug(resObj);
	em.modifyEassy(resObj, function(result) {
		debug("修改文章");
		res.send(result);
	});

});

/**
 * 博文删除
 * @param  {[type]}     req         [description]
 * @param  {[type]}     res         [description]
 * @param  {eassyModel} next){	let em            [description]
 * @return {[type]}                 [description]
 */
eassyRouter.post("/delete", function(req, res, next) {
	let em = new eassyModel;
	debug("删除文章");

	if (req.session.role != "admin") {
		res.json(stateCode.notAuthority());
		return;
	}

	em.deleteEassy(req.body.eid, function(result) {
		res.json(result);
	});

});

eassyRouter.post("/deleteMulti", function(req, res, next) {
	var em = new eassyModel;
	debug("删除多个文章");
	if (req.session.role != "admin") {
		res.json(stateCode.notAuthority());
		return;
	}

	var eidArry = req.body.eids.split(",");

	em.deleteEassyMulti(eidArry, function(result) {
		res.json(result);
	});

});

eassyRouter.post("/get", function(req, res, next) {
	var em = new eassyModel;
	debug("获取单个文章");
	em.getEassy(req.body.eid, function(result) {
		res.json(result);
	});
});

eassyRouter.post("/getList", function(req, res, next) {
	var em = new eassyModel;
	debug("获取文章列表");
	em.getEassyList(req.body, function(result) {
		res.json(result);
	})
});

eassyRouter.post("/getInfo", function(req, res, next) {
	var em = new eassyModel;
	debug("获取文章的数量信息");
	em.getEassysInfo(function(result) {
		res.json(result);
	});
})



module.exports = exports = eassyRouter;