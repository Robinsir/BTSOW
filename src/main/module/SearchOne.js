import {
  ipcMain
} from 'electron'
import {
  addQueue
} from './Crawler'
import {
  GET_SEARCH_LIST
} from '@/message'
import jq from 'cheerio'
const baseUrl = 'https://btso.pw/search/'
export default () => {
  ipcMain.on(GET_SEARCH_LIST, (event, agrs) => {
    addQueue(encodeURI(baseUrl + agrs), ($) => {
      console.log($('title').text())
      let data = getSearchList($)
      console.log('TCL: data', data)
      event.sender.send(GET_SEARCH_LIST, data)
    })
  })
}
function getSearchList ($) {
  let data = {}
  let dataList = $('.data-list').children()

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
  for (let i = 1; i < items.length; i++) {
    let item = jq(items[i])
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
