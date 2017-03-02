var express=require("express");
var router=express.Router();
var debug=require("debug")("showContent");
var path=require("path");
var showContentService=require(path.join(__dirname,"../services/showContentService"));



///^\/$|^\/page$|^\/page\/([1-9][0-9]*)$/

router.get("/",function(req,res,next){
	req.params.page=1;
	showContentService.getIndexInfo(req,res,next);


});

router.get("/page/:page?",function(req,res,next){
	var page=parseInt(req.params.page);
	if(typeof page !="number" || page!==page||page!=req.params.page){
		next();
		return;
	};

	showContentService.getIndexInfo(req,res,next);
});

router.get("/catalog/:catalog/:page?",function(req,res,next){
	showContentService.getPostInfo(req,res,next);
});

router.get("/post/:eid?",function(req,res,next){

});

module.exports=router;