const { check } = require('express-validator');

module.exports = {
    validate:function () {
        return [
            check('name','name field is required').not().isEmpty(),
            check('slug','slug field must lower case').isLowercase()
        ]
    }
}