<template>
  <el-checkbox-group v-model="eassyCatalogs" @change="selectCatalog">
    <el-checkbox v-for="ite in catalogs"  :label="ite.mid">{{ite.name}}</el-checkbox>
  </el-checkbox-group>	
</template>

<script type="text/javascript">
	import { mapState } from 'vuex'
	export default{
		data (){
			return{
				selectObj:[],
				eassyCatalogs:[]
			}
		},
		props:["checkCatalogs"],
		watch:{
			checkCatalogs:function(newVal){
				this.eassyCatalogs=JSON.parse(newVal);
			}
		},
		computed:{
			// selectMidArry:function(){
			// 	var midArry=[];
			// 	this.selectObj.forEach(function(ite){
			// 		midArry.push(ite.mid);
			// 	});
			// 	return midArry;
			// },			
			...mapState({
				catalogTemplates:state=>state.catalog.catalogTemplates,
				catalogs:(state)=>state.catalog.catalogs
			})
		},		
		methods:{
			selectCatalog:function(){
				var self=this;
				console.log("触发事件");
				self.$emit("catalogChange",self.eassyCatalogs);
			},
			initCatalog:function(){
				this.eassyCatalogs=JSON.parse(this.checkCatalogs);
			}
		},
		created:function(){
			this.$store.dispatch("catalogRequest").then(()=>{
			}).catch((err)=>{
				this.$message.error("目录拉取失败");
			});
		}
	};
</script>