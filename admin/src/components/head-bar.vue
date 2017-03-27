<template>
  <el-menu  theme="dark" default-active="1" class="el-menu-top" mode="horizontal">
    <el-menu-item class="logoItem" index="icon-hel">
      <a href="https://github.com/hlerenow/HEL" target="_blank">
        <!-- <img id="hel_log" src="img/HEL.png" alt="">    -->   
        HEL
      </a>
    </el-menu-item>
    <el-menu-item index="index_main" class="mainUrl">
      <a :href="mainUrl" target="_blank" >        
        主页
      </a>
    </el-menu-item>    
    <!-- <el-menu-item index="1"><i class="el-icon-message"></i>0</el-menu-item> -->
    <el-submenu class="addPlus" index="newAdd">
      <template slot="title"><i class="el-icon-plus"></i>新建</template>
      <router-link to="/main/editorEassy">
        <el-menu-item index="/main/editorEassy">
          文章 
        </el-menu-item>
      </router-link> 

    
        <router-link to="/main/mediaAdd">
          <el-menu-item index="/main/mediaAdd">
            文件
          </el-menu-item>
        </router-link>       
      <!-- <el-menu-item index="newAdd-3">页面</el-menu-item> -->
      <!-- <el-menu-item index="newAdd-4">链接</el-menu-item> -->
    </el-submenu>  
    <el-submenu index="4" id="user--info">
      <template slot="title">你好，{{nickname}}</template>
      <router-link to="/main/userInfo"> 
        <el-menu-item index="/main/userInfo">修改密码</el-menu-item>
      </router-link> 
      <el-menu-item index="/login" @click="logout">退出</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
  export default {
    data(){
      return {
        allBaseInfo:""
      }
    },
    props:['username','mail','nickname'],    
    computed:{
      mainUrl:function(){
        var data =this.allBaseInfo;
        for(let i in data){
          console.log(data[i].name);
          if(data[i].name=="siteUrl"){
            return data[i].value;
            break;
          }
        }
      }
    },
    methods: {
      logout:function(){
        var self=this;
        self.$http.get("logout").
        then(function(res){
          if(res.data.state==200){
            self.$cookie.delete("username");
            self.$cookie.delete("mail");
            self.$cookie.delete("nickname");
            
            self.$router.push({
              path:"/login"
            });

          }else{
            self.$message.error("退出登录失败,请稍后再试！");
          }
        });
      },
      getBaseInfo:function(){
          this.$http.post("option/getStatic").then((result)=>{
            if(result.data.state==200){
                this.allBaseInfo=result.data.opRes;

            }
          })
      }
    },
    mounted:function(){
        this.getBaseInfo();
    }
  }
</script>

<style type="text/css">
  .mainUrl a{
    font-size: 14px;

  }
  
  .el-menu-top .addPlus{
    padding: 0;
  }
  .el-menu-top .el-icon-plus{
    margin: 0 10px;
  }

  .el-menu-top .el-submenu__title{
    padding: 0;
  }
  .el-menu-top > li{
    padding: 0;
    margin: 0 5px;
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
  .el-menu-item a{
    text-decoration: none;
  }
  
  .logoItem{
    font-size: 31px;  
    border-bottom-width: 0px !important;      
  }

  .logoItem a{
    padding: 0 10px;
  }
  .logoItem.is-active{
    border-bottom-width: 0px !important;
  }

  .el-menu a{
    display: block;
    width: 100%;
    box-sizing:border-box;
    text-decoration: none;
  }
</style>