var express=require("express");
var router=express.Router();
var debug=require("debug")("showContent");
var path=require("path");

var indexRouter=require(path.join(__dirname,"index.js"));

var catalogRouter=require(path.join(__dirname,"catalog.js"));

var postRouter=require(path.join(__dirname,"post.js"));




router.use("/",indexRouter);


router.use("/catalog",catalogRouter);
// router.use("/archives",indexRouter);

router.use("/post",postRouter);

module.exports=exports=router;