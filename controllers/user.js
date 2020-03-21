const User = require('../models/user');
const Mail = require('../config/mail-connection')

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
   
   var mailBody = `
            <p>Hi Test,</p>
            <p>You have been added to the ${process.env.SITE_NAME}, please find below your login credentials.</p>
            <p>
              <strong>Email: </strong>test@test.com<br>
              <strong>Password: </strong>test123</p>
          `;

   let mailOptions = {
    from: '"Karthick Sivakumar" <test@gmail.com>', 
    to: 'karthik@zaigoinfotech.com', 
    subject: 'Event Management | New User Account Notification', 
    html: mailBody 
  };

   try {
     const newUser = await user.save()
     Mail.sendMail(mailOptions)
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