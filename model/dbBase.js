var path = require("path"),
	debug = require("debug")("dbBase"),
	constVar = require(path.join(constVarPath)),
	stateCode = require(path.join(constVar.configPath, "stateCode")),
	until = require(path.join(path.join(constVar.untilPath, "until.js"))),
	pool = require(path.join(__dirname, "dbPool"));

var dbBase = function() {};
var fn = dbBase.prototype;

fn.pool = pool;
/**
 * 简化查询的代码,对错误进行了自己的封装
 * @param  {[type]} sql  [sql查询语句(占位符)]
 * @param  {[type]} val  [description]
 * @param  {[type]} func [description]
 * @return {[type]}      [description]
 */
fn.query = function(sql, val, func) {

	if (!sql) {
		func(stateCode.parMiss());
		return;
	}
	pool.getConnection(function(err, con) {
		if (err) {
			debug(err);
			console.error("\n数据库连接失败,请检查数据库配置,请按 Ctrl + C 退出");
			// func(stateCode.notConectDb());
			return;
		}

		debug(sql);

		con.query(sql, val, function(err, data, fields) {
			debug("基本查询");
			debug(data);
			con.release();
			if (err) {
				debug(err);
				func(stateCode.sqlQueryFail());
			} else {
				func(stateCode.success({
					opRes: data
				}), fields);
			}
		});
	})
};

/**
 * 封装基本query,简化connection获取以及错误捕捉
 * @param  {[type]} sql     [description]
 * @param  {[type]} valArry [description]
 * @param  {[type]} func    [description]
 * @return {[type]}         [description]
 */
fn.queryM = function(sql, valArry, func) {
	if (!sql) {
		func(stateCode.parMiss());
		return;
	}

	pool.getConnection(function(err, con) {
		if (err) {
			debug(err);
			func(stateCode.notConectDb());
			return;
		}

		con.query(sql, valArry, function(err, result, field) {
			con.release();
			func(err, result, field);
		});
	});

}



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
		var {
			sql,
			val
		} = until.getInsertSqlStr(tableName, obj);

		debug(sql);

		con.query(sql, val, function(err, data) {
			debug("基本插入");
			con.release();
			if (err) {
				debug(err);
				func(stateCode.sqlFail());
			} else {
				func(stateCode.success({
					opRes: data,
					insertId: data.insertId
				}));
			}
		});
	})
};

/**
 * 插入多条记录(同一表)
 * (暂时没有添加有事务处理,后期将添加回滚程序实现，不依赖数据库)
 * @param  {[type]} tableName [description]
 * @param  {[type]} objArry   [description]
 * @param  {[type]} func      [description]
 * @return {[type]}           [description]
 */
fn.insertMulti = function(tableName, objArry, func) {
	if (!(objArry && tableName)) {
		func(stateCode.parMiss());
		return;
	}

	debug(objArry);
	pool.getConnection(function(err, con) {
		if (err) {
			debug(err);
			func(stateCode.notConectDb());
			return;
		}

		var sqlQueryLength = objArry.length;
		var sqlInsertState = 0;
		var sqlSuccessState = 0;
		var insertId=[];

		for (let i = 0; i < sqlQueryLength; i++) {

			let {
				sql,
				val
			} = until.getInsertSqlStr(tableName, objArry[i]);
			debug(sql);

			con.query(sql, val, function(err, data) {

				sqlInsertState++;
				debug("多记录基本插入");

				if (err) {
					debug(err);
				} else {
					sqlSuccessState++;
				}

				//说明全部插入完毕了并且都成功
				if (sqlInsertState === sqlQueryLength && sqlSuccessState === sqlQueryLength) {
					con.release();
					debug("成功条数%d条", sqlSuccessState);
					func(stateCode.success({
						opRes: data,
						insertId: data.insertId
					}));
				} else if (sqlInsertState === sqlQueryLength) {
					con.release();
					debug("成功条数%d条,未成功%d", sqlSuccessState, sqlInsertState - sqlSuccessState);
					func(stateCode.sqlFail({
						successCount: sqlSuccessState,
						failCount: sqlInsertState - sqlSuccessState
					}));
				}

			});
		}

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

		var sql = "update " + tableName + " set ";
		var value = [];
		for (let i in obj) {
			sql += i + "=?,";
			value.push(obj[i]);
		}

		sql = until.replaceStrEnd(sql, 1, " ");

		if (!until.isEmptyObj(condition)) {
			sql += "where ";
			for (let i in condition) {
				sql += i + "=? and ";
				value.push(condition[i]);
			}
			sql = until.replaceStrEnd(sql, 4, " ;");
		} else {
			sql += ";";
		}
		debug(sql);
		con.query(sql, value, function(err, result) {
			con.release();
			if (err) {
				debug(err);
				func(stateCode.sqlFail());
			} else {
				func(stateCode.success({
					opRes: result
				}));
			}
		});
	});
}

/**
 * 删除同一表多条记录，通过主键选择(估计没啥用)
 * @param  {[string]} tableName     [description]
 * @param  {[string]} id            [description]
 * @param  {[array]} conditionArry [description]
 * @param  {[callback]} func          [description]
 * @return {[type]}               [description]
 */
fn.deleteMultiById = function(tableName, id, conditionArry, func) {
	let sucessState = 0;
	let totalState = 0;
	let self = this;

	pool.getConnection(function(err, con) {
		if (err) {
			debug(err);
			func(stateCode.notConectDb());
			return;
		}

		Object.keys(conditionArry).forEach(function(key) {
			let sqlTemp = "delete from " + tableName + " where " + id + "  in ? ;";
			con.query(sqlTemp, [conditionArry[key]], function(err, result) {
				totalState++;
				if (err) {
					debug(err);
				} else {
					sucessState++;
				}

				//说明全部插入完毕了并且都成功
				if (sucessState === totalState && sucessState === conditionArry.length) {
					con.release();
					debug("成功条数%d条", sucessState);
					func(stateCode.success());
				} else if (totalState === conditionArry.length) {
					con.release();
					debug("成功条数%d条,未成功%d", sucessState, totalState - sucessState);
					func(stateCode.sqlFail({
						successCount: sucessState,
						failCount: totalState - sucessState
					}));
				}

			});
		});
	});
};
module.exports = exports = dbBase;