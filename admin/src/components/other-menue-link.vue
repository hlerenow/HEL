<template>
	<div class="otherMenuLink">
		<el-checkbox-group v-model="checkList">
		<el-checkbox label="archive">归档页</el-checkbox>
		</el-checkbox-group>
		<div class="menue_btn_submit">
			<el-button @click="submit">添加</el-button>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			allType:[{
				type:"archive",
				name:""
			}]
		}
	}
</script>