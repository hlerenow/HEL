var path = require("path"),
	crypto = require("crypto"),
	debug = require("debug")("adminModel"),
	constVar = require(path.join(constVarPath)),
	pool=require(path.join(constVar.modelPath, "dbPool")),
	config = require(path.join(constVar.configPath, "config")),
	dbBase = require(path.join(constVar.modelPath, "dbBase")),
	stateCode = require(path.join(constVar.configPath, "stateCode"));

var adminModel = function() {};

var fn = adminModel.prototype = new dbBase;

/**
 * [获取用户基本信息]
 * @param  {str} userName [用户账号]
 * @param  {[function]} func     [回调函数,用户信息会传给这个函数的第一个参数]
 * @return {[type]}          [description]
 */
fn.getUser = function(userName, func) {

	pool.getConnection(function(err, con) {
		if (err) {
			debug(err);
			func(stateCode.notConectDb());
			return;
		}

		con.query("select * from users where name=?;", [userName], function(err, data) {
			debug("获取用户信息");
			con.release();
			if (!err) {
				if (data && data.length > 0) {
					func(stateCode.success({
						opRes: data[0]
					}));
				} else {
					func(stateCode.sqlNotFound());
				}
			} else {
				debug(err);
				func(stateCode.sqlFail());
			}
		});
	}, func);
};

/**
 * 用户登录验证
 * @param  {[type]} obj  [description]
 * @param  {[type]} func [description]
 * @return {[type]}      [description]
 */
fn.login = function(obj, func) {
	var self = this;

	this.getUser(obj.name, function(result) {
		debug("登录验证");
		console.log(result);
		if (result.state == 200) {

			let pas = crypto.createHmac("sha256", config.crypto.hash)
				.update(obj.password)
				.digest("hex");
			if (result.opRes.password === pas) {
				func(stateCode.success({
					opRes: result.opRes
				}));
			} else {
				func(stateCode.loginFail());
			}
		} else if (result.state === 107) {
			func(stateCode.loginFailUserNotExit());
		} else {
			func(state.sysError());
		}

	});
}

/**
 * 用户密码修改
 * @param  {[object]} obj  [用户帐号密码]
 * @param  {[type]} func [description]
 * @return {[type]}      [description]
 */
fn.modifyPassword = function(obj, func) {
	var self = this;
	let pas = crypto.createHmac("sha256", config.crypto.hash)
		.update(obj.password)
		.digest("hex");
	self.updateOneRecord("users", {
		password: obj.password
	}, {
		name: obj.name
	}, func);
}

module.exports = exports = adminModel;