<template>
	<div >
		<div id="otherInfo">
			<el-collapse id="thumbnailCollase">
			  <el-collapse-item title="缩略图" name="1">
			    <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
			    <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
			  </el-collapse-item>
			</el-collapse>

			<el-collapse id="catalogCollapse">
			  <el-collapse-item title="分类目录" name="1">
			    <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
			    <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
			  </el-collapse-item>
			</el-collapse>

			<el-collapse id="tagCollapse">
			  <el-collapse-item title="标签" name="1">
			    <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
			    <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
			  </el-collapse-item>
			</el-collapse>

			<el-collapse id="excpertCollapse">
			  <el-collapse-item title="摘要" name="1">
			    <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
			    <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
			  </el-collapse-item>
			</el-collapse>				

			<el-collapse id="publishCollapse">
			  <el-collapse-item title="发布" name="1">
			    <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
			    <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
			  </el-collapse-item>
			</el-collapse>									
		</div>		
		<div class="eassyEditorCon">
			<h2 class="pageTitle">撰写文章</h2>
			<el-input v-model="input" class="eassy--title" placeholder="请输入标题"></el-input>
			<el-button id="addFile-btn"><i class="el-icon-picture"></i> 添加媒体</el-button>
			<div id="editormd">
				<textarea style="display:none;">### Hello Editor.md !</textarea>
			</div>		
		</div>
	</div>
</template>

<script type="text/javascript">
	var jQuery=require("jQuery"),
		$=jQuery;

	var editormd=require('editormd');

	export default {
		data () {
		  return {
		    username:'',
		    password:'',
		    tips:""
		  }
		},
		methods: {

		},
		computed:{
		},
		mounted:function(){
			$(function() {
			    var editor = editormd("editormd", {
			        path : "./lib/markDownEditor/lib/",
			        height:"500px",
			        width:"99%",
			        tocm:true,
			        toolbarIcons:function() {
			            // console.log(editormd.toolbarModes["full"]); // full, simple, mini
			            // Using "||" set icons align right.
			            return ["undo", "redo","clear", "|", "bold", "del", "italic", "quote", "ucwords", "uppercase", "lowercase", "|", "h1", "h2", "h3", "h4", "h5", "h6", "|", "list-ul", "list-ol", "hr", "|", "link", "reference-link", "image", "code", "preformatted-text", "code-block", "table", "datetime", "html-entities", "pagebreak", "|", "goto-line", "watch", "preview", "fullscreen",  "search", "|", "help"]
			        }			        
			    });
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
		width: 280px;
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
	.pageTitle{
		color: #97a8be;
		font-weight: lighter;		
	}


</style>