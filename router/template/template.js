var path = require("path"),
	express = require("express"),
	templateRouter = express.Router(),
	constVar = require(path.join(constVarPath)),
	debug = require("debug")("showContent"),
	//路由模块
	indexRouter = require(path.join(__dirname, "index.js")),

	hPromise=require(path.join(constVar.untilPath, "/hPromise.js")),
	catalogRouter = require(path.join(__dirname, "catalog.js")),
	templateService = require(path.join(constVar.servicePath, "/template/services.js"))
	postRouter = require(path.join(__dirname, "post.js"));


	//数据模型
	bim=new (require(path.join(constVar.modelPath,"template/blogInfoModel"))),
	pim=new (require(path.join(constVar.modelPath,"template/postInfoModel"))),
	cm=new (require(path.join(constVar.modelPath,"template/catalogModel")));

//挂载一些通用的信息
templateRouter.use("*",function(req,res,next){
	var hp=new hPromise({
		unsysnc:true
	});

	hp.add(function(){
		//菜单信息
		res.locals.menue=JSON.parse(req.app.locals.blogConfig.system.menue);		
		debug(res.locals.menue);
		this.next();		

	}).then(function(){
		//最近文章		
		pim.getRecentPost((data)=>{
			var temp=[];
			if(data.state==200){
				temp=data.opRes;
			}
			res.locals.recentPosts=temp;

			//执行下一个then
			this.next();
		});

	}).then(function(){
		//获取所有的目录
		cm.getAllCatalogs((result)=>{
			var catalogs=[];
			if(result.state==200){
				catalogs=result.opRes;
			}
			res.locals.allCatalogs=catalogs;
			this.next();
		});

	}).then(function(){
		//获取blog的基本信息
		var themeName=req.app.locals.blogConfig.system.nowTheme+"";
			themeName=themeName.replace(/\//ig,"");		
		bim.getBaseInfo(themeName,(result)=>{
			// debug(result);
			res.locals.baseInfo=result;
			this.next();			
		});		
	}).allDone(function(){

		//进入下一个路由
		next();	
		//执行 hPromise;
	});

	hp.start();
	
});

templateRouter.use("/", indexRouter);


templateRouter.use("/catalog", catalogRouter);
// router.use("/archives",indexRouter);

templateRouter.use("/post", postRouter);

templateRouter.get("/archive",function(req,res,next){
	templateService.getArchive(req,res,next);
});

module.exports = exports = templateRouter;