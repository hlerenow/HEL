var path=require("path");
var dbBase = new (require(path.join(__dirname, "../models/dbBase")));

module.exports = exports = function(app, func) {
	var sql = "select name,value  from options where user=0 and type='system' ;";
	if(!app.locals.blogConfig){
		app.locals.blogConfig={}
	}

	dbBase.query(sql, [], function(result) {
		if (result.state === 200) {
			var rst = {};
			for (var i = 0; i < result.opRes.length; i++) {
				rst[result.opRes[i].name] = result.opRes[i].value;
			}

			app.locals.blogConfig.system = rst;

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