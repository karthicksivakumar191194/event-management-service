const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: 'Event Title is required.'
  },
  category: {
    type: String
  },
  location: {
    type: String
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
    type: Number ,
    required: 'Event Created By is required.'
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