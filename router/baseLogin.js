var express=require("express");
var router=express.Router();
var debug=require("debug")("baseLogin");
var path=require("path");
var stateCode=require(path.join(__dirname,"../stateCode"));

router.use(/^\/admin\/api*/,function(req,res,next){
	debug(req.path);
	if(req.path==="/login"){
		next();
	}else{
		
		debug("登录过滤");
		
		//开发需要写入登录session,开发完成后删掉
		req.session.loginState=1;
		req.session.uid=2;
		// 
	

		if(req.session.loginState===1){
			next();			
		}else{
			res.send(stateCode.notLogin());
		}
		
	}

});


module.exports=router;