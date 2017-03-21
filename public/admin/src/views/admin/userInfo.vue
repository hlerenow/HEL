<template>
	<div id="userInfo">
		<h2 class="pageTitle" >修改密码</h2>

		<div class="self_input_inner">
			<div class="rowTitle">
				旧密码
			</div>
			<div class="self_row_content">
			  	<el-input v-model="oldPassword" placeholder=""></el-input>			
			</div>
		</div>
		<div class="self_input_inner">
			<div class="rowTitle">
				新密码
			</div>
			<div class="self_row_content">
		  	<el-input type="password" v-model="password" placeholder=""></el-input>		
			</div>
		</div>
		<div class="self_input_inner">
			<div class="rowTitle">
				确认新密码
			</div>
			<div class="self_row_content">
		  	<el-input type="password" v-model="password2" placeholder=""></el-input>		
			</div>
		</div>		
		
		<div class="self_input_inner">
			<div class="rowTitle">
				 
			</div>
			<div class="self_row_content">
	          <el-button @click.prevent="modifyPassword"  class="createCatalog" type="primary" >
	            修改
	          </el-button>			
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				oldPassword:"",
				password2:"",
				password:""
			};
		},
		methods:{
			modifyPassword(){
				if(this.validate()){
					this.$http.post("modifyPas",{
						oldPassword:this.oldPassword,
						password:this.password
					}).then((res)=>{
						if(res.data.state==200){
							this.$message.success("密码修改成功");
						}else{
							this.$message.error("密码修改失败,"+res.data.moreInfo);
						}
					})
				}
			},	
			validate(){
				if(this.password2!=this.password){
					this.$message.error("两次新密码不相同!!");
					return false;
				}

				if(this.password2&&this.password&&this.oldPassword){
					return true;
				}else{
					this.$message.error("密码不能为空");
					return false;
				}
			}
		}
	}
</script>
<style type="text/css">
	#userInfo{
		padding-left: 10px;
	}
	#userInfo .self_input_inner{
		padding-bottom: 10px;
	}
	.self_input_inner,.self_row_content{
		overflow: hidden;
	}

	.self_input_inner .rowTitle{
	    float: left;
	    font-size: 14px;
	    width: 80px;
	    min-height: 1px;
	}
	#userInfo .el-row{
		margin-bottom: 20px;
	}

	#userInfo .el-input__inner{
		border-radius: 1px;
		height: 30px !important;
	}

	.pageTitle{
		color: #97a8be;
		font-weight: lighter;	
	}

</style>