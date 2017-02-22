<!--suppress ALL -->
<template>
  <div id="app">
    <transition>
      <router-view>
      </router-view>      
    </transition>
  </div>
</template>
<style>

  html,body,#app{
    max-width: 100%;
    height: 100%;
    min-height: 100%;
  }
  html,body{
    overflow-x: hidden;

  }
/*重置boostrap样式*/
/*  .form-control{
    width: 100%;
    height: 35px;
    padding: 6px 12px;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 3px;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
    -webkit-transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  }
  .form-control:focus{
    box-shadow: none;
  }*/
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
</style>
