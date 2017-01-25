
var express=require("express");
var app=express();
var path=require("path");

var debug=require("debug")("app");

// 路由
var baseLoginCheck=require("./router/baseLogin");
var adminRouter=require("./router/admin/admin");

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

app.engine('html', require('ejs').renderFile);
app.set("view engine","html");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

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

app.set("port",3000);

//登录过滤
app.use(baseLoginCheck);

app.use(/^\/admin\/api*/,adminRouter);

//404 
app.all("*",function(req,res,next){
	res.send("404 Not Found ");
});

app.listen(app.get("port"),function(){
	console.log("Express 4.0 on http://localhost:%s",app.get("port"));
});

