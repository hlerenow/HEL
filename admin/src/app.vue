<!--suppress ALL -->
<template>
  <div id="app">
    <transition name="slide-fade" mode="out-in">
      <router-view>
      </router-view>      
    </transition>
  </div>
</template>
<style>

  html,body,#app{
    width: 100%;
    height: 100%;
    min-height: 100%;
    max-width: 100%;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }

  .row{
    margin-left: 0;
    margin-right: 0;
  }
  .tips{
    font-size: 12px;
    color: gray;
  } 

  .pageTitle{
    color: #97a8be;
    font-weight: lighter;   
  }

  /*过渡效果*/
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
