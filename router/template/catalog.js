var express=require("express");
	path=require("path");
	catalogRouter=express.Router();
	debug=require("debug")("showContent");
	constVar = require(path.join(constVarPath)),	
	templateService=require(path.join(constVar.servicePath,"template/services.js"));


catalogRouter.get("/:slug",function(req,res,next){
	req.params.page=1;
	templateService.getCatalogInfo(req,res,next);
});

catalogRouter.get("/:slug/:page(\\d+)",function(req,res,next){
	templateService.getCatalogInfo(req,res,next);
});

module.exports=exports=catalogRouter;