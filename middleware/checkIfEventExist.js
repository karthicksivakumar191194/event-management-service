const mongoose = require('mongoose')
const Event = require('../models/event.model');

async function checkIfEventExist(req, res, next) {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){ 
        return res
        .status(400)
        .json({message: 'Invalid Event ID'})
    }

    try {
        event = await Event.findById(req.params.id)
        if (event == null) {
            return res
                .status(404)
                .json({message: 'Event Not Found'})
        }
    } catch (err) {
        return res
            .status(500)
            .json({message: err.message})
    }

    res.event = event
    next()
}

module.exports = checkIfEventExist;