const Category = require('./controller/Category')
const CategoryValidation = require('./validator/category')

module.exports = (app) => {
    app.post('/v1/category',CategoryValidation.validate(),Category.createCategory)
    app.get('/v1/category',Category.readCategory)
    app.put('/v1/category/:id',CategoryValidation.validate(),Category.updateCategory)
    app.delete('/v1/category/:id',Category.deleteCategory)
}