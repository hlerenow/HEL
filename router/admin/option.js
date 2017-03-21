//路由公用
var path = require("path"),
	express = require("express"),
	optionRouter = express.Router(),
	debug = require("debug")("option"),
	constVar = require(path.join(constVarPath)),		
	stateCode = require(path.join(constVar.configPath, "stateCode")),
	until = require(path.join(constVar.untilPath, "/until")),
	aic=require(path.join(constVar.untilPath,"appInitConfig.js")),
	//自定义
	optionModel = require(path.join(constVar.modelPath, "/admin/optionModel"));


optionRouter.post("/create", function(req, res, next) {
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

optionRouter.post("/delete", function(req, res, next) {
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

optionRouter.post("/modify",function(req,res,next){
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

optionRouter.post("/getStatic",function(req,res,next){
	let om=new optionModel;
	om.getStaticOptions(function(result){
		res.json(result);
	});
});

module.exports = exports = optionRouter;