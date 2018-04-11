var express = require('express');
var router = express.Router();
const User = require('../../services/users');
const Comments = require('../../services/comments');

router.get('/list', User.signinRequired, Comments.getList);
router.post('/add', User.signinRequired, Comments.save);


module.exports = router;