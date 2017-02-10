<template>
	<el-row :gutter="10">

	  <el-col :xs="24" :sm="12" :md="12" :lg="14" class="catalogCreate--left">
		<h2 class="rowTitle">创建目录</h2>
		<catalog-create v-on:catalog-created="catalogCreated"></catalog-create>			
	  </el-col>
	  <el-col :xs="24" :sm="12" :md="12" :lg="10" class="catalogList--right" >
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

			}
		},
		components:{catalogCreate,catalogList},
		methods:{
			catalogCreated:function(data){
				console.log(data);
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
		padding:50px 20px 0 0 !important;
	}
</style>