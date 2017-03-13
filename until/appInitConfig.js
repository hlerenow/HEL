/**
 * 将数据库里的应用信息，和当前的主题信息写入app的全局变量里面
 * @type {[type]}
 */
var path = require("path"),
	constVar = require(path.join(constVarPath)),
	dbBase = new(require(path.join(constVar.modelPath, "dbBase")));

function appInitConfig(app, func) {
	var sql = "select name,value  from options where user=0 and type='system' ;";
	if (!app.locals.blogConfig) {
		app.locals.blogConfig = {}
	}

	dbBase.query(sql, [], function(result) {
		if (result.state === 200) {
			var rst = {};
			for (var i = 0; i < result.opRes.length; i++) {
				rst[result.opRes[i].name] = result.opRes[i].value;
			}

			app.locals.blogConfig.system = rst;

			var themePath = path.join(constVar.themePath, app.locals.blogConfig.system.nowTheme, './config.json');

			app.locals.blogConfig.themeConfig = require(themePath);

			var sql2 = "select name,value from options where user=0 and (type='static' or type=?);";

			dbBase.query(sql2, [app.locals.blogConfig.system.nowTheme], function(result2) {
				if (result2.state === 200) {
					var rst2 = {};
					for (var i = 0; i < result2.opRes.length; i++) {
						rst2[result2.opRes[i].name] = result2.opRes[i].value;
					}
					app.locals.blogConfig.static = rst2;

					func(true);
				} else {
					func(false);
				}

			})
		} else {
			func(false);
		}
	});
}

module.exports = exports = appInitConfig;