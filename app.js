var path=require("path");

var debug=require("debug")("app");

//主题配置
var json2=require("./views/theme/default/config.json");

//开启定时任务，定时清理 用户上的传缓存文件
var schedule=require('node-schedule');
//设置定时job规则，每天凌晨2点清除缓存数据
var timeRule=new schedule.RecurrenceRule();
timeRule.dayOfWeek=[0,new schedule.Range(1,6)];
timeRule.hour=2;
timeRule.minute=0;

var clearTempFile=require("./until/clearTempFile");
var clearFilejob=schedule.scheduleJob(timeRule, function(result){
		clearTempFile(function(){
			debug("文件缓存目录已经清除. ",result);
		});
	});

//开启express服务器
var express=require("express");
var app=express();

//bolog的一些全局配置
var aic=require(path.join(__dirname,"./until/appInitConfig.js"));
aic(app,function(flage){
	if(flage){
		debug("系统设置加载成功");
		debug(app.locals.blogConfig)		
	}else{
		debug("系统设置加载失败");		
	}

	var initExpress=require("./expressInit.js");

	initExpress(app,express);

	app.set("port",3000);

	app.listen(parseInt(app.get("port")),function(){
		console.log("Express 4.0 on http://localhost:%s",app.get("port"));
	});	
});


