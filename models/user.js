const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date, // 帶入註冊日期
    default: Date.now
  }
})

module.exports = mongoose.model('User', UserSchema)
