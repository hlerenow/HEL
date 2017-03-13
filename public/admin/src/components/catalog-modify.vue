<template>
	<div class="catalogPage">
		<h4 class="rowTitle" style="color:#313030">修改目录</h4>	
		<el-row :gutter="10">
		  <el-col :xs="24" :sm="5" :md="3" :lg="3" class="rowTitle">名称</el-col>		
		  <el-col :xs="24" :sm="18" :md="21" :lg="18">
		  	<el-input v-model="row.name" placeholder=""></el-input>
		  </el-col>	
		</el-row>
		<el-row :gutter="10">
		  <el-col :xs="24" :sm="5" :md="3" :lg="3" class="rowTitle">别名</el-col>		
		  <el-col :xs="24" :sm="18" :md="21" :lg="18">
		  	<el-input v-model="row.slug" placeholder=""></el-input>
		  </el-col>
		</el-row>
		<el-row :gutter="10">
		  <el-col :xs="24" :sm="5" :md="3" :lg="3" class="rowTitle">父节点</el-col>		
		  <el-col :xs="24" :sm="18" :md="21" :lg="18">
			<el-select v-model="row.parent" placeholder="请选择">
				<el-option
				  label="无"
				  :value="0">
				</el-option>				
				<el-option
				  v-for="item in allCatalogs"
				  :label="item.name"
				  :value="item.mid">
				</el-option>			
			</el-select>		  	
		  </el-col>
		</el-row>

		<el-row :gutter="10">
		  <el-col :xs="24" :sm="5" :md="3" :lg="3" class="rowTitle">目录模版</el-col>		
		  <el-col :xs="24" :sm="18" :md="21" :lg="18">
			<el-select v-model="row.value" placeholder="请选择">
				<el-option
				  label="无"
				  :value="0">
				</el-option>				
				<el-option
				  v-for="item in templates"
				  :label="item.name"
				  :value="item.path">
				</el-option>			
			</el-select>		  	
		  </el-col>
		</el-row>

		<el-row :gutter="10">
		  <el-col :xs="24" :sm="5" :md="3" :lg="3" style="text-indent:-999px;">.</el-col>
		  <el-col :xs="24" :sm="18" :md="21" :lg="18">
	          <el-button @click.prevent="modifyCatalog" class="modifyCatalog" type="primary" >
	            修改
	          </el-button>		  
		  </el-col>		  	
		 </el-row>
	</div>
</template>
<script type="text/javascript">
	export default{
		data (){
			return {
				catalogs:[{mid:0,name:"无"}],
				selfName:"",
				selfSlug:""
			}
		},
		props:["row","allCatalogs","templates"],
		methods:{
			modifyCatalog:function(){
				var self=this;
				self.$http.post("catalog/modify",{
					mid:self.row.mid,
					name:self.row.name,
					parent:self.row.parent,
					slug:self.row.slug,
					value:self.row.value||""
				}).
				then(function(res){
					if(res.data.state===200){
						self.$bus.$emit("catalogModify",self.row);
						self.$message.success("目录修改成功！");
					}else{
						self.$message.error("修改失败！");
					}
				})
			}
		},
		mounted:function(){
		}
	}
</script>
<style type="text/css">
	.catalogPage .el-row{
		margin-bottom: 20px;
	}

	.catalogPage .el-input__inner{
		border-radius: 0;
	}
	.pageTitle{
		color: #97a8be;
		font-weight: lighter;		
	}
	.tips{
		font-size: 12px;
		color: gray;
	}
	.el-select{
		width: 100%;
	}
	.modifyCatalog{
		float: right;
	}

</style>