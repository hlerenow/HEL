# HEL安装


* 安装nodejs（**>=6.0**，网上有教程）
* 安装mysql(网上有教程)
* git clone https://github.com/hlerenow/HEL.git 或者下载 压缩包解压
* 修改数据库配置信息,在HEL/config/config.json 里面修改
```
{
	"db": {
		"host": "localhost",	//数据库ip
		"dbName": "hel2",		//数据库名
		"user": "root",			//数据库帐号
		"dbPassword": "595806119",	//数据库密码
		"dbPort": "3306"	//数据库端口
	},
	"crypto": {
		"hash": "123456"
	},
	"isInstall": false	//改为false，如果值为true ，系统不会创建mysql表
}
```
> config.json 文件里面不要带有注释，上面只是为了解释说明，保存时应该把注释信息去掉

* 在 HEL/public/下面创建两个文件夹，upload和uploadTemp,如果存在就不用创建
* 在 HEL(项目根目录)目录下运行npm install 


到此程序的安装配置基本完成,程序的运行 请看 下一篇文档 运行 **HEL**

### 常见问题
* 如果出现文件上传失败，或者主题上传失败请检查运行HEL程序的用户是否拥有对程序文件目录的读写权限，这个问题多出现在linux下，ubuntn 使用 sudo node app ，输入密码后运行，即可解决问题