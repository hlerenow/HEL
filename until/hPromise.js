var path = require("path"),
	debug = require("debug")("hPromise");
	constVar = require(path.join(constVarPath)),
	stateCode = require(path.join(constVar.configPath, "./stateCode")),
	until = require(path.join(constVar.untilPath, "./until"));

var hPromise = function(options) {
	this.options=options||{
		unsysnc:false
	};

	this.quequ=[];
	this.dataArry=[];
	this.error=undefined;
	this._allDone=function(){};
	this.doneCount=0;
};

var fn = hPromise.prototype;
	fn.add=fn.then=function(func){
		debug("添加函数");

		if(typeof func =='function'){
			this.quequ.push(func);
			return this;
		}else{
			throw new Error("add() arg need a funcion.");
		}
	};

	fn.next=function(data){

		this.dataArry.push(data||{});		

		if(this.options.unsysnc){
			debug("异步执行");
			this.doneCount++;
			this.checkAllDone();
			return ;
		}

		if(this.quequ.length>0){
			var func=this.quequ.shift();
			debug("执行下一个函数");
		
			func.call(this,data);
		}else{
			debug("all things doned !");
			this._allDone();
		}
	}

	fn.start=function(){
		if(this.options.unsysnc){
			this.doAll();
			return ;
		}

		this.next();
	}

	fn.allDone=function(func){
		if(typeof func =="function"){
			this._allDone=func;		
		}else{
			throw new Error("allDone() arg need a funcion.");			
		}

		return this;
	}

	fn.checkAllDone=function(){
		if(this.doneCount==this.quequ.length){
			this._allDone();
		}
	}

	fn.doAll=function(){
		this.quequ.forEach((item)=>{
			debug("异步调用函数");
			item.call(this);
		});
	}

module.exports=exports=hPromise;

