import axios from 'axios'

const server = axios.create({
  // 设置服务器地址
  baseURL: 'http://localhost:3000',
  timeout: 3000
})
axios.defaults.withCredentials = true
// 添加请求拦截器
server.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么

  return config
}, function (error) {
  // 对请求错误做些什么
  console.log('发出出错！')
  console.log(error)
  return Promise.reject(error)
})

// 添加响应拦截器
server.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  console.log('请求出错！')
  console.log(error.response.data)
  return Promise.reject(error)
})
export default server
