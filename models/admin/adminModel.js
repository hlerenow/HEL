var path = require("path");
var crypto = require("crypto");
var debug = require("debug")("adminModel");
var dbBase=require(path.join(__dirname,"../dbBase"));
var pool = require(path.join(__dirname, "../dbPool"));
var stateCode=require(path.join(__dirname, "../../stateCode"));
var config=require(path.join(__dirname,"../../config"));

var adminModel = function() {};

var fn = adminModel.prototype=dbBase.prototype;

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
					func(stateCode.success({opRes:data[0]}));
				} else {
					func(stateCode.sqlFail());
				}
			} else {
				debug(err)
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

	this.getUser(obj.name, function(data) {
		debug("登录验证");

		let pas=crypto.createHmac("sha256",config.crypto.hash)
									.update(obj.password)
									.digest("hex");
		if (data.opRes.password === pas) {
			func(stateCode.success({opRes:data.opRes}));
		} else {
			func(stateCode.fail());
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
	var self=this;
	let pas=crypto.createHmac("sha256",config.crypto.hash)
									.update(obj.password)
									.digest("hex");
	self.updateOneRecord("users",{
		password:obj.password
	},{
		name:obj.name
	},func);
}

module.exports = exports = adminModel;