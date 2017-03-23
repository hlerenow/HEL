<template>
	<div id="mediaAdd">
		<h2 class="pageTitle" v-if="pFileListShow">上传主题</h2>
		<el-upload
			action="./api/theme/add"
			drag
			name="file"
			:on-success="fileUpSuccess"
			:on-error="fileUpError"
			:file-list="fileList"
			:show-file-list="pFileListShow"
			accept='zip'
		>
			<i class="el-icon-upload"></i>
		  	<div class="el-upload__text">将主题拖到此处，或<em>点击上传</em></div>
			<div class="el-upload__tip" slot="tip">文件不能超过128M</div>
		</el-upload>	
	</div>
</template>
<script type="text/javascript">

	export default{
		data (){
			return {
				fileList:[]
			};
		},
		props:{
			pFileListShow:{
				default:true
			}
		},
		methods:{
			fileUpSuccess:function(res,file,files){
				var self=this;
				if(res.state!=200){
			        self.$notify({
			          title: '失败',
			          message: file.name+" 主题安装失败",
			          type: 'error',
			          duration:2000

			        });					
				}else{
			        self.$notify({
			          title: '成功',
			          message: file.name+" 主题安装成功",
			          type: 'success',
			          duration:2000

			        });
				}
			},
			fileUpError:function(err, res, file){
			        self.$notify({
			          title: '失败',
			          message: file.name+" 文件上传失败",
			          type: 'error',
			          duration:2000
			        });			
			}
		},
		mounted:function(){
		}
	}	
</script>

<style type="text/css">
	#mediaAdd{
		overflow: hidden;
		padding-left: 10px;
	}

	#mediaAdd .el-upload{
		padding-right: 28px;
		padding-top: 20px;
	}
	#mediaAdd .el-upload,
	#mediaAdd .el-upload-dragger{
		width: 100%;
	}

	.el-upload-dragger{
		border-radius: 2px;
		border-style: dashed;
	}
	
	.el-upload__tip{
		text-align: center;
	}
</style>