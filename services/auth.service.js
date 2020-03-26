const User = require('../models/user.model')
const ValidationHelper = require('../helpers/validation')
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

class AuthService {

    async login(req, res) {
        const loginFieldValidateschema = Joi.object({
            /*
            name: Joi
                .string()
                .min(5)
                .max(10)
                .required()
                .error(errors => {
                    errors.forEach(err => {
                        switch (err.type) {
                            case "any.empty":
                                err.message = "Value should not be empty!";
                                break;
                            default:
                                break;
                        }
                    });
                    return errors;
                }),
                */
            email: Joi
                .string()
                .email()
                .required()
                .label("Email Address")
                .messages({'any.required': 'Email is required', 'string.email': 'Email must be a valid email'}),
            password: Joi
                .required()
                .messages({'any.required': 'Password is required'})
        }).options({abortEarly: false});

        const loginValidation = loginFieldValidateschema.validate(req.body);

        if (loginValidation.error) {
            var error = loginValidation.error;

            var errorMessage = {
                status: 'failure',
                msg: 'Field Validation Error',
                oldValues: error._original,
                error: ValidationHelper.joiGenerateValidationError(error.details)
            }
            // res.status(400).json({ message: error }); res.status(400).json({ message:
            // errorMessage });
            return errorMessage;
        }

        const {
            value: {
                email = '',
                password = ''
            } = {}
        } = loginValidation;

        //Check if user exists
        return User
            .findOne({email})
            .then(user => {
                if (!user) {
                    var errorMessage = {
                        status: 'failure',
                        msg: 'User does not exists'
                    }
                    return errorMessage;
                }

                //Validating Password
                return bcrypt
                    .compare(password, user.password)
                    .then(isMatch => {
                        if (!isMatch) {
                            var errorMessage = {
                                status: 'failure',
                                msg: 'Invalid Credentials'
                            }
                            return errorMessage;
                        }
                        //Generate JWT Token
                        var token = jwt.sign({
                            id: user.id
                        }, process.env.JWT_SECRET, {expiresIn: process.env.REFRESH_TOKEN_EXPIRY});
                        if (token) {
                            var message = {
                                status: 'success',
                                msg: 'User LoggedIn Sucessfully',
                                token
                            }
                            return message;
                        }
                    })

            });
    }

    regenerateAuthtoken(req) {

        const {authToken, refreshToken} = req.body;

        //Custom Joi Validation
        const verifyJWTToken = (value, helpers) => {

            try {
                jwt.verify(authToken, process.env.JWT_SECRET, {ignoreExpiration: true});
            } catch (e) {
                if (e.name === 'JsonWebTokenError') {
                    //invalid JSON Token
                    return helpers.error('any.invalid');
                }
            }

            return value;
        };

        const verifyRefreshToken = (value, helpers) => {

            if (value != process.env.API_REFRESH_TOKEN) {
                return helpers.error('any.invalid');
            }

            return value;
        };

        const fieldValidateschema = Joi.object({
            authToken: Joi
                .required()
                .custom(verifyJWTToken)
                .messages({'any.required': 'Auth Token is required', 'any.invalid': 'Invalid Auth Token'}),
            refreshToken: Joi
                .required()
                .custom(verifyRefreshToken)
                .messages({'any.required': 'Refresh Token is required', 'any.invalid': 'Refresh Token is invalid'})
        }).options({abortEarly: false});

        const validation = fieldValidateschema.validate(req.body);

        if (validation.error) {
            var error = validation.error;

            var errorMessage = {
                status: 'failure',
                msg: 'Field Validation Error',
                oldValues: error._original,
                error: ValidationHelper.joiGenerateValidationError(error.details)
            }

            return errorMessage;
        }

        const exToken = jwt.verify(authToken, process.env.JWT_SECRET, {ignoreExpiration: true});

        //Generate JWT Token
        var token = jwt.sign({
            id: exToken.id
        }, process.env.JWT_SECRET, {expiresIn: process.env.REFRESH_TOKEN_EXPIRY});
        if (token) {
            var message = {
                status: 'success',
                msg: 'New Token Generated Sucessfully',
                token
            }
            return message;
        }

    }

    getUserByAccessToken(req) {
        const {
            user = ''
        } = req;

        return User
            .findById(user, '-password')
            .then(user => {
                if (!user) {
                    var errorMessage = {
                        status: 'failure',
                        msg: 'User does not exists'
                    }
                    return errorMessage;
                }
                var message = {
                    status: 'success',
                    msg: 'User Details',
                    user
                }
                return message;
            })
    }

}

module.exports = AuthService