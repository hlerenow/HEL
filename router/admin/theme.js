//路由公用
var	express=require("express"),
	fs=require("fs"),
	path=require("path"),
	debug=require("debug")("themeRouter"),
	themeRouter=express.Router(),
	constVar = require(path.join(constVarPath)),
	stateCode = require(path.join(constVar.configPath, "stateCode")),
	until=require(path.join(constVar.untilPath, "/until")),
	fileUpload=require(path.join(constVar.untilPath,'fileUpload')),
	hPromise=require(path.join(constVar.untilPath, "/hPromise.js")),
	aic=require(path.join(constVar.untilPath,"appInitConfig.js")),
	unzip=require("unzip"),
	themeModel=require(path.join(constVar.modelPath,"admin/themeModel"));	

themeRouter.post("/add",function(req,res,next){

	var hp=new hPromise;

	hp.add(function() {
		debug("主题上传");
		if (req.session.role !== 'admin') {
			res.json(stateCode.notAuthority());
			return;
		};

		//保存图片到本地磁盘缓存
		var fileOptions = {
			uploadDir: path.join(constVar.publicPath, "./uploadTemp"),
			maxFilesSize: 1024 * 1024 * 12,
		};

		fileUpload(req, "file", fileOptions, (fileResult) => {

			if (fileResult.state !== 200) {
				res.json(fileResult);
				return;
			}

			let {
				files,
				fields
			} = fileResult;
			let fileArry = [];

			Object.keys(files).forEach(function(key) {
				let nowFile = files[key];
				let urlIndex = nowFile.path.indexOf("public") + 6;

				let tempFile = {
					name: nowFile.originalFilename,
					type: nowFile.type,
					width: nowFile.width,
					height: nowFile.height,
					//格式化url，变为相对url
					url: nowFile.path.split("").slice(urlIndex).join("").replace("Temp", ""),
					size: nowFile.size,
					created: until.getNowTimeSecondInt()
				};
				fileArry.push(tempFile);
			});

			if (fileArry.length === 0) {
				res.json(stateCode.fileUploadFail({
					more: '没有主题上传'
				}));
				return;
			}

			this.next(files);

		});

	}).then(function(files) {
		debug("解压文件", files);
			try{
				fs.createReadStream(files.file.path).pipe(unzip.Extract({
					path: path.join(constVar.themePath, files.file.originalFilename.replace(".zip",""))
				}).on("close",()=>{
					debug("解压完成");
					this.next(files);					
				}));
				
			}catch(e){
				debug(e,"主题解压失败");
				res.json(stateCode.themeUploadFail());
				return ;
			}
		
		
	}).then(function(files) {
		debug("主题写入数据库", files);
		let tm=new themeModel;

		tm.updateNowTheme(files.file.originalFilename.replace(".zip",""),(result)=>{
			//删除zip文件
			fs.unlinkSync(files.file.path);

			if(result.state==200){
				//更新全局配置
				aic(req.app,function(flage){
					if(flage){
						debug("系统设置更新成功");
					}else{
						debug("系统设置更新失败");								
					}
				});				

				//映射主题静态资源
				until.updateStaticRouter(req,"");

				res.json(stateCode.success({"moreInf":"主题安装成功"}));
			}else{
				//删除解压后的文件夹
				res.json(stateCode.themeUploadFail());
			}
		});
	});

	hp.start();

});
themeRouter.post("/update",function(req,res,next){
	aic(req.app,function(flage){
		if(flage){
			debug("系统设置更新成功");
			res.json(stateCode.success());
		}else{
			debug("系统设置更新失败");
			res.json(stateCode.fail());
		}
	});			
})

module.exports=exports=themeRouter;