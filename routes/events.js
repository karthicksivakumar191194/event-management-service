var express = require('express');
var router  = express.Router();

let event = require('../controllers/event');

router.get('/', event.index);
router.post('/', event.save);

module.exports = router;