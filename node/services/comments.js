const mongoose = require('mongoose')
const CommentSchema = require('../models/comments.js')
const _ = require('underscore')

const Comment = mongoose.model('comments', CommentSchema);

/*
  后台保存 添加 / 更新 评论
*/
function save(req,res) {
  (async () => {
    try {
        const commentObj = req.body;
        if(commentObj.to) {
          // 存在to字段，表示是回复评论
          let dbComment = await Comment.findById(commentObj.commentId);
          const replyComment = {
            to: commentObj.to,
            from: req.session.user._id,
            comment: commentObj.comment
          };
          dbComment.reply.push(replyComment);
          dbComment.save(err => {
            if(err) {
              console.log('save err:' + err);
            }
            res.send({
              errNo: 0,
              data: 'save successfully'
            })
          })
        }
        else {
          const _commentObj = _.extend(commentObj, {from: req.session.user._id});
          const _comment = await new Comment(_commentObj);
          _comment.save((err) => {
            if(err) {
              console.log('save err:' + err);
            }
            res.send({
              errNo: 0,
              data: 'save successfully'
            })
          });
        }
    } catch(err) {
      console.log('save err:' + err);
    }
  })()

}

/*
  评论列表
*/
function getList(req, res) {
  (async () => {
    const _id = req.params.id;
    const comment = await Comment.findByMovieId(_id);
    res.send(comment)
    // console.log('comment,', comment)
    // return await Comment.findByMovieId(movieId);
  })()
    .then((res) => {
      console.log(res)
    })
    .catch(() => {
    })
}

/*
  删除一条评论
*/
function deleteOne(req, res) {
  (async () => {
    const id = req.params.id;
    console.log(id)
    if (id) {
      await Movie.remove({_id: id})
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
  })()
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log('remove err:' + err)
    })
}

module.exports = {
  getList,
  save,
  deleteOne,
  Comment
};
