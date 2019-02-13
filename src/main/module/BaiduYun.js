import {LOGIN_BAIDUYUN} from '@/../message.js'
import PCS from 'baidupanapi'
import {
  ipcMain
} from 'electron'
export default () => {
  ipcMain.on(LOGIN_BAIDUYUN, (event, {usrName, passWord} = {}) => {
    console.log(usrName)
    console.log(passWord)

    let pcs = new PCS['default'](PCS.create_username_password_jar_creator(usrName, passWord, // eslint-disable-line new-cap
      url => {
        event.sender.send(LOGIN_BAIDUYUN, url)
      }))
    pcs.init
      .then(() => pcs.quota()).then(console.log)
      .then(() => pcs.list_files('/')).then(console.log)
      .catch(console.error)

    // api.Login.withPhone({'phone': usrName, 'password': passWord}).then((resp) => {
    //   console.log(resp)
    //   if (resp.status === 200) {
    //     console.log(resp)
    //     event.sender.send(LOGIN_WITH_PHONE, 'success!')
    //   }
    // }, (error) => {
    //   event.sender.send(LOGIN_WITH_PHONE, 'error!' + JSON.stringify(error.response.data))
    //   console.log(error.response.data)
    // })
  })
}
