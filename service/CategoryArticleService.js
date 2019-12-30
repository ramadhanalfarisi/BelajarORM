const CategoryArticle = require('../models/').CategoryArticle

const CategoryArticleService = function(){

}

CategoryArticleService.prototype = {

    /**
     * @param {Object} data
     * @returns Array|Object
     */

    createCategoryArticle: async function(data){
        let article = await CategoryArticle.create(data)
        return article
    },

    readArticleByCategory: async function(data){
        let article = await CategoryArticle.findAll({
            where: data
        })
        return article
    }
}

module.exports = CategoryArticleService