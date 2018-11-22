<template>
    <div class="search-index">

      <!-- selector -->
      <div class="search-head">
          <template v-if="isSaveHistory">
          <el-autocomplete  v-model="searchContent" type="text"  :fetch-suggestions="querySearch" @select="handleSelect" placeholder="请输入内容" style="search">
            <template slot="append">
              <el-button @click="getSearchOne" type="primary">搜索</el-button>
            </template>
          </el-autocomplete>
          </template>
          <template v-else>
            <el-input  v-model="searchContent" type="text" placeholder="请输入内容" style="search">
              <template slot="append">
                <el-button @click="getSearchOne" type="primary">搜索</el-button>
              </template>
            </el-input>             
          </template>
        <el-button type="primary" @click="handleSetting" class="set-icon setting"><i class="el-icon-setting"></i></el-button>
        <el-button type="primary" @click="handleBaiduYun" class="bdy-login">百度云</el-button>
      </div>

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

      <search-setting :show-setting.sync = "historySetting" @save-change="handleSaveChange"></search-setting>
    </div>
</template> 
<script>
import { ipcRenderer, clipboard } from 'electron'
import { GET_SEARCH_LIST, GET_SEARCH_DETAIL } from '@/../message'
import SearchDetail from './components/SearchDetail'
import SearchSetting from './components/SearchSetting'
import Cookie from 'js-cookie'
export default {
  data () {
    return {
      searchContent: '',
      tableLoading: false,
      expandedRowsNum: 0,
      isCopy: false,
      isSaveHistory: localStorage.getItem('HISTORY_SAVE') === 'true',
      historySetting: false,
      historyList: [],
      searchData: {},
      searchDetail: {}
    }
  },
  mounted () {
    // read historyList
    let historyList = Cookie.get('HISTORY_LIST')
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
    handleBaiduYun () {
      this.$router.push('login')
    },
    handleSelect (item) {
      this.searchContent = item.value
      this.getSearchOne()
    },
    handleSetting () {
      this.historySetting = true
    },
    handleSaveChange () {
      this.isSaveHistory = localStorage.getItem('HISTORY_SAVE') === 'true'
    },
    indexMethod (index) {
      return index + 1
    },
    getSearchOne () {
      ipcRenderer.send(GET_SEARCH_LIST, this.searchContent)
      this.tableLoading = true
      // save search result
      let historyList = Cookie.get('HISTORY_LIST')
      if (historyList) this.historyList = JSON.parse(historyList)

      // if item in history don't save
      for (let item of this.historyList) { if (item.value === this.searchContent) return }

      this.historyList.push({'value': this.searchContent})
      Cookie.set('HISTORY_LIST', JSON.stringify(this.historyList), {expires: 7})
    },
    bindMessage () {
      // listen GET_SEARCH_LIST
      ipcRenderer.on(GET_SEARCH_LIST, (event, args) => {
        let data = args
        this.searchData = data
        this.tableLoading = false
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
    SearchDetail, SearchSetting
  }
}
</script>
<style lang="scss" scoped>
.set-icon{
    font-size: 18px;
    padding: 9px 15px;
}
.search-index{
  position: relative;
}
.search-head{
  position: relative;
  margin: 20px auto;
  width: 600px;
  .setting{
    position: absolute;
    top: 0px;
    left: 650px;
  }
  .bdy-login{
    position: absolute;
    top: 0px;
    left: -120px;   
  }
}
</style>
