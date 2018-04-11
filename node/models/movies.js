const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

const MovieSchema = new mongoose.Schema({
  CHITitle: String,
  title: String,
  director: String,
  country: String,
  lang: String,
  doubanScore: String,
  poster: String,
  year: String,
  summary: String,
  categoryType: String,
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

MovieSchema.pre('save',function(next) {
  if(this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }

  next()
})

MovieSchema.statics = {
  fetch: async function(filter, pn, limit) {
    return await this
      .find(filter)
      .skip(limit * (pn -1))
      .limit(limit)
      .exec() // 回调函数，可在exec中调用,也可在find（）中当做第二个函数调用
  },
  findById: async function (id) {
    return await this
      .find({_id: id})
      .exec()
  }
}

module.exports = MovieSchema