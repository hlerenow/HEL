<template>
	<div class="catalogPage">
		<h4 class="rowTitle" style="color:#313030">创建目录</h4>	
		<el-row :gutter="10">
		  <el-col :xs="24" :sm="5" :md="3" :lg="3" class="rowTitle">名称</el-col>		
		  <el-col :xs="24" :sm="18" :md="21" :lg="18">
		  	<el-input v-model="catalogName" placeholder=""></el-input>
		  	<p class="tips">
		  		页面上显示的目录名称		  	
		  	</p>
		  </el-col>	
		</el-row>
		<el-row :gutter="10">
		  <el-col :xs="24" :sm="5" :md="3" :lg="3" class="rowTitle">别名</el-col>		
		  <el-col :xs="24" :sm="18" :md="21" :lg="18">
		  	<el-input v-model="catalogSlug" placeholder=""></el-input>
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
<!-- 		<el-row :gutter="10">
		  <el-col :xs="24" :sm="5" :md="3" :lg="3" class="rowTitle">目录模版</el-col>
		  <el-col :xs="24" :sm="18" :md="21" :lg="18">
			<el-select v-model="catalogTemplate" placeholder="请选择">
				<el-option
				  v-for="item in catalogTemplates"
				  :label="item.name"
				  :value="item.path">
				</el-option>			
			</el-select>		  	
			<p class="tips">
				分类目录对应的页面模版
			</p>
		  </el-col>
		</el-row> -->		
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
				catalogTemplates:[{name:"无",path:""}],
				pCatalogId:0,
				catalogName:"",
				catalogSlug:"",
				catalogTemplate:""
			}
		},
		props:['name',"slug","type","mid","parent","template"],
		methods:{
			getAllCatalog:function(){
				var self=this;
				self.$http.post("catalog/get").
				then(function(res){
					if(res.data.state===200){
						self.catalogs=self.catalogs.concat(res.data.opRes);
						self.catalogTemplates=self.catalogTemplates.concat(res.data.templates);
						self.$bus.$emit("getAllCatalog",{catalogs:res.data.opRes,templates:res.data.templates});

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
					name:this.catalogName,
					slug:this.catalogSlug,
					parent:this.pCatalogId,
					value:this.catalogTemplate
				}).
				then(function(res){
					if(res.data.state===200){
						var catalogObj={
							name:self.catalogName,
							slug:self.catalogSlug,
							mid:res.data.insertId,
							template:self.catalogTemplate
						};
						self.catalogs.push(catalogObj);
						self.clearData();
						//全局事件触发
						self.$bus.$emit("catalog-created",catalogObj);
						self.$message({
			              message:"目录创建成功",
			              type:"success",
			              duration:2000,
			              showClose:true					
						});
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
				this.catalogName="";
				this.catalogSlug="";
				this.pCatalogId=0;
				self.catalogTemplate="";
			},
			getUpdateCatalog:function(rowArry){
				var res=[];
				var midArry=[];
				rowArry.forEach(function(ite){
					midArry.push(ite.mid);
				});

				for(var i =0;i<this.catalogs.length;i++){
					if(midArry.indexOf(this.catalogs[i].mid)<0){
						res.push(this.catalogs[i]);
					}
				}
				return res;
			},
			getCatalogIndex:function(mid){
				this.catalogs.forEach(function(ite,index){
					if(ite.mid===mid){
						return index;
					}

				})
				return -1;			
			}
		},
		mounted:function(){
			//获取已经存在的目录
			var self=this;
			this.getAllCatalog();
			this.catalogName=this.name;
			this.catalogSlug=this.slug;
			this.pCatalogId=this.mid||0;
			this.$bus.$on("catalogDelete",function(rowArry){
				console.log("目录删除事件");
				self.catalogs=self.getUpdateCatalog(rowArry);
			});
			//目录修改监听
			this.$bus.$on("catalogModify",function(row){
				var index=self.getCatalogIndex(row.mid);
				self.catalogs.splice(index,1,{
					name:row.name,
					slug:row.slug,
					parent:row.parent,
					mid:row.mid
				});
			});			

		}
	}
</script>
<style type="text/css">
	.catalogPage .el-row{
		margin-bottom: 20px;
	}

	.catalogPage .el-input__inner{
		border-radius: 1px;
	}
	.pageTitle{
		color: #97a8be;
		font-weight: lighter;		
	}

	.el-select{
		width: 100%;
	}

</style>