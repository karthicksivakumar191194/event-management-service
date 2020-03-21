var express = require('express');
var router = express.Router();

let auth = require('../controllers/auth.controller');

router.post('/login', auth.login);
router.post('/regenerate-authtoken', auth.regenerateAuthtoken);
router.get('/user', auth.user);

module.exports = router;
