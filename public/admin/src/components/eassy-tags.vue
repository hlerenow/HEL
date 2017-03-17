<template>
  <div class="eassyTags">
    <el-tag
    :key="tag"
    v-for="tag in tags"
    type="primary"
    :closable="true"
    :close-transition="false"
    @close="handleClose(tag)"
  >
  {{tag}}
  </el-tag>
  <el-input
    class="input-new-tag"
    v-model="inputValue"
    ref="saveTagInput"
    @keyup.enter.native="handleInputConfirm"
    @blur="handleInputConfirm"
  >
  </el-input>
  <p class="tips">
    文章内容相关的标签，多个标签请用英文逗号(,)分开
  </p>
  <!-- <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button> -->
  </div>
</template>
<script>
  export default {
    data() {
      return {
        inputValue: ''
      };
    },
    props:["tags"],
    methods: {
      handleClose(tag) {
        this.tags.splice(this.tags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        if(this.inputValue){
          let inputValue = this.inputValue.split(",");
          inputValue=inputValue.filter(function(ite){
              ite=ite.trim();
              return (ite!="")
          });
          if (inputValue) {
            var tags=this.tags.concat(inputValue);
            this.$emit("tagsChange",tags);
          }
          this.inputValue = '';          
        }
      }
    }
  }
</script>
<style type="text/css">
  .eassyTags .el-tag{
    display: inline-block;
    margin: 2px 3px;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
    padding-right: 20px;
  }

  .eassyTags .el-tag .el-icon-close{
    position: absolute;
    right: 0;
    top: 3px;
  }
  .input-new-tag .el-input__inner{
    height: 30px;
    margin: 0 3px;
  }
</style>