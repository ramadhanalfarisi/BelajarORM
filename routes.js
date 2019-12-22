const Category = require('./controller/Category')
const CategoryValidation = require('./validator/category')
const User = require('./controller/User')
const UserValidation = require('./validator/user')
const userMiddleware = require('./middleware/UserMiddleware')
const adminMiddleware = require('./middleware/AdminMiddleware')

module.exports = (app) => {

    // API Category
    app.post('/v1/category',adminMiddleware,CategoryValidation.validate(),Category.createCategory)
    app.get('/v1/category',userMiddleware,Category.readCategory)
    app.put('/v1/category/:id',adminMiddleware,CategoryValidation.validate(),Category.updateCategory)
    app.delete('/v1/category/:id',adminMiddleware,Category.deleteCategory)

    // API User
    app.post('/v1/user',UserValidation.validateRegister(),User.registerAkun)
    app.post('/v1/login',UserValidation.validateLogin(),User.login)
}