const mongoose = require('mongoose')
const MovieSchema = require('../models/movies.js')
const _ = require('underscore')

const Movie = mongoose.model('movies', MovieSchema);
const Comment = require('./comments');
const _comment = Comment.Comment;

/*
  后台保存 添加 / 更新 电影
*/
async function save(req,res) {
  try {
    const movieObj = req.body
    const id = movieObj._id
    let newMovie = null;
    if(id != 0) {
      // 更新电影
      const movie = await Movie.findById(id);
      // await movie[0].update(movieObj); 两种方法都可以更新
      newMovie = _.extend(movie[0], movieObj);
    } else {
      // 新增电影
      newMovie = await new Movie({
        CHITitle: movieObj.CHITitle,
        title: movieObj.title,
        lang: movieObj.lang,
        country: movieObj.country,
        summary: movieObj.summary,
        doubanScore: movieObj.doubanScore,
        director: movieObj.director,
        poster: movieObj.poster,
        year: movieObj.year,
        categoryType: movieObj.categoryType
      });
    }
    await newMovie.save((err) => {
      if(err) {
        console.log('save err:' + err);
      }
    });
    res.send({
      errNo: 0,
      data: []
    })
  } catch(err) {
    console.log('save err:' + err);
  }
}


/*
  搜索电影
  @ req.searchJson // 筛选参数
    req.pn         // list页数
    req.limit      // list每页数量
  @return filter list
*/
async function getMovieList(req, res) {
  try {
    const queryString = req.query;
    const queryJson = queryString.searchJson ? JSON.parse(queryString.searchJson) : {};
    const allResult = await Movie.fetch(queryJson);
    const queryResult = await Movie.fetch(queryJson, queryString.pn, +queryString.limit);
    const count = allResult.length;
    res.send({
      errNo: 0,
      data: {
        list: queryResult,
        total: count
      }
    })
  } catch(err) {
    console.log('movie/list err:', err);
  }
}

/*
  电影详情
*/
function detail(req,res) {
  (async () => {
    const id = req.params.id;
    const movie = await Movie.findById(id);
    const comment = await _comment.findByMovieId(id);
     if(movie.length) {
      res.send({
        errNo: 0,
        data: {
          movie: movie[0],
          comment: comment
        }
      })
    } else {
      res.send('没有此电影')
    }
  })()
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log('err:' + err)
    })
}

/*
  删除一条电影
*/
async function deleteOne(req, res) {
  try {
    const id = req.params.id;
    if (id) {
      await Movie.deleteOne({_id: id})
      res.send({
        errNo: 0,
        data: 'delete successfully'
      })
    } else {
      res.send({
        errNo: 1,
        errStr: '缺少删除的ID'
      })
    }
  }
  catch(err) {
     console.log('remove err:' + err)
   }
}

module.exports = {
  detail,
  save,
  getMovieList,
  deleteOne
};
