// 透過mongoose.js中轉出的db, 不需要再require mongoose
// 載入json api
const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json').results
const db = require('../../config/mongoose')

// 連線成功
db.once('open', () => {
  console.log('run restaurantSeeder script...')
  Restaurant.create(restaurantList)
    .then(() => {
      console.log('restaurantSeeder done!')
      db.close()
    })
    .catch(error => console.log(error))
})