<template>
	<div id="eassyList">
		<h2 class="pageTitle">文章</h2>
		<div class="eassysInfo">
			<a href="">全部（{{eassysInfo.allEassy}}）</a>| <a href="">已发布（{{eassysInfo.pubEassy}}）</a>| <a href="">草稿（{{eassysInfo.draftEassy}}）</a>
			<div id="search--model">
				<el-input></el-input>
				<el-button> 搜索文章</el-button>
			</div>
		</div>
		<div id="eassyActions">
			<el-button class="deleteMulti" type="danger">批量删除</el-button>
			<el-select v-model="searchCatalog" placeholder="请选择">
				<el-option label="全部目录" value="" check></el-option>
				<el-option
				  v-for="item in catalogs"
				  :label="item.name"
				  :value="item.mid">
				</el-option>
			</el-select>
			<el-button>筛选</el-button>
		</div>
	  <el-table
	    :data="eassyList"
	    style="width: 100%"
	    @selection-change="">
	    <el-table-column
	      type="selection"
	      width="55">
	    </el-table-column>

	    <el-table-column
	      label="标题"
	      width="120">
	      <template scope="scope">{{ scope.row.title }}</template>
	    </el-table-column>

	    <el-table-column
	      label=" 作者"
	      width="120">
	      <template scope="scope">{{ scope.row.nickName }}</template>     
	    </el-table-column>

	    <el-table-column
	      label="目录"
	      >
	      <template scope="scope">{{ scope.row.catalogs | catalogFormat }}</template>	      
	    </el-table-column>	

	    <el-table-column
	      label="状态"
	      >
	      <template scope="scope">{{ scope.row.status | statusFormat }}</template>	      
	    </el-table-column>	    

	    <el-table-column
	      label="日期"
	      >
	      <template scope="scope"><span class="tips">最后修改于</span></br> {{ scope.row.modified | timeToStr }}</template>	      
	    </el-table-column>
	    <el-table-column
	      label="操作"
	      >
	      <template scope="scope">
	      	<el-button type="info">编辑</el-button>
	      	<el-button type="danger">删除</el-button>
	      </template>	      
	    </el-table-column>
	  </el-table>
		<div id="eassyListPagination" v-show="totalEassysCount">
		    <el-pagination
			  @current-change=""
		      :current-page="page"
		      :page-size="pageSize"
		      layout="total, prev, pager, next,jumper"
		      :total="totalEassysCount">
		    </el-pagination>			
		</div>	  
	</div>
</template>
<script type="text/javascript">
	export default{
		data (){
			return {
				eassyList:[
					{
						"title": "123",
						"commentsNum": 0,
						"modified": 1487583113,
						"eid": 56,
						"status": "draft",
						"nickName": "何雷",
						"catalogs": "37&生活1,47&asd"
					}
				],
				catalogs:[{
					name:"生活1",
					mid:123
				}],
				searchCatalog:"",
				page:1,
				pageSize:10,
				totalEassysCount:20,
				eassysInfo:{
					"allEassy": 0,
					"pubEassy": 0,
					"draftEassy": 0
				}
			};
		},
		methods:{
			getEassysInfo:function(){
				var self=this;
				self.$http.post("eassy/getInfo").
				then(function(res){
					if(res.data.state===200){
						self.eassysInfo=res.data.opRes[0];
					}else{
						self.$message.error("文章数量信息获取失败,"+req.data.info);
					}
				});
			}
		},
		filters:{
			timeToStr:function(value){
				var time=new Date(value*1000);
				return time.getFullYear()+" 年 "+(time.getMonth()+1)+" 月 "+time.getDate()+" 日 ";				
			},
			catalogFormat:function(value){
				var catalogs=value.split(",");
				var res=[];
				catalogs.forEach(function(ite){
					res.push(ite.split("&")[1]);
				});
				return res.join("、");
			},
			statusFormat:function(value){
				if(value=='draft'){
					return "草稿";
				}else{
					return "已发布";
				}
			}
		},
		mounted:function(){
			//获取文章数量信息
			this.getEassysInfo();

			console.log("控件初始化");
		}
	}
</script>
<style type="text/css">
	.eassysInfo{
		position: relative;
		height: 35px;
		color:gray;
		font-size: 12px;		
	}
	#eassyList .el-input__inner{
		border-radius: 2px !important;
	}
	.eassysInfo	a{
		color: gray;
		text-decoration: none;
	}
	#search--model{
		max-width: 300px;
		position: absolute;
		right: 20px;
		top: 0;
		font-size: 14px;
	}

	#eassyList button{
		border-radius: 2px;
		margin-left: 10px;

	}
	#search--model button{
		margin:0;
	}
	#search--model .el-input{
		width: 200px;
	}
	#eassyActions{
		padding:0 0 10px;
		font-size: 12px;
	}
	#eassyList .el-select{
		width: initial;
	}
	#eassyListPagination{
		float: right;
		margin-top: 15px;
	}

</style>