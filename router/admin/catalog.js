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
			res.json(result);
		});
	}else{
		res.json(stateCode.notAuthority());
	}	
});


router.post("/delete",function(req,res,next){
	let cm=new catalogModel;

	if(req.session.role=="admin"){
		cm.deleteCatalog({mid:req.body.mid},function(result){
			res.json(result);
		});
	}else{
		res.json(stateCode.notAuthority());
	}	
});

module.exports=exports=router;

