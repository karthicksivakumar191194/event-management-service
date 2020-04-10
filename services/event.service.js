const Event = require('../models/event.model');
const ValidationHelper = require('../helpers/validation');
var Joi = require('@hapi/joi');
var JoiDate = require('@hapi/joi-date');

Joi = Joi.extend(JoiDate); // extend Joi with Joi Date

exports.index = function (perPage, page) {
    if (perPage && page) {
        return getAllEventsWithPagination(perPage, page);
    } else {
        return getAllEvents();
    }
}

function getAllEvents() {
    return Event
        .find({})
        .populate('category')
        .populate('location')
        .populate('createdBy', 'fName lName')
        .exec();
}

function getAllEventsWithPagination(perPage, pageNo) {
    var startIndex = (perPage * pageNo) - perPage; //(10 * 3) - 10 = 20
    var limit = parseInt(perPage); // 10
    //Start from index 20 and get 10 records(ie. 20 to 20+10)

    return Event
        .find({})
        .limit(limit)
        .skip(startIndex)
        .populate('category')
        .populate('location')
        .populate('createdBy', 'fName lName')
        .exec();
}

exports.eventsCount = function () {
    return Event.estimatedDocumentCount();
}

exports.save = async function (req) {
    const eventValidation = validateFields(req, 'save');
    if (eventValidation.error) {
        var error = eventValidation.error;

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
            title = '',
            category = '',
            location = '',
            price = '',
            availableTickets = '',
            maxTicketsPerUser = '',
            startDate = '',
            endDate = '',
            time = '',
            description = '',
            createdBy = ''
        } = {}
    } = eventValidation;

    const event = new Event({
        title: title,
        category: category
            ? category
            : null,
        location: location
            ? location
            : null,
        price: price,
        availableTickets: availableTickets,
        maxTicketsPerUser: maxTicketsPerUser,
        startDate: startDate,
        endDate: endDate,
        time: time,
        description: description,
        createdBy: createdBy
    })

    try {
        await event.save()
        var message = {
            code: 201,
            success: true,
            msg: 'Event Saved Sucessfully'
        }
        return message;
    } catch (err) {
        var message = {
            code: 500,
            success: false,
            msg: 'Error while saving event',
            errorDetails: err.message
        }
        return message;
    }
}

exports.show = async function (req, res) {
    try {
        const event = await res
            .event
            .populate('category')
            .populate('location')
            .populate('createdBy', 'fName lName')
            .execPopulate();
        var message = {
            code: 200,
            success: true,
            msg: 'Event Details',
            data: event
        }
        return message;
    } catch (err) {
        var message = {
            code: 500,
            success: false,
            msg: 'Error while fetching event details',
            errorDetails: err.message
        }
        return message;
    }
}

exports.edit = function (req, res) {
    var message = {
        code: 200,
        success: true,
        msg: 'Event Details',
        data: res.event
    }
    return message;
}

exports.update = async function (req, res) {
    const eventValidation = validateFields(req, 'update');
    if (eventValidation.error) {
        var error = eventValidation.error;

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
            title = '',
            category = '',
            location = '',
            price = '',
            availableTickets = '',
            maxTicketsPerUser = '',
            startDate = '',
            endDate = '',
            time = '',
            description = ''
        } = {}
    } = eventValidation;

    res.event.title = title;
    res.event.category = category
        ? category
        : null;
    res.event.location = location
        ? location
        : null;
    res.event.price = price;
    res.event.availableTickets = availableTickets;
    res.event.maxTicketsPerUser = maxTicketsPerUser;
    res.event.startDate = startDate;
    res.event.endDate = endDate;
    res.event.time = time;
    res.event.description = description;

    try {
        await res
            .event
            .save()
        var message = {
            code: 200,
            success: true,
            msg: 'Event Update Sucessfully'
        }
        return message;
    } catch (err) {
        var message = {
            code: 500,
            success: false,
            msg: 'Error while updating event',
            errorDetails: err.message
        }
        return message;
    }
}

exports.delete = async function (req, res) {
    try {
        await res
            .event
            .remove()
        var message = {
            code: 200,
            success: true,
            msg: 'Event Deleted Sucessfully'
        }
        return message;
    } catch (err) {
        var message = {
            code: 500,
            success: false,
            msg: 'Error while deleting event',
            errorDetails: err.message
        }
        return message;
    }
}

function validateFields(req, module) {
    var jObj = {
        title: Joi
            .string()
            .required()
            .messages({'any.required': 'Title is required', 'string.empty': 'Title should not be empty', 'string.base': 'Title must be a string'}),
        category: Joi
            .required()
            .messages({'any.required': 'Category is required'}),
        location: Joi
            .required()
            .messages({'any.required': 'Location is required'}),
        price: Joi
            .number()
            .required()
            .allow('')
            .messages({'any.required': 'Price is required', 'number.base': 'Price must be a number'}),
        availableTickets: Joi
            .number()
            .required()
            .messages({'any.required': 'Available Tickets is required', 'number.base': 'Available Tickets must be a number'}),
        maxTicketsPerUser: Joi
            .number()
            .required()
            .allow('')
            .max(Joi.ref('availableTickets'))
            .messages({'any.required': 'Max Ticket Per User is required', 'number.base': 'Max Ticket Per User must be a number', 'number.max': 'Max Ticket Per User must be less than or equal to Available Tickets', 'any.ref': 'Reference field Available Tickets must be a number'}),
        startDate: Joi
            .date()
            .required()
            .format("YYYY-MM-DD")
            .messages({'any.required': 'Start Date is required', 'date.format': 'Start Date must be in YYYY-MM-DD format'}),
        endDate: Joi
            .date()
            .required()
            .format("YYYY-MM-DD")
            .allow('')
            .min(Joi.ref('startDate'))
            .messages({'any.required': 'End Date is required', 'date.format': 'End Date must be in YYYY-MM-DD format', 'date.min': 'End Date must be larger or equal to Start Date', 'any.ref': 'Reference field Start Date must be a date'}),
        time: Joi
            .string()
            .required()
            .regex(/^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/)
            .allow('')
            .messages({'any.required': 'Time is required', 'string.pattern.base': 'Invalid Time'}),
        description: Joi
            .required()
            .messages({'any.required': 'Description is required'})
    };

    if (module === 'save') {
        jObj.createdBy = Joi
            .string()
            .required()
            .messages({'any.required': 'Created By is required', 'string.empty': 'Created By should not be empty', 'string.base': 'Created By must be a string'})
    }

    const eventFieldValidateschema = Joi
        .object(jObj)
        .options({abortEarly: false});
    const eventValidation = eventFieldValidateschema.validate(req.body);

    return eventValidation;
}

/********* NOTES *********/
/* JOI Validations
* required() - Field need to present on the request
* optional() - Optional field | This field can be present or not present on the request
*
* If a field is not added to the Joi validation, will throw 'field is not allowed' error, to fix this add optional() to those field or any validation needed.
* If we don't add required and add other validations for a field, if field is not present on the request will not throw error if present will check for the validation
*/