/*
Navicat MySQL Data Transfer

Source Server         : 阿萨德
Source Server Version : 50716
Source Host           : 127.0.0.1:3306
Source Database       : hel2

Target Server Type    : MYSQL
Target Server Version : 50716
File Encoding         : 65001

Date: 2017-03-20 17:11:46
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `cid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `eid` int(10) unsigned NOT NULL,
  `created` int(10) DEFAULT NULL,
  `authorNickName` varchar(100) DEFAULT NULL,
  `mail` varchar(255) DEFAULT NULL,
  `siteUrl` varchar(255) DEFAULT NULL,
  `content` text,
  `ip` varchar(255) DEFAULT NULL,
  `status` varchar(16) DEFAULT NULL,
  `agent` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comments
-- ----------------------------

-- ----------------------------
-- Table structure for eassy
-- ----------------------------
DROP TABLE IF EXISTS `eassy`;
CREATE TABLE `eassy` (
  `eid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(200) DEFAULT NULL,
  `content` text,
  `created` int(10) DEFAULT NULL,
  `modified` int(10) DEFAULT NULL,
  `authorId` int(10) DEFAULT NULL,
  `status` enum('publish','draft','private') DEFAULT 'draft',
  `thumbnail` varchar(255) DEFAULT NULL,
  `excerpt` varchar(255) DEFAULT NULL,
  `type` enum('page','post') DEFAULT NULL,
  `template` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `attachment` text,
  `commentsNum` int(10) unsigned DEFAULT '0',
  `templateContent` text,
  `tags` varchar(255) DEFAULT NULL,
  `catalogs` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`eid`)
) ENGINE=MyISAM AUTO_INCREMENT=149 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of eassy
-- ----------------------------

-- ----------------------------
-- Table structure for files
-- ----------------------------
DROP TABLE IF EXISTS `files`;
CREATE TABLE `files` (
  `fid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `width` int(10) unsigned DEFAULT NULL,
  `height` int(10) unsigned DEFAULT NULL,
  `size` int(10) DEFAULT NULL,
  `created` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`fid`)
) ENGINE=MyISAM AUTO_INCREMENT=81 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of files
-- ----------------------------

-- ----------------------------
-- Table structure for links
-- ----------------------------
DROP TABLE IF EXISTS `links`;
CREATE TABLE `links` (
  `lid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`lid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of links
-- ----------------------------

-- ----------------------------
-- Table structure for meta
-- ----------------------------
DROP TABLE IF EXISTS `meta`;
CREATE TABLE `meta` (
  `mid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `type` enum('link','tag','catalog') DEFAULT NULL,
  `parent` int(10) unsigned DEFAULT NULL,
  `value` text,
  `count` int(11) unsigned DEFAULT '0',
  PRIMARY KEY (`mid`),
  UNIQUE KEY `name_type` (`name`,`type`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=123 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of meta
-- ----------------------------
INSERT INTO `meta` VALUES ('1', '默认', 'default', 'catalog', null, '{}', '0');

-- ----------------------------
-- Table structure for options
-- ----------------------------
DROP TABLE IF EXISTS `options`;
CREATE TABLE `options` (
  `oid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `value` text,
  `user` int(10) unsigned DEFAULT '0',
  `type` varchar(20) NOT NULL,
  `description` varchar(255) DEFAULT '',
  `label` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`oid`),
  UNIQUE KEY `name_unique` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=82 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of options
-- ----------------------------
INSERT INTO `options` VALUES ('1', 'postPerPage', '10', '0', 'static', null, '每页文章显示数');
INSERT INTO `options` VALUES ('2', 'siteUrl', 'http://localhost:3000', '0', 'static', '您的blog站点地址，如：\"http://www.h-five.com \" ，注意站点地址最后不要跟“/\"，只写域名，不然生成文章连接可能会出错', '站点地址');
INSERT INTO `options` VALUES ('3', 'blogname', 'HEL', '0', 'static', null, '博客名称');
INSERT INTO `options` VALUES ('4', 'adminEmail', '595806119@qq.com', '0', 'static', '用于接收用户注册等信息', '电子邮箱');
INSERT INTO `options` VALUES ('5', 'dateFormat', 'Y年n月j日', '0', 'static', null, '时间格式');
INSERT INTO `options` VALUES ('6', 'blogCharset', 'UTF-8', '0', 'system', null, '');
INSERT INTO `options` VALUES ('7', 'nowTheme', 'default', '0', 'system', '当前使用的主题名', '');
INSERT INTO `options` VALUES ('8', 'menue', '[]', '0', 'system', 'blog菜单', '');

-- ----------------------------
-- Table structure for projects
-- ----------------------------
DROP TABLE IF EXISTS `projects`;
CREATE TABLE `projects` (
  `pid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `uid` int(10) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `created` int(10) unsigned DEFAULT NULL,
  `modified` int(10) DEFAULT NULL,
  PRIMARY KEY (`pid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of projects
-- ----------------------------

-- ----------------------------
-- Table structure for relationships
-- ----------------------------
DROP TABLE IF EXISTS `relationships`;
CREATE TABLE `relationships` (
  `mid` int(10) unsigned NOT NULL,
  `nid` int(10) unsigned NOT NULL,
  `type` enum('postTag','postCatalog') DEFAULT NULL,
  `rid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`rid`),
  UNIQUE KEY `metaUnique` (`mid`,`nid`,`type`)
) ENGINE=InnoDB AUTO_INCREMENT=357 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of relationships
-- ----------------------------

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `uid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `password` varchar(64) NOT NULL,
  `mail` varchar(200) DEFAULT '',
  `siteUrl` varchar(200) DEFAULT '',
  `nickName` varchar(32) DEFAULT '',
  `created` int(10) unsigned DEFAULT NULL,
  `activated` int(10) unsigned DEFAULT NULL,
  `role` varchar(50) DEFAULT '',
  PRIMARY KEY (`uid`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'admin', 'b8ad08a3a547e35829b821b75370301dd8c4b06bdd7771f9b541a75914068718', '595806119@qq.com', null, 'admin', null, null, 'admin');
