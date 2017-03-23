<template>
	<div id="catalogView">		
		<h2 class="rowTitle">目录</h2>
		<div class="catalogCreateBox">
			<catalog-create cname="asd"></catalog-create>						
		</div>
		<div class="catalogListBox">
			<catalog-list></catalog-list>			
		</div>
	</div>
</template>

<script type="text/javascript">

  	import catalogCreate from "components/catalog-create.vue"

  	import catalogList from "components/catalog-list.vue"

	export default{
		components:{catalogCreate,catalogList},
	}

</script>

<style type="text/css">

	#catalogView{
		overflow: hidden;
		margin-left: 10px;
	}

	.rowTitle{
		color: gray;
		padding-left: 10px !important;
	}
	.catalogCreateBox{
		width: 350px;
		float: left;
    	margin-right: 30px;		
	}
	.catalogListBox{
		padding-top: 60px;
		overflow: hidden;
	}

	@media screen and (max-width: 950px){	
		.catalogCreateBox{
			width: 100%;
		}	
		.catalogListBox{
			clear: both;
		}
	}	
</style>