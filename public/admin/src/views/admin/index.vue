<template>
  <div id="admin">
    <router-view class="admin-content__box"></router-view>
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
      }
    },
    computed:{

    },
// 子组件
    components: {headBar,menueNav},
    mounted:function(){
      // 初始化检测是否登陆
      // 未登录
      this.username=this.$cookie.get("username");
      this.mail=this.$cookie.get("mail");
      this.nickname=this.$cookie.get("nickname");

      // if(!this.isLogin()){
      //   this.$router.replace("/login");
      // }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  #admin{
    height: 100%;
    width: 100%;
    background-color: #324157;
    position: relative;
    box-sizing:border-box;
  }

  .admin-content__box{
    box-sizing:border-box;
    width: 100%;
    height: 100%;
    padding: 60px 0 0 130px;
    background-color: white;

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
    height: inherit !important;
  }
</style>
