const express = require('express')
const session = require('express-session')
const usePassport = require('./config/passport')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
// 載入handlebars
const exphbs = require('express-handlebars')
//載入restaurant.js
const Restaurant = require('./models/restaurant')
// Method-override區
const methodOverride = require('method-override')
// 引用路由器自動尋找下方index的檔案
const routes = require('./routes')
// 載入config mongoose 
require('./config/mongoose')

app.use(bodyParser.urlencoded({ extended: true}))
// use static
app.use(express.static('public'))
// setting template engine
app.engine('hbs', exphbs({defaultLayouts: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')
app.use(methodOverride('_method'))

app.use(session({
  secret: 'mySecret',
  resave: false,
  saveUninitialized: true
}))

usePassport(app)

app.use((req, res, next) => {
  console.log(req.user)
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})

app.use(routes)

app.listen(port, () => {
  console.log(`The Express is on http://localhost:${port}`)
})