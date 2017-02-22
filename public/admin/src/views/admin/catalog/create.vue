<template>
	<el-row :gutter="10">

	  <el-col :xs="24" :sm="8" :md="8" :lg="10" class="catalogCreate--left">
		<h2 class="rowTitle">创建目录</h2>
		<catalog-create></catalog-create>			
	  </el-col>
	  <el-col :xs="24" :sm="16" :md="16" :lg="14" class="catalogList--right" >
			<catalog-list></catalog-list>
	  </el-col >
	</el-row>
</template>

<script type="text/javascript">
  	import catalogCreate from "components/catalog-create.vue";
  	import catalogList from "components/catalog-list.vue";
	export default{
		data (){
			return{
				allCatalogs:[]

			}
		},
		components:{catalogCreate,catalogList},
		methods:{
			catalogCreated:function(data){
				console.log(data);
			},
			getAllCatalog:function(data){
				this.allCatalogs=data;
				console.log(this.allCatalogs);
			}
		}
	}
</script>

<style type="text/css">
	.rowTitle{
		color: gray;
		padding-left: 10px !important;
	}

	.catalogList--right{
		box-sizing:border-box;
		padding:70px 20px 0 10px !important;
	}

	.catalogList--right .el-row{
		margin-bottom: 8px;
	}

	.el-input__inner{
		border-radius: 1px !important;
	}
	.el-button{
		border-radius: 1px !important;
	}
</style>