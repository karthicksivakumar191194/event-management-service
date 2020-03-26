var express = require('express');
var router  = express.Router();

let userController = require('../controllers/user.controller');

router.get('/', userController.index);
router.post('/', userController.save);

module.exports = router;