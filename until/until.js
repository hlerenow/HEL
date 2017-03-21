var debug = require("debug")("until"),
	fs=require("fs");
const until = {
	//判断对象是否为空,空 返 true
	isEmptyObj: function(obj) {
		for (let i in obj) {
			return false;
		}
		return true;
	},
	//返回对象的属性个数(深度1)
	objLength: function(obj) {
		let count = 0;
		for (let i in obj) {
			count++;
		}
		debug(count);
		return count;
	},
	//合并obj个对象到extObj上(深度1),返回extObj
	mergeObj: function(obj, extObj) {
		for (let i in obj) {
			// if(obj[i]!=""){
			debug(i);
			extObj[i] = obj[i];
			// }
		}
		debug(extObj);
		return extObj;
	},
	getNowTimeSecondInt: function() {
		return parseInt(Date.now() / 1000);
	},
	parseTmieSecondInt: function(str) {
		return "";
	},
	//获取str里面的图片,音乐视频，文件等url
	getMediaUrlInHTML: function(str) {

		var result = [];
		var temp = {};
		//先匹配图片音乐视频

		var rex = /<(audio|img|video)[^(>)]*src=("|')([^("|')]+)("|')/ig;

		temp = rex.exec(str);

		while (temp) {
			let alt = temp[0].match(/alt=("|')([^("|')])+("|')/);
			alt = alt ? alt[1] : "";

			let mObj = {
				type: temp[1],
				url: temp[3],
				alt: alt
			};

			result.push(mObj);

			temp = rex.exec(str);
		};

		//匹配文章中的其他附件 链接也会匹配出来

		// rex=/<a[^(>)]*href=("|')([^("|')]+\.([^("|')]+))("|')[^(>|<)]*>([^(>|<)]+)</ig;
		// temp=rex.exec(str);

		// while(temp){
		// 	let mObj={
		// 		type:temp[3],
		// 		url:temp[2],
		// 		alt:temp[5]
		// 	};

		// 	result.push(mObj);

		// 	temp=rex.exec(str);
		// };

		return result;
	},
	getCharsByNumber: function(str, num) {
		if (!str) {
			return "";
		}

		if (str.length <= num) {
			return str;
		} else {
			return str.split("").slice(0, num).join("");
		}
	},
	getInsertSqlStr: function(tableName, obj) {

		var sql = "insert into " + tableName + " (";
		var val = "values(";
		var relVal = [];

		for (let i in obj) {
			sql += i + ",";
			val += "?,";
			relVal.push(obj[i]);
		}

		sql = sql.split("");
		sql.splice(-1, 1, ") ");
		sql = sql.join("");

		val = val.split("");
		val.splice(-1, 1, ") ;");
		val = val.join("");

		sql += val;

		return {
			sql: sql,
			val: relVal
		};
	},
	getQuerySqlStr: function(tableName, fieldArry, condition) {
		var sql = "select ??  from ?? ";
		var val = [tableName];
		val = val.concat(fieldArry);
		if (!until.isEmptyObj(condition)) {
			sql += "where ";
			for (let i in condition) {
				if (!condition[i].conStr) {
					condition[i].conStr = "";
				}
				sql += condition[i].conStr + " " + i + "=? ";
				val.push(condition[i].val);
			}

		}

		return {
			sql: sql,
			val: val
		};
	},
	//将字符串str从尾部开始count个字符串替换为newStr
	replaceStrEnd: function(str, count, newStr) {
		str = str.split("");
		newStr = newStr || "";
		str.splice(-count, count, newStr);
		return str.join("");
	},
	//过滤obj对象的属性，返回一个只包含fieldArry字段属性的对象
	filterObjFields: function(fieldArry, obj) {
		let resObj = {};
		for (let i = 0; i < fieldArry.length; i++) {
			// if(obj[fieldArry[i]]){
			resObj[fieldArry[i]] = obj[fieldArry[i]];
			// }
		}

		return resObj;
	},
	jsonParse: function(jsonStr) {
		let res;
		debug(jsonStr);
		try {
			res = JSON.parse(jsonStr);
		} catch (e) {
			debug(e);
			res = undefined;
		}
		debug(res);
		return res;
	},
	/**
	 * 格式化日期
	 * @param  {int} intTime  一个日期的秒数
	 * @param  {string} format   
	 *         					YYYY:表示一个4位数年份，如：2017
	 *         					YY:表示一个2位数年份 ,如 17
	 *         					MM:表示月份，如 5，(如果showZero=true 则为 05）
	 *         					mm:表示分钟数,同上
	 *         					ss:表示秒数,同上
	 * @param  {boolean} showZero 位数不够时，是否补零 0	
	 * @return {string}          格式化好的时间字符串
	 */
	dateFormatBySecond: function(intTime, format,showZero) {
		var str=format;
		var data = new Date(parseInt(intTime)*1000),
			Y4 = data.getFullYear(),
			Y2 = data.getFullYear().toString().slice(2, 4),
			MM = data.getMonth() + 1,
			DD = data.getDate(),
			hh = data.getHours();
			mm = data.getMinutes();
			ss = data.getSeconds();

		function addZeorn(dd) {
			dd = parseInt(dd);
			if (dd < 10) {
				dd = "0" + dd;
			}
			return dd;
		}

		if(showZero){
			MM = addZeorn(MM);
			DD = addZeorn(DD);

			hh = addZeorn(hh);
			mm = addZeorn(mm);

			ss = addZeorn(ss);			
		}

		str = str.replace("YYYY", Y4);
		str = str.replace("YY", Y2);
		str = str.replace("MM", MM);
		str = str.replace("DD", DD);

		str = str.replace("hh", hh);
		str = str.replace("mm", mm);
		str = str.replace("ss", ss);		

		return str;
	},
	getCatalogTemplate:function(dirPath,catalogStr){

		var files=fs.readdirSync(dirPath);
		var res=[];
		for(var i=0;i<files.length;i++){
			if(files[i].indexOf(catalogStr)>=0){
				res.push(files[i]);
			}
		}

		return res;
	},
	getExitsPath:function(pathArry){
		for(var i=0;i<pathArry.length;i++){
			var item=pathArry[i];
			if(fs.existsSync(item)){
				return item;
				break;
			}		
		}
	}

};

module.exports = exports = until;