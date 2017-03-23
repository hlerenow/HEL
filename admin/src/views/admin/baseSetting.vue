<template>
	<div id="baseSetting">
	<h2 class="settingTitle">常规选项</h2>
	<table>
		<tr class="tdRow" v-for="ite in options">
			<th class="settingLable">
				<template v-if="ite.label!=''">
					{{ite.label}}
				</template>
				<template v-else>
					{{ite.name}}
				</template>
				<!-- {{站点标题}} -->
			</th>
			<td >
				<el-input v-model="ite.value" />
				<template v-if="ite.description!=''">
					<p class="decription">{{ite.description}}</p>					
				</template>
			</td>
		</tr>
	</table>
	<el-button @click="saveStaticSetting">保存设置</el-button>
	</div>
</template>
<script type="text/javascript">


	export default{
		data (){
			return{
				options:[]
			}
		},
		methods:{
			saveStaticSetting:function(){
				//后期可以做脏着判断，未修改的值不用更新
				var self=this;
				console.log(JSON.stringify(self.options));
				self.$http.post("option/modify",{options:JSON.stringify(self.options)}).
				then(function(res){
					if(res.data.state===200){
						self.$message.success("保存成功");
					}else{
						self.$message.error("保存失败 : "+res.data.info);
					}
				})
			}
		},
		mounted:function(){
			var self=this;
			self.$http.post("option/getStatic").
			then(function(res){
				if(res.data.state===200){
					self.options=res.data.opRes;
				}else{
					self.$message.error("博客设置获取失败 : "+res.data.info);
				}
			});
		}

	}
</script>
<style type="text/css">
	#baseSetting {
		padding-left: 10px;
	}

	#baseSetting table{
		width: 100%;
	}
	.settingTitle{
		color: #6482ae;
	}

	.tdRow td{
		padding-bottom:20px;
	}	

	/*option 列样式*/
	.settingLable{
		width: 200px;
		text-align: left;
		vertical-align: top;
		color: #1e3a63;
	}


	.tdRow .el-input__inner{
	    width: 25em;
	    height: 28px;	
	    border-radius: 1px;		
	}

	.tdRow .decription{
		margin: 10px auto;
		font-size: 14px;
		color: #9fa9b6;
	}
	
	/*媒介查询*/
	@media screen and (max-width: 700px){			
		.settingLable{
			display: block;
			width: auto;
		}

		.tdRow td{
			display: block;
			width: auto;			
		}
		.tdRow .el-input__inner{
		    width: 100%;
		    height: 28px;			
		}			

	}	
</style>