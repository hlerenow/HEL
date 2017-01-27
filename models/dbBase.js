var debug = require("debug")("dbBase");
var path = require("path");
var stateCode = require(path.join(__dirname, "../stateCode"));
var pool = require(path.join(__dirname, "dbPool"));
var until=require(path.join(__dirname,"../until/until"));
var dbBase = function() {
};
var fn = dbBase.prototype;

/**
 * 插入一条数据到指定表
 * @param  {[str]} tableName [表名]
 * @param  {[object]} obj       [插入的数据]
 * @param  {[function]} func      [回调函数, 带有一个操作结果对象result]
 * @return {[type]}           [description]
 * 
 * @example
 * 		inert("users",{
			name:"hl",
			sex:"sdsd"
 		},function(result){//dosmething});
 	@result={
 		state:xx,
 		info:"",
 		opRes:{xxx},
 		other:...
 	}	
 */
fn.insert = function(tableName, obj, func) {

	if (!(obj && tableName)) {
		func(stateCode.parMiss());
		return;
	}

	debug(obj);

	pool.getConnection(function(err, con) {
		if (err) {
			debug(err);
			func(stateCode.notConectDb());
			return;
		}

		//生成sql语句,和对应的值的数组
		var {sql,val}=until.getInsertSqlStr(tableName,obj);

		debug(sql);

		con.query(sql, val, function(err, data) {
			debug("基本插入");
			con.release();
			if (err) {
				debug(err);
				func(stateCode.sqlFail());
			} else {
				func(stateCode.success({opRes:data,insertId:data.insertId}));
			}
		});
	})
};

/**
 * 添加有事物处理
 * @param  {[type]} tableName [description]
 * @param  {[type]} objArry   [description]
 * @param  {[type]} func      [description]
 * @return {[type]}           [description]
 */
fn.insertMulti=function(tableName,objArry,func){
	if (!(obj && tableName)) {
		func(stateCode.parMiss());
		return;
	}
	debug(obj);
	pool.getConnection(function(err, con) {
		if (err) {
			debug(err);
			func(stateCode.notConectDb());
			return;
		}

		var sql=until.getInsertSqlStr(tableName,objArry[0]);

		debug(sql);

		con.query(sql, relVal, function(err, data) {
			debug("基本插入");
			con.release();
			if (err) {
				debug(err);
				func(stateCode.sqlFail());
			} else {
				func(stateCode.success({opRes:data,insertId:data.insertId}));
			}
		});
	})
}

/**
 * 只用于更新一条数据的某些字段
 * @param  {[str]} tableName [操作的表名]
 * @param  {[object]} obj       [修改的字段对象]
 * @param  {[object]} condition [修改的条件]
 * @param  {[function]} func      [回调函数]
 * @return {[type]}           [description]
 */
fn.updateOneRecord = function(tableName, obj, condition, func) {
	if (!(tableName && obj && condition)) {
		func(stateCode.parMiss());
		return;
	}

	pool.getConnection(function(err, con) {
		if (err) {
			debug(err);
			func(stateCode.notConectDb());
			return;
		}

		var sql="update "+tableName+" set ";
		var value=[];
		for(let i in obj){
			sql+=i+"=?,";
			value.push(obj[i]);
		}

		sql=sql.split().splice(-1,1," ").join();

		if(!until.isEmptyObj(condition)){
			sql+="where";
			for(let i in condition){
				sql+=i+"=? and";
				value.push(condition[i]);
			}
			sql=sql.split().splice(-3,3,"");

		}else{
			sql+=";";
		}
		debug(sql);
		con.query(sql,value,function(err,result){
			if(err){
				debug(err);
				func(stateCode.sqlFail());
			}else{
				func(stateCode.sucess({opRes:result}));
			}
		});
	});
}

module.exports = exports = dbBase;