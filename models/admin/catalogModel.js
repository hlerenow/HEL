var path = require("path");
var debug = require("debug")("adminModel");
var dbBase=require(path.join(__dirname,"../dbBase"));
var pool = require(path.join(__dirname, "../dbPool"));
var stateCode=require(path.join(__dirname, "../../stateCode"));
var config=require(path.join(__dirname,"../../config"));

var catalogModel=function(){};

var fn = catalogModel.prototype=dbBase.prototype;

	fn.createCatalog=function(obj,func){
		let sql="insert into meta (name,type,parent,slug) values(?,'catalog',?,?);";

		if(!(obj.name&&obj.slug)){
			func(stateCode.parMiss());
			return;
		}

		let val={
			name:obj.name,
			parent:obj.parent||"",
			slug:obj.slug,
			type:"catalog"
		}

		this.insert(sql,val,function(result){
			if(result.state===200){
				func(result);
			}else{
				func(stateCode.sqlInsertFail());
			}
		})
	}

	fn.modifyCatalog=function(obj,func){
		if(!obj.mid){
			func(stateCode.parMiss());
			return;
		}
		
	}

	fn.deleteCotalog=function(obj,func){

	}