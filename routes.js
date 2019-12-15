const Category = require('./controller/Category')
const CategoryValidation = require('./validator/category')

module.exports = (app) => {
    app.post('/v1/category',CategoryValidation.validate(),Category.createCategory)
}