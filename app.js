const express = require('express')
// body-parser
const bodyParser = require('body-parser')
const app = express()
const port = 4000
// 載入handlebars
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
//載入restaurant modal
const Restaurant = require('./models/restaurant')
mongoose.connect('mongodb://localhost/restaurant_list') //與資料庫連線

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

// index 
app.get('/', (req, res) => {
  Restaurant.find() //找到Restaurant Model裡的所有資料
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// get new
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

// post new
app.post('/restaurants', (req, res) => {
Restaurant.create(req.body)
  .then(() => {res.redirect('/')})
  .then(error => console.log(error))
})

// click index
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  // console.log(id)
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('detail', {restaurant}))
    .catch(error => console.log(error))
})

// edit get detail page
app.get('restaurants/:id/edit', (req,res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})
// edit post detail page
app.post('restaurants/:id/edit', (req,res) => {

})

// search get
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const search = Restaurant.results.filter(data => 
    data.name.toLowerCase().includes(keyword) || data.category.includes(keyword)
  )
  res.render('index', {search: search, keyword: keyword})
})

app.listen(port, () => {
  console.log(`The Express is on http://localhost:${port}`)
})