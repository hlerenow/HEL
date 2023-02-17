# HEL单用户博客系统介绍

HEL是一个轻量级的、可定制的单用户blog系统。

### 支持的功能：

1. 文章的发布、修改、删除
2. 目录的创建、修改、删除
3. 支持给文章添加标签
4. 可以给不同的目录绑定不同的模版
5. 媒体库
6. 支持主题
7. 支持一级菜单的自定义
8. markdow编辑器
9. 前后端分离,使用者可以自己定制开发后台管理界面(后台API接口文档后续会编写)

### 计划开发的功能（未实现...）

1. 标签管理
2. 页面的创建，修改，删除(和wordpress的页面类似)
3. 给模版注入一些固定的数据
4. 媒体专辑功能
5. 前端作品库(上传前端作品zip压缩包，压缩包的内容按照一定的格式压缩，后台自动解压生成作品连接，并且可以在模版的制作中使用)
6. 媒体专辑功能
7. 备份功能
8. 数据库修复功能（因为使用myisam引擎难免会出现数据库碎片）
9. 站点转移功能（将媒体的url地址的域替换为新的域名）


HEL目前只拥有一些基本的blog功能。

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

* 在 HEL/public/下面创建两个文件夹，upload和uploadTemp,如果存在就不用创建

* 在 HEL下面创建log文件夹，如果存在就不用创建

* 在 HEL(项目根目录)目录下运行npm install 


到此程序的安装配置基本完成,程序的运行 请看 下一篇文档 运行 **HEL**

### 常见问题
* 如果出现文件上传失败，或者主题上传失败请检查运行HEL程序的用户是否拥有对程序文件目录的读写权限，这个问题多出现在linux下，ubuntn 使用 sudo node app ，输入密码后运行，即可解决问题

# 运行HEL

## 命令(所有的命令都是在项目的根目录下执行)

#### 安装程序所需依赖包

```
npm install
```

#### 直接使用node运行程序(不推荐)

###### 设置 程序端口 并且运行程序
---
* windows 下
```
set PORT=80

node app
```

* linux
```
 PORT=80 node app
```

*关闭程序 

	Ctrl+c


#### 使用forever 守护程序(推荐)
---
因为nodejs单线程的特性，一旦出错就会导致整个程序奔溃（即使我们对错误做了很多的防范措施）,所以我们需要一个程序来守护我们的程序，当他崩溃时能让，程序快速的重启，这个我们选用的是forever（如果你喜欢pm2，也可自行配置,主要就是修改名package.json 的script值,以及包的安装）

安装全局 forever

```
npm install forever -g

```

* windows

```
npm run start
```

* linux

```
npm run start
```

* 关闭程序

```
npm run stop
```

### 帐号

>初始账号 admin  密码 123456


* 程序运行成功后
	打开浏览器 http://localhost 即可查看效果，
	后台管理地址http://localhost/admin
	(默认端口为80,如果你设置了端口为其他端口 port,则打开 http://localhost:port 即可)

### 注意
程序运行成功后第一件事是登录后台，选择设置，修改 站点地址,也就是你的网站域名，因为媒体库的上传依赖于这个值
但是不要轻易修改这个值，因为媒体的上传会将媒体的绝对url地址写入数据库，修改后会导致媒体文件找不到的错误


#HEL主题

HEL也支持和wordpress类似的模版功能，但是又和有wordpress又不一的地方，众所周知，nodejs是异步的无阻塞的，所以这就注定了不能在模版里去像wordpress一样去操作数据库，获取数据。目前采取的方案是提前把数据查到后，注入到模版里面，这样在模版里面就只用操作数据就行了（虽然这样做可以实现数据的获取，但是会导致一个问题，但是有解决方案，只不过还没代码实现）

### 主题目录结构
```

│  archive.html //归档页模版
│  catalog.html //默认目录模版
│  catalog1.html
│  config.json //主题配置文件
│  footer.html
│  header.html
│  helper.js    //主题的一些辅助函数
│  index.html //默认主页模版
│  nav.html
│  post.html
│  
└─public   //静态资源文件 ，静态资源文件只能在放在 **public** 下面
    │  favicon.ico
    │  
    ├─css
    │      index.css
    │      
    ├─img
    │      head_img.jpeg
    │      
    └─js
```

主题的目录结构大致如上

### 模版引擎

HEL主题模版使用的是ejs 模版引擎渲染，ejs的使用简单，学习基本无成本

模版语法参考地址 [EJS](https://github.com/mde/ejs)

### 模版的上传
	将上述文件打包压缩为zip格式的压缩包，就可以在后台管理界面的主题出上传（旧的主题不会被删除，同名的主题会被覆盖）

### 每个模版的公共变量

1. Helper
	一个对象，下面有一些内置的函数，用来格式化数据（具体的函数功能可以查看serveice/templateFunction.js）
2. helper
	主题目录下helper.js 里的用户自己编写的方法
3. menue
	用户自定义的菜单值，一个对象
4. baseInfo
	后台设置里面设置的值
5. recentPosts
	最新的10篇文章

完整的数据结构可以在 使用默认模版  的情况下 ，打开浏览器调试 ，选择console，查看，


