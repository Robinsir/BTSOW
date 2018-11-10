<template>
    <div>

      <!-- selector -->
      <el-form :inline="true">
        <el-form-item label="搜索BTSOW">
          <el-input v-model="searchContent" type="text"></el-input>
        </el-form-item>
        <el-button @click="getSearchOne" type="primary">搜索</el-button>
      </el-form>
      
      <!-- table show info -->
      <el-table :data="searchData.lists" style="width: 100%" v-loading="tableLoading">
          <el-table-column
            type="index"
            :index="indexMethod">
          </el-table-column>
          <el-table-column
            label="日期"
            prop="date"
            align = 'center'
            width="180">
          </el-table-column>
          <el-table-column
            label="文件大小"
            prop="size"
            align = 'center'
            width="180">
          </el-table-column>          
          <el-table-column
            label="资源描述"
            align = 'center'
            prop="name">
          </el-table-column>

      </el-table>
    </div>
</template> 
<script>
import { ipcRenderer } from 'electron'
import { GET_SEARCH_LIST } from '@/../message'
export default {
  data () {
    return {
      searchContent: '',
      tableLoading: false,
      searchData: []
    }
  },
  mounted () {
    this.bindMessage()
  },
  methods: {
    indexMethod (index) {
      return index + 1
    },
    getSearchOne () {
      ipcRenderer.send(GET_SEARCH_LIST, this.searchContent)
      this.tableLoading = true
    },
    bindMessage () {
      ipcRenderer.on(GET_SEARCH_LIST, (event, args) => {
        let data = args
        this.searchData = data
        this.tableLoading = false
        console.log(data)
      })
    }
  }
}
</script>
