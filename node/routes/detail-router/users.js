var express = require('express');
var router = express.Router();
const User = require('../../services/users');

router.post('/signin', User.signin);

router.post('/signup', User.signup);

router.get('/signout', User.signout);

module.exports = router;
