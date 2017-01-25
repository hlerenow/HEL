<template>
<div id="loginBox">
  <form id="login">
    <h3  class="text-center login_title">HEL-blog</h3>
    <div class="login_body">
      <div class="login__input--con">
        <el-input placeholder="用户名" v-model="input3">
          <template slot="prepend">用户名</template>
        </el-input>
      </div>
      <div class="login__input--con">
        <el-input placeholder="密码" type="password" v-model="input3">
          <template slot="prepend">密&nbsp;码</template>
        </el-input>
      </div>      
      <div class="form-group">
        <div class="col-sm-offset-9 col-sm-2">
          <button type="submit" @click.prevent="login" class="btn btn-success pull-right clearfix">登&nbsp;&nbsp;录</button>
        </div>
      </div>
    </div>
  </form>
</div>

</template>

<script>

  import {mapState} from 'vuex';
  import {mapMutations} from 'vuex';

  export default {
    data () {
      return {
        username: '',
        password: '',
        tips:""
      }
    },
    methods: {
      login:function(){      

      }
    },
    computed:{
      validateData:function(){
        if(this.username!=""&&this.password!=""){
          return true;
        }else{
          alert("请检查用户名或者密码是否正确");
          return false;
        }
      }
    },
    mounted:function(){

      console.log("我是login初始化");
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

  #login{
    letter-spacing: 2px;
    box-shadow: 0px 4px 11px 1px #d6d6d6;
    display: block;
    background-color: white;
    max-width: 400px;
    border-radius: 2px; 
    position: relative;
    top: 50%;
    transform: translate(0,-50%);
    -ms-transform:translate(0,-50%);
    overflow: hidden;
    margin: 0 auto;
  }
  .login_title{
    text-align: center;
    margin: 0 0 21px;
    padding: 20px 0;
    background-color: #5cb85c;
    color: white;
    font-weight:bolder;
  }
  
  .login_body{
      padding: 0 20px;
  }
  .line{
    width: 100%;
    height: 9px;
    background-color: #5cb85c;
    margin: 0 0 20px;
  }

  #loginBox{
    height: 100%;
    width: 100%;
  }

  .login__input--con{
  margin-bottom: 10px;
  }

  .el-input__inner{
    border-radius: 2px;
  } 

  .el-input-group__prepend{
    border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
  }
</style>
