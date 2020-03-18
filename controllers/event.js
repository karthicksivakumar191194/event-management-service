const Event = require('../models/event');

exports.index = async function(req, res, next) {
    try {
        const events = await Event.find({}).populate('category').populate('location').populate('createdBy', 'fName').exec();
        res.status(200).json(events)
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
}

exports.save = async function(req, res, next) {
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
        res.status(201).json(newEvent)
      } catch (err) {
        res.status(400).json({ message: err.message })
      }
}