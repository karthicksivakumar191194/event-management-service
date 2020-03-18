const mongoose = require('mongoose')

const eventBookingSchema = new mongoose.Schema({
  eventID: {
    type: String,
    required: 'Event ID is required.'
  },
  ticketCount: {
    type: String
  },
  fName: {
    type: String
  },
  lName: {
    type: String
  },
  email: {
    type: String
  },
  mobile: {
    type: Number
  },
  workingOrganization: {
    type: String
  },
  designation: {
    type: String
  },
  location: {
    type: String
  },
  address: {
    type: String
  },
  city: {
    type: String 
  },
  state: {
    type: String 
  },
  zipCode: {
    type: String 
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('EventBooking', eventBookingSchema)