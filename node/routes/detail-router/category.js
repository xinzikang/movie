var express = require('express')
var router = express.Router()
var categoryService = require('../../services/category')

/*
  后台录入电影分类 新增 、 编辑
*/
router.post('/change', categoryService.addCategory)

/*
  编辑分类时，分类详情
*/
router.get('/info', categoryService.categoryInfo)

/*
  电影分类列表
*/
router.get('/list', categoryService.list)

module.exports = router;