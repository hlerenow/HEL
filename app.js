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
		})
	});


//开启express服务器
var express=require("express");
var app=express();
// 路由

var baseLoginCheck=require("./router/baseLogin");
var adminRouter=require("./router/admin/admin");

//内容展示路由
var showContent=require("./router/showContent");

//环境选择
switch (app.get('env')) {
	case "development":
		{
			app.use(require("morgan")("dev"));
			break;
		}
	case 'production':
		{
			app.use(require("express-logger")({
				path: __dirname + "/log/log.txt"
			}));
			break;
		}
}

// 中间件
var cookieParser=require("cookie-parser");

var bodyParser=require("body-parser");
var urlencoed=bodyParser.urlencoded({
	extended:true
});
var jsonParser=bodyParser.json();

var session=require("express-session");
var compression=require("compression");

//模版函数挂载
var tpFunc=require(path.join(__dirname,"services/templateFunctions.js"));
app.locals.helper=tpFunc(app.locals);

//bolog的一些全局配置
app.locals.blogConfig={
	postPearPage:1
};


app.engine('html', require('ejs').renderFile);
app.set("view engine","html");
app.set("views",path.join(__dirname,"views"));

app.use(cookieParser("595806119HL"));

app.use(session({
	secret:"595806119HL",
	cookie:{secure:false},
	name:"mySid",
	resave:false,
	saveUninitialized:true
}));


app.use(urlencoed);

app.use(jsonParser);

app.use(compression());

app.use(express.static(path.join(__dirname,"public")));


app.set("port",3000);




//登录过滤
app.use(baseLoginCheck);

app.use(/^\/admin\/api*/,adminRouter);

app.use("/",showContent);

//404 
app.all("*",function(req,res,next){
	res.send("404 Not Found ");
});

app.listen(app.get("port"),function(){
	console.log("Express 4.0 on http://localhost:%s",app.get("port"));
});

