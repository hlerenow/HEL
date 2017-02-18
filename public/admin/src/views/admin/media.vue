<template>
	<div class="mediaPage">
		<file-list :pFileListShow="true"></file-list>
	</div>
</template>
<script type="text/javascript">
  	import fileList from "components/file-list.vue";
	export default{
		data (){
			return {

			};
		},
		components:{fileList}
	}
</script>