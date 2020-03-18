const EventLocation = require('../models/event-location');

exports.index = async function(req, res, next) {
    try {
        const eventLocations = await EventLocation.find({})
        res.status(200).json(eventLocations)
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
}

exports.save = async function(req, res, next) {
    const eventLocation = new EventLocation({
        name: req.body.name,
        description: req.body.description
      })
      
      try {
        const newEventLocation = await eventLocation.save()
        res.status(201).json(newEventLocation)
      } catch (err) {
        res.status(400).json({ message: err.message })
      }
}