//常用路径

var path=require("path");

	global.constVarPath=path.join(__dirname, "config/constVar");

var constVar=require(path.join(constVarPath)),
	debug=require("debug")("app"),
	express=require("express"),
	schedule=require('node-schedule'),	

	hPromise=require(path.join(constVar.untilPath, "/hPromise.js")),
	createMysqlTables=require(path.join(constVar.untilPath, "/createMysqlTables.js")),	
	app=express(),
	
	clearTempFile=require(path.join(constVar.untilPath,"/clearTempFile")),
	aic=require(path.join(constVar.untilPath,"appInitConfig.js")),
	initExpress=require("./expressInit.js");


	//开启定时任务，定时清理 用户上的传缓存文件
	//设置定时job规则，每天凌晨2点清除缓存数据
var	timeRule=new schedule.RecurrenceRule();
	timeRule.dayOfWeek=[0,new schedule.Range(1,6)];
	timeRule.hour=2;
	timeRule.minute=0;
	schedule.scheduleJob(timeRule, function(result){
		clearTempFile(function(){
			debug("文件缓存目录已经清除. ",result);
		});
	});

var hp=new hPromise();
	
	hp.add(function(){
		//创建表
		createMysqlTables(()=>{
			this.next();
		});		
	}).then(function(){
		//blog的一些全局配置
		aic(app,function(flage){
			if(flage){
				debug("系统设置加载成功");
			}else{
				debug("系统设置加载失败");		
			}

			initExpress(app,express);

			var port=parseInt(process.env.PORT)||80;
			//开启express服务器
			app.listen(port,function(){
				console.log("\n	Express 4.0 on http://localhost:%s		\n",port);
				console.log("	主页 http://localhost:%s				\n",port);
				console.log("	后台管理页面 http://localhost:%s/admin  \n",port);
			});	
		});
	});

	hp.start();



