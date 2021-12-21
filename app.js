const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
// 載入handlebars
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
//載入restaurant modal
const Restaurant = require('./models/restaurant')
mongoose.connect('mongodb://localhost/restaurant_list') //與資料庫連線

// Method-override區
const methodOverride = require('method-override')
const routes = require('./routes')

app.use(bodyParser.urlencoded({ extended: true}))

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

// use static
app.use(express.static('public'))

// setting template engine
app.engine('hbs', exphbs({defaultLayouts: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

app.use(methodOverride('_method'))
app.use(routes)

app.listen(port, () => {
  console.log(`The Express is on http://localhost:${port}`)
})