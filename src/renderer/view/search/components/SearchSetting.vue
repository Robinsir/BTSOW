<template>
    <el-dialog
    :visible.sync="SettingVisible"
    title="设置">
        <el-form>
            <el-form-item label="显示搜索历史">
                <el-switch v-model="histroyDelivery"></el-switch>
            </el-form-item>
            <el-form-item label="清空搜索历史">
                <el-button @click="handleClearHistory">清空</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script>
import Cookie from 'js-cookie'
export default{
  data () {
    return {
      histroyDelivery: localStorage.getItem('HISTORY_SAVE') === 'true'
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
  methods: {
    handleClearHistory () {
      Cookie.remove('HISTORY_LIST', {expires: ''})
      this.$message.success('已清空')
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