<template>
	<div>

		<el-row :gutter="20">
		  <el-col :span="6">
			  <el-select v-model="opValue" placeholder="请选择">
			    <el-option
			      v-for="item in opList"
			      :label="item.title"
			      :value="item.value">
			    </el-option>
			  </el-select>	  	
		  </el-col>
		  <el-col :span="6">
			<el-button type="primary" @click="multiOp">
				应用
			</el-button>
		  </el-col>
		</el-row>

		  <el-table
		    :data="allCatalogs"
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
		    <el-table-column label="操作" width="30%">
		      <template scope="scope">
		        <el-button
		          size="small"
		          @click="catalogModify(scope.$index, scope.row)">编辑</el-button>
		        <el-button
		          size="small"
		          type="danger"
		          @click="catalogDelete(scope.$index, scope.row)">删除</el-button>
		      </template>
		    </el-table-column>		    
		  </el-table>

		<el-dialog :title="dialogTitle" v-model="editorCatalogVisible">
			<catalog-modify :allCatalogs="allCatalogs" :row="modifyCatalogData"></catalog-modify>
		</el-dialog>

	</div>
</template>
<script type="text/javascript">
  	import catalogModify from "components/catalog-modify.vue";
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
				allCatalogs:[],
				opValue:"none",
				selectObj:[],
				editorCatalogVisible:false,
				dialogTitle:"",
				modifyCatalogData:{
					name:"",
					mid:"",
					slug:"",
					parent:0,
					index:""
				}
			}
		},
		components:{catalogModify},
		methods:{
			selectionChange:function(val){
				this.selectObj=val;
			},
			catalogDelete:function(index,row){
				console.log("删除单个目录",row.mid);
				this.postDeleteCatalog([row.mid],[row]);
			},
			//删除多个目录
			catalogsDelete:function(){
				this.postDeleteCatalog(this.selectMidArry,this.selectObj);
			},
			postDeleteCatalog:function(midArry,objArry){
				var self=this;
				console.log(JSON.stringify(midArry));
				self.$http.post("catalog/delete",{mids:JSON.stringify(midArry)}).
				then(function(res){
					console.log(res);
					if(res.data.state===200){
						self.$message.success("目录删除成功");
						self.allCatalogs=self.getUpdateCatalog(objArry);
						self.$bus.$emit("catalogDelete",objArry);
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
			getUpdateCatalog:function(rowArry){
				var res=[];
				var midArry=[];
				rowArry.forEach(function(ite){
					midArry.push(ite.mid);
				});

				for(var i =0;i<this.allCatalogs.length;i++){
					if(midArry.indexOf(this.allCatalogs[i].mid)<0){
						res.push(this.allCatalogs[i]);
					}
				}
				return res;
			},
			catalogModify:function(index,row){
				var self=this;
				console.log(row);
				self.dialogTitle=row.name;
				self.modifyCatalogData.index=index;
				self.modifyCatalogData.name=row.name;
				self.modifyCatalogData.mid=row.mid;
				self.modifyCatalogData.slug=row.slug;
				self.modifyCatalogData.parent=row.parent;

				self.editorCatalogVisible=true;

			}			

		},
		computed:{
			selectMidArry:function(){
				var midArry=[];
				this.selectObj.forEach(function(ite){
					midArry.push(ite.mid);
				});
				return midArry;
			}
		},
		mounted:function(){
			console.log("catalog-list 初始化");
			var self=this;
			//获取所有的目录事件
			this.$bus.$on("getAllCatalog",function(data){
				self.allCatalogs=self.allCatalogs.concat(data);
			});
			//目录创建监听
			this.$bus.$on("catalog-created",function(data){
				self.allCatalogs.push(data);
			});

			//目录修改监听
			this.$bus.$on("catalogModify",function(row){
				self.allCatalogs.splice(row.index,1,{
					name:row.name,
					slug:row.slug,
					parent:row.parent,
					mid:row.mid
				});
				self.editorCatalogVisible=false;
			});
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
</style>