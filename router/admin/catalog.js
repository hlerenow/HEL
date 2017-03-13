//路由公用
var express=require("express");
var router=express.Router();
var path=require("path");
var stateCode = require(path.join(__dirname, "../../stateCode"));
var until=require(path.join(__dirname, "../../until/until"));
var debug=require("debug")("catalog");

//自定义
var catalogModel=require(path.join(__dirname,"../../models/admin/catalogModel"));

router.post("/create",function(req,res,next){
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

router.post("/modify",function(req,res,next){
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


router.post("/delete",function(req,res,next){
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

router.post("/get",function(req,res,next){
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

module.exports=exports=router;

