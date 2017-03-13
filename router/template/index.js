var express = require("express"),
	path = require("path"),
	templateRouter = express.Router(),
	debug = require("debug")("showContent"),
	constVar = require(path.join(constVarPath)),
	templateService = require(path.join(constVar.servicePath, "/template/services.js"));



/**
 * 匹配首页
 * @param  {[type]} req                     [description]
 * @param  {[type]} res                     [description]
 * @param  {[type]} next){	req.params.page [description]
 * @return {[type]}                         [description]
 */
templateRouter.get("/", function(req, res, next) {
	req.params.page = 1;
	templateService.getIndexInfo(req, res, next);
});

templateRouter.get("/index", function(req, res, next) {
	req.params.page = 1;
	templateService.getIndexInfo(req, res, next);
});
/**
 * 匹配 /page or /page/
 * @param  {[type]} req                     [description]
 * @param  {[type]} res                     [description]
 * @param  {[type]} next){	req.params.page [description]
 * @return {[type]}                         [description]
 */
templateRouter.get("/index/page", function(req, res, next) {
	req.params.page = 1;
	templateService.getIndexInfo(req, res, next);
});

templateRouter.get("/index/page/:page(\\d+)", function(req, res, next) {
	var page = parseInt(req.params.page);
	templateService.getIndexInfo(req, res, next);
});

module.exports = templateRouter;