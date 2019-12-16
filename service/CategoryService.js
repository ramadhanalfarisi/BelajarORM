const Category = require('../models').Category
const Model = require('../models')

const CategoryService = function(){

}

CategoryService.prototype = {
    
    /**
     * @param {Object} data
     * @returns Array|Object
     */

     createCategory : async (data) => {
         let category = await Category.create(data)
         return category
     },

     readCategory : async () => {
        let category = await Category.findAll({
            include: [{
                model: Model.Article,
            }]
        })
        return category
    },

    updateCategory : async (data,id) => {
        let category = await Category.update(data,{
            where:{
                id:id
            }
        })
        return category
    },

    deleteCategory : async (id) => {
        let category = await Category.destroy({
            where:{
                id:id
            }
        })
        return category
    }
}
module.exports = CategoryService