<template>
    <el-menu theme="dark" default-active="2" class="el-menu-vertical" @select="handleSelect" :router="true">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-edit"></i>文章</template>
        <el-menu-item index="/main/eassyList">所有文章</el-menu-item>
        <el-menu-item index="/main/editorEassy">写文章</el-menu-item>
        <!-- <el-menu-item index="/main/modifyEassy">修改文章</el-menu-item> -->
        <el-menu-item index="/main/catalog/create">分类目录</el-menu-item>
        <!-- <el-menu-item index="1-4">标签</el-menu-item> -->
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-picture"></i>媒体</template>
        <el-menu-item index="/main/media">媒体库</el-menu-item>
        <el-menu-item index="/main/mediaAdd">添加</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-menu"></i>设置</template>
        <el-menu-item index="31">常规</el-menu-item>
        <el-menu-item index="32">邮件代理</el-menu-item>
      </el-submenu>
    </el-menu>
</template>

<script>
  export default {
    methods: {
      handleSelect(key, keyPath) {
        // console.log(key, keyPath);
      }
    }
  }
</script>
<style type="text/css">
  .el-menu-vertical{
    border-top-left-radius:0 !important;
    border-top-right-radius:0 !important;
  }
  .el-menu--horizontal{
    border-radius: 0;
  }
  .el-submenu__title{
    padding: 0 10px !important;
  }

  .el-menu-item{
    padding:0 20px !important;
  }
  
</style>