const express = require('express')
const router = express.Router()

// 引用/routes/modules/home.js中所設定的「首頁」路由
const home = require('./modules/home')
// 引用/routes/modules/restaurants.js中所設定的「首頁」路由
const restaurants = require('./modules/restaurants')

router.use('/', home)
router.use('/restaurants', restaurants)

module.exports = router