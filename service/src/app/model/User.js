const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, index: true },
  city: String
})

module.exports = mongoose.model('User', UserSchema)