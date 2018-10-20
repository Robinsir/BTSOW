import api from '../api/index'
import {LOGIN_WITH_PHONE} from '@/message'

const {ipcMain} = require('electron')

export default () => {
  ipcMain.on(LOGIN_WITH_PHONE, (event, {usrName, passWord} = {}) => {
    console.log(usrName)
    console.log(passWord)

    api.Login.withPhone({'phone': usrName, 'password': passWord}).then((resp) => {
      if (resp.code === 200) {
        console.log(resp)
        event.sender.send(LOGIN_WITH_PHONE, 'scuess!')
      }
    })
  })
}
