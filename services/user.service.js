const User = require('../models/user.model');
const ValidationHelper = require('../helpers/validation');
const Mail = require('../config/mail-connection');
const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs')

exports.index = function () {
    return User.find({});
}

exports.save = function (req) {
    const userValidation = validateFields(req, 'save');
    if (userValidation.error) {
        var error = userValidation.error;

        var errorMessage = {
            code: 400,
            success: false,
            errorCode: 4002,
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
                    code: 400,
                    success: false,
                    errorCode: 4002,
                    msg: 'Field Validation Error',
                    oldValues: {
                        fName,
                        lName,
                        email,
                        sendInvite
                    },
                    error: {
                        email: 'Email has been already taken'
                    }
                }
                return errorMessage;
            } else {
                //User not exits on DB - Add User Start
                const password = generateRandomPassword();
                const newUser = new User({fName, lName, email, password});

                let hash = bcrypt.hashSync(newUser.password, 10);
                newUser.password = hash;

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
                                to: process.env.SITE_ADMIN_EMAIL,
                                subject: `${process.env.SITE_NAME} | New User Account Notification`,
                                html: mailBody
                            };

                            var userInviteMail = Mail.sendMail(mailOptions);
                            if (!userInviteMail) {
                                var errorMessage = {
                                    code: 500,
                                    success: false,
                                    msg: 'Error while sending email notification to user'
                                }
                                return errorMessage;
                            }
                        }

                        var message = {
                            code: 201,
                            success: true,
                            msg: 'User Registered Sucessfully'
                        }
                        return message;

                    })
                //User not exits on DB - Add User End
            }
        })

}

exports.update = function (req) {}

function validateFields(req, module) {
    var jObj = {
        fName: Joi
            .string()
            .required()
            .messages({'any.required': 'First Name is required', 'string.empty': 'First Name should not be empty', 'string.base': 'First Name must be a string'}),
        lName: Joi
            .string()
            .required()
            .messages({'any.required': 'Last Name is required', 'any.empty': 'Last Name should not be empty', 'string.base': 'Last Name must be a string'}),
        email: Joi
            .string()
            .email()
            .required()
            .messages({'any.required': 'Email is required', 'string.empty': 'Email should not be empty', 'string.email': 'Email must be a valid email'}),
        sendInvite: Joi
            .boolean()
            .messages({'boolean.base': 'Send Invite must be a boolean'})
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