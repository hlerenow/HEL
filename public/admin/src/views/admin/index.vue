<template>
  <div id="admin">
    <div id="admin-content__layout">
      <transition name="slide-fade" mode="out-in">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" class="admin-content__box"></router-view>      
        </keep-alive>
      </transition>
      <transition name="slide-fade"  mode="out-in">
        <router-view v-if="!$route.meta.keepAlive"  class="admin-content__box"></router-view>    
      </transition>      
    </div>
    <menue-nav id="menue-nav__left"></menue-nav>
    <head-bar id="menue-nav__top" :nickname="username" :mail="mail" :username="username"></head-bar>
  </div>
</template>

<script>
  import headBar from "components/head-bar.vue";
  import menueNav from "components/menue-nav.vue";
  export default {
    data () {
      return {
        username: "未登录",
        nickname: '未登录',
        mail:""
      }
    },
    methods: {
      isLogin:function(){
        return (this.username&&this.mail&&this.nickname);
      },
      nextPage:function(){
        this.username=this.$cookie.get("username");
        this.mail=this.$cookie.get("mail");
        this.nickname=this.$cookie.get("nickname");

        if(!this.isLogin()){
          this.$router.replace("/login");
        }        
      }
    },
// 子组件
    components: {headBar,menueNav},
    mounted:function(){
      // 初始化检测是否登陆
      this.nextPage();

    },
    updated:function(){
      this.nextPage();
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  .el-input__inner{
    border-radius: 2px;
  }
  
  #admin{
    height: 100%;
    width: 100%;
    position: relative;
    box-sizing:border-box;
  }

  #admin-content__layout{
    box-sizing:border-box;
    width: 100%;
    height: 100%;
    padding: 60px 0 0 130px;
    background-color: white;    
  }
  .admin-content__box{
    width: 100%;
    height: 100%;
    overflow: auto;
    margin:0;
  }

  #menue-nav__left{
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    padding-top: 60px;
    font-size: 12px !important;
    width: 120px;
  } 
  #menue-nav__top{
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
  }

  html,body,#app{
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;    
    height: 100% !important;
  }
  body{
    padding:0 !important;
  }
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter{
  opacity: 0;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave{
  position: absolute;
  opacity: 1;
  transition: all .1s ease;  
}
.slide-fade-leave-active {
  opacity: 0;
}
</style>
