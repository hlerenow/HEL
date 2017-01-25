var debug=require("debug")("until");
const until={
	//判断对象是否为空
	isEmptyObj:function(obj){
		for(let i in obj){
			return false;
		}
		return true;
	},
	//返回对象的属性个数(深度1)
	objLength:function(obj){
		let count=0;
		for(let i in obj){
			count++;
		}
		debug(count);
		return count;
	},
	//合并obj个对象到extObj上(深度1),返回extObj
	mergeObj:function(obj,extObj){
		for(let i in obj){
			extObj[i]=obj[i];
		}
		return extObj;
	},
	getNowTimeSecondInt:function(){
		return parseInt(Date.now()/1000);
	},
	parseTmieSecondInt:function(str){
		return "";
	},
	//获取str里面的图片,音乐视频，文件等url
	getMediaUrl:function(str){
		return "";
	},
	getCharsByNumber:function(str,num){
		if(!str){
			return "";
		}
		
		if(str.length<=num){
			return str;
		}else{
			return str.split("").slice(0,num).join("");
		}
	}
};

module.exports=exports=until;