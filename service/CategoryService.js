const Category = require('../models').Category

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
     }
}
module.exports = CategoryService