const express = require('express')
const app=express()

//导入解决跨域的中间件
const cors=require('cors')

//导入表单验证的中间件
const joi = require('joi')

app.use(cors())

//托管静态资源
app.use('/uploads',express.static('./uploads'))


//一定要在路由之前配置解析token
//导入解析token的中间件
const expressJWT = require('express-jwt')
//引入密钥
const config = require('./config')
//应用解析token中间件
app.use(expressJWT({secret:config.jwtSecretKey,algorithms:['HS256']}).unless({path:[/^\/api/]}))




//导入注册登录注册路由模块
const userRouter=require('./router/user')

//导入个人中心路由模块
const userinfo =require('./router/userinfo')

//导入文章分类路由模块
const artCateRouter =require('./router/artcate')

//配置解析(body)
app.use(express.urlencoded({extended:false}))


app.use('/api',userRouter)
app.use('/my',userinfo)
app.use('/my/article',artCateRouter)






//错误级别中间件
app.use((err,req,res,next)=>{

    //登录验证失败导致的错误
    if(err instanceof joi.ValidationError) return res.send('错误中间件：'+err.message)
    //身份认证失败后的错误
    if(err.name === 'UnauthorizedError') return res.send('错误中间件：身份认证失败')
    //位置错误
    res.send('错误中间件：'+err.message)
})

app.listen(3007,()=>{
    console.log('http://127.0.0.1:3007')
})