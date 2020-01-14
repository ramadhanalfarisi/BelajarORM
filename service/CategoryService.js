const Category = require('../models').Category
const Model = require('../models')
const Pagination = require('../helper/pagination');

const CategoryService = function () {

}

CategoryService.prototype = {

    /**
     * @param {Object} data
     * @returns Array|Object
     */

    createCategory: async function (data) {
        let category = await Category.create(data)
        return category
    },

    findOneCategory: async function(data){
        let category = await Category.findOne(data)
        return category
    },
    readCategory: async function (req,res) {
        let limit = req.query.limit || HRISConfigs.data.limit_pagination
        let page = req.query.page > 0 ? req.query.page : 1

        let offset = limit * (page - 1)

        let protocol = req.protocol + '://'
        let domain = req.get('host')
        let originalUrl = protocol + domain + req.originalUrl
        let category = await Category.findAndCountAll({
            limit: parseInt(limit),
            offset: offset,
            include: [{
                model: Model.Article,
            }]
        })
        let total = await category.count
        let paginationRes = Pagination.makePagination(limit, originalUrl, total, page, category)
        let response = {
            category,
            paginationRes

        }

        return response
    },

    updateCategory: async function (data, id) {
        let category = await Category.update(data, {
            where: {
                id: id
            }
        })
        return category
    },

    deleteCategory: async function (id) {
        let category = await Category.destroy({
            where: {
                id: id
            }
        })
        return category
    }
}
module.exports = CategoryService