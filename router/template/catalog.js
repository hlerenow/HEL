var express=require("express");
var router=express.Router();
var debug=require("debug")("showContent");
var path=require("path");
var templateService=require(path.join(__dirname,"../../services/template/services.js"));


router.get("/:slug",function(req,res,next){
	req.params.page=1;
	templateService.getCatalogInfo(req,res,next);
});

router.get("/:slug/:page(\\d+)",function(req,res,next){
	templateService.getCatalogInfo(req,res,next);
});

module.exports=exports=router;