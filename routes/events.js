var express = require('express');
var router  = express.Router();

// Middleware
var auth = require('../middleware/auth')
var checkIfEventExist = require('../middleware/checkIfEventExist')

let eventController = require('../controllers/event.controller');

router.get('/', auth, eventController.index);
router.post('/', auth, eventController.save);
router.get('/:id', auth, checkIfEventExist, eventController.show);
router.get('/edit/:id', auth, checkIfEventExist, eventController.edit);
router.put('/:id', auth, checkIfEventExist, eventController.update);
router.delete('/:id', auth, checkIfEventExist, eventController.delete);

module.exports = router;