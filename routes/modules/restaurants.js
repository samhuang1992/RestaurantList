const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// search restaurant
router.get('/search', (req, res) => {
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
router.get('/new', (req, res) => {
  res.render('new')
})

// post new
router.post('/', (req, res) => {
Restaurant.create(req.body)
  .then(() => {res.redirect('/')})
  .then(error => console.log(error))
})

// click index
router.get('/:id', (req, res) => {
  const id = req.params.id
  // console.log(id)
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('detail', {restaurant}))
    .catch(error => console.log(error))
})

// edit get detail page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.error(error))
})
// edit post detail page
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router