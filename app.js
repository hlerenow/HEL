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
	//主题配置
	
	themeConfig=require(path.join(constVar.viewPath,"/theme/default/config.json")),
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
			debug("哈哈");
			this.next();
		});		
	}).then(function(){
		//bolog的一些全局配置
			debug("哈哈 2");		
		aic(app,function(flage){
			if(flage){
				debug("系统设置加载成功");
				debug(app.locals.blogConfig)		
			}else{
				debug("系统设置加载失败");		
			}

			initExpress(app,express);

			app.set("port",3000);

			//开启express服务器
			app.listen(parseInt(app.get("port")),function(){
				console.log("Express 4.0 on http://localhost:%s",app.get("port"));
			});	
		});
	});

	hp.start();



