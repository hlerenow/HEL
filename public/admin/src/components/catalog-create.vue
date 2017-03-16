<template>
	<div class="catalogPage">
		<h4 class="rowTitle" style="color:#313030">创建目录</h4>

		<div class="self_input_inner">
			<div class="rowTitle">
				名称
			</div>
			<div class="self_row_content">
			  	<el-input v-model="catalogName" placeholder=""></el-input>
			  	<p class="tips">
			  		页面上显示的目录名称		  	
			  	</p>				
			</div>
		</div>
		<div class="self_input_inner">
			<div class="rowTitle">
				别名
			</div>
			<div class="self_row_content">
		  	<el-input v-model="catalogSlug" placeholder=""></el-input>
		  	<p class="tips">
		  		“别名”是在URL中使用的别称，它可以令URL更美观。通常使用小写，只能包含字母，数字和连字符（-）。		  	
		  	</p>			
			</div>
		</div>

		<div class="self_input_inner">
			<div class="rowTitle">
				父节点
			</div>
			<div class="self_row_content">
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
			</div>
		</div>

		<div class="self_input_inner">
			<div class="rowTitle">
				目录模版
			</div>
			<div class="self_row_content">
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
			</div>
		</div>

		<div class="self_input_inner">
			<div class="rowTitle">
				 
			</div>
			<div class="self_row_content">
	          <el-button @click.prevent="createCatalog"  class="createCatalog" type="primary" >
	            创建
	          </el-button>			
			</div>
		</div>


	</div>
</template>
<script type="text/javascript">
	import { mapState } from 'vuex'

	export default{
		data (){
			return {
				// catalogs:[{mid:0,name:"无"}],
				// catalogTemplates:[{name:"无",path:""}],
				pCatalogId:0,
				catalogName:"",
				catalogSlug:"",
				catalogTemplate:""
			}
		},
		props:['name',"slug","type","mid","parent","template"],
		computed:{
			...mapState({
				catalogTemplates:state=>state.catalog.catalogTemplates,
				catalogs:state=>state.catalog.catalogs
			})
		},
		methods:{
			createCatalog:function(){
				var catalog={
					name: this.catalogName,
					slug: this.catalogSlug,
					parent: this.pCatalogId,
					value: this.catalogTemplate
				};
				this.$store.dispatch("catalogAdd",catalog).then((res)=>{
					this.clearData();
				}).catch((err)=>{

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
		created:function(){
			this.$store.dispatch("catalogRequest").then(()=>{
			}).catch((err)=>{
				this.$message.error("目录拉取失败");
			});
		}		
	}
</script>
<style type="text/css">
	.self_input_inner,.self_row_content{
		overflow: hidden;
	}

	.self_input_inner .rowTitle{
	    float: left;
	    font-size: 14px;
	    width: 80px;
	    min-height: 1px;
	}
	.catalogPage .el-row{
		margin-bottom: 20px;
	}

	.catalogPage .el-input__inner{
		border-radius: 1px;
		height: 30px !important;
	}

	.pageTitle{
		color: #97a8be;
		font-weight: lighter;		
	}

	.el-select{
		width: 100%;
	}

</style>