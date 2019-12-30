const Category = require('./controller/Category')
const Article = require('./controller/Article')
const CategoryValidation = require('./validator/category')
const ArticleValidation = require('./validator/article')
const User = require('./controller/User')
const UserValidation = require('./validator/user')
const userMiddleware = require('./middleware/UserMiddleware')
const adminMiddleware = require('./middleware/AdminMiddleware')

module.exports = (app) => {

    // API Category
    app.post('/v1/category',adminMiddleware,CategoryValidation.validate(),Category.createCategory)
    app.get('/v1/category',Category.readCategory)
    app.put('/v1/category/:id',adminMiddleware,CategoryValidation.validate(),Category.updateCategory)
    app.delete('/v1/category/:id',adminMiddleware,Category.deleteCategory)

    //API Article
    app.get('/v1/article',userMiddleware,Article.readArticle)
    app.get('/v1/article/:slug',userMiddleware,Article.readArticleBySlug)
    app.get('/v1/article-by-category',userMiddleware,Article.readArticleByCategory)
    app.post('/v1/article',userMiddleware,ArticleValidation.validate(),Article.createArticle)
    app.put('/v1/article/:id',userMiddleware,ArticleValidation.validateUpdate(),Article.updateArticle)
    app.delete('/v1/article/:id',userMiddleware,Article.deleteArticle)

    // API User
    app.post('/v1/user',UserValidation.validateRegister(),User.registerAkun)
    app.post('/v1/login',UserValidation.validateLogin(),User.login)
}