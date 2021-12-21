const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant_list') //與資料庫連線

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error')
})
// 連線成功
db.once('open', () => {
  console.log('mondodb connected')
})

module.exports = db