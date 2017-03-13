var path = require("path"),
	express = require("express"),
	tempalteRouter = express.Router(),
	constVar = require(path.join(constVarPath)),
	debug = require("debug")("showContent"),
	//路由模块
	indexRouter = require(path.join(__dirname, "index.js")),

	catalogRouter = require(path.join(__dirname, "catalog.js")),

	postRouter = require(path.join(__dirname, "post.js"));


tempalteRouter.use("/", indexRouter);


tempalteRouter.use("/catalog", catalogRouter);
// router.use("/archives",indexRouter);

tempalteRouter.use("/post", postRouter);

module.exports = exports = tempalteRouter;