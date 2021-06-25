const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  poster: {
    type: String,
  },
  url: {
    type: String,
  },
})

module.exports = mongoose.model('Film', schema)