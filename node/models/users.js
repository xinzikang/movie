const mongoose = require('mongoose')
const crypto = require('crypto')
const UserSchema = new mongoose.Schema({
  name: String,
  password: String,
  role: {
    // 此处只用两种role，0：普通用户， >10：管理员
    type: Number,
    default: 0
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


UserSchema.statics = {
  fetch: async function(searchJson, pn, limit) {

    return await this
      .find(searchJson)
      .skip(limit * (pn - 1))
      .limit(limit)
      .exec() // 回调函数，可在exec中调用,也可在find（）中当做第二个函数调用
  },
  findById: async function(id) {
    return await this
      .find({_id: id})
      .exec()
  },
  findByName: async function(userName) {
    return await this
      .find({name: userName})
      .exec()
  },
  comparePassword: async function(name, password) {
    // 注意 find => [] ; findOne => {}
    const dbFindObj = await this.findOne({name: name})
    if (dbFindObj) {
      const dbPassword = dbFindObj.password;
      const hash = crypto.createHash('md5')
      hash.update(password);
      const postPassword = hash.digest('hex')
      return {
        isMatch: postPassword === dbPassword,
        user: dbFindObj
      }
    } else {
      return {
        isMatch: false,
        user: {}
      }
    }
  },

}

module.exports = UserSchema;