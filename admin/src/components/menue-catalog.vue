<template>
	<div class="menueCatalog">
		<eassy-catalog  ref="eCatalog" @catalogChange="catalogChange"></eassy-catalog>
		<div class="menue_btn_submit">
			<el-button @click="submit">添加</el-button>
		</div>		
	</div>
</template>
<script type="text/javascript">
  	import eassyCatalog from "components/eassy-catalog.vue";
	export default{
		data(){
			return {
				selectCatalogs:[],
				initCatalogs:[]
			};
		},
		components:{eassyCatalog,},
		methods:{
			submit(){
				var sendCatalogs=[];
				var allCatalogs=this.$store.state.catalog.catalogs;
				allCatalogs.forEach((item)=>{
					if(this.selectCatalogs.indexOf(item.mid)>=0){
						sendCatalogs.push({
							type:"catalog",
							name:item.name,
							slug:item.slug
						});
					}
				});
				this.$emit("submit",sendCatalogs);
				this.selectCatalogs=[];
				this.$refs.eCatalog.clear();
			},
			catalogChange(catalogs){
				// console.log(catalogs);
				this.selectCatalogs=catalogs;
			}
		}
	}	
</script>
<style type="text/css">
	.menueCatalog .el-checkbox-group{
		margin-bottom: 10px;
	}
	.menueCatalog .el-checkbox{
		display: block;
		margin: 0;
	}
	.menue_btn_submit{
	    padding-top: 10px;
	    width: 100%;
	}

	.menue_btn_submit button{
		float: right;
	}
</style>