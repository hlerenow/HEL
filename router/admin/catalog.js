//路由公用
var path=require("path"),
	express=require("express"),
	catalogRouter=express.Router(),
	debug=require("debug")("catalogRouter"),
	constVar = require(path.join(constVarPath)),
	stateCode = require(path.join(constVar.configPath,"stateCode")),
	until=require(path.join(constVar.untilPath, "/until")),
	//自定义
	catalogModel=require(path.join(constVar.modelPath,"admin/catalogModel"));

catalogRouter.post("/create",function(req,res,next){
	let cm=new catalogModel;
	if(req.session.role=="admin"){
		cm.createCatalog(req.body,function(result){
			delete result.opRes;
			res.json(result);
		});
	}else{
		res.json(stateCode.notAuthority());
	};
});

catalogRouter.post("/modify",function(req,res,next){
	let cm=new catalogModel;

	if(req.session.role=="admin"){
		cm.modifyCatalog(req.body,function(result){
			
			delete result.opRes;			
			res.json(result);
		});
	}else{
		res.json(stateCode.notAuthority());
	}	
});


catalogRouter.post("/delete",function(req,res,next){
	let cm=new catalogModel;
	let midArry = until.jsonParse(req.body.mids);	
	if (!midArry) {
		res.json(stateCode.jsonParseFail());
		return;
	}	
	debug(midArry);
	if(req.session.role=="admin"){
		cm.deleteCatalog(midArry,function(result){
			delete result.opRes;
			res.json(result);
		});
	}else{
		res.json(stateCode.notAuthority());
	}	
});

catalogRouter.post("/get",function(req,res,next){
	let cm=new catalogModel;

	if(req.session.role=="admin"){
		cm.getCatalog(function(result){
			debug(req.app.locals.blogConfig.themeConfig);
			//加载主题配置文件
			result.templates=req.app.locals.blogConfig.themeConfig.catalogTemplate;
			res.json(result);
		});
	}else{
		res.json(stateCode.notAuthority());
	}	
});

module.exports=exports=catalogRouter;

