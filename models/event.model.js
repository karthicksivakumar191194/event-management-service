const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: 'Event Title is required.'
  },
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'EventCategory' 
  },
  location: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'EventLocation' 
  },
  price: {
    type: Number
  },
  availableTickets: {
    type: Number,
  },
  maxTicketsPerUser: {
    type: Number,
  },
  startDate: {
    type: Date,
    required: 'Event Start Date is required.'
  },
  endDate: {
    type: Date
  },
  time: {
    type: String
  },
  description: {
    type: String
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId ,
    required: 'Event Created By is required.',
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  deletedAt: {
    type: Date
  }
})

module.exports = mongoose.model('Event', eventSchema)