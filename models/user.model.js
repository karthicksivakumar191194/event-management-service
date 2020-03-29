const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  fName: {
    type: String,
    required: 'First Name is required.'
  },
  lName: {
    type: String,
    required: 'Last Name is required.'
  },
  email: {
    type: String,
    required: 'Email is required.',
    unique: true,
  },
  password: {
    type: String,
    required: 'Password is required.',
    select: false,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  postalCode: {
    type: String,
  },
  role: {
    type: Number,
    default: 1
  },
  isActive: {
    type: Boolean ,
    default: 1
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User', userSchema)

//Including the Excluded Field
//User.findOne({_id: userId}).select("+password")