//获取文章分类路由模块
const express = require('express')

const router = express.Router()




//导入解析formdata 格式表单数据的包
const multer = require('multer')
//导入处理路径的核心模块
const path = require('path')
//创建multer实例对象,通过 dest 属性指定文件的存放路径
const upload = multer({dest:path.join(__dirname,'../uploads')})



//导入验证数据中间件
const expressJoi = require('@escook/express-joi')

//导入添加文章分类验证规则
const {add_cates_schema} = require('../schema/artcates')

//导入根据ID删除文章分类验证规则
const {delete_cate_schema} = require('../schema/artcates')

//导入根据 Id 获取分类的验证规则对象
//const {delete_cate_schema} = require('../schema/artcates')

//导入根据Id更新分类规则
const {update_cate_schema} = require('../schema/artcates')

//导入发布文章规则对象
const {add_article_schema} = require('../schema/artcates')


//导入文章分类路由处理函数
const artCate_handler = require('../router-handler/artcate')


//获取文章分类列表路由
router.get('/cates',artCate_handler.getArtcates)

//新增文章分类路由
router.post('/addcates',expressJoi(add_cates_schema),artCate_handler.addArtCates)

//根据ID删除文章分类路由
router.get('/deletecate/:id',expressJoi(delete_cate_schema),artCate_handler.deleteCateById)

//根据ID获取文章分类数据
router.get('/catesdata/:id',expressJoi(delete_cate_schema),artCate_handler.getArtcateById)

//根据Id更新文章分类数据
router.post('/updatecate',expressJoi(update_cate_schema),artCate_handler.updateCateById)


//发布新文章
router.post('/addnew',upload.single('cover_img'),expressJoi(add_article_schema),artCate_handler.addNew)


module.exports=router