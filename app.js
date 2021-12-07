const express = require('express')
const app = express()
const port = 3000
// 載入handlebars
const exphbs = require('express-handlebars')
// 載入json api
const restaurantList = require('./restaurant.json')

// use static
app.use(express.static('public'))

// setting template engine
app.engine('handlebars', exphbs({defult: 'main'}))
app.set('view engine', 'handlebars')

// List data
app.get('/', (req, res) => {
  // console.log(restaurantList.results)
  res.render('index', {list: restaurantList.results})
})

// click List
app.get('/restaurants/:list_id', (req, res) => {

  const list = restaurantList.results.find(list =>
    list.id.toString() === req.params.list_id
  )
  // console.log('list', req.params.list_id)
  res.render('show', {listPage: list})
})

// search get
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const search = restaurantList.results.filter(data => 
    data.name.toLowerCase().includes(keyword) || data.category.includes(keyword)
  )
  res.render('index', {search: search, keyword: keyword})
})

app.listen(port, () => {
  console.log(`The Express is on http://localhost:${port}`)
})