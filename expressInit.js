module.exports = exports = function(app,express) {
		var path = require("path");

		var debug = require("debug")("express");

		var favicon = require('express-favicon');
		// 路由
		var baseLoginCheck = require("./router/baseLogin");
		var adminRouter = require("./router/admin/admin");

		//模版路由
		var templateRouter = require("./router/template/template.js");


		// 中间件
		var compression = require("compression");
		var cookieParser = require("cookie-parser");

		var bodyParser = require("body-parser");
		var urlencoed = bodyParser.urlencoded({
			extended: true
		});
		var jsonParser = bodyParser.json();

		var session = require("express-session");
		//模版函数挂载
		var tpFunc = require(path.join(__dirname, "services/templateFunctions.js"));
		app.locals.helper = tpFunc(app.locals);

		debug(app.locals.system);
		app.use(favicon(path.join(__dirname, '/views/theme/', app.locals.blogConfig.system.nowTheme,"/favicon.png")));



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

			app.engine('html', require('ejs').renderFile); app.set("view engine", "html"); app.set("views", path.join(__dirname, "views"));

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

			app.use(express.static(path.join(__dirname, "public")));


			//登录过滤
			app.use(baseLoginCheck);

			app.use(/^\/admin\/api*/, adminRouter);

			app.use("/", templateRouter);

			//404 
			app.all("*", function(req, res, next) {
				// res.redirect("/");
				res.send("404 not found");
			});
		}