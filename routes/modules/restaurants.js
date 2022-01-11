const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// search restaurant
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  if(!keyword){
    res.redirect('/')
  }
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

// home
router.get('/', (req, res) => {
  res.render('index')
})

// get new
router.get('/new', (req, res) => {
  res.render('new')
})

// post new
router.post('/', (req, res) => {
  const userId = req.user._id
  console.log(userId)
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  Restaurant.create({name, name_en, category, image, location, phone, google_map, rating, description, userId})
  .then(() => {res.redirect('/')})
  .then(error => console.log(error))
})

// detail
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  // console.log(id)
  return Restaurant.findById({_id, userId})
    .lean()
    .then(restaurant => res.render('detail', {restaurant}))
    .catch(error => console.log(error))
})

// edit
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findById({_id, userId})
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.error(error))
})
// edit post detail page
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  // const id = req.params
  const {name, nameEn, category, location, phone, rating, image, description, googleMap } = req.body
  return Restaurant.findById({_id, userId})
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

// delete
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Restaurant.findById({_id, userId})
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router