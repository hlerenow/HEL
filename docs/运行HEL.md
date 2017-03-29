[TOC]

# 运行HEL

##命令(所有的命令都是在项目的根目录下执行)

####直接使用node运行程序(不推荐)

######设置 程序端口 并且运行程序
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

* windows

```
set PORT=80
npm run start
```

* linux

```
 PORT=80 npm run start
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




