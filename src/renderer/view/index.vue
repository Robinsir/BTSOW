<template>
    <el-button @click="showMesg('test')">test</el-button>
</template>
<script>
  export default {
    methods: {
      showMesg (message, type = 'success') {
        this.$message({
          message,
          type
        })
      }
  
    }
  }
</script>