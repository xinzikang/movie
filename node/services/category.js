var express = require('express')
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var CategorySchma = require('../models/category')
var Category = mongoose.model('category', CategorySchma)
var _ = require('underscore')

/*
  添加、修改分类
  @params: name / type / changeType
  @return: errNo: 1 // param err
          errNo: 2 // category name has had
*/
const ADDCHANGE = 0; // 添加分类
const EDITCHANGE = 1; // 修改分类
async function addCategory(req, res, next) {
  try {
    const body = req.body;
    let sendData = {};
    if (body.name && body.type && body.changeType) {
      let dbCategory = await Category.findByName(body.name);

      if (body.changeType == EDITCHANGE) {
        const newCategory = _.extend(dbCategory[0], body);
        console.log(newCategory)
        await newCategory.save((err) => {
          if (err) console.log('err', err);
        })
        sendData = {
          errNo: 0,
          errMsg: ''
        }
      }
      else if (body.changeType == ADDCHANGE) {
        if (dbCategory.length) {
          sendData = {
            errNo: 2,
            errMsg: '该分类名称已存在'
          };
        }
        else {
          const category = new Category(body);
          await category.save((err) => {
            if (err) {
              console.log('category save err:', err);
            }
          });
          sendData = {
            errNo: 0,
            errMsg: ''
          }
        }
      }
    }
    else {
      sendData = {
        errNo: 1,
        errMsg: 'param err'
      }
    }
    res.send(sendData)
  } catch(e) {
    console.log('addCategory err', e);
  }
}

async function categoryInfo(req, res, next) {
  try {
    const categoryName = req.query.name;
    const dbDate = await Category.findByName(categoryName)
    console.log(dbDate)
    res.send({
      errNo: 0,
      data: dbDate[0]
    })

  } catch(e) {
    console.log('categoryInfo err:', e);
  }
}

async function list(req, res, next) {
  try {
    const _list = await Category.fetch();
    res.send({
      errNo: 0,
      data: _list
    });
  } catch(e) {
    console.log('category list err:', e);
  }
}

module.exports = {
  addCategory,
  list,
  categoryInfo
}

