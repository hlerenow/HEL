var express=require("express");
var router=express.Router();
var debug=require("debug")("showContent");
var path=require("path");
var templateService=require(path.join(__dirname,"../../services/template/services.js"));




/**
 * 匹配首页
 * @param  {[type]} req                     [description]
 * @param  {[type]} res                     [description]
 * @param  {[type]} next){	req.params.page [description]
 * @return {[type]}                         [description]
 */
router.get("/",function(req,res,next){
	req.params.page=1;
	templateService.getIndexInfo(req,res,next);
});

router.get("/index",function(req,res,next){
	req.params.page=1;
	templateService.getIndexInfo(req,res,next);
});
/**
 * 匹配 /page or /page/
 * @param  {[type]} req                     [description]
 * @param  {[type]} res                     [description]
 * @param  {[type]} next){	req.params.page [description]
 * @return {[type]}                         [description]
 */
router.get("/index/page",function(req,res,next){
	req.params.page=1;
	templateService.getIndexInfo(req,res,next);
});

router.get("/index/page/:page(\\d+)",function(req,res,next){
	var page=parseInt(req.params.page);
	templateService.getIndexInfo(req,res,next);
});

module.exports=router;