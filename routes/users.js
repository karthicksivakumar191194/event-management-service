var express = require('express');
var router  = express.Router();

// Middleware
var auth = require('../middleware/auth')

let userController = require('../controllers/user.controller');

router.get('/', auth, userController.index);
router.post('/', auth, userController.save);

module.exports = router;