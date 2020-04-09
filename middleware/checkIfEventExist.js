const mongoose = require('mongoose')
const Event = require('../models/event.model');

async function checkIfEventExist(req, res, next) { 
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){ 
        return res
        .status(400)
        .json({code: 400,  errorCode: 4001, success: false, msg: 'Invalid Event ID'})
    }

    try {
        event = await Event.findById(req.params.id)
        if (event == null) {
            return res
                .status(404)
                .json({code: 404, success: false, msg: 'Event Not Found'})
        }
    } catch (err) {
        return res
            .status(500)
            .json({code: 500, success: false, msg: err.message})
    }

    req.event_id = req.params.id
    res.event = event
    next()
}

module.exports = checkIfEventExist;