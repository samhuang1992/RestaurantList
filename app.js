const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
// 載入handlebars
const exphbs = require('express-handlebars')
//載入restaurant modal
const Restaurant = require('./models/restaurant')
// Method-override區
const methodOverride = require('method-override')
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

app.use(routes)

app.listen(port, () => {
  console.log(`The Express is on http://localhost:${port}`)
})