var express = require("express");
var path = require("path");
var debug = require("debug")("adminRouter");
var router = express.Router();
var stateCode = require(path.join(__dirname, "../../stateCode"));

//博文路由
var eassyRouter=require(path.join(__dirname,"./eassy"));

//分类目录路由
var catalogRouter=require(path.join(__dirname,"./catalog"));



router.post("/login", function(req, res, next) {
	var userModel = new require(path.join(__dirname, "../../models/admin/adminModel"));
	userModel = new userModel;
	console.log(req.body);
	if (req.body.username && req.body.password) {
		//登录验证
		userModel.login({
				name: req.body.username,
				password: req.body.password
		},
		//验证结果
		function(data) {
			debug(data);
			if (data.state == 200) {
				debug("登录成功");
				//写入session 登录成功过信息
				
				req.session.loginState = 1;
				req.session.uid = data.opRes.uid;
				req.session.name = data.opRes.name;
				req.session.role = data.opRes.role;
				
				res.send(stateCode.success());
			} else {
				res.send(stateCode.loginFail());
			}
		});
	}else{
		res.send(stateCode.parMiss());
	}

	// res.send("hello world !!!");
});

//博文api
router.use(/^\/eassy*/,eassyRouter);

//分类目录api
router.use(/^\/catalog*/,catalogRouter);

module.exports = exports = router;