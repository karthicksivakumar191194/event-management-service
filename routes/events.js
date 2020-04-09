var express = require('express');
var router  = express.Router();

// Middleware
var auth = require('../middleware/auth')
var checkIfEventExist = require('../middleware/checkIfEventExist')

let event = require('../controllers/event.controller');

router.get('/', auth, event.index);
router.post('/', auth, event.save);
router.get('/:id', auth, checkIfEventExist, event.show);
router.get('/edit/:id', auth, checkIfEventExist, event.edit);
router.put('/:id', auth, checkIfEventExist, event.update);
router.delete('/:id', auth, checkIfEventExist, event.delete);

module.exports = router;