const mongoose = require('mongoose') //載入restaurant modal
// 載入json api
const restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json').results
mongoose.connect('mongodb://localhost/restaurant_list') //與資料庫連線

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error')
})
// 連線成功
db.once('open', () => {
  console.log('run restaurantSeeder script...')
  restaurant.create(restaurantList)
    .then(() => {
      console.log('restaurantSeeder done!')
      db.close()
    })
    .catch(error => console.log(error))
})