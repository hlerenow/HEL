var express = require("express"),
	path = require("path"),
	debug = require("debug")("adminRouter"),
	adminRouter = express.Router(),
	constVar = require(path.join(constVarPath)),
	stateCode = require(path.join(constVar.configPath, "/stateCode")),
	//博文路由
	eassyRouter = require(path.join(__dirname, "./eassy")),
	//分类目录路由
	catalogRouter = require(path.join(__dirname, "./catalog")),
	//文件上传路由
	fileRouter = require(path.join(__dirname, "./file")),
	//option 路由
	optionRouter = require(path.join(__dirname, "./option")),
	//
	menueRouter = require(path.join(__dirname, "./menue")),

	themeRouter = require(path.join(__dirname, "./theme")),
	
	adminModel = new require(path.join(constVar.modelPath, "/admin/adminModel"));


adminRouter.post("/login", function(req, res, next) {
	userModel = new adminModel;
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
					debug(req.session);
					res.send(stateCode.success({
						moreInfo: "登录成功",
						username: data.opRes.name,
						nickname: data.opRes.nickName,
						siteUrl: data.opRes.siteUrl,
						mail: data.opRes.mail
					}));

				} else {
					res.send(data);
				}
			});
	} else {
		res.send(stateCode.parMiss());
	}

	// res.send("hello world !!!");
});

adminRouter.get("/logout", function(req, res, next) {
	req.session.destroy(function(err) {
		if (err) {
			res.json(stateCode.fail({
				moreInfo: "退出登录失败"
			}));
		} else {
			res.json(stateCode.success({
				moreInfo: "退出登录成功"
			}));
			debug(req.session);
		}

	});
});

adminRouter.post("/modifyPas", function(req, res, next) {
	//密码长度检查
	if(req.body.password.length<8){
		res.json(stateCode.fail({
			moreInfo:"密码长度少于8位"
		}));

		return;
	}

	userModel = new adminModel;
	userModel.modifyPassword({
		password:req.body.password||"",
		oldPassword:req.body.oldPassword||"",
		name:"admin"
	},function(result){
		if(result.state==200&&result.opRes.affectedRows>0){
			res.json(stateCode.success());			
		}else{
			res.json(stateCode.fail({
				moreInfo:"原密码错误"
			}));	
		}
	})
});

adminRouter.post("isLogin",function(req,res,next){
	if(req.session.loginState ==1){
		res.json(stateCode.success());
	}else{
		res.json(stateCode.fail());
	}
})

//博文api
adminRouter.use(/^\/eassy*/, eassyRouter);

//分类目录api
adminRouter.use(/^\/catalog*/, catalogRouter);

//文件上传api
adminRouter.use(/^\/file*/, fileRouter);

//option api
adminRouter.use(/^\/option*/, optionRouter);

adminRouter.use(/^\/menue*/, menueRouter);

adminRouter.use(/^\/theme*/, themeRouter);


module.exports = exports = adminRouter;