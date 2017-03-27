<template>
	<div id="menue">
		<h3 class="pageTitle">菜单管理</h3>
		<div class="menue-left">
			<h4>可选菜单项</h4>
			<el-collapse  accordion>
			  <el-collapse-item title="目录" name="2">
					<menue-catalog @submit="addCatalog"></menue-catalog>
			  </el-collapse-item>
			  <el-collapse-item  title="自定义链接" name="1">
					<design-menue-link @submit="addCatalog" ></design-menue-link>
			  </el-collapse-item>		  
			</el-collapse>			
		</div>
		<div class="menue-right">
				<div class="menueDesingBox">
					<h4>
						自定义菜单					
					</h4>
					<div class="menueTips" v-show="designMenus.length==0">
						还没有创建菜单哦,快在左侧添加吧！
					</div>
					<draggable v-model="myArray" v-show="designMenus.length>0" @end="con">
					    <transition-group>
					        <div v-for="(element,index) in designMenus" :key="index+element.type" class="menue_item">
					        <!-- <span class="menueName" @click="changeMenueName">{{element.name}}</span> -->
					        	<input type="text" v-model="element.name">
					             <i class="el-icon-delete" @click="deleteMenue(element)"></i> <span class="menueType">{{element.type | filteMenueType}}</span>
					        </div>
					    </transition-group>
					</draggable>
					<div class="menue_btn_submit save">
						<el-button @click="modifyMenue" >保存</el-button>
					</div>					
				</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import designMenueLink from 'components/design-menue-link';
	import menueCatalog from 'components/menue-catalog';
  	import eassyTags from "components/eassy-tags.vue";

	import draggable from 'vuedraggable';

	var jQuery=require("jQuery"),
		$=jQuery,
		jquery=jQuery;


	export default{
		data(){
			return {
				myArray:[],
				designMenus:[]
			}
		},
		components:{designMenueLink,menueCatalog,draggable},
		methods:{
			addCatalog(catalogs){
				this.designMenus=this.designMenus.concat(catalogs);
			},
			modifyMenue(){
				this.$http.post("menue/modify",{
					menue:JSON.stringify(this.designMenus)
				}).then((res)=>{
					if(res.data.state==200){
						this.$message.success("菜单修改成功");
					}else{
						this.$message.error("菜单修改成失败");						
					}
				})
			},
			deleteMenue(item_meune){
				this.designMenus.splice(this.designMenus.indexOf(item_meune),1);
			},
			con:function(a){
				var temp=this.designMenus[a.oldIndex];
				this.designMenus[a.oldIndex]=this.designMenus[a.newIndex];
				this.designMenus[a.newIndex]=temp;
			},
			changeMenueName:function(e){
			}
		},
		filters:{
			filteMenueType(val){
				var res="";
				switch (val){
					case "link":
							res="自定义链接";
							break;
					case "catalog":
							res="目录";
							break;
				}
				return res;
			}
		},
		created:function(){
			this.$http.get("menue/get").then((res)=>{
				if(res.data.state=200){
					this.designMenus=JSON.parse(res.data.opRes);
				}
			});
		}
	}
</script>
<style type="text/css">
	#menue{
		padding-left: 10px;
		overflow: hidden;
	}
	.menue-left{
		float:left;
		width: 300px;
		margin-left: 20px;
	}

	.menue-right{
		overflow: hidden;
	}

	.menueTips{
		min-height: 200px;
		border: 1px dashed #d4d1d1;
		border-radius: 2px;
		padding: 15px 30px;
		font-size: 14px;
		color: #a5a3a3;		
	}
/**
 * elemenyUI
 */
.el-collapse-item__header{
	position: relative;
}
#menue .el-collapse-item__header__arrow.el-icon-arrow-right{
    transform: rotate(90deg);
    position: absolute;
    right: 5px;
    top: 15px;	
}

#menue .el-collapse-item.is-active>.el-collapse-item__header .el-collapse-item__header__arrow{
    transform: rotate(-90deg) ;

}
.menueDesingBox{
	padding-left: 30px;
}
.menue_item{
	position: relative;
	border:1px solid #dfe6ec;
    padding: 10px 15px;
	margin:0 0 5px;
	font-size: 14px;
	overflow: hidden;
}
.menue_item i,.menue_item .menueType{
	float: right;
}

.menue_item i{
	padding: 1px 5px;
	display: inline-block;
}
.menue_item input{
	border: none;
	padding: 5px 10px;
	width: 200px;
}

.el-collapse-item__content{
	overflow: hidden;
}
.menue_btn_submit button{
	float: right;
}
.menue_btn_submit.save{
	border-top: 0px;
}
</style>