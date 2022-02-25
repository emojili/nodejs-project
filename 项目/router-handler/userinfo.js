const db =require('../db/index')


const bcrypt =require('bcryptjs')


//查询用户信息（个人中心）
exports.userinfo=(req,res)=>{
    const sql = 'select id, username, nickname, email, user_pic from user where id=?'

    //执行sql语句
    db.query(sql,req.user.id,(err,results)=>{
        if(err) return res.send(err.message)

        if(results.length !== 1) return res.send('获取用户信息失败')

        //获取用户信息成功
        res.send({
            status:0,
            message:'获取用户信息成功',
            data:results[0]
        })
    })
}

//更新用户信息(需要优化******)

exports.updateUserinfo=(req,res)=>{

    const sql = `update user set ? where id=?`

    db.query(sql,[req.body,req.body.id],(err,results)=>{

        if(err) return res.send(err.message)

        if(results.affectedRows !== 1) return res.send('修改信息失败')

        return res.send('修改信息成功')

    })

}

//更新密码
exports.updatepwd=(req,res)=>{

    const sql = 'select * from user where id=?'

    db.query(sql,req.user.id,(err,results)=>{

        if(err) return res.send(err.message)

        if(results.length !== 1) return res.send('用户不存在')

        const compareResult = bcrypt.compareSync(req.body.oldPwd,results[0].password)

        if(!compareResult) return res.send('旧密码错误')



        //加密密码存入
        const sql = 'update user set password=? where id=?'

        //加密新密码
        const newPwd = bcrypt.hashSync(req.body.newPwd,10)

        db.query(sql,[newPwd,req.user.id],(err,results)=>{

            if(err) return res.send(err.message)
            //console.log(results)
            if(results.affectedRows !== 1) return res.send('更新密码失败')

            res.send('更新密码成功')
        })

    })
    
}

//更新头像
exports.updateAvatar=(req,res)=>{

    const sql = 'update user set user_pic=? where id=?'

    db.query(sql,[req.body.avatar,req.user.id],(err,results)=>{

        if(err) return res.send(err.message)

        if(results.affectedRows !== 1) return res.send('更新头像失败')

        return res.send('更新头像成功')
    })
    
}


// // 更新用户头像的处理函数
// exports.updateAvatar = (req, res) => {
//     res.send('ok')
//   }

