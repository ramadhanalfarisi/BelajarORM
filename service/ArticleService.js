const Model = require('../models')
const Article = Model.Article
const Pagination = require('../helper/pagination')

const ArticleService = function(){

}

ArticleService.prototype = {
    /**
     * @param {Object} data
     * @returns Array|Object
     */
    
    readArticle: async (req,res) => {
        let limit = req.query.limit || HRISConfigs.data.limit_pagination
        let page = req.query.page > 0 ? req.query.page : 1

        let offset = limit * (page - 1)

        let protocol = req.protocol + '://'
        let domain = req.get('host')
        let originalUrl = protocol + domain + req.originalUrl
        let article = await Article.findAndCountAll({
            where: {
                id_user: req.query.id_user
            },
            limit: parseInt(limit),
            offset: offset,
            include: [{
                model: Model.Category,
            }]
        })
        let total = await article.count
        let paginationRes = Pagination.makePagination(limit, originalUrl, total, page, article)
        let response = {
            article,
            paginationRes

        }

        return response
    },

    readArticleby: async(data) => {
        let article = await Article.findAll({
            where:data
        })
        return article
    },

    createArticle: async(data) => {
        let article = await Article.create(data)
        return article
    },

    updateArticle: async(data,id) => {
        let article = await Article.update(data,{
            where:id
        })
        return article
    },

    deleteArticle: async(id) => {
        let article = await Article.destroy({
            where: id
        })
        return article
    }
}

module.exports = ArticleService