var path=require("path"),
	constVar = require(path.join(constVarPath)),
	express=require("express"),
	debug=require("debug")("baseLoginRouter"),
	baseLoginRouter=express.Router(),
	stateCode=require(path.join(constVar.configPath,"stateCode"));

baseLoginRouter.use(/^\/admin\/api*/,function(req,res,next){
	debug(req.path);
	if(req.path==="/login"){
		next();
	}else{
		
		debug("登录过滤");
		
		// //开发需要写入session,模拟登录,开发完成后删掉,
		req.session.loginState=1;
		req.session.uid=1;
		req.session.name='admin';
		req.session.role='admin';

		if(req.session.loginState===1){
			next();			
		}else{
			res.send(stateCode.notLogin());
		}
		
	}

});


module.exports=baseLoginRouter;