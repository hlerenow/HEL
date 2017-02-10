<template>
<el-menu  theme="dark" default-active="1" class="el-menu-top" mode="horizontal" @select="handleSelect">
  <el-menu-item index="icon-hel">HEL</el-menu-item>
  <el-menu-item index="1"><i class="el-icon-message"></i>0</el-menu-item>
  <el-submenu class="addPlus" index="newAdd">
    <template slot="title"><i class="el-icon-plus"></i>新建</template>
    <el-menu-item index="newAdd-1">文章</el-menu-item>
    <el-menu-item index="newAdd-2">文件</el-menu-item>
    <el-menu-item index="newAdd-3">页面</el-menu-item>
    <el-menu-item index="newAdd-4">链接</el-menu-item>
  </el-submenu>  
  <el-submenu index="4" id="user--info">
    <template slot="title">你好，{{nickname}}</template>
    <el-menu-item index="4-1">修改个人资料</el-menu-item>
    <el-menu-item index="4-2">退出</el-menu-item>
  </el-submenu>

</el-menu>
</template>

<script>
  export default {
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    props:['username','mail','nickname']
  }
</script>

<style type="text/css">

  .el-menu-top .addPlus{
    padding: 0;
  }
  .el-menu-top .el-icon-plus{
    margin: 0 5px;
  }

  .el-menu-top .el-submenu__title{
    padding: 0;
  }
  .el-menu-top > li{
    padding: 0;
    margin: 0 10px;
  }
  #user--info{
    position: absolute;
    right: 0;
    top: 0;
  }

  .el-menu-top{
    display: block;
    width: 100%;
  }

  .el-menu-item, 
  .el-submenu__title {
    font-size: 12px;

  }




</style>