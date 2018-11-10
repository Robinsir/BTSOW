<template>
    <div>
        <el-input v-model="searchContent" type="text"></el-input>
        <el-button @click="getMain">test</el-button>
    </div>
</template>
<script>
import { ipcRenderer } from 'electron'
import { GET_SEARCH } from '@/../message'
export default {
  data () {
    return {
      searchContent: ''
    }
  },
  methods: {
    getMain () {
      console.log('GET_SEARCH')
      ipcRenderer.send(GET_SEARCH, this.searchContent)
    }
  }
}
</script>
