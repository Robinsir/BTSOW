import {
  ipcMain
} from 'electron'
import {
  addQueue
} from './Crawler'
import {
  GET_SEARCH_LIST,
  GET_SEARCH_DETAIL
} from '@/message'
import jq from 'cheerio'
const baseUrl = 'https://btsow.pw/search/'
export default () => {
  // get list ...
  ipcMain.on(GET_SEARCH_LIST, (event, agrs) => {
    addQueue(encodeURI(baseUrl + agrs), ($) => {
      let data = getSearchList($)
      event.sender.send(GET_SEARCH_LIST, {code: 200, data})
    }, (err) => {
      console.log(err.code)
      event.sender.send(GET_SEARCH_LIST, {code: 500, data: err.toString})
    })
  })

  // get detail info ...
  ipcMain.on(GET_SEARCH_DETAIL, (event, agrs) => {
    addQueue(encodeURI(agrs), ($) => {
      console.log($('title').text())
      let data = getSearchDetail($)
      console.log('TCL: data', data)
      event.sender.send(GET_SEARCH_DETAIL, data)
    })
  })
}
function getSearchDetail ($) {
  let data = {}

  // get magnet link
  data.magnet_link = $('#magnetLink').text()

  // get more file list
  let dataList = jq($('.data-list')[1]).children()
  data.file_list = []
  for (let i = 1; i < dataList.length; i++) {
    let item = jq(dataList[i])
    let obj = {}
    obj.file_name = jq(item.find('.file')).text()
    obj.file_size = jq(item.find('.size')).text()
    data.file_list.push(obj)
  }
  console.log('TCL: getSearchDetail -> data', data)
  return data
}
/**
 * getSearchList
 * @param {Object} $
 */
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
  // console.log('TCL: getTableList -> data', data)
  return data
}
