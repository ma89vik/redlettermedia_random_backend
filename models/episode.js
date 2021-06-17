const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  films: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Film'
  }],
  gimmick: {
    type: String,
    required: true,
    enum: ['Wheel of the Worst',
      'Plinketto',
      'Best of the Worst',
      'Other'
    ]
  },
  hosts: [{
    type: String,
    required: true,
  }]
})

schema.plugin(uniqueValidator)
module.exports = mongoose.model('Episode', schema)

