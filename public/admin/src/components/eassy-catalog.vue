<template>
  <el-checkbox-group v-model="eassyCatalogs" @change="selectCatalog">
    <el-checkbox v-for="ite in catalogs"  :label="ite.mid">{{ite.name}}</el-checkbox>
  </el-checkbox-group>	
</template>

<script type="text/javascript">
	export default{
		data () {
			return {
				eassyCatalogs:[37],
				catalogs:[]
			};
		},
		props:["checkCatalogs"],
		methods:{
			selectCatalog:function(){
				var self=this;
				self.$bus.$emit("eassyCatalofChage",self.eassyCatalogs);
			},
			getAllCatalog:function(){
				var self=this;
				self.$http.post("catalog/get").
				then(function(res){
					if(res.data.state===200){
						self.catalogs=self.catalogs.concat(res.data.opRes);
						console.log("445566");
					console.log(self.eassyCatalogs);
					console.log(self.catalogs);
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
		},
		mounted:function(){
			var self=this;
			//获取目录
			this.getAllCatalog();

			this.$bus.$on("catalog-created",function(data){
				self.catalogs.push(data);
			});

			//初始化目录使用
			this.$watch("checkCatalogs",function(newVal){
				console.log("change");

					self.eassyCatalogs=newVal;
					console.log(self.eassyCatalogs);
					console.log(self.catalogs);

			});
		}
	};
</script>