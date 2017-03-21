var mysql = require("mysql"),
	path = require("path"),
	constVar = require(path.join(constVarPath)),
	config = require(path.join(constVar.configPath, "/config"));

var pool = mysql.createPool({
	host: config.db.host,
	user: config.db.user,
	password: config.db.dbPassword,
	database: config.db.dbName,
	// connectionLimit :512,
	multipleStatements: true
});

module.exports = exports = pool;