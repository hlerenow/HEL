<template>
	<div id="catalogList">
		<div class="toolBar">
			<div class="selectBox">
				<el-select v-model="opValue" placeholder="请选择">
				<el-option
					v-for="item in opList"
					:label="item.title"
					:value="item.value">
				</el-option>
				</el-select>				
			</div>
			<el-button type="primary" @click="multiOp">
			应用
			</el-button>			
		</div>

		 <el-table
		    :data="catalogs"
		    @selection-change="selectionChange"
		    style="width: 100%;"
		    empty-text="没有目录"
		    >
		    <el-table-column
		      type="selection" 		      
		      width="10">
		    </el-table-column>
		    <el-table-column
		      label="名称" 
		      prop="name"
		      width="30%" resizable>
		    </el-table-column>
		    <el-table-column
		      prop="slug"
		      label="别名" 
		      width="30%" resizable>
		    </el-table-column>
		    <el-table-column
		      label="目录模版" 
		      width="30%" resizable>
		      <template scope="scope">
					{{scope.row.value.name?scope.row.value.name:'无'}}
		      </template>		      
		    </el-table-column>
		    <el-table-column		 
		      label="文章数" 
		      width="30%" resizable>
				<template scope="scope">
					{{scope.row.count||0}}
				</template>			      
		    </el-table-column>

		    <el-table-column label="操作" width="30%">
		      <template scope="scope">
		        <el-button
		          size="small"
		          @click="catalogModifyFunc(scope.$index, scope.row)">编辑</el-button>
		        <el-button
		          size="small"
		          type="danger"
		          @click="catalogDelete(scope.$index, scope.row)">删除</el-button>
		      </template>
		    </el-table-column>		    
		</el-table>

		<el-dialog :title="dialogTitle" v-model="editorCatalogVisible">
			<catalog-modify @close="closeDialog" :allCatalogs="allCatalogs" :templates="catalogsTemplate" :row="modifyCatalog"></catalog-modify>
		</el-dialog>

	</div>
</template>
<script type="text/javascript">
  	import catalogModify from "components/catalog-modify.vue";
	import { mapState } from 'vuex'
	import * as types from 'store/mutation-types'

	export default{
		data (){
			return {
				opList:[
					{
						title:"批量操作",
						value:"none"
					},
					{
						title:"删除",
						value:"delete"
					}
				],
				opValue:"none",
				selectObj:[],
				editorCatalogVisible:false,
				dialogTitle:"",
				modifyCatalog:{
					name:"",
					mid:"",
					slug:"",
					parent:0,
					index:"",
					value:"无"
				}
			}
		},
		computed:{
			selectMidArry:function(){
				var midArry=[];
				this.selectObj.forEach(function(ite){
					midArry.push(ite.mid);
				});
				return midArry;
			},			
			...mapState({
				catalogTemplates:state=>state.catalog.catalogTemplates,
				catalogs:(state)=>state.catalog.catalogs
			}),

		},
		components:{catalogModify},
		methods:{
			selectionChange:function(val){
				this.selectObj=val;
			},
			catalogDelete:function(index,row){
				this.postDeleteCatalog([row.mid],[row]);
			},
			//删除多个目录
			catalogsDelete:function(){
				this.postDeleteCatalog(this.selectMidArry,this.selectObj);
			},
			postDeleteCatalog:function(midArry,objArry){
				var self=this;

				if(midArry.length<=0){
					self.$message.error("您没有选中目录");
					return;
				}

				self.$http.post("catalog/delete",{mids:JSON.stringify(midArry)}).
				then(function(res){
		
					if(res.data.state===200){
						self.$store.commit(types.CATALOG_DELETE,midArry);
						self.$message.success("目录删除成功");
					}else{
						self.$message.error("目录删除失败");					
					}
				})				
			},
			multiOp:function(){
				if(this.opValue=="delete"){
					this.catalogsDelete();
				}
			},
			catalogModifyFunc:function(index,row){
				var self=this;

				var modifyCatalog = {
					index: index,
					name: row.name,
					mid: row.mid,
					slug: row.slug,
					parent: row.parent,
					value: row.value
				}
				console.log(row.value);
				self.modifyCatalog=modifyCatalog;
				self.dialogTitle=row.name;
				self.editorCatalogVisible=true;

			},
			closeDialog(){
				this.editorCatalogVisible=false;
			}

		}
	}
</script>

<style type="text/css">
	.el-table table{
		width: 100% !important;
	}
	.el-table__empty-block{
		width: 100% !important;
	}
	#catalogList .toolBar{
		margin-bottom: 5px;
	}
	.selectBox{
		display: inline-block;
		width: 120px;
		margin-right: 10px;
	}
</style>