# HEL
hel 是一款基于nodejs构建的轻量级单用户blog系统，它体积小，界面精简，拒绝臃肿，让使用者感受最原始的写作体验。

#### 功能特点
* 前后端分离，hel的后台管理页面和后台的接口是解耦的，所以你完全可以自己定制后台管理界面，甚至是重写。
* 支持自定义主题模版
* 支持菜单自定义
* 支持给目录选择模版
* 文章的内容和媒体内容自动分离存储，方便主题模版的制作
* 支持媒体库
* 支持主题
* 支持markdown语法

测试帐号:admin
密码:123456(兄弟们，不要改密码啊)
演示地址 [GO](http://115.159.197.251:3000/admin/)

# 安装
* 安装nodejs（>6.0，网上有教程）
* 安装mysql(网上有教程)
* git clone https://github.com/hlerenow/HEL.git 或者下载 压缩包解压
4. 修改数据库配置型信息,在HEL/config/config.json 里面修改
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
	"isInstall": false	//改为false，
}
```
> config.json 文件里面不要带有注释，上面只是为了解释说明，保存时应该把注释信息去掉
* 在 HEL/public/下面创建两个文件夹，upload和uploadTemp,如果存在就不用创建
* 在 HEL(项目根目录)目录下运行npm install 
* 依赖包安装完成后，启动程序,在 HEL(项目根目录)目录下运行 node app ,打开浏览器 http://localhost:3000即可查看效果，后台管理地址http://localhost:3000/admin

* 初始化帐号admin,密码：123456

功能还在开发中，这只是测试版~~~,模版制作文档后续会编写

### 常见问题
* 如果出现文件上传失败，或者主题上传失败请检查当前用户是否拥有对目录文件夹是否有读写权限，这个问题多出现在linux下，ubuntn 使用 sudo node app ，输入密码后运行，即可解决问题