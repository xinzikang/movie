var express = require('express');
var router = express.Router();

const Movie = require('../../services/movies')
const User = require('../../services/users');


router.get('/detail/:id', Movie.detail);

router.get('/search', Movie.getMovieList);

module.exports = router;