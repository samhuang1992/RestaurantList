const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// 透過mongoose.js中轉出的db, 不需要再require mongoose
// 載入json api
const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json').results
const db = require('../../config/mongoose')
const USER = require('../user')

const SEED_USER = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678',
    restaurantId: [0, 1, 2]
  }, {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678',
    restaurantId: [3, 4, 5]
  }]

// 連線成功
db.once('open', () => {
  Promise.all(Array.from(SEED_USER, (SEED_USER) => {
    return bcrypt.genSalt(10)
      .then(salt => bcrypt.hash(SEED_USER.password, salt))
      .then(hash => USER.create({
        name: SEED_USER.name,
        email: SEED_USER.email,
        password: hash
  }))
  .then(user => {
        const seed = []
        SEED_USER.restaurantId.forEach(index => {
          restaurantList[index].userId = user._id
          seed.push(restaurantList[index])
        })
        return Restaurant.create(seed)
      })
  }))
    .then(() => {
      console.log('restaurantSeeder done!')
      process.exit()
    })
    .catch(error => console.log(error))
})