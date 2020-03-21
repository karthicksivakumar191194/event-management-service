const User = require('../models/user')
const ValidationHelper = require('../helpers/validation')
const Joi = require('@hapi/joi');

class AuthService{

    async login(req, res){
        const loginFieldValidateschema = Joi.object({
            /**
            name: Joi.string().min(5).max(10).required().error(errors => {
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
            email: Joi.string().email().required().label("Email Address").messages(
                {
                    'any.required' : 'Email is required',
                    'string.email' : 'Email must be a valid email'
                }
            ),
            password: Joi.required().messages(
                {
                    'any.required' : 'Password is required'
                }
            ),
        }).options({ abortEarly: false });
    
        const loginValidation = loginFieldValidateschema.validate(req.body);

        if(loginValidation.error){
            var error = loginValidation.error;

            var errorMessage = {
                status: 'failure',
                msg: 'Field Validation Error',
                oldValues: error._original,
                error: ValidationHelper.joiGenerateValidationError(error.details)
            }
            //res.status(400).json({ message: error });
            //res.status(400).json({ message: errorMessage });
            return errorMessage;
        }

        const { value:{email = '', password = ''} = {} } = loginValidation;

        //Check if user exists
         return User.findOne({email}).then(user => { 
            if(!user){
                var errorMessage = {
                    status: 'failure',
                    msg: 'User does not exists'
                }
                return errorMessage;
            }
        });

        //res.status(201).json('Success!');
    }

    regenerateAuthtoken(){

    }

    getUserByAccessToken(){

    }

}

module.exports = AuthService