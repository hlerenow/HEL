<template>
<div id="loginBox">
  <form id="login">
    <h3  class="text-center login_title Blue">HEL-blog</h3>
    <div class="login_body">
      <div class="login__input--con">
        <el-input v-model.trim="username">
          <template slot="prepend">用户名</template>
        </el-input>
      </div>
      <div class="login__input--con">
        <el-input type="password" v-model.trim="password">
          <template slot="prepend">密  码</template>
        </el-input>
      </div>     
          <el-button @click.prevent="login"  class="login__submit" type="primary submit" >
            登&nbsp;&nbsp;录
          </el-button>
    </div>
  </form>
</div>

</template>

<script>
  export default {
    data () {
      return {
        username:'',
        password:'',
        tips:""
      }
    },
    methods: {
      login: function() {
        let self=this;

        if(!this.validate){
            self.$message({
              message:"用户名或密码不能为空",
              type:"error",
              duration:0,
              showClose:true
            });
            return;
        }
        this.$http.post("login", {
          username: this.username,
          password: this.password
        }).
        then(function(res) {

          if(res.data.state===200){
            self.$cookie.set("username",res.data.username);
            self.$cookie.set("mail",res.data.mail);
            self.$cookie.set("nickname",res.data.nickname);
            self.$router.push("main");
          }else{
            self.$message({
              message:res.data.info,
              type:"error",
              duration:2000,
              showClose:true
            });
          }
        },function(res){
            self.$message({
              message:"网络错误,请检查网络连接,稍后再试！",
              type:"error",
              duration:2000,
              showClose:true
            });
        });
      }
    },
    computed:{
      validate:function(){
        if(this.username&&this.password)
          return true;
        else
          return false;
      }
    },
    mounted:function(){

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
    background-color: #20A0FF;
    color: white;
    font-weight:bolder;
  }
  
  .login_body{
      padding: 0 20px;
      margin-bottom:20px;
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

  .login_body{
    overflow: hidden;
  }
  .login__input--con{
     margin-bottom: 10px;
  }

  .login__submit{
    display: block;
    float: right;
  }


/*element ui */
  .el-input__inner,.el-button{
    border-radius: 2px;
  } 

  .el-input-group__prepend{
    border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
  }

  .el-button--success{
    background-color: #5cb85c;
  } 
</style>
