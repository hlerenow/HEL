var path=require("path");
var constVar={
	stateCodePath:path.join(__dirname, "./stateCode.js"),
	viewPath:path.join(__dirname,"../view"),
	publicPath:path.join(__dirname,"../public"),
	modelPath:path.join(__dirname,"../model"),
	routerPath:path.join(__dirname,"../router"),
	rootPath:path.join(__dirname,"../"),
	untilPath:path.join(__dirname,"../until"),
	configPath:path.join(__dirname),
	servicePath:path.join(__dirname,"../service"),
	themePath:path.join(__dirname,"../view/theme"),
	logPath:path.join(__dirname,"../log"),
	testPath:path.join(__dirname,"../test"),	
}

module.exports=exports=constVar;