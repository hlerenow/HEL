<template>
	<div class="eassyEditorBox">	
		<div class="eassyEditorCon">
			<h2 class="pageTitle">撰写文章</h2>

			<el-input v-model="eassyTitle" class="eassy--title" placeholder="请输入标题"></el-input>

			<el-button id="addFile-btn" @click="showFileSelect('editorInsert')"><i class="el-icon-picture"></i> 
			添加媒体</el-button>

			<editor ref="editor" @oninit="oninitEditor"></editor>
		</div>
		<div id="otherInfo">
			<el-collapse id="thumbnailCollase">
			  <el-collapse-item title="缩略图" name="1">
			    <template slot="title">
			      缩略图<i @click.capture.stop ="thumnail=''" class="el-icon-delete2 addCatalog"></i>
			    </template>				  
			  	<div class="thumbnailCkick" @click="showFileSelect('thumbnailInsertType')">
					<img v-if="thumnail!=''" :src="thumnail" alt="" />
					<i v-else class='el-icon-plus addThumbnail'></i>		  		
			  	</div>
			  </el-collapse-item>
			</el-collapse>

			<el-collapse id="catalogCollapse">
			  <el-collapse-item  name="2">
			    <template slot="title">
			      分类目录<i @click.capture.stop ="showAddCatalog" class="el-icon-plus addCatalog"></i>
			    </template>			  
				<eassy-catalog :checkCatalogs="JSON.stringify(eassyCatalogs)" @catalogChange="catalogChange"></eassy-catalog>
			  </el-collapse-item>
			</el-collapse>

			<el-collapse id="tagCollapse">
			  <el-collapse-item title="标签" name="1">
				<eassy-tags :tags="tags" @tagsChange="tagsChange" ref="tags"></eassy-tags>
			  </el-collapse-item>
			</el-collapse>

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
				<!-- <slot name="title">sadsad</slot> -->
				<catalog-create></catalog-create>
			</el-dialog>											
		</div>			
		<file-select-dialog :visiable="fileSelectDialogVisible" :selectOver="selectFileChange" ></file-select-dialog>	
	</div>
</template>

<script type="text/javascript">
	// var jQuery=require("lib/markDownEditor/lib/jquery.min.js");
	// var $=jQuery;
	// var jquery=jQuery;


  	import fileSelectDialog from "components/file-select-dialog.vue";
  	import eassyCatalog from "components/eassy-catalog.vue";
  	import catalogCreate from "components/catalog-create.vue";
  	import editor from "components/editor.vue";
  	import eassyTags from "components/eassy-tags.vue";



	export default {
		data () {
			  return {
			  	//文件选择框，大于0 显示，小于0 不显示
			  	fileSelectDialogVisible:-1,
			  	//新建目录框
			    createCatalogVisible:false,
			    eassyCatalogs:[],
			    eassyExcpert:"",
			    eassyTitle:"",
			    editorMd:"",
			    thumnail:"",
			    eassyStatus:"draft",
			    selectFiles:[],
			    fileInsertType:"editorInsert",
			    tags:[],
			    eid:"",
			    templateContent:""
			  }
		},
		components:{fileSelectDialog,eassyCatalog,catalogCreate,editor,eassyTags},	
		methods: {
			tagsChange:function(tags){
				this.tags=tags;
			},
			catalogChange:function(catalogs){
				console.log("接收事件");
				this.eassyCatalogs=catalogs;
			},
			selectFileChange:function(files){
				// console.log("filDialog");
				var self=this;
				this.selectFiles = files;
				if (this.fileInsertType == "editorInsert") {
					this.$refs.editor.insertImgToEditor(files);
				} else if (this.fileInsertType == "thumbnailInsertType") {
					//缩略图
					if (files.length > 0 && files[0].type.indexOf("image") >= 0) {
						self.thumnail = files[0].url;
					} else {
						self.$message.error("所选缩略图不是图片文件，或者为空 书写");
					}
				}

				this.fileSelectDialogVisible = -1;
				// console.log(files);
			},
			showFileSelect:function(type){
				var a=1;
				this.fileSelectDialogVisible=(Math.abs(this.fileSelectDialogVisible)+1)%2;
				this.fileInsertType=type;
			},
			showAddCatalog:function(){
				this.createCatalogVisible=true;
			},
			postEassy:function(eassyStatus){
				var self=this;

				self.editorMd=self.$refs.editor.editorMd;				

				self.eassyStatus=eassyStatus;
				//检查数据完整性

				if(self.eassyCatalogs.length<1){
					self.$message.error("文章目录不能为空");
					return;
				};
			    testEditormdView = editormd.markdownToHTML("editormd-view-html-new", {
                    markdown        : self.editorMd.getMarkdown() ,//+ "\r\n" + $("#append-test").text(),
                    //htmlDecode      : true,       // 开启 HTML 标签解析，为了安全性，默认不开启
                    htmlDecode      : "style,script,iframe,sub,sup|on*"  // you can filter tags decode
                    //toc             : false,
                });

                // console.log($("#test-editormd-view").html());

                var apiStr="eassy/post",
	                reqData={
						title:self.eassyTitle,
						content:$("#editormd-view-html-new")[0].outerHTML,
						templateContent:self.editorMd.getMarkdown(),
						status:self.eassyStatus,
						excerpt:self.eassyExcpert,
						belongCatalog:self.eassyCatalogs.join("&"),
						thumbnail:self.thumnail,
						tags:JSON.stringify(self.tags)
					};

				if(self.eid>0){
					apiStr = "eassy/modify";
					reqData = {
						title: self.eassyTitle,
						content: $("#editormd-view-html-new")[0].outerHTML,
						templateContent: self.editorMd.getMarkdown(),
						status: eassyStatus,
						excerpt: self.eassyExcpert,
						belongCatalog: self.eassyCatalogs.join("&"),
						thumbnail: self.thumnail,
						eid: self.eid,
						tags:JSON.stringify(self.tags)						
					}
				}

				self.$http.post(apiStr,reqData).
				then(function(res){
					if(res.data.state===200){
						self.$message.success("文章保存成功！");

						self.eid>0?false:self.clearEassy();
					}else{
						self.$message.error("文章保存失败！");
					}
				});

				//清空回显html
				$("#editormd-view-html-new").html("");
			},
			clearEassy:function(){
				var self=this;
				self.eassyTitle="";
				self.eassyStatus="draft";
				self.eassyExcpert="";
				self.eassyCatalogs=[];
				self.thumnail="";
				self.tags=[];

				//清除编辑器内容
				var editorMd=self.$refs.editor.editorMd;
				editorMd.clear();
               	editorMd.focus();				
			},
			getEassy:function(){
				var self=this;

				if(!self.eid){
					return;
				}

				console.log("获取文章");
				self.$http.post("eassy/get",{
					eid:self.eid
				}).
				then(function(res){
					if(res.data.state==200){
						console.log(res.data);
						var eassyInfo=self.eassyAllInfo=res.data.opRes[0];

						self.eassyTitle=eassyInfo.title;
						self.eassyStatus=eassyInfo.status;
						self.eassyExcpert=eassyInfo.excerpt;
						if(eassyInfo.tags){
							self.tags=eassyInfo.tags.split(",");							
						}

						//过滤文章目录信息
						var catalogsStr=eassyInfo.catalogs.split(",");
						var catalogs=[];
						for(var i=0;i<catalogsStr.length;i++){
							catalogs.push(parseInt(catalogsStr[i].split('&')[0]));
						}
						//过滤文章目录信息 end						
						self.eassyCatalogs=catalogs;
						// console.log(self.initCatalog);
						
						self.thumnail=eassyInfo.thumbnail;
						self.templateContent=eassyInfo.templateContent;
					}
				})
			},
			oninitEditor:function(){
				var self=this;
				var editorMd = self.$refs.editor.editorMd;
				editorMd.setMarkdown(self.templateContent);
				editorMd.focus();
			}
		},
		activated:function(){
			console.log("激活");			
			this.eid=parseInt(this.$route.params.eid);
			if(this.eid>0){
				this.getEassy();
			}			
		},
		mounted:function(){
			this.eid=parseInt(this.$route.params.eid);
			if(this.eid>0){
				this.getEassy();
			}	
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
		padding-left: 10px;
		padding-right: 300px;
	}
	.eassyEditorBox{
		position: relative;
	}

	#otherInfo{
		position: absolute;
		top: 0;
		right: 0;
		width: 300px;
		padding:50px 10px 0;
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


	@media screen and (max-width: 700px){
		.eassyEditorCon{
			padding-left: 10px;
			padding-right: 10px;
		}
		.eassyEditorBox{
			position: relative;
			overflow: auto;
		}

		#otherInfo{
			position: relative;
			top: 0;
			right: 0;
			width: 100%;
			padding:10px 10px 0;
			box-sizing:border-box;
			font-size: 14px;
		}		
	}
</style>