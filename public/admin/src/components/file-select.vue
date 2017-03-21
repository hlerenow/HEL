<template>
	<div class="filesList fileSelect">
		<div class="fileListCon">
			<div class="nofiles" v-show="!hasFiles">暂无文件</div>
			<div class="fileCard ShowCon">
			    <el-card  v-for="(ite,index) of files" :body-style="{ padding: '0px' }" :class="{delStyle:delShow}">
			     <el-checkbox @change="cardClick(index,true)"  v-model="checkArry[index].state"></el-checkbox>
			      <div @click="cardClick(index)" class="imgCon">
			      		<img :src="ite.thumbnail" class="image">		
			      </div>
			      <div class="fileName">
				      	<a :title="ite.name">{{ite.name}}</a>
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
	</div>
</template>
<script type="text/javascript">
	export default{
		data (){
			return {
				delShow:false,
				page:1,
				pageSize:20,
				totalFilesCount:0,
				fileDetailDialog:false,
				files:[],
				nowFile:{},
				checkArry:[],
			};
		},
		propos:{
			type:{
				default:'normal'
			},
			from:{
				default:"fileSelectEvent"
			}
		},
		methods:{
			/**
			 * 构造check 选择数据模型
			 * @return {[type]} [description]
			 */
			initCheckArry:function(){
				var resArry=[];
				for(var i=0;i<this.files.length;i++){
					resArry.push({
						fid:this.files[i].fid,
						state:false,
						data:this.files[i]
					});
				}
				this.checkArry=resArry;
			},
			/**
			 * 文件被点击时更新 选择文件的状态
			 * @param  {[type]} index [description]
			 * @return {[type]}       [description]
			 */
			cardClick:function(index,flage){
				if(!flage){
					this.checkArry[index].state=!this.checkArry[index].state;						
				}
				var res=this.checkFiles();
				this.$emit("fileChange",res);
			},
			/**
			 * 获取文件根据页数和每页文件的个数
			 * @return {[type]} [description]
			 */
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
					self.initCheckArry();
					self.formatImgUrl();
					
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
			/**
			 * 翻页
			 * @param  {[type]} currentPage [description]
			 * @return {[type]}             [description]
			 */
			pageChange:function(currentPage){
				this.page=currentPage;
				this.getFiles();
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
			checkFiles:function(){
				var self=this;
				var res=[];
				for(var i=0;i<self.checkArry.length;i++){
					if(self.checkArry[i].state){
						res.push(self.checkArry[i].data);
					}
				}
				return res;
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
		border-top: 1px solid #f3f2f2;
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
	.fileSelect .fileListCon{
    	max-height: 390px !important;
    	overflow: auto;		
	}

</style>