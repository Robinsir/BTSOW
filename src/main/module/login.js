import api from '../api/index'
import {LOGIN_WITH_PHONE} from '@/message'

const {ipcMain} = require('electron')

export default () => {
  ipcMain.on(LOGIN_WITH_PHONE, (event, {usrName, passWord} = {}) => {
    console.log(usrName)
    console.log(passWord)

    api.Login.withPhone({'phone': usrName, 'password': passWord}).then((resp) => {
      console.log(resp)
      if (resp.status === 200) {
        console.log(resp)
        event.sender.send(LOGIN_WITH_PHONE, 'success!')
      }
    }, (error) => {
      event.sender.send(LOGIN_WITH_PHONE, 'error!' + JSON.stringify(error.response.data))
      console.log(error.response.data)
    })
  })
}
