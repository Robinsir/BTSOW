<template>
    <el-dialog
    :visible.sync="SettingVisible"
    title="设置">
        <el-form>
            <el-form-item label="临时设置BOTSOW搜索地址">
                <el-input 
                class="item-input"
                placeholder="example: btsow.pw"
                v-model="searchAddr">              
              <template slot="append">
                <el-button @click="handleSaveSearchAddr" type="primary">保存</el-button>
              </template>
                </el-input>
            </el-form-item>
            <el-form-item label="显示搜索历史">
              <div class="item-input">
                <el-switch v-model="histroyDelivery"></el-switch>
              </div>
            </el-form-item>
            <el-form-item label="清空搜索历史">
              <div class="item-input">
                <el-button @click="handleClearHistory">清空</el-button>
                </div>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script>
import Cookie from 'js-cookie'
import { SET_SEARCH_ADDR } from '@/../message'
import { ipcRenderer } from 'electron'
export default{
  data () {
    return {
      histroyDelivery: localStorage.getItem('HISTORY_SAVE') === 'true',
      searchAddr: 'https://btsow.pw/search/'
    }
  },
  computed: {
    SettingVisible: {
      get () {
        return this.showSetting
      },
      set (val) {
        this.$emit('update:showSetting', val)
      }
    }
  },
  mounted () {
    this.bindMessage()
    ipcRenderer.send(SET_SEARCH_ADDR, {method: 'SET', data: this.searchAddr})
  },
  methods: {
    handleClearHistory () {
      Cookie.remove('HISTORY_LIST', {expires: ''})
      this.$message.success('已清空')
    },
    handleSaveSearchAddr () {
      ipcRenderer.send(SET_SEARCH_ADDR, {method: 'SET', data: this.searchAddr})
      this.$message.success('修改成功！')
    },
    bindMessage () {
      // listen SET_SEARCH_ADDR
      ipcRenderer.on(SET_SEARCH_ADDR, (event, resp) => {
        this.searchAddr = resp
      })
    }
  },
  watch: {
    histroyDelivery (val) {
      localStorage.setItem('HISTORY_SAVE', val)
      this.$emit('save-change')
    }
  },
  props: {
    showSetting: Boolean
  }
}
</script>
<style lang="scss" scoped>
/deep/.item-input{
  float: right;
  width: 50%;
  text-align: center;
  .el-button--primary{
    padding: 12px 10px;
  }
  .el-input__inner{
    height: 25px;
    font-size: 12px;
  }
}
/deep/.el-form{
  padding-right: 40px;
}
</style>
