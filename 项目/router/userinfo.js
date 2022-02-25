const express = require('express')

//导入验证模块中间件
const expressJoi = require('@escook/express-joi') 

//导入验证规则
const { update_userinfo_schema } = require('../schema/user')
const { updatepwd_userinfo_schema } = require('../schema/user')
const { update_avatar_schema } = require('../schema/user')

//导入路由处理函数模块
const userinfo =require('../router-handler/userinfo')

const router = express.Router()


router.get('/userinfo',userinfo.userinfo)

router.post('/userinfo',expressJoi(update_userinfo_schema),userinfo.updateUserinfo)

router.post('/updatepwd',expressJoi(updatepwd_userinfo_schema),userinfo.updatepwd)

//router.post('/update',expressJoi(update_atavar_schema),userinfo.updateAvatar)
//router.post('/update/avatar', userinfo.updateAvatar)
router.post('/update/avatar', expressJoi(update_avatar_schema), userinfo.updateAvatar)


module.exports=router