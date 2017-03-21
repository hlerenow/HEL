var fs=require("fs"),
	path=require("path"),
	constVar = require(path.join(constVarPath)),
	dbBase = new (require(path.join(constVar.modelPath, "dbBase"))),
	sysConfig=require(path.join(constVar.configPath, "config"));

function createMysqlTables(func){
	if(!sysConfig.isInstall){
		var sqlPath=path.join(constVar.rootPath,"/install/hel-struct.sql");
		var sql=fs.readFileSync(sqlPath,'utf-8');
		dbBase.query(sql,[],function(result){
			if(result.state!=200){
				debug(result);
				console.error("数据库初始化失败");
				return;
			}

			sysConfig.isInstall=true;
			debug(JSON.stringify(sysConfig));
			fs.writeFileSync(path.join(constVar.configPath, "config.json"),JSON.stringify(sysConfig));
			console.log("数据库初始化成功");
			func();
		});
	}else{
		func();
	}
}

module.exports=exports=createMysqlTables;