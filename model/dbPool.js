var	mysql=require("mysql"),
	path=require("path"),
	constVar = require(path.join(constVarPath)),	
	config=require(path.join(constVar.configPath,"/config"));

var pool  = mysql.createPool({
  multipleStatements:true,
  host     : config.db.host,
  user     : config.db.user,
  password : config.db.dbPassword,
  database : config.db.dbName
});

module.exports=exports=pool;
