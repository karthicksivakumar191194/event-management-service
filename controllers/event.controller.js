const EventService = require('../services/event.service');
const ResponseHelper = require('../helpers/apiResponse')

exports.index = async function (req, res) {
    var perPage = req.query.perPage;
    var pageNo  = req.query.page;
    try {
        const events = await EventService.index(perPage, pageNo);
        try{
            const eventsCount = await EventService.eventsCount();

            res
            .status(200)
            .json({code: 200, success: true, msg: 'Events List', data: events, totalRecords: eventsCount})
        }catch(err){
            res
            .status(500)
            .json({code: 500, success: false, msg: err.message})
        }
    } catch (err) {
        res
            .status(500)
            .json({code: 500, success: false, msg: err.message})
    }
}

exports.save = async function (req, res) {
    const result = await EventService.save(req);
    ResponseHelper.renderResponse(res, result);
}

exports.show = async function (req, res) {
    const result = await EventService.show(req, res);
    ResponseHelper.renderResponse(res, result);
}

exports.edit = async function (req, res) {
    const result = EventService.edit(req, res);
    ResponseHelper.renderResponse(res, result);
}

exports.update = async function (req, res) {
    const result = await EventService.update(req, res);
    ResponseHelper.renderResponse(res, result);
}

exports.delete = async function (req, res) {
    const result = await EventService.delete(req, res);
    ResponseHelper.renderResponse(res, result);
}






/********* NOTES *********/
/* exports.save = async function (req, res) {
    //If EventService.save() is async function, we need to use 'await' when using
    const result = await EventService.save(req);
}
*/