var mysql=require("mysql");
var path=require("path");
var config=require(path.join(__dirname,"../config"));

var pool  = mysql.createPool({
  multipleStatements:true,
  host     : config.db.host,
  user     : config.db.user,
  password : config.db.dbPassword,
  database : config.db.dbName
});

module.exports=exports=pool;
