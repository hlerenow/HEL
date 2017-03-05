var express=require("express");
var router=express.Router();
var debug=require("debug")("showContent");
var path=require("path");
var templateService=require(path.join(__dirname,"../../services/template/services.js"));

router.get("/catalog/:catalog/:page?",function(req,res,next){
	templateService.getPostInfo(req,res,next);
});
