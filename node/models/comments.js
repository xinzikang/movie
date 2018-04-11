const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

const CommentSchema = new mongoose.Schema({
  movie: {
    type: ObjectId,
    ref: 'movies'
  },
  from: {
    type: ObjectId,
    ref: 'users'
  },
  to: {
    type: ObjectId,
    ref: 'users'
  },
  reply: [{
    from: { // 最后在输出数据的时候再统一调用populate方法
      type: ObjectId,
      ref: 'users'
    },
    to: String,
    comment: String
  }],
  comment: {
    type: String
  },
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

CommentSchema.pre('save',function(next) {
  if(this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }

  next()
})

CommentSchema.statics = {
  fetch: async function() {
    return await this
      .find({})
      .exec() // 回调函数，可在exec中调用,也可在find（）中当做第二个函数调用
  },
  findByMovieId: async function (id) {
    return await this
      .find({movie: id})
      .populate('from reply.from', 'name')
      .exec()
  },
  findById: async function (id) {
    return await this
      .findOne({_id: id})
      .exec()
  }
}

module.exports = CommentSchema