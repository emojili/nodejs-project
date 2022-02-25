const db=require('../db/index')

//导入加密模块
const bcrypt =require('bcryptjs')

//导入生成token的包
const jwt = require('jsonwebtoken')

//导入生成token的密钥
const jwtSecretKey =require('../config')


//登录处理函数
exports.login=(req,res)=>{
    const userinfo = req.body

    const sqlStr='select * from user where username=?'

    db.query(sqlStr,userinfo.username,(err,results)=>{

        if(err){
            return res.send({
                status:1,
                message:err.message
            })
        }

        if(results.length !==1){
            res.send({
                status:1,
                message:'账户不存在，请先注册'
            })
        }

        const compareResult = bcrypt.compareSync(userinfo.password,results[0].password)
        if(!compareResult) return res.send({
            status:1,
            message:'密码错误'
        })

        //在服务器生成token 字符集
        const user ={...results[0],password:'',user_pic:''}
        //加密
        const tokenStr=jwt.sign(user,jwtSecretKey.jwtSecretKey,{expiresIn:'10h'})
        res.send({
            status:0,
            message:'登录成功',
            token:'Bearer '+tokenStr
        })
        
    })
 
}

//注册处理函数
exports.regUser=(req,res)=>{
    //接收表单数据
    const userinfo = req.body

    console.log(userinfo)
    //判断是否合法
    // if(!userinfo.username || !userinfo.password) {
    //     return res.send({
    //         status:1,
    //         message:'用户名或密码不能为空！'
    //     })
    // }


    //判断用户名是否被占用
    const sqlStr='select * from user where username=?'
    db.query(sqlStr,userinfo.username,(err,results)=>{
        if(err){
            return res.send({
                status:1,
                message:err.message
            })
        }

        //用户名查重
        if(results.length > 0){
            return res.send({
                status:1,
                message:'用户名被占用'
            })
        }

        //密码加密
        //生成加密的密码数据
        userinfo.password=bcrypt.hashSync(userinfo.password,10)

        //插入新用户
        const sql='insert into user set ?'
        db.query(sql,{username:userinfo.username,password:userinfo.password},(err,results)=>{
            if(err){
                return res.send({
                    status:1,
                    message:err.message
                })

            }

            if(results.affectedRows !==1)return res.send({
                status:1,
                message:'注册失败，请稍后再试'
            })

            res.send({
                status:0,
                message:'注册成功！'
            })
        })

    })
    
}