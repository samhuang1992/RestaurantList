const express = require('express')
const router = express.Router()
// 引用上上層 位於models內的restaurant.js
const Restaurant = require('../../models/restaurant')
// index 
router.get('/', (req, res) => {
  Restaurant.find() //找到Restaurant Model裡的所有資料
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

module.exports = router