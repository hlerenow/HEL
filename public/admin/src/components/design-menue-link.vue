<template>
	<div class="selfDesignLink">
		<p>
			<span class="label">
				URL
			</span>
			<el-input v-model="linkUrl" placeholder="请输入内容"></el-input>
		</p>
		<p>
			<span class="label">
				链接文本
			</span>
			<el-input v-model="linkText" placeholder="请输入内容"></el-input>
		</p>
		<div class="menue_btn_submit">
			<el-button @click="submit">添加</el-button>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data (){
			return {
				linkUrl:"",
				linkText:""
			}
		},
		methods:{
			submit(){
				this.$emit("submit",{
					type:"link",
					name:this.linkText,
					url:this.linkUrl,
				});
			}
		}
	}
</script>
<style type="text/css">
	
	.menue_btn_submit{
		margin-top: 10px;
		float: right;
	}
	.selfDesignLink .label{
	    font-size: 12px;
	    color: gray;
	    display: inline-block;
	    padding-bottom: 5px;
	}
	.selfDesignLink p{
		margin: 0 0 10px;
	}

	.selfDesignLink .el-input__inner{
		height: 30px;
	}
</style>