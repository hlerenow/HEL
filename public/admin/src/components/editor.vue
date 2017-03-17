<template>
	<div class="editor">
		<div :id="editorId">
		    <textarea style="display: none;"></textarea>
		    <!-- html textarea 需要开启配置项 saveHTMLToTextarea == true -->
		    <textarea class="editormd-html-textarea" name="editormd-html-code"></textarea>				
		</div>		
		<div style="display: none;">
			<div id="editormd-view-html-new"></div>				
		</div>		
	</div>
</template>
<script type="text/javascript">
	var jQuery=require("jQuery"),
		$=jQuery,
		jquery=jQuery;

	var editormd=require('editormd');
	// 
	// var jQuery=require("lib/markDownEditor/lib/jquery.min.js");
	// var $=jQuery;
	// var jquery=jQuery;
	

	export default{
		data (){
			return {
				editorId:"editor",
				editorMd:{},
				insertMedia:[]
			};
		},
		props:{
			toolBar:{
				default:()=>{
					return ["undo", "redo", "clear", "|", "bold", "del", "italic", "quote", "ucwords", "uppercase", "lowercase", "|", "h1", "h2", "h3", "h4", "h5", "h6", "|", "list-ul", "list-ol", "hr", "|", "link", "reference-link", "image", "code", "preformatted-text", "code-block", "table", "datetime", "html-entities", "pagebreak", "|", "goto-line", "watch", "preview", "fullscreen", "search", "|", "help"];
				},
				type:Array
			},
			width:{
				default:"99%"
			},
			height:{
				default:"600px"
			},
			htmlDecode:{
				default:"style,script,iframe,sub,sup|on*"
			}
		},
		watch:{
			insertMedia:function(newVal){
				
			}
		},
		methods:{
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
			}
		},
		created:function(){
			this.editorId+=this.$store.state.componentUid;
			this.$store.commit("componentUidUpdate");
		},
		mounted:function(){
			var jqEditorId="#"+this.editorId;
			this.$nextTick(()=>{
				var self = this;
				var editor = editormd(this.editorId, {
					path: "./lib/markDownEditor/lib/",
					height: self.height,
					watch: true,
					width: self.width,
					htmlDecode: self.htmlDecode,
					toolbarIcons: function() {
						// Using "||" set icons align right.
						return self.toolBar;
					},
					onfullscreen: function() {
						$(jqEditorId).css("z-index", "10000");
						$(jqEditorId).css("width", "100%");
					},
					onfullscreenExit: function() {
						$(jqEditorId).css("z-index", "inherit");
						$(jqEditorId).css("width", "99%");						
					},
					onload: function() {
						this.unwatch();
					}		
				});
				self.editorMd = editor;
			});
		}
	}
	
</script>