<template>
	<div id="eassyList">
		<h2 class="pageTitle">文章</h2>
		<div class="eassysInfo">
			<a href="">全部（{{eassysInfo.allEassy}}）</a>| <a href="">已发布（{{eassysInfo.pubEassy}}）</a>| <a href="">草稿（{{eassysInfo.draftEassy}}）</a>
			<div id="search--model">
				<el-input size='small' v-model="searchWord"></el-input>
				<el-button size='small' @click="searchEassyByWords"> 搜索文章</el-button>
			</div>
		</div>
		<div id="eassyActions">
			<el-button size='small' class="deleteMulti" type="danger" @click="deleteMultiEassy">批量删除</el-button>
			<el-select size='small' v-model="searchCatalog" placeholder="请选择">
				<el-option label="全部目录" value="" check></el-option>
				<el-option
				  v-for="item in catalogs.catalogs"
				  :label="item.name"
				  :value="item.mid">
				</el-option>
			</el-select>
			<el-button size='small' @click="filterEassy">筛选</el-button>
		</div>
	  <el-table
	  		class="eassyListBox"
	    	:data="eassyList"
	   		@selection-change="eassySelectionChange"
	   		 >
		    <el-table-column
		      type="selection"
		      width="55">
		    </el-table-column>
<!-- 		    <el-table-column
		      label="eid"
		      width="100"
		      >
		      <template scope="scope">{{ scope.row.eid }}</template>
		    </el-table-column> -->
		    <el-table-column
		      label="标题"
		      >
		      <template scope="scope">{{ scope.row.title }}</template>
		    </el-table-column>		  

		    <el-table-column
		      label=" 作者"
		      >
		      <template scope="scope">{{ scope.row.nickName }}</template>     
		    </el-table-column>

		    <el-table-column
		      label="标签"		     		      
		      >
		      <template scope="scope"><span class="eassyTags">{{ scope.row.tags||'-' }}</span></template>
		    </el-table-column>
		    
		    <el-table-column
		      label="目录"
		      width="100"
		      >
		      <template scope="scope">{{ scope.row.catalogs | catalogFormat }}</template>	      
		    </el-table-column>	

		    <el-table-column
		      label="状态"
		      width="100"
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
				<el-button-group>
				  <el-button type="success" icon="edit" @click="modifiedEassy(scope.row.eid)"></el-button>
				  <el-button type="danger" icon="delete" @click="deleteEassy(scope.row.eid)"></el-button>
				  <el-button type="info" icon="more" @click="showMoreEassyInfo"></el-button>

				</el-button-group>		      
<!-- 		      	<el-button type="info" @click="modifiedEassy(scope.row.eid)">编辑</el-button>
		      	<el-button type="danger" @click="deleteEassy(scope.row.eid)">删除</el-button> -->
		      </template>	      
		    </el-table-column>
	  </el-table>

		<div id="eassyListPagination" v-show="totalEassysCount">
		    <el-pagination
			  @current-change="eassyPageChange"
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
				eassyList:[],
				catalogs:[],
				searchCatalog:"",
				searchWord:"",
				searchWordTemp:"",
				catalogTemp:"",
				page:1,
				pageSize:10,
				totalEassysCount:0,
				eassysInfo:{
					"allEassy": 0,
					"pubEassy": 0,
					"draftEassy": 0
				},
				deleteEassyList:[]
			};
		},
		methods:{
			showMoreEassyInfo:function(){
				alert('功能开发中')
			},
			getEassysInfo:function(){
				var self=this;
				self.$http.post("eassy/getInfo").
				then(function(res){
					if(res.data&&res.data.state===200){
						self.eassysInfo=res.data.opRes[0];
					}else{
						self.$message.error("文章数量信息获取失败,"+res.data.info);
					}
				});
			},
			getEassyList:function(){
				var self=this;
				self.$http.post("eassy/getList",{
					page:self.page,
					catalog:self.catalogTemp,
					seachWord:self.searchWordTemp
				}).
				then(function(res){
					if(res.data&&res.data.state===200){
						//列表信息
						// console.log(res.data);
						
						self.eassyList	=res.data.opRes[0];
						//文章总数
						self.totalEassysCount=res.data.opRes[1][0].resCount;
					}else{
						self.$message.error("文章列表请求失败，请稍后再试");
					}
				}).catch(function(erro){
					console.log(erro);
				});
			},
			eassyPageChange:function(page){
				var self=this;
				self.page=page;
				self.getEassyList();
			},
			getAllCatalog:function(){
				var self=this;
				self.$http.post("catalog/get").
				then(function(res){
					if(res.data.state===200){
						self.catalogs=res.data.opRes;
					}else{
			            self.$message({
			              message:"目录获取失败，服务器错误,请稍后再试！",
			              type:"error",
			              duration:0,
			              showClose:true
			            });
					}
				}).catch(function(res){
		            // self.$message({
		            //   message:"网络错误,请检查网络连接,稍后再试！",
		            //   type:"error",
		            //   duration:2000,
		            //   showClose:true
		            // });					
				});

			},
			deleteEassy:function(eids){
				var self=this;
				self.$http.post("eassy/deleteMulti",{
					eids:eids.toString()
				}).
				then(function(res){
					if(res.data&&res.data.state===200){
						self.$message.success("文章删除成功");
						self.getEassyList();
						self.getEassysInfo();
					}else{
						self.$message.error("文章删除失败,请稍候再试!");
					}
				})
			},
			deleteMultiEassy:function(){
				var self=this;
				var eids=[];
				for(var i=0;i<self.deleteEassyList.length;i++){
					eids.push(self.deleteEassyList[i].eid);
				}
				self.deleteEassy(eids.join(","));
			},
			eassyRowClick:function(selection){
			},
			eassySelectionChange:function(val){
				this.deleteEassyList=val;
			},
			filterEassy:function(){
				this.catalogTemp=this.searchCatalog;
				this.page=1;
				this.getEassyList();
			},
			searchEassyByWords:function(){
				this.page=1;
				this.searchWordTemp=this.searchWord;
				this.getEassyList();
			},
			modifiedEassy:function(eid){
				this.$router.push({name:"modifyEassy",params:{eid:eid}});
			}

		},
		filters:{
			timeToStr:function(value){
				var time=new Date(value*1000);
				return time.getFullYear()+" 年 "+(time.getMonth()+1)+" 月 "+time.getDate()+" 日 ";				
			},
			catalogFormat:function(value){
				if(!value){
					return "无";
				}
				
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

			//获取文章列表
			this.getEassyList();

			//获取所有文章目录
			this.getAllCatalog();

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
	#eassyList{
		padding-left: 10px;
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
	#eassyList .deleteMulti {
		margin-left: 0;
	}
	#eassyList .el-table__body-wrapper{
		font-size: 12px;
		font-weight: lighter;
	}

	.eassyListBox{
		width: 100%;		
	}
	.eassyListBox button{
		margin-left: 10px;	
		padding: 8px;
		font-size: 12px;
	}
</style>