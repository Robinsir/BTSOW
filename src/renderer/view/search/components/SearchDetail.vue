<template>
<el-form label-position="left" inline class="demo-table-expand" v-loading="loading">
    <el-form-item label="磁链(点击复制)：" class="title">
        <div class="magnet"> <a title="点击复制" @click="handleCopy">{{holdData.magnet_link}}</a></div>
    </el-form-item>
    <el-table :data="holdData.file_list">
        <el-table-column
        prop="file_name"
        label="文件名"
       >
        </el-table-column>
        <el-table-column
        prop="file_size"
        label="文件大小"
        width="180">
        </el-table-column>
    </el-table>
</el-form>
</template> 
<script>
import { clipboard } from 'electron'
export default {
  props: {
    data: Object
  },
  data () {
    return {
      holdData: {},
      loading: true
    }
  },
  methods: {
    handleCopy () {
      clipboard.writeText(this.holdData.magnet_link)
      this.$message.success('已复制到剪贴板')
    }
  },
  watch: {
    data () {
      this.holdData = {}
      this.holdData = this.data
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.title{
    font-size: 18px;
    font-weight: 600;
    .el-form-item__label{
        font-size: 16px;
        font-weight: 600;
    }
}
.magnet{
    width: 100%;
    height: 50px;
    // overflow: hidden;
    color: rgb(64, 158, 255);
     a{
         cursor: pointer
     }
    a:visited{
        color: rgb(64, 158, 255);
    }
}
</style>
