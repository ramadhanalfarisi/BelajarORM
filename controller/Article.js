const ArticleService = require('../service/ArticleService')
const CategoryArticleService = require('../service/CategoryArticleService')
const { validationResult } = require('express-validator')
const Response = require('../helper/response')
const slugify = require('../helper/slugmaker')

exports.readArticle = async function (req, res) {
    let Article = new ArticleService()
    let response = new Response(res)
    let data = await Article.readArticle(req, res)
    let dataArticle = data.article.rows
    let pagination = data.paginationRes
    return response.success(dataArticle, [{
        value: '',
        msg: 'success read articles',
        param: ''
    }], 200, pagination)

}

exports.readArticleBySlug = async function (req, res) {
    let Article = new ArticleService()
    let response = new Response(res)
    let data = await Article.readArticleby({
        slug: req.params.slug
    })
    return response.success(data, [{
        value: '',
        msg: 'success read articles',
        param: ''
    }])

}

exports.readArticleByCategory = async function (req, res) {
    let CategoryArticle = new CategoryArticleService()
    let response = new Response(res)
    let data = await CategoryArticle.readArticleByCategory({ 
        category_id: req.query.id_category 
    })
    return response.success(data, [{
        value: '',
        msg: 'success read articles',
        param: ''
    }])

}

exports.createArticle = async function (req, res) {
    let error = validationResult(req)
    let response = new Response(res)
    if (!error.isEmpty()) {
        return response.failed(error.array(), 422)
    }

    let Article = new ArticleService()
    let CategoryArticle = new CategoryArticleService()
    let { id_user, title, content, categories } = req.body
    let slug = slugify.makeSlug(title)
    let data = await Article.createArticle({
        id_user: id_user,
        title: title,
        content: content,
        slug: slug
    })
    if (data) {
        for (var i = 0; i < categories.length; i++) {
            CategoryArticle.createCategoryArticle({
                category_id: categories[i],
                article_id: data.id
            })
        }

        return response.success({
            title: data.title,
            content: data.content,
            slug: data.slug
        }, {
            value: '',
            msg: 'success create articles',
            param: ''
        })
    }
}

exports.updateArticle = async function (req, res) {
    let error = validationResult(req)
    let response = new Response(res)
    if (!error.isEmpty()) {
        return response.failed(error.array(), 422)
    }
    let Article = new ArticleService()
    let response = new Response(res)
    let data = await Article.updateArticle({
        title: req.body.title,
        content: req.body.content,
        slug: req.body.slug
    },{
        id: req.params.id
    })

    if(data){
        return response.success({
            status: 'updated'
        },{
            value: '',
            msg: 'success update articles',
            param: ''
        })
    }
}

exports.deleteArticle = async function (req, res) {
    let Article = new ArticleService()
    let response = new Response(res)
    let data = await Article.deleteArticle({
        id: req.params.id
    })

    if(data){
        return response.success({
            status: 'deleted'
        },{
            value: '',
            msg: 'success deleted articles',
            param: ''
        })
    }
}