import Crawler from 'crawler'
console.log('initQueue...')
const c = new Crawler({
  maxConnections: 10,
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.92 Safari/537.36',
  headers: {
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Accept': '*/*',
    'Connection': 'keep-alive'
  }
  // if queue not specify callback
  // callback: function (error, res, done) {
  //   if (error) {
  //     console.log(error)
  //   } else {
  //     console.log('initQueue...')
  //     console.log(res)
  //   }
  //   done()
  // }
})

// Queue just one URL, callback
export function addQueue (url, callback) {
  console.log('regQueue...')
  c.queue({
    url: url,
    callback: function (error, res, done) {
      if (error) {
        console.log(error)
      } else {
        // console.log(res)
        callback && callback(res.$, res)
      }
      done()
    }
  })
}
