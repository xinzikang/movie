const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

const CategorySchema = new mongoose.Schema({
  name: String,
  type: Number,
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

CategorySchema.pre('save',function(next) {
  if(this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }

  next()
})

CategorySchema.statics = {
  fetch: async function() {
    return await this
      .find({}, {name: 1, type:1})
      .exec() // 回调函数，可在exec中调用,也可在find（）中当做第二个函数调用
  },
  findById: async function (id) {
    return await this
      .find({_id: id})
      .exec()
  },
  findByName: async function (name) {
    return await this
      .find({name: name})
      exec()
  }
}

module.exports = CategorySchema