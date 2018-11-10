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
      <el-table :data="searchData.lists" style="width: 100%" v-loading="tableLoading"
       @expand-change="handleExpandChange"
       @row-contextmenu="handleContextMenu">
          <el-table-column
            type="index"
            :index="indexMethod">
          </el-table-column>
          <el-table-column type="expand">
            <template slot-scope="props">
              <SearchDetail :data="searchDetail">
              </SearchDetail>
            </template>
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
import { ipcRenderer, clipboard } from 'electron'
import { GET_SEARCH_LIST, GET_SEARCH_DETAIL } from '@/../message'
import SearchDetail from './components/SearchDetail'
export default {
  data () {
    return {
      searchContent: '',
      tableLoading: false,
      expandedRowsNum: 0,
      isCopy: false,
      searchData: {},
      searchDetail: {}
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
      // listen GET_SEARCH_LIST
      ipcRenderer.on(GET_SEARCH_LIST, (event, args) => {
        let data = args
        this.searchData = data
        this.tableLoading = false
        console.log(data)
      })

      // listen GET_SEARCH_DETAIL
      ipcRenderer.on(GET_SEARCH_DETAIL, (event, args) => {
        this.searchDetail = args
        // copy link when right click item
        if (this.isCopy === true) {
          clipboard.writeText(args.magnet_link)
          this.$message.success('已复制到剪贴板')
          this.isCopy = false
        }
        console.log(args)
      })
    },
    handleExpandChange (row, expandedRows) {
      if (expandedRows.length > this.expandedRowsNum) {
        ipcRenderer.send(GET_SEARCH_DETAIL, row.link)
      }
      this.expandedRowsNum = expandedRows.length
    },
    handleContextMenu (row) {
      this.isCopy = true
      ipcRenderer.send(GET_SEARCH_DETAIL, row.link)
      this.$message('正在查询链接。。。')
    }
  },
  components: {
    SearchDetail
  }
}
</script>
