<template>
	<div class="catalogPage">
		<h4 class="rowTitle" style="color:#313030">创建目录</h4>	
		<el-row :gutter="10">
		  <el-col :xs="24" :sm="5" :md="3" :lg="3" class="rowTitle">名称</el-col>		
		  <el-col :xs="24" :sm="18" :md="21" :lg="18">
		  	<el-input v-model="_name" placeholder=""></el-input>
		  	<p class="tips">
		  		页面上显示的目录名称		  	
		  	</p>
		  </el-col>	
		</el-row>
		<el-row :gutter="10">
		  <el-col :xs="24" :sm="5" :md="3" :lg="3" class="rowTitle">别名</el-col>		
		  <el-col :xs="24" :sm="18" :md="21" :lg="18">
		  	<el-input v-model="_slug" placeholder=""></el-input>
		  	<p class="tips">
		  		“别名”是在URL中使用的别称，它可以令URL更美观。通常使用小写，只能包含字母，数字和连字符（-）。		  	
		  	</p>
		  </el-col>
		</el-row>
		<el-row :gutter="10">
		  <el-col :xs="24" :sm="5" :md="3" :lg="3" class="rowTitle">父节点</el-col>		
		  <el-col :xs="24" :sm="18" :md="21" :lg="18">
			<el-select v-model="pCatalogId" placeholder="请选择">
				<el-option
				  v-for="item in catalogs"
				  :label="item.name"
				  :value="item.mid">
				</el-option>			
			</el-select>		  	
			<p class="tips">
				分类目录和标签不同，它可以有层级关系。您可以有一个“音乐”分类目录，在这个目录下可以有叫做“流行”和“古典”的子目录。		
			</p>
		  </el-col>
		</el-row>
		<el-row :gutter="10">
		  <el-col :xs="24" :sm="5" :md="3" :lg="3" style="text-indent:-999px;">.</el-col>
		  <el-col :xs="24" :sm="18" :md="21" :lg="18">
	          <el-button @click.prevent="createCatalog"  class="createCatalog" type="primary" >
	            创建
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
				pCatalogId:0,
				_name:"",
				_slug:"",

			}
		},
		props:['name',"slug","type","mid","parent"],
		methods:{
			getAllCatalog:function(){
				var self=this;
				self.$http.post("catalog/get").
				then(function(res){
					if(res.data.state===200){
						self.catalogs=self.catalogs.concat(res.data.opRes);
					}else{
			            self.$message({
			              message:"目录获取失败，服务器错误,请稍后再试！",
			              type:"error",
			              duration:0,
			              showClose:true
			            });
					}
				},function(res){
		            self.$message({
		              message:"网络错误,请检查网络连接,稍后再试！",
		              type:"error",
		              duration:2000,
		              showClose:true
		            });					
				});
			},
			createCatalog:function(){
				var self=this;
				self.$http.post("catalog/create",{
					name:this._name,
					slug:this._slug,
					parent:this.pCatalogId
				}).
				then(function(res){
					if(res.data.state===200){
						var catalogObj={
							name:self._name,
							slug:self._slug,
							mid:res.data.insertId
						};
						self.catalogs.push(catalogObj);
						self.clearData();
						self.$emit("catalog-created",catalogObj);
						self.$message({
			              message:"目录创建成功",
			              type:"success",
			              duration:2000,
			              showClose:true					
						})
					}else{
						self.$message({
			              message:"目录创建失败,请检查相关信息是否填写错误！",
			              type:"error",
			              duration:2000,
			              showClose:true						
						});					
					}
				},function(res){
		            self.$message({
		              message:"网络错误,请检查网络连接,稍后再试！",
		              type:"error",
		              duration:2000,
		              showClose:true
		            });	
				});
			},
			clearData:function(){
				this._name="";
				this._slug="";
				this.pCatalogId=0;
			}
		},
		mounted:function(){
			//获取已经存在的目录
			this.getAllCatalog();
			this._name=this.name;
			this._slug=this.slug;
			this.pCatalogId=this.mid||0;

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

</style>