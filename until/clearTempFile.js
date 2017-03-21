var	path=require("path"),
	fs=require("fs"),
	cmd=require("node-cmd"),
	os=require("os"),
	constVar = require(path.join(constVarPath));


module.exports=exports=function(func){
	var dirPath=path.join(constVar.publicPath,"/uploadTemp");
	if(os.platform()=="win32"){
		cmd.get("rd /s/q "+dirPath+" & mkdir "+dirPath,func);
	}else{
		cmd.get("rm -rf "+dirPath+" && mkdir "+dirPath,func);
	}
}