const mongoose = require('mongoose')

const eventCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Event-Category Name is required.'
  },
  description: {
    type: String
  }
})

module.exports = mongoose.model('EventCategory', eventCategorySchema)