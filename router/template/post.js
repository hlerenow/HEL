var path = require("path"),
	express = require("express"),
	postRouter = express.Router(),
	debug = require("debug")("showContent"),
	constVar = require(path.join(constVarPath)),
	templateService = require(path.join(constVar.servicePath, "/template/services.js"));

postRouter.get("/:eid(\\d+).html", function(req, res, next) {
	templateService.getPostInfo(req, res, next);
});


module.exports = exports = postRouter;