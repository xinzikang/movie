const mongoose = require('mongoose')
const UserSchema = require('../models/users.js')
const crypto = require('crypto')
var _ = require('underscore')

const User = mongoose.model('users', UserSchema)

const userType = [
  {
    value: '普通用户',
    role: 0
  },
  {
    value: '管理员',
    role: 11
  }
];
const successMsg = {
  errNo: 0,
  data: ''
}

/*
  登录
*/
function signin(req,res) {
  (async () => {
    const compareObj = await User.comparePassword(req.body.name, req.body.password)
    console.log(compareObj)
    if (compareObj.user.name) {
      if(compareObj.isMatch) { // 警告！警告！ find结果是一个数组（即使为一个空数组），findOne结果是一个Obj
        req.session.user = compareObj.user;
        return res.send({
          errNo: 0,
          data: {
            isAdmin: req.session.user.role > 10
          }
        })
      } else {
        res.send({
          errNo: 1,
          errStr: '密码不正确'
        })
      }
    } else {
      res.send({
        errNo: 1,
        errStr: '未注册'
      })
    }

  })()
    .then( (res) => {
      console.log('then:' +res)
    })
    .catch( (err) => {
      console.log(err)
    })
};

/*
  注册
*/
function signup(req,res) {
  (async () => {
    const user = await User.findByName(req.body.name)
    if(!user.length) {
      /*
      // 抵此处提出去是为了别处代码的复用save逻辑
      const newUser = await new User(req.body)
      newUser.save(err => {
        console.log(err)
      })
      return res.redirect('http://www.baidu.com')*/
      save(req,res)
    } else {
      res.send({
        errNo: 1,
        errStr: '该用户名已经注册'
      })
    }
  })()
    .then( (res) => {
      console.log('then:' +res)
    })
    .catch( (err) => {
      console.log(err)
    })
}

/*
  登出
*/
function signout(req, res) {
  (async () => {
    delete req.session.user;
    res.send(successMsg);
  })()
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
}

/*
  用户列表
*/
async function list(req, res) {
  try {
    const query = req.query;
    const searchJson = query.searchJson ? JSON.parse(query.searchJson) : {};
    // limit must be Number
    const allUser = await User.fetch(searchJson);
    const user =  await User.fetch(searchJson, query.pn, +query.limit);
    res.send({
      errNo: 0,
      data: {
        list: user,
        userTypeList: userType,
        total: allUser.length
      }
    });
  } catch(e) {
    console.log('user list err:', e);
  }
}

/*
  某一用户详情
*/
async function getUserDetail(req, res) {
  try {
    const userInfo = await User.findById(req.params.id);
    res.send({
      errNo: 0,
      data: {
        userInfo: userInfo[0],
        roleAllType: userType
      }
    })
  } catch(e) {
    console.log('getUserDetail err:', e);
  }
}

/*
  保存用户信息
*/
async function saveUser(req, res) {
  try {
    const body = req.body;
    const dbUser = await User.findById(body.id);
    const newUser = _.extend(dbUser[0], body)
    await newUser.save(err => {
      console.log('newUser save err:', err);
    })
    res.send(successMsg)
  } catch(e) {
    console.log('saveUser err:', e);
  }
}

/*
  数据库保存
*/
async function save(req, res){
  try {
    const bodyData = req.body;
    // 此处的密码加密也可以在schema的pre save中来做
    const hash = crypto.createHash('md5')
    hash.update(bodyData.password);
    const newUser = await new User({
      name: bodyData.name,
      password: hash.digest('hex')
    })
    await newUser.save((err) => {
      if(err) {
        console.log(err)
      }
    })
    res.send({
      errNo: 0,
      data: '注册成功'
    });
  } catch(e) {
    console.log('save err', e);
  }
}

/*
  用户权限
*/
function signinRequired(req, res, next) {
  const _user = req.session.user;
  if(!_user) {
    res.send('您还没有登录')
  } else {
    next();
  }
}

function adminRequired(req, res, next) {
  const _role = req.session.user.role;
  if(_role >= 10) {
    next();
  } else {
    res.send('您目前还没有权限');
  }
}

/*
  删除用户
*/
async function deleteOne(req, res) {
  try {
    await User.deleteOne({_id: req.params.id});
    res.send(successMsg)
  } catch(e) {
    console.log('deleteOne err:', e);
  }
}

module.exports = {
  signin,
  signup,
  signout,
  list,
  save,
  adminRequired,
  signinRequired,
  deleteOne,
  getUserDetail,
  saveUser
}
