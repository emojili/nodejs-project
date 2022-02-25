const joi = require('joi')


const id = joi.number().integer().min(1).required()
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()
const nickname = joi.string().required()
const user_email = joi.string().email().required()
const avatar = joi.string().dataUri().required()

//登录注册规则
exports.reg_login_schema = {
    body:{
        username,
        password
    }
}

//更新时提交的新信息
exports.update_userinfo_schema = {
    body:{
        id,
        nickname,
        email:user_email
    }
    
}

//更新密码
exports.updatepwd_userinfo_schema = {
    body:{
        oldPwd:password,
        newPwd:joi.not(joi.ref('oldPwd')).concat(password)  //concat合并多条规则
    }
}

//更新头像
exports.update_avatar_schema={
    body:{
        avatar
    }
}