const User = require('../models/user.model');
const ValidationHelper = require('../helpers/validation');
const Mail = require('../config/mail-connection');
const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs')

exports.index = function (req) {}

exports.save = function (req) {
    const userValidation = validateFields(req, 'save');
    if (userValidation.error) {
        var error = userValidation.error;

        var errorMessage = {
            status: 'failure',
            msg: 'Field Validation Error',
            oldValues: error._original,
            error: ValidationHelper.joiGenerateValidationError(error.details)
        }
        return errorMessage;
    }

    const {
        value: {
            fName = '',
            lName = '',
            email = '',
            sendInvite = false
        } = {}
    } = userValidation;

    //Check if user email exists and add user if not exists
    return User
        .findOne({email})
        .then(user => {
            if (user) {
                //User Email already exits on DB
                var errorMessage = {
                    status: 'failure',
                    msg: 'Email has been already taken'
                }
                return errorMessage;
            } else {
                //User not exits on DB - Add User
                const password = generateRandomPassword();
                const newUser = new User({fName, lName, email, password});

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) 
                            throw err;
                        newUser.password = hash;
                    })
                })

                return newUser
                    .save()
                    .then(user => {
                        //Send Email Invite to User if set true
                        if (sendInvite) {
                            var mailBody = `
                                <p>Hi ${fName} ${lName},</p>
                                <p>You have been added to the ${process.env.SITE_NAME}, please find below your login credentials.</p>
                                <p>
                                    <strong>Email: </strong>${email}<br>
                                    <strong>Password: </strong>${password}
                                </p>
                                `;

                            let mailOptions = {
                                from: `"${process.env.SITE_NAME}" <no-reply@gmail.com>`,
                                to: 'karthik@zaigoinfotech.com',
                                subject: `${process.env.SITE_NAME} | New User Account Notification`,
                                html: mailBody
                            };

                            var userInviteMail = Mail.sendMail(mailOptions);
                            if (!userInviteMail) {
                                var errorMessage = {
                                    status: 'failure',
                                    msg: 'Error while sending email notification to user'
                                }
                                return errorMessage;
                            }
                        }

                        var message = {
                            status: 'success',
                            msg: 'User Registered Sucessfully'
                        }
                        return message;

                    })
                //User not exits on DB - Add User
            }
        })

}

exports.update = function (req) {}

function validateFields(req, module) {
    var jObj = {
        fName: Joi
            .required()
            .messages({'any.required': 'First Name is required'}),
        lName: Joi
            .required()
            .messages({'any.required': 'Last Name is required'}),
        email: Joi
            .string()
            .email()
            .required()
            .messages({'any.required': 'Email is required', 'string.email': 'Email must be a valid email'}),
        sendInvite: Joi.boolean()
    };

    const userFieldValidateschema = Joi.object(jObj);
    const userValidation = userFieldValidateschema.validate(req.body);

    return userValidation;
}

function generateRandomPassword() {
    var password = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 10; i++) {
        password += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return password;
}