const express =require('express')
const router = express.Router()

const userHandler=require('../router-handler/user')

//1.导入验证的中间件
const expressJoi = require('@escook/express-joi') 

//2.导入需要验证的规则对象
const {reg_login_schema} = require('../schema/user')

//注册新用户
router.post('/reguser',expressJoi(reg_login_schema),userHandler.regUser)

//登录
router.post('/login',expressJoi(reg_login_schema),userHandler.login)




module.exports=router