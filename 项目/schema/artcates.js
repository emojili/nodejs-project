const joi = require('joi')


const id = joi.number().integer().min(1).required()
const name = joi.string().required()
const alias = joi.string().alphanum().required()

const title = joi.string().required()
const cate_id = joi.number().integer().min(1).required()
const content = joi.string().required().allow('')
const state = joi.string().valid('已发布','草稿').required()

//添加分类规则
exports.add_cates_schema = {
    body:{
        name,
        alias
    }
}

//删除分类规则
exports.delete_cate_schema = {
    params:{
        id,
    }
}

//更新分类数据规则
exports.update_cate_schema = {
    body:{
        Id:id,
        name,
        alias
    }
}


//发布文章规则对象
exports.add_article_schema={
    body:{
        title,
        cate_id,
        content,
        state
    }
}