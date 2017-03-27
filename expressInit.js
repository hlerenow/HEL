var path = require("path"),
	constVar = require(path.join(constVarPath)),
	debug = require("debug")("expressInit"),
	helmet = require('helmet'),
	favicon = require('serve-favicon'),
	// 路由

	baseLoginCheck = require("./router/baseLogin"),
	adminRouter = require("./router/admin/admin")

	//模版路由
	templateRouter = require("./router/template/template.js"),

	// 中间件
	compression = require("compression"),
	cookieParser = require("cookie-parser"),
	bodyParser = require("body-parser"),
	urlencoed = bodyParser.urlencoded({
		extended: true
	}),
	jsonParser = bodyParser.json(),
	session = require("express-session"),

	//模版辅助函数挂载
	tpFunc = require(path.join(__dirname, "service/templateFunctions.js"));

function expressInit(app, express) {
	//环境选择
	// switch (app.get('env')) {
	// 	case "development":
	// 		{
	// 			app.use(require("morgan")("dev"));
	// 			break;
	// 		}
	// 	case 'production':
	// 		{
	// 			app.use(require("express-logger")({
	// 				path: path.join(constVar.logPath,"/log.txt")
	// 			}));
	// 			break;
	// 		}
	// }
	
	try{
		app.use(favicon(path.join(constVar.publicPath,"/favicon.ico")));
	}catch(e){
			
	}

	app.disable('x-powered-by');

	app.use(helmet());

	app.locals.Helper = tpFunc(app.locals);

	app.engine('html', require('ejs').renderFile);
	app.set("view engine", "html");
	app.set("views", constVar.viewPath);

	app.use(cookieParser("595806119HL"));

	app.use(session({
		secret: "595806119HL",
		cookie: {
			secure: false
		},
		name: "mySid",
		resave: false,
		saveUninitialized: true
	}));


	app.use(urlencoed);

	app.use(jsonParser);

	app.use(compression());
	
	app.use("/admin",express.static(path.join(constVar.rootPath,"/admin")));

	app.use("/public",express.static(constVar.publicPath));
	//挂载主题静态资源
	app.use("/public",function themeStatic(req,res,next){
		// debug(path.join(__dirname, "view/theme",app.locals.blogConfig.system.nowTheme,"public"));
		express.static(path.join(__dirname, "view/theme",app.locals.blogConfig.system.nowTheme,"public"))(req,res,next);
	});

	//登录过滤
	app.use(baseLoginCheck);

	app.use(/^\/admin\/api*/, adminRouter);

	// debug(templateRouter.name);

	app.use("/", templateRouter);

	//404 
	app.all("*", function(req, res, next) {
		// res.redirect("/");
		res.send("404 not found");
	});
}
module.exports = exports = expressInit;