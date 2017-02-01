var debug = require("debug")("dbBase");
var path = require("path");
var stateCode = require(path.join(__dirname, "../stateCode"));
var pool = require(path.join(__dirname, "dbPool"));
var until=require(path.join(__dirname,"../until/until"));
var dbBase = function() {
};
var fn = dbBase.prototype;

/**
 * 简化查询的代码,对错误进行了自己的封装
 * @param  {[type]} sql  [sql查询语句(占位符)]
 * @param  {[type]} val  [description]
 * @param  {[type]} func [description]
 * @return {[type]}      [description]
 */
fn.query = function(sql,val, func) {

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

		debug(sql);

		con.query(sql, val,function(err, data,fields) {
			debug("基本查询");
			con.release();
			if (err) {
				debug(err);
				func(stateCode.sqlQueryFail());
			} else {
				let field
				func(stateCode.success({opRes:data}),fields);
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
fn.queryM=function(sql,valArry,func){
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

		con.query(sql,valArry,function(err,result,field){
			con.release();
			func(err,result,field);
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
 * 插入多条记录(同一记录)
 * (暂时没有添加有事务处理,后期将添加回滚程序实现，不依赖数据库)
 * @param  {[type]} tableName [description]
 * @param  {[type]} objArry   [description]
 * @param  {[type]} func      [description]
 * @return {[type]}           [description]
 */
fn.insertMulti=function(tableName,objArry,func){
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

		var sqlQueryLength=objArry.length;
		var sqlInsertState=0;
		var sqlSuccessState=0;			

		for(let i=0;i<sqlQueryLength;i++){

			let {sql,val}=until.getInsertSqlStr(tableName,objArry[i]);
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
				if(sqlInsertState===sqlQueryLength&&sqlSuccessState===sqlQueryLength){
					con.release();
					debug("成功条数%d条",sqlSuccessState);						
					func(stateCode.success({opRes:data,insertId:data.insertId}));
				}else if(sqlInsertState===sqlQueryLength){
					con.release();
					debug("成功条数%d条,未成功%d",sqlSuccessState,sqlInsertState-sqlSuccessState);
					func(stateCode.sqlFail());					
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

		var sql="update "+tableName+" set ";
		var value=[];
		for(let i in obj){
			sql+=i+"=?,";
			value.push(obj[i]);
		}

		sql=until.replaceStrEnd(sql,1," ");

		if(!until.isEmptyObj(condition)){
			sql+="where ";
			for(let i in condition){
				sql+=i+"=? and ";
				value.push(condition[i]);
			}
			sql=until.replaceStrEnd(sql,4," ;");
		}else{
			sql+=";";
		}
		debug(sql);
		con.query(sql,value,function(err,result){
			con.release();
			if(err){
				debug(err);
				func(stateCode.sqlFail());
			}else{
				func(stateCode.success({opRes:result}));
			}
		});
	});
}

/**
 * 用于 替换mysql 自带的功能函数 replace ，
 * 当记录存在时，直接修改记录，而不是删掉然后插入
 * 当记录不存在时，直接插入
 * @param  {[type]} tableName [description]
 * @param  {[type]} obj       [description]
 * @param  {[type]} condition [description]
 * @param  {[type]} func      [description]
 * @return {[type]}           [description]
 * eg:
 * 	condition={
 * 		field:{
 * 			conStr:"",
 * 			val:""
 * 		}
 * 	}
 */

/** 
 * 用于 替换mysql 自带的功能函数 replace ，
 * 当记录存在时，直接修改记录，而不是删掉然后插入
 * 当记录不存在时，直接插入(以后再实现吧)，唉
 * @param  {[type]} tableName   [表名]
 * @param  {[type]} valArry     [需要插入的值数组]
 * @param  {[type]} condition   [条件]
 * @param  {[type]} uniqueFiled [标志记录唯一的字段,必须]
 * @param  {[type]} func        [回调函数]
 * @return {[type]}             [description]
 */
// fn.replaceMulti=function(tableName,valArry,condition,uniqueFiled,func){

// 	if(!(tableName&&obj&&uniqueFiled)){
// 		func(stateCode.parMiss());
// 		return;
// 	}
// 	var fieldArry=[];

// 	for(let i in valArry[0]){
// 		fieldArry.push(i);
// 	}

// 	//拼接查询的sql语句
// 	var {sql,val}=until.getQuerySqlStr(tableName,fieldArry,condition);

// 	var valLen=until.objLength(valArry);

// 	debug(sql,val);

// 	sql+=" limit "+valLen+" ;";
// 	this.query(sql,val,function(result){
// 		if(result.state!=200){
// 			func(stateCode.sqlQueryFail());
// 			return ;
// 		}
// 		let opRes=result.opRes;

// 		//记录每条标记的唯一id
// 		let idArry=[];
// 		for(let i=0;i<opRes.length;i++){
// 			idArry.push(opRes[i][uniqueFiled]);
// 		}

// 		let updateSuccessCount=0;
// 		let updateCount=0;

// 		if(opRes.length<valLen){
// 			let j=0;
// 			for(j=0;j<opRes.length;j++){
// 				self.updateOneRecord(tableName,valArry[j],{uniqueFiled:opRes[j][uniqueFiled]},function(err,result){
// 					updateCount++;
// 					if(err){
// 						debug("replaceMulti",err);
// 					}else{
// 						updateSuccessCount++;			
// 					}
// 				});						
// 			}

// 			for(;j<valArry.length;j++){
// 				self.insert(tableName,valArry[j],{uniqueFiled:opRes[j][uniqueFiled]},function(err,result){
// 					updateCount++;
// 					if(err){
// 						debug("replaceMulti",err);
// 					}else{
// 						updateSuccessCount++;			
// 					}
// 				});					
// 			}



// 		}else{

// 		}
// 	});

// }



module.exports = exports = dbBase;