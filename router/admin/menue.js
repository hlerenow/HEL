var path = require("path"),
	express = require("express"),
	debug = require("debug")("menueRouter"),
	menueRouter = express.Router(),
	constVar = require(path.join(constVarPath)),
	stateCode = require(path.join(constVar.configPath, "stateCode")),
	until = require(path.join(constVar.untilPath, "/until")),
	//自定义
	menueModel = require(path.join(constVar.modelPath, "/admin/menueModel"));
	aic=require(path.join(constVar.untilPath,"appInitConfig.js")),


menueRouter.get("/get",function(req,res,next){
	res.json(stateCode.success({
		opRes:req.app.locals.blogConfig.system.menue
	}));
});

menueRouter.post("/modify",function(req,res,next){
	var a=until.jsonParse(req.body.menue);	
	debug(a);
	if (a) {
		var mm=new menueModel;
		mm.modifyMenue(req.body.menue,function(result){
				aic(req.app,function(){});
				res.json(result);			
		});

	} else {
		res.json(stateCode.parFormatError({
			moreInfo: "参数格式为 json格式的字符串 "
		}));
	}


});

module.exports=exports=menueRouter;
