var express = require('express');
var router  = express.Router();

let event_location = require('../controllers/event-location');

router.get('/', event_location.index);
router.post('/', event_location.save);

module.exports = router;