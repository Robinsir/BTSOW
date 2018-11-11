<template>
    <div>

      <!-- selector -->
      <el-form :inline="true">
        <el-form-item label="搜索BTSOW">
          <el-autocomplete v-model="searchContent" type="text"  :fetch-suggestions="querySearch" @select="handleSelect" placeholder="请输入内容"></el-autocomplete>
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
      historyList: [],
      searchData: {},
      searchDetail: {}
    }
  },
  mounted () {
    // read historyList
    let historyList = localStorage.getItem('HISTORY_LIST')
    if (historyList) this.historyList = JSON.parse(historyList)

    this.bindMessage()
  },
  methods: {
    querySearch (queryString, cb) {
      let historyList = this.historyList
      let results = queryString ? historyList.filter(this.createFilter(queryString)) : historyList
      cb(results)
    },
    createFilter (queryString) {
      return (history) => {
        return (history.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect (item) {
      this.searchContent = item.value
      this.getSearchOne()
    },
    indexMethod (index) {
      return index + 1
    },
    getSearchOne () {
      ipcRenderer.send(GET_SEARCH_LIST, this.searchContent)
      this.tableLoading = true
      // save search result
      let historyList = localStorage.getItem('HISTORY_LIST')
      if (historyList) this.historyList = JSON.parse(historyList)

      // if item in history don't save
      for (let item of this.historyList) { if (item.value === this.searchContent) return }

      this.historyList.push({'value': this.searchContent})
      localStorage.setItem('HISTORY_LIST', JSON.stringify(this.historyList))
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
