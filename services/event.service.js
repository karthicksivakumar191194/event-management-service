const Event = require('../models/event.model');
const ValidationHelper = require('../helpers/validation');
var Joi = require('@hapi/joi');
var JoiDate = require('@hapi/joi-date');

Joi = Joi.extend(JoiDate); // extend Joi with Joi Date

exports.save = async function (req) {
    const eventValidation = validateFields(req, 'save');
    if (eventValidation.error) {
        var error = eventValidation.error;

        var errorMessage = {
            status: 'failure',
            msg: 'Field Validation Error',
            oldValues: error._original,
            error: ValidationHelper.joiGenerateValidationError(error.details)
        }
        return errorMessage;
    }

    const event = new Event({
        title: req.body.title,
        category: req.body.category,
        location: req.body.location,
        price: req.body.price,
        availableTickets: req.body.availableTickets,
        maxTicketsPerUser: req.body.maxTicketsPerUser,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        time: req.body.time,
        description: req.body.description,
        createdBy: req.body.createdBy
    })

    try {
        const newEvent = await event.save()
        var message = {
            status: 'success',
            msg: 'Event Saved Sucessfully'
        }
        return message;
    } catch (err) {
        var message = {
            status: 'failure',
            msg: 'Error while saving event.',
            errorDetails: err.message
        }
        return message;
    }
}

exports.edit = function (req, res) {
    var message = {
        status: 'success',
        msg: 'Event Details',
        details: res.event
    }
    return message;
}

exports.update = async function (req) {
    const eventValidation = validateFields(req, 'save');
    if (eventValidation.error) {
        var error = eventValidation.error;

        var errorMessage = {
            status: 'failure',
            msg: 'Field Validation Error',
            oldValues: error._original,
            error: ValidationHelper.joiGenerateValidationError(error.details)
        }
        return errorMessage;
    }
}

function validateFields(req, module) {
    var jObj = {
        title: Joi
            .string()
            .required()
            .messages({'any.required': 'Title is required', 'any.empty': 'Title should not be empty'}),
        category: Joi.optional(),
        location: Joi.optional(),
        price: Joi
            .number()
            .allow('')
            .messages({'number.base': 'Price must be a number'}),
        availableTickets: Joi
            .number()
            .allow('')
            .messages({'number.base': 'Available Tickets must be a number'}),
        maxTicketsPerUser: Joi
            .number()
            .allow('')
            .max(Joi.ref('availableTickets'))
            .messages({'number.base': 'Max Ticket Per User must be a number', 'number.max': 'Max Ticket Per User must be less than or equal to Available Tickets'}),
        startDate: Joi
            .date()
            .format("YYYY-MM-DD")
            .required()
            .messages({'any.required': 'Start Date is required', 'date.format': 'Start Date must be in YYYY-MM-DD format'}),
        endDate: Joi
            .date()
            .format("YYYY-MM-DD")
            .allow('')
            .min(Joi.ref('startDate'))
            .messages({'any.required': 'End Date is required', 'date.format': 'End Date must be in YYYY-MM-DD format', 'date.min': 'End Date must be larger or equal to Start Date'}),
        time: Joi
            .string()
            .regex(/^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/)
            .allow('')
            .messages({'string.pattern.base': 'Invalid Time'}),
        description: Joi.optional(),
        createdBy: Joi
            .required()
            .messages({'any.required': 'Created By is required'})
    };

    const eventFieldValidateschema = Joi
        .object(jObj)
        .options({abortEarly: false});
    const eventValidation = eventFieldValidateschema.validate(req.body);

    return eventValidation;
}

/* JOI Validations
* required() - Field need to present on the request
* optional() - Optional field | This field can be present or not present on the request
*
* If a field is not added to the Joi validation, will throw 'field is not allowed' error, to fix this add optional() to those field or any validation needed.
* If we don't add required and add other validations for a field, if field is not present on the request will not throw error if present will check for the validation
*/