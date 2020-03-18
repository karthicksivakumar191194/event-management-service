const User = require('../models/user');

exports.index = async function(req, res, next) {
   try {
     const users = await User.find({})
     //console.log(users.length);
     res.status(200).json(users)
   } catch (err) {
     res.status(500).json({ message: err.message })
   }
}

exports.save = async function(req, res, next) {
   const user = new User({
     fName: req.body.fName,
     lName: req.body.lName,
     email: req.body.email,
     password: req.body.password,
     address: req.body.address,
     city: req.body.city,
     country: req.body.country,
     postalCode: req.body.postalCode
   })
   
   try {
     const newUser = await user.save()
     res.status(201).json(newUser)
   } catch (err) {
     res.status(400).json({ message: err.message })
   }
}

exports.edit = function(req, res, next) {

}

exports.update = function(req, res, next) {

}

exports.delete = function(req, res, next) {

}