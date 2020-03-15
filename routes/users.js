var express = require('express');
var router  = express.Router();

let user = require('../controllers/user');

router.get('/', user.index);
router.post('/', user.save);

module.exports = router;