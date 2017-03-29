/**
 * 将数据库里的应用信息，和当前的主题信息写入app的全局变量里面
 * @type {[type]}
 */
var path = require("path"),
	constVar = require(path.join(constVarPath)),
	hPromise=require(path.join(constVar.untilPath, "/hPromise.js")),
	dbBase = new(require(path.join(constVar.modelPath, "dbBase")));

function appInitConfig(app, func) {

	var hp=new hPromise();

	hp.add(function(){
		debug("加载系统配置");
		app.locals.blogConfig =app.locals.blogConfig|| {};
		//获取数据库的里系统配置信息
		var sql = "select name,value  from options where user=0 and type='system' ;";

		dbBase.query(sql, [], (result)=>{
			if (result.state === 200) {
				var rst = {};
				for (var i = 0; i < result.opRes.length; i++) {
					rst[result.opRes[i].name] = result.opRes[i].value;
				}

				app.locals.blogConfig.system = rst;

				this.next();

			} else {
				func(false);
			}
		});		
	}).then(function(preData){

		var sql2 = "select name,value from options where user=0 and (type='static' or type=?);";
		debug("加载主题数据库配置");

		dbBase.query(sql2, [app.locals.blogConfig.system.nowTheme], (result2)=>{
			if (result2.state === 200) {
				var rst2 = {};
				for (var i = 0; i < result2.opRes.length; i++) {
					rst2[result2.opRes[i].name] = result2.opRes[i].value;
				}
				app.locals.blogConfig.static = rst2;

				this.next(true);
			} else {
				this.next(false);
			}

		})		
	}).then(function(preData){
		debug("加载主题文件配置");		
		//加载当前主题的配置文件
		var themePathConfig=themePathConfig= path.join(constVar.themePath, app.locals.blogConfig.system.nowTheme, './config.json');
		try{
			app.locals.blogConfig.themeConfig = require(themePathConfig);
		}catch(err){
			app.locals.blogConfig.themeConfig={};
			console.log("主题配置文件加载失败",err);
			debug(err);	
		}

		//加载主题帮助函数
		var themeHelper=themePathConfig= path.join(constVar.themePath, app.locals.blogConfig.system.nowTheme, './helper.js');
		try{
			var helper=require(themeHelper);	
			app.locals.helper=helper(app.locals);
		}catch(e){
			console.log("主题帮助函数加载失败",e);
			app.locals.helper={};
		}
		this.next(preData);
		
	}).then(function(preData){
		func(preData);
	});

	hp.start();
}

module.exports = exports = appInitConfig;