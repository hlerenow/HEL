[TOC]

# HEL单用户博客系统介绍

HEL是一个轻量级的、单用户的blog系统，它没有wordpress那么强大的功能，它只想做一个单纯的为写blog而生的工具，正因为如此，它是轻量级的，没有wordpress那么的臃肿，它的后台的所有操作都是基于ajax的，所以在体验上会比wordpress好很多(厌倦了wordpress后台的反应速度)。HEL参照了许多wordpress 的特性，比如菜单，主题，媒体库等等，但是又在这些基础上做了精简，以及添加一些自己的东西，比如可以给不同的目录绑定不同模版。

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

9. 站点转移功能（只要就是将媒体的url地址的域替换为行的域名）


HEL目前只有一些基本的blog功能，不过这才是刚刚开始。。。