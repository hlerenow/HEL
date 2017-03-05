//路由公用
var express = require("express");
var router = express.Router();
var path = require("path");
var stateCode = require(path.join(__dirname, "../../stateCode"));
var until = require(path.join(__dirname, "../../until/until"));
var debug = require("debug")("option");
var aic=require(path.join(__dirname,"../../until/appInitConfig.js"));


//自定义
var optionModel = require(path.join(__dirname, "../../models/admin/optionModel"));


router.post("/create", function(req, res, next) {
	let om = new optionModel;
	let objArry = until.jsonParse(req.body.options);

	if (!objArry) {
		res.JSON(stateCode.jsonParseFail());
		return;
	}

	om.createOptions(objArry, function(result) {
		res.json(result);
	});
});

router.post("/delete", function(req, res, next) {
	let om = new optionModel;
	let oidArry = until.jsonParse(req.body.optionsId);

	if (!oidArry) {
		res.json(stateCode.jsonParseFail());
		return;
	}

	om.deleteOptions(oidArry,function(result){
		res.json(result);
	});
});

router.post("/modify",function(req,res,next){
	let om=new optionModel;
	let objArry=until.jsonParse(req.body.options);

	if (!objArry) {
		res.json(stateCode.jsonParseFail());
		return;
	}

	om.modifyOptions(objArry,function(result){
		aic(req.app,function(flage){
			if(flage){
				debug("系统设置更新成功");
			}else{
				debug("系统设置更新失败");								
			}
		});		
		res.json(result);
	});

});

router.post("/getStatic",function(req,res,next){
	let om=new optionModel;
	om.getStaticOptions(function(result){
		res.json(result);
	});
});

module.exports = exports = router;