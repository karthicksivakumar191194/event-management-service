const mongoose = require('mongoose')

const eventLocationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Event-Location Name is required.'
  },
  description: {
    type: String
  }
})

module.exports = mongoose.model('EventLocation', eventLocationSchema)