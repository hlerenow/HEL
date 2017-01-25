<template>
<div class="headBar row" >
	<div class="headBar__logo col-md-2">
		<h3 class="headBar__logo--title">
			襄企联盟	
		</h3>
	</div>
	<ul class="nav navbar  navbar-dufault nav-pills col-md-10 headBar__body" role="tablist">		
		<li>
			<a href="#">退出</a>
		</li>
		<li role="presentation " class="dropdown">
			<a class="dropdown-toggle text-muted" data-toggle="dropdown" href="#">
				设置 <span class="caret"></span>
			</a>
			<ul class="dropdown-menu text-center" role="menu">
				<li><a href="#">密码修改</a></li>
			</ul>
		</li>
		<li >
			<a >用户{{username}}</a>
		</li>


	</ul>	
</div>
</template>
<script type="text/javascript">
	export default {
		data (){
			return {
				now:1
			}
		},
		props:[
			"username"
		]
	}
</script>
<style type="text/css" >
	.headBar{
		background-color: #363b3f;
	}
	.headBar__logo{
		color: white;
		overflow: auto;
		border-bottom: 1px solid #26292c;
	}
	.headBar__logo--title{
		padding-left: 10px;
		margin-bottom: 9px;
	}
	.headBar .nav{
		display: block;
		height: 56px;
		padding-bottom: 0;
		background-color: #363b3f;
		margin-bottom: 0;
	}
	
	.headBar__body{
		border: none;
		padding-right: 0;		
	}

	.headBar__body > li{
		float: right;
		height: 100%;
	}
	.headBar__body > li,.headBar__body > li > a{
		line-height: 2;
		font-size: 18px;
		display: block;
		height: 100%;
		color: white;
	}
	.headBar__body > li > a:hover,.headBar__body > li > a:focus{
		background-color: #1e1f1e;
		color: white;
	}

	.nav .open>a, .nav .open>a:hover, .nav .open>a:focus{
		background-color: #1e1f1e;
		color: white;			
	}
	.dropdown.open > a:hover,.dropdown.open > a:focus{
	
	}
	.dropdown.open > a{
		border-radius: 0px;
	}
	.row > div{
		padding-left: 0;
		padding-right: 0;
	}
	.panel{
	    margin-top: 0px;
  	}
</style>