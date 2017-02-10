<template>
	<div>
		<el-row :gutter="20">
		  <el-col :span="10" :offset="8">
		  	<el-input v-model="_name" placeholder=""></el-input>
		  </el-col>
		  <el-col :span="5">
	          <el-button   class="createCatalog" type="primary" >
	            搜索目录
	          </el-button>		  
		  </el-col>
		</el-row>
		<el-row :gutter="20">
		  <el-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></el-col>
		  <el-col :span="6" :offset="6"><div class="grid-content bg-purple"></div></el-col>
		</el-row>
		<el-row :gutter="20">
		  <el-col :span="12" :offset="6"><div class="grid-content bg-purple"></div></el-col>
		</el-row>		
	</div>
</template>