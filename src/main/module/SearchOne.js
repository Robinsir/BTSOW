import {
  ipcMain
} from 'electron'
import {
  addQueue
} from './Crawler'
import {
  GET_SEARCH
} from '@/message'
import jq from 'cheerio'
const baseUrl = 'https://btso.pw/search/'
export default () => {
  ipcMain.on(GET_SEARCH, (event, agrs) => {
    addQueue(baseUrl + agrs, ($) => {
      console.log($('title').text())
      let data = getTableList($)
      console.log('TCL: data', data)
      // data.head
    })
  })
}
function getTableList ($) {
  let data = {}
  let dataList = $('.data-list').children()
  // let $dataList = $('.row')

  // get head
  data.head = []
  let items = jq(dataList[0]).find('div')

  for (let i = 0; i < items.length; i++) {
    data.head.push(jq(items[i]).text())
  }
  // get lists
  data.lists = []
  // del head
  items = dataList
  delete items[0]
  console.log('TCL: getTableList -> items', items)
  for (let i = 0; i < items.length; i++) {
    let item = jq(items[i])
    // console.log('TCL: getTableList -> item', item)
    let obj = {}
    let a = jq(item.find('a'))
    obj.name = a.attr('title')
    obj.link = a.attr('href')
    obj.size = jq(item.find('.size')).text()
    obj.date = jq(item.find('.date')).text()
    data.lists.push(obj)
  }
  console.log('TCL: getTableList -> data', data)
  return data
}
