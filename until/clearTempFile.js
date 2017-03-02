var path=require("path");
var fs=require("fs");
var cmd=require("node-cmd");
var os=require("os");

module.exports=exports=function(func){
	var dirPath=path.join(__dirname,"../public/uploadTemp");
	if(os.platform()=="win32"){
		cmd.get("rd /s/q "+dirPath+" & mkdir "+dirPath,func);
	}else{
		cmd.get("rm -rf "+dirPath+" && mkdir "+dirPath,func);
	}
}