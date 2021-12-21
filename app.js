const express = require('express')
// body-parser
const bodyParser = require('body-parser')
const app = express()
const port = 3000
// 載入handlebars
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
//載入restaurant modal
const Restaurant = require('./models/restaurant')
mongoose.connect('mongodb://localhost/restaurant_list') //與資料庫連線
const methodOverride = require('method-override')

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

app.use(methodOverride('method'))

// index 
app.get('/', (req, res) => {
  Restaurant.find() //找到Restaurant Model裡的所有資料
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// search restaurant
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  Restaurant.find()
    .lean()
    .then((restaurants) => {
      const search = restaurants.filter(restaurant => {
        return (restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
          restaurant.category.toLowerCase().includes(keyword.toLowerCase()))
      })
      res.render('index', { restaurants: search, keyword })
    })
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
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.error(error))
})
// edit post detail page
app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  // const id = req.params
  const {name, nameEn, category, location, phone, rating, image, description, googleMap } = req.body
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = name
      restaurant.nameEn = nameEn
      restaurant.category = category
      restaurant.location = location
      restaurant.phone = phone
      restaurant.image = image
      restaurant.description = description
      restaurant.rating = rating
      restaurant.googleMap = googleMap
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}/edit`))
    .catch(error => console.log(error))
})

// delete restaurant
app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`The Express is on http://localhost:${port}`)
})