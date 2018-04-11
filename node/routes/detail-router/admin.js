var express = require('express');
var router = express.Router();
const Movie = require('../../services/movies');
const User = require('../../services/users');
/*
  获取后台电影列表
*/
router.get('/movie/list', User.signinRequired, User.adminRequired, Movie.getMovieList);

/*
  新增后台电影列表
*/
router.post('/movie/add', User.signinRequired, User.adminRequired, Movie.save);

/*
  删除后台电影
*/
router.delete('/movie/:id', User.signinRequired, User.adminRequired, Movie.deleteOne);

/*
  获取后台用户列表
*/
router.get('/user/list', User.signinRequired, User.adminRequired , User.list);

/*
  获取后台用户详情
*/
router.get('/user/:id', User.signinRequired, User.adminRequired , User.getUserDetail);

/*
  保存用户详情更改
*/
router.post('/user/change', User.signinRequired, User.adminRequired , User.saveUser);

/*
   删除用户
*/
router.delete('/user/:id', User.signinRequired, User.adminRequired , User.deleteOne);

module.exports = router;