<template>
	<tr class="tdRow">
		<th class="settingLable">站点标题</th>
		<td>
			<el-input />
		</td>
	</tr>
</template>
<style type="text/css">
	.settingLable{
		width: 200px;
		text-align: left;
	}

	.tdRow .el-input__inner{
	    width: 25em;
	    height: 28px;	
	    border-radius: 1px;		
	}	
	
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


<!-- <template>
	<div class="option__row" :class="{h:!isV,v:isV}">
			<div class="opTitle">{{label}}</div>
			<div class="opRInputWrap">
				<el-input v-model="input" @change="changeValue" :placeholder="placger"></el-input>
			</div>		
	</div>
</template>
<script type="text/javascript">
	export default{
		props:{
			with:{
				default:'100%'
			},
			label:{
				default:""
			},
			placger:{
				default:""
			},
			direct:{
				default:"v"
			}
		},
		methods:{
			widthC:function(){
				if((typeof this.width)=='number'){
					return this.width+"px";
				}else{
					return this.width;
				}
			},
			changeValue:function(value){
				this.$emit("change",value);
			}
		},
		computed:{
			isV:function(){
				if(this.direct=='v'){
					return true;
				}else{
					return false;
				}
			}
		}
	}
</script>
<style type="text/css">
	/*公用样式*/
	.opTitle{
	    color:  #324157;;
	    font-size: 16px;
	    font-weight: bold;
	}

	/*垂直样式*/
	.option__row.h .opTitle{
		padding: 15px 0 8px;		
	}

	/*水平样式*/
	.option__row.v .opTitle{
		
	}

	.option__row.v .opTitle,
	.option__row.v .opRInputWrap{
		float: left;
	}
</style> -->