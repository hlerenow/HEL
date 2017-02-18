<template>
	<div id="mediaAdd">
		<h2 class="pageTitle" v-if="pFileListShow">添加媒体</h2>
		<el-upload
			action="./api/file/upload "
			type="drag"
			:multiple="true"
			:on-success="fileUpSucess"
			:on-error="fileUpError"
			:default-file-list="fileList"
			:show-upload-list="pFileListShow"
		>
			<i class="el-icon-upload"></i>
			<div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
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
			fileUpSucess:function(res,file,files){
				var self=this;
				if(res.state!=200){
			        self.$notify({
			          title: '失败',
			          message: file.name+" 文件上传失败",
			          type: 'error',
			          duration:2000

			        });					
					// self.$message.error(file.name+" 文件上传失败");
					for(var i=0;i<files.length;i++){
						if(files[i].name=file.name){
							files=files.splice(i,1);
							return;
						}
					}

				}else{
			        self.$notify({
			          title: '成功',
			          message: file.name+" 文件上传成功",
			          type: 'success',
			          duration:2000

			        });
			        self.$bus.$emit("fileUploadSuccess",res.opRes);
					// self.$message.success(file.name+" 文件上传成功");
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
	#mediaAdd .el-upload{
		padding-right: 28px;
		padding-top: 20px;
	}
	#mediaAdd .el-upload,
	#mediaAdd .el-upload__inner.el-dragger{
		width: 100%;
	}

	.el-dragger{
		border-radius: 2px;
		border-style: dashed;
	}
</style>