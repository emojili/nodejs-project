
const fs=require('fs')
//const path=require('path')
//导入数据库操作模块
const db =require('../db/index')

const path = require('path')

//获取文章分类处理函数
exports.getArtcates = (req,res)=>{

    const sql = 'select * from article where is_delete=0 order by id asc'

    db.query(sql,(err,results)=>{

        if(err) return res.send(err.message)
        res.send({
            status:0,
            message:'获取文章分类成功',
            data:results
        })
    })
}

//新增文章分类处理函数
exports.addArtCates=(req,res)=>{

    const sql = 'select * from article where name=? or alias=?'

    //查询名称是否被占用
    db.query(sql,[req.body.name,req.body.alias],(err,results)=>{
        if(err) return res.send(err.message)

        if(results.length === 2) return res.send('分类名称与别名被占用')

        if(results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.send('分类名称与别名被占用')

        if(results.length === 1 && results[0].name === req.body.name) return res.send('名称被占用')

        if(results.length === 1 && results[0].alias === req.body.alias) return res.send('别名被占用')

        //新增文章分类
        const sql = 'insert into article set?'
        db.query(sql,req.body,(err,results)=>{
            if(err) return res.send(err.message)

            if(results.affectedRows !==1) return res.send('添加失败')

            res.send({
                status:0,
                message:'添加成功'
            })
        })
    })

}


//删除文章分类处理函数
exports.deleteCateById=(req,res)=>{

    const sql = 'update article set is_delete=1 where id=?'

    db.query(sql,req.params.id,(err,results)=>{

        if(err) return res.send(err.message)
        if(results.affectedRows !==1) return res.send('删除失败')
        res.send('删除成功')

    })

}

//根据ID获取文章分类数据
exports.getArtcateById=(req,res)=>{

    const sql = 'select * from article where id=?'

    db.query(sql,req.params.id,(err,results)=>{

        if(err) return res.send(err.message)

        if(results.length !== 1) res.send('获取失败')

        res.send({
            status:0,
            message:'获取分类详情成功',
            data:results[0]
        })

    })
}

//根据Id更新文章分类数据
exports.updateCateById=(req,res)=>{

    const sql = 'select * from article where Id<>? and(name=? or alias=?)'

    //查询名称是否被占用
    db.query(sql,[req.body.Id,req.body.name,req.body.alias],(err,results)=>{
        if(err) return res.send(err.message)

        if(results.length === 2) return res.send('分类名称与别名被占用')

        if(results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.send('分类名称与别名被占用')

        if(results.length === 1 && results[0].name === req.body.name) return res.send('名称被占用')

        if(results.length === 1 && results[0].alias === req.body.alias) return res.send('别名被占用')

        //更新文章分类
        const sql = 'update article set ? where id=?'
        db.query(sql,[req.body,req.body.Id],(err,results)=>{
            if(err) return res.send(err.message)

            if(results.affectedRows !==1) return res.send('更新失败')

            res.send({
                status:0,
                message:'更新文章分类成功'
            })
        })
    })

}



//发布新文章
exports.addNew=(req,res)=>{
    // console.log(req.body) //文本类型数据
    // console.log(req.file) //文件类型数据
    // res.send('ok')

    //判断是否上传了文章封面
    if(!req.file || req.file.fieldname !=='cover_img') return res.send('文章封面是必选参数')

    //整理要插入数据库的文章信息对象
    const articleInfo = {
        // 标题、内容、状态、所属的分类Id
        ...req.body,
         // 文章封面在服务器端的存放路径
        cover_img:path.join('/uploads',req.file.filename),
        pub_date:new Date(),
        author_id:req.user.id
        
    }

    const sql ="insert into ev_articles set ?"

    db.query(sql,articleInfo,(err,results)=>{
        if(err) return res.send(err.message)

        if(results.affectedRows !==1) return res.send('发布文章失败')


        // let oldfile=req.file.path
        // let newfile=req.file.path+path.parse(req.file.originalname).ext
        // fs.renameSync(oldfile,newfile)

        res.send({
            status:0,
            message:'发布成功',
            //url:"http://127.0.0.1:3007/upload/"+req.file.filename+path.parse(req.file.originalname).ext
        })

    })
}