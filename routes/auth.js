var express = require('express');
var router = express.Router();

// Auth
var auth = require('../middleware/auth')

let authController = require('../controllers/auth.controller');

router.post('/login', authController.login);
router.post('/regenerate-authtoken', authController.regenerateAuthtoken);
router.get('/user', auth, authController.user);

module.exports = router;
