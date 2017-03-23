<template>
	<el-dialog id="selectDialog" size="large" :title="title" v-model="selfVisiable">
		<el-button id="insertFile-btn" @click="selectEnd()">{{btn_label}}</el-button>
		<el-tabs type="card">
		  <el-tab-pane label="媒体库">
		  	<file-select  ref="fileSelect" v-on:fileChange="selectFileChange"></file-select>
		  </el-tab-pane>
		  <el-tab-pane label="添加">
				<media-add :pFileListShow="false"></media-add>
		  </el-tab-pane>
		</el-tabs>		
	</el-dialog>	
</template>

<script type="text/javascript">
	import fileSelect from "components/file-select.vue"
	import mediaAdd from "components/media-add.vue"

	export default{
		data(){
			return {
				selfVisiable:false,
				selectFiles:[]
			};
		},
		props:{
			btn_label:{
				default:"插入"
			},
			title:{
				default:"插入媒体"
			},
			visiable:{
				default:-1
			},
			selectOver:{
				default:function(){}
			}
		},
		watch:{
			visiable:function(newVal){
				console.log("值改变");
				if(newVal<0){
					this.selfVisiable=false;					
				}else{
					this.selfVisiable=true;
				}
			}
		},
		components:{fileSelect,mediaAdd},
		methods:{
			selectFileChange:function(selectFiles){
				this.selectFiles=selectFiles;
			},
			selectEnd:function(){
				//将子组件的选择数据清空
				this.$refs.fileSelect.initCheckArry();
				this.selectOver(this.selectFiles);
			}
		}
	}
</script>