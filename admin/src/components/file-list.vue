<template>
	<div class="filesList">
		<h2 class="pageTitle">媒体库</h2>
		<div class="funcBtnBar">
			<el-button @click="showMultiBtn">批量选择</el-button>
			<el-button @click="uploadFile">添加</el-button>
			<el-button @click="uploadFile" v-if="type=='select'" v-once>插入</el-button>

			<el-button type="danger" @click="delMultiFiles" v-show="delShow">批量删除</el-button>
		</div>
		<div class="fileUpload" v-show="uploadState">
			<media-add :pFileListShow="false"></media-add>
		</div>
		<div class="fileListCon">
			<div class="nofiles" v-show="!hasFiles">暂无文件</div>
			<div class="fileCard ShowCon">
			    <el-card  v-for="(ite,index) of files" :body-style="{ padding: '0px' }" :class="{delStyle:delShow}">
			      <el-checkbox v-show="delShow" v-model="checkArry[index].state"></el-checkbox>
			      <div @click="cardClick(index)" class="imgCon">
			      		<img :src="'../'+ite.thumbnail" class="image">		
			      </div>
			      <div class="fileName">
				      	<a :title="ite.name">{{ite.name}}</a>
				      	<i v-show="!delShow" class="el-icon-delete" @click="delFiles([ite.fid])"></i>
			      	</div>
			    </el-card>		    				
			</div>
		</div>
		<div id="fileListPagination" v-show="hasFiles">
		    <el-pagination
			  @current-change="pageChange"
		      :current-page="page"
		      :page-size="pageSize"
		      layout="total, prev, pager, next,jumper"
		      :total="totalFilesCount">
		    </el-pagination>			
		</div>		
		<el-dialog @close="fileDialogClose" id="showFileDetail" size="full" title="文件详情" v-model="fileDetailDialog">
		  <file-show :imgObj='nowFile' :showAction="true"></file-show>
		</el-dialog>		
	</div>
</template>
<script type="text/javascript">
  	import fileShow from "components/file-show.vue";
  	import mediaAdd from "components/media-add.vue";

  	let $=require("jQuery");

	export default{
		data (){
			return {
				delShow:false,
				page:1,
				pageSize:10,
				totalFilesCount:0,
				fileDetailDialog:false,
				files:[],
				nowFile:{},
				checkArry:[],
				uploadState:false
			};
		},
		propos:{
			type:{
				default:'normal'
			}
		},
		components:{fileShow,mediaAdd},
		methods:{
			showMultiBtn:function(){
				if(this.files.length>0){
					this.delShow=!this.delShow;					
				}
			},
			createCheckArry:function(){
				var resArry=[]
				for(var i=0;i<this.files.length;i++){
					resArry.push({
						fid:this.files[i].fid,
						state:false
					});
				}
				this.checkArry=resArry;
			},
			cardClick:function(index){
				if(this.delShow){
					this.checkArry[index].state=!this.checkArry[index].state;			
					// this.checkArry.splice(index,1,!this.checkArry[index]);			
				}else{
					this.nowFile=this.files[index];
					this.fileDetailDialog=true;
				}
			},
			getFiles:function(){
				var self=this;
				self.$http.post("file/getList",{
					page:self.page,
					size:self.pageSize
				}).
				then(function(res){
					if(res.data.state!=200){
						self.$message.error("文件列表获取失败");
						return;
					}
					self.files=res.data.opRes[0];
					self.totalFilesCount=res.data.opRes[1][0].total;
					self.createCheckArry();
					//格式化缩略图
					self.formatImgUrl();
					
				});

			},
			delFiles:function(fidArry){
				var self=this;
				self.$http.post("file/delete",{
					fids:JSON.stringify(fidArry)
				}).
				then(function(res){
					if(res.data.state===200){
						self.getFiles();
					}else{
						self.$message.error("文件删除失败");
					}
				});
			},
			getFilesIndexByFid:function(fid){
				var res=-1;
				for(var i=0;i<this.files.length;i++){
					if(this.files[i].fid===fid){
						res=i;
						break;
					}
				}

				return res;
			},		
			delMultiFiles:function(){
				var fidArry=[];
				this.checkArry.forEach(function(item){
					if(item.state){
						fidArry.push(item.fid);
					}
				});

				this.delFiles(fidArry);
			},
			pageChange:function(currentPage){
				this.page=currentPage;
				this.getFiles();
			},
			uploadFile:function(){
				this.uploadState=!this.uploadState;
			},
			formatImgUrl:function(){
				for(var i=0;i<this.files.length;i++){
					var ite=this.files[i];
					if(ite.type.indexOf("video")>=0){
						ite.thumbnail="./img/video.png";
					} else if(ite.type.indexOf("audio")>=0){
						ite.thumbnail= "./img/music.png";

					} else if(ite.type.indexOf("image")>=0){
						ite.thumbnail= ite.url;					
					} else {
						ite.thumbnail= "./img/file.png";
					}					
				}
			},
			fileDialogClose:function(){			
				$("#showFileDetail video,#showFileDetail audio").each(function(){
					this.pause();
				});
			}
		},
		computed:{
			hasFiles:function(){
				if(this.files.length>0){
					return true;
				}else{
					return false;
				}
			}			
		},
		mounted:function(){
			var self=this;
			this.getFiles();

			this.$bus.$on("fileUploadSuccess",function(){
				self.getFiles();
			});

			this.$bus.$on("showFileDelete",function(fid){
				self.delFiles([fid]);
				self.fileDetailDialog=false;
			});

			this.$bus.$on("fileShowNext",function(fid){
				var nextIndex=self.getFilesIndexByFid(fid);
				nextIndex=(nextIndex+1)%self.files.length;

				self.nowFile=self.files[nextIndex];
			});

			this.$bus.$on("fileShowPre",function(fid){

				var preIndex=self.getFilesIndexByFid(fid);
					preIndex=((preIndex-1)+self.files.length)%self.files.length;
				self.nowFile=self.files[preIndex];
			});	
		}
	}
</script>
<style type="text/css">
	.funcBtnBar{
		padding: 5px 10px;
		margin:5px 10px;
		box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08);
	}
	.fileCard{
		padding-left: 10px;
	}
	.funcBtnBar .el-button{
		border-radius: 1px;
	}
	.fileCard  .el-card{
		width: 30%;
		max-width: 200px;
		height: 180px;
		float: left;
		border-radius: 2px;
		margin-right: 10px;
		margin-top: 10px;
		position: relative;
	}
	.fileListCon img{
		max-width: 100%;
	}
	.fileListCon .imgCon{
		width: 100%;
		height: 150px;
		overflow: hidden;
		position: relative;
    	background-color: #e5eaf1;		
	}
	.fileListCon .el-checkbox{
	    position: absolute;
	    top: 5px;
	    right: 5px;		
	}
	.fileListCon .fileName {
		color: gray;
		padding:5px 20px 5px 10px;
		position: relative;  	
		border-top: 1px solid  #f3f2f2;
	}

	.fileListCon .fileName a{
    	font-size: 12px;				
		box-sizing:border-box;
		width: 100%;
		display: block;
		text-overflow: ellipsis;
    	overflow: hidden;
		white-space:nowrap;    		
	}

	.fileListCon .el-icon-delete{
		position: absolute;
		top: 5px;
		right: 5px;
		cursor: pointer;
	}

	.fileListCon .el-icon-delete:hover{
		color:red;
	}
	.fileListCon .fileCard{
		cursor: pointer;
		overflow: auto;
	}

	.delStyle{
		opacity: 0.7;
	}
	/*分页*/
	#fileListPagination{
		min-width: 300px;	
    	overflow: hidden;	
	}

	#fileListPagination .el-pagination{
		float: right;
		margin-top: 20px;	
		margin-right: 20px;	
	}
	.imgCon img{
	    position: absolute;
	    top: 50%;
	    width: 100%;
	    transform: translate(0,-50%);
	}
	.fileUpload{
		padding-right: 10px;
    	padding-left: 10px;		
	}
	.nofiles{
		font-size: 30px;
		color: #bbb7b7;
		text-align: center;
		padding: 50px;
	}
</style>