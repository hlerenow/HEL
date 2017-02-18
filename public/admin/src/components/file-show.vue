<template>
	<div class="fileShow">
		<div class="fileShowEditor">
			<div class="details">
				<div class="filename"><strong>文件名：</strong>{{imgObj.name}}</div>
				<div class="filename"><strong>文件类型：</strong> {{imgObj.type}}</div>
				<div class="uploaded"><strong>上传于：</strong> {{filterData}}</div>
				<div class="file-size"><strong>文件大小：</strong> {{filterSize}} </div>		
				<div class="dimensions"><strong>分辨率：</strong> {{imgObj.width}} × {{imgObj.height}}</div>
				<div class="filename"><strong>Url:</strong> {{imgObj.url}} </div>				

			</div>
<!-- 			<div class="settings">
			</div> -->
			<div class="actions" v-if="showAction">
				<div @click="deleteFileEvent" class="btnS deleteBtn"><i class="el-icon-delete2"></i></div>
				<div @click="nextEvent" class="btnS nextBtn"><i class="el-icon-arrow-right"></i></div>	
				<div @click="preEvent" class="btnS preBtn"><i class="el-icon-arrow-left"></i></div>	
			</div>
		</div>
		<div class="showImgCon">
			<img v-if="imgObj.type.indexOf('image')>=0" :src="imgObj.url" :alt="imgObj.name" class="fileShowImg">
			<video v-else-if="imgObj.type.indexOf('video')>=0" :src="imgObj.url" controls="controls" class="fileShowImg">
			您的浏览器不支持 video 标签。
			</video>
			<audio v-else-if="imgObj.type.indexOf('audio')>=0" :src="imgObj.url" controls="controls" class="fileShowImg">
			您的浏览器不支持 video 标签。
			</audio>
			<img v-else :src="imgObj.thumbnail" :alt="imgObj.name" class="fileShowImg">						
		</div>
	</div>
</template>

<script type="text/javascript">
	export default{
		data(){
			return {

			};
		},
		props:{
			imgObj:[Object],
			showAction:{
				defualt:true
			}
		},
		computed:{
			filterData:function(){
				var dateObj=new Date(this.imgObj.created*1000);

				return dateObj.getFullYear()+" 年 "+(dateObj.getMonth()+1)+" 月 "+dateObj.getDate()+"日";
			},
			filterSize:function(){
				return this.imgObj.size/1000+" KB";
			}
		},
		methods:{
			nextEvent:function(){
				this.$bus.$emit("fileShowNext",this.imgObj.fid);
			},
			preEvent:function(){
				this.$bus.$emit("fileShowPre",this.imgObj.fid);
			},
			deleteFileEvent:function(){
				this.$bus.$emit("showFileDelete",this.imgObj.fid);
			}
		},
		mounted:function(){
		}
	}
</script>

<style type="text/css">
	.fileShow{
		min-width: 600px;
	}
	.fileShow .fileShowEditor{
		float: right;
		width: 300px;
		margin:0;
		border-left: 1px solid #d8d6d6;
		padding:10px 15px;
		height: 100%;
	}
	.fileShow .showImgCon{
		display: block;
		overflow: hidden;
	}
	.fileShow .showImgCon img{
		max-width: 100%;
		max-height: 450px;
	}

	.fileShow .el-dialog{
		overflow: hidden;
	}
	.fileName{
    	font-weight: 400;
	}
	.fileShow .details{
		font-size: 12px;
    	color: #666;
    	border-bottom:1px solid #d8d6d6;
    	padding-bottom: 10px;
	}
	.fileShow .details div{
		margin-bottom: 5px;
	}
	.fileShow .settings{
		padding:10px 0;
	}
	.fileShow .btnS{
	    border-radius: 2px;
	    background: #f7f7f7;
	    margin: 5px 5px;
	    font-size: 25px;
	    color: #b3b3b3;
	    float: right;
	    padding: 5px;
	}
	.fileShow .btnS:hover{
		color: white;
		background-color: #4a5f80;
	}
	
	.fileShow .actions{
		overflow: hidden;
		padding-top: 10px;
	}

	.fileShow .actions .deleteBtn{
		float: left;
	}
	.showImgCon video{
		max-width: 100%;
		max-height: 100%;
	}
</style>