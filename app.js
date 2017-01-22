var express=require("express");
var app=express();
var path=require("path");

var debug=require("debug")("app");

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
	extended:false
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

debug("end");

app.get("/",function(req,res,next){
		var userModel=new require(path.join(__dirname,"models/admin/adminModel"));
		userModel=new userModel;

		userModel.login({name:"admin",password:"123456"},
		//登录
		function(data){
		debug(data);
		if(data.state==200){
			res.render("admin/",{str:"我是 str"});			
		}else{
			res.send("登录失败");
		}
		// // 登录成功获取验证信息
		// userModel.getUser("admin", 
		// function(result) {
		// 	// console.log(result);
		// });	

	});	
	// res.send("hello world !!!");
});

app.listen(app.get("port"),function(){
	console.log("Express 4.0 on http://localhost:%s",app.get("port"));
});

