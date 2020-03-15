var express = require('express');
var router  = express.Router();

let event_category = require('../controllers/event-category');

router.get('/', event_category.index);
router.post('/', event_category.save);

module.exports = router;