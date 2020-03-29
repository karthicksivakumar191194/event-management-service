const Event = require('../models/event.model');
const EventService = require('../services/event.service');

exports.index = async function (req, res, next) {
    try {
        const events = await Event
            .find({})
            .populate('category')
            .populate('location')
            .populate('createdBy', 'fName lName')
            .exec();
        res
            .status(200)
            .json(events)
    } catch (err) {
        res
            .status(500)
            .json({message: err.message})
    }
}

exports.save = async function (req, res) {
    const result = await EventService.save(req, res);
    if (result) {
        if (result.status == 'failure') {
            res
                .status(400)
                .json({msg: result})
        } else {
            res
                .status(200)
                .json({msg: result})
        }
    } else {
        res
            .status(500)
            .json({msg: 'Internal Error!'})
    }
}

exports.edit = async function (req, res) {
    const result = await EventService.edit(req, res);
    if (result) {
        res
            .status(200)
            .json({msg: result})
    } else {
        res
            .status(500)
            .json({msg: 'Internal Error!'})
    }
}

exports.update = async function (req, res) {
    const result = await EventService.update(req, res);
    if (result) {
        if (result.status == 'failure') {
            res
                .status(400)
                .json({msg: result})
        } else {
            res
                .status(200)
                .json({msg: result})
        }
    } else {
        res
            .status(500)
            .json({msg: 'Internal Error!'})
    }
}

exports.delete = function (req, res, next) {}