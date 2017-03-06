<template>
	<div >
		<div id="otherInfo">
			<el-collapse id="thumbnailCollase">
			  <el-collapse-item title="缩略图" name="1">
			    <template slot="title">
			      缩略图<i @click.capture.stop ="thumnail=''" class="el-icon-delete2 addCatalog"></i>
			    </template>				  
			  	<div class="thumbnailCkick" @click="showFileSelect('thumbnailInsertType')">
					<img v-if="thumnail!=''" :src="thumnail" alt="">
					<i v-else class='el-icon-plus addThumbnail'>			  		
			  	</div>
			  </el-collapse-item>
			</el-collapse>

			<el-collapse id="catalogCollapse">
			  <el-collapse-item  name="2">
			    <template slot="title">
			      分类目录<i @click.capture.stop ="showAddCatalog" class="el-icon-plus addCatalog"></i>
			    </template>			  
				<eassy-catalog :checkCatalogs="eassyCatalogs"></eassy-catalog>
			  </el-collapse-item>
			</el-collapse>

<!-- 			<el-collapse id="tagCollapse">
			  <el-collapse-item title="标签" name="1">
			    <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
			    <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
			  </el-collapse-item>
			</el-collapse> -->

			<el-collapse id="excpertCollapse">
			  <el-collapse-item title="摘要" name="3">
				<el-input
				  type="textarea"
				  :autosize="{ minRows: 2, maxRows: 10}"
				  placeholder="请输入内容"
				  v-model="eassyExcpert">
				</el-input>
				<p class="tips">摘要是可选的手工创建的内容总结，并可在您的主题中使用。</p>
			  </el-collapse-item>
			</el-collapse>				

			<el-collapse id="publishCollapse" value="4">
			  <el-collapse-item title="发布" name="4">
			  	<el-button type="warning" @click="postEassy('draft')">保存为草稿</el-button>
			  	<el-button type="success" @click="postEassy('publish')">发布</el-button>
			  </el-collapse-item>
			</el-collapse>
			<!-- 目录弹出框 -->
			<el-dialog  v-model="createCatalogVisible">
				<catalog-create></catalog-create>
			</el-dialog>											
		</div>		
		<div class="eassyEditorCon">
			<h2 class="pageTitle">撰写文章</h2>
			<el-input v-model="eassyTitle" class="eassy--title" placeholder="请输入标题"></el-input>
			<el-button id="addFile-btn" @click="showFileSelect('editorInsert')"><i class="el-icon-picture"></i> 添加媒体</el-button>
			<div id="editormd">
			    <textarea style="display: none;"></textarea>
			    <!-- html textarea 需要开启配置项 saveHTMLToTextarea == true -->
			    <textarea class="editormd-html-textarea" name="editormd-html-code"></textarea>				
			</div>		
		</div>
		<el-dialog id="selectDialog" size="large" title="插入媒体" v-model="fileSelectDialog">
			<el-button id="insertFile-btn" @click="insertFileEvent()">插入</el-button>
			<el-tabs type="card">
			  <el-tab-pane label="媒体库">
			  	<file-select></file-select>
			  </el-tab-pane>
			  <el-tab-pane label="添加">
					<media-add :pFileListShow="false"></media-add>
			  </el-tab-pane>
			</el-tabs>		
		</el-dialog>		
	</div>
</template>
<!-- <script type="text/javascript" src="./lib/markDownEditor/lib/jquery.min.js"></script>
<script type="text/javascript" src="./lib/markDownEditor/editormd.min.js"></script> -->
<script type="text/javascript">
	var jQuery=require("jQuery"),
		$=jQuery,
		jquery=jQuery;

	var editormd=require('editormd');
	// 
	// var jQuery=require("lib/markDownEditor/lib/jquery.min.js");
	// var $=jQuery;
	// var jquery=jQuery;


  	import fileSelect from "components/file-select.vue";
  	import eassyCatalog from "components/eassy-catalog.vue";
  	import catalogCreate from "components/catalog-create.vue";
  	import mediaAdd from "components/media-add.vue";



	export default {
		data () {
			  return {
			  	fileSelectDialog:false,
			    username:'',
			    password:'',
			    tips:"",
			    createCatalogVisible:false,
			    eassyCatalogs:[],
			    eassyExcpert:"",
			    eassyTitle:"",
			    editorMd:"",
			    thumnail:"",
			    eassyStatus:"draft",
			    selectFiles:[],
			    fileInsertType:"editorInsert"
			  }
		},
		methods: {
			editorInit:function(){
				var self=this;
				$(function() {
				    var editor = editormd("editormd", {
				        path : "./lib/markDownEditor/lib/",
				        height:"600px",
				        watch:true,
				        width:"99%",
				        tocm:true,
				        htmlDecode:"style,script,iframe,sub,sup|on*",
				        toolbarIcons:function() {
				            // Using "||" set icons align right.
				            return ["undo", "redo","clear", "|", "bold", "del", "italic", "quote", "ucwords", "uppercase", "lowercase", "|", "h1", "h2", "h3", "h4", "h5", "h6", "|", "list-ul", "list-ol", "hr", "|", "link", "reference-link", "image", "code", "preformatted-text", "code-block", "table", "datetime", "html-entities", "pagebreak", "|", "goto-line", "watch", "preview", "fullscreen",  "search", "|", "help"]
				        },
				        onfullscreen:function(){
				        	$("#editormd").css("z-index","10000");
				        },
				        onfullscreenExit:function(){
				        	$("#editormd").css("z-index","inherit");
				        	$('#editormd').css("width","99%");
				        },
				        onload:function(){
							this.unwatch();	
				        }
				    });

				    self.editorMd=editor;
				});
			},
			showFileSelect:function(type){
				this.fileSelectDialog=true;
				this.fileInsertType=type;
			},
			listerEassyCatalogChange:function(){
				var self=this;
				self.$bus.$on("eassyCatalofChage",function(val){
					self.eassyCatalogs=val;
				});	
			},
			showAddCatalog:function(){
				this.createCatalogVisible=true;
			},
			listerCatalogCreate:function(){
				var self=this;
				self.$bus.$on("catalog-created",function(data){
					self.createCatalogVisible=false;
				});
			},
			insertImgToEditor:function(fileArry){
				var self=this;
				var resStr="";
				for(var i=0;i<fileArry.length;i++){
					if(fileArry[i].type.indexOf("image")>=0){
						let imgObj=fileArry[i];
						let imgStr
						imgStr='\r\n!['+imgObj.name+']('+imgObj.url+' "'+imgObj.name+'")';
						if(imgObj.link){
							imgStr='['+imgStr+']('+imgObj.link+' "'+imgObj.name+'")';
						}
						resStr+=imgStr+"\r\n";							
					}else if(fileArry[i].type.indexOf("video")>=0){
						resStr+='\r\n<video src="'+fileArry[i].url+'" controls="controls" class="fileShowImg"></video>'+"\r\n";
					} else if(fileArry[i].type.indexOf("audio")>=0){
						resStr+='\r\n<audio src="'+fileArry[i].url+'" controls="controls" class="fileShowImg"></audio>'+"\r\n";					
					} else {
						resStr+='['+fileArry[i].name+']('+fileArry[i].url+' "'+fileArry[i].name+'")'+"\r\n";
					}
				}
				try{
               		this.editorMd.insertValue(resStr);

               		this.editorMd.previewContainer.html(this.editorMd.getMarkdown());
               		this.editorMd.focus();					
				}catch(e){
					console.log(e);
				}

			},
			insertFileEvent:function(){
				this.$bus.$emit("getSelectFile");
			},
			postEassy:function(eassyStatus){
				var self=this;
				self.eassyStatus=eassyStatus;
				//检查数据完整性

				if(self.eassyCatalogs.length<1){
					self.$message.error("文章目录不能为空");
					return;
				};

				self.$http.post("eassy/post",{
					title:self.eassyTitle,
					content:self.editorMd.getPreviewedHTML(),
					templateContent:self.editorMd.getMarkdown(),
					status:self.eassyStatus,
					excerpt:self.eassyExcpert,
					belongCatalog:self.eassyCatalogs.join("&"),
					thumbnail:self.thumnail
				}).
				then(function(res){
					if(res.data.state===200){
						self.$message.success("文章保存成功！");
						self.clearEassy();
					}else{
						self.$message.error("文章保存失败！");
					}
				});
			},
			clearEassy:function(){
				var self=this;

				self.eassyTitle="";
				self.eassyStatus="draft";
				self.eassyExcpert="";
				self.eassyCatalogs=[];
				self.thumnail="";

				//清除编辑器内容
				self.editorMd.clear();
               	self.editorMd.focus();						
			}
		},
		components:{eassyCatalog,catalogCreate,fileSelect,mediaAdd},
		computed:{
		},
		mounted:function(){
			var self=this;
			this.editorInit();
			this.listerEassyCatalogChange();
			this.listerCatalogCreate();

			this.$bus.$on("SendselectFile",function(selectFiles){
				//关闭 媒体库
				self.fileSelectDialog=false;

				var isThisPage=self.$router.currentRoute.path.indexOf("editorEassy");
				
				if(isThisPage<0||selectFiles.length<1){
					return;
				}

				self.selectFiles=selectFiles;
				if(self.fileInsertType=="editorInsert"){
					//插入编辑器
					self.insertImgToEditor(selectFiles);
					
				}else if(self.fileInsertType=="thumbnailInsertType"){
					//缩略图
					
					if(selectFiles.length>0&&selectFiles[0].type.indexOf("image")>=0){
						self.thumnail=selectFiles[0].url;
					}else{
						self.$message.error("所选缩略图不是图片文件，或者为空 书写");
					}
				}					
			});


		}
}

</script>

<style type="text/css">
	.editormd-menu>li>a{
		font-size: 12px;
	}
	
	#addFile-btn{
		margin:0 0 10px 5px;
		border-radius: 0;
	}
	.eassy--title{
		width: 99%;
		margin:0 auto 15px;
		display: block;	
	}
	.eassy--title input{
		border-radius: 0;	
	}
	
	.eassyEditorCon{
		overflow: auto;
		padding-left: 10px;
	}

	#otherInfo{
		float: right;
		width: 300px;
		padding:67px 10px 0;
		box-sizing:border-box;
		font-size: 14px;
	}

	#otherInfo .el-collapse-item__header__arrow.el-icon-arrow-right{
		transform: rotate(90deg);
		position: absolute;
		right: 5px;
		top: 15px;	
	}
	#otherInfo .el-collapse-item.is-active .el-collapse-item__header__arrow{
		transform: rotate(-90deg);			
	}
	#otherInfo .el-collapse-item__header{
		position: relative;
	}

	#otherInfo .el-collapse{
		margin-bottom: 20px;
	}
	.el-textarea__inner{
		border-radius: 1px;		
	}
	.el-collapse-item__content{
		padding: 10px;
	}

	#catalogCollapse .el-checkbox{
		display: block;
		margin-left: 15px;
	}
	#catalogCollapse .el-collapse-item__content{
		max-height: 300px;
	}
	.addCatalog{
		margin-left: 10px;
	}
	#otherInfo .el-dialog__wrapper{
		overflow: hidden !important;
	}
	#selectDialog .el-dialog__body{
		padding:10px;
	}
	#selectDialog .el-dialog{
		margin-bottom: 0 !important;
	}
	#insertFile-btn{
	    position: absolute;
	    right: 50px;
	    cursor: pointer;
	    z-index: 2;
	}
	#thumbnailCollase .addThumbnail{
	    font-size: 30px;
	    padding: 50px 20px;
	    color: #48576a;		
	}
	#thumbnailCollase .el-collapse-item__wrap{
		text-align: center;
	}
	#thumbnailCollase img{
		max-width: 100%;
	}
	/*预览样式*/
	#editormd{
		border-radius: 1px;
	}
	.editormd-preview-container{
		max-width: 100%;		
	}
	.editormd-preview-container img,
	.editormd-preview-container video{
		max-width: 100%
	}
</style>