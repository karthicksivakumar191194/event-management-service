const EventCategory = require('../models/event-category');

exports.index = async function(req, res, next) {
    try {
        const eventCategories = await EventCategory.find({})
        res.status(200).json(eventCategories)
      } catch (err) {
        res.status(500).json({ message: err.message })
      }
}

exports.save = async function(req, res, next) {
    const eventCategory = new EventCategory({
        name: req.body.name,
        description: req.body.description
      })
      
      try {
        const newEventCategory = await eventCategory.save()
        res.status(201).json(newEventCategory)
      } catch (err) {
        res.status(400).json({ message: err.message })
      }
}