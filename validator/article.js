const {check} = require('express-validator')

module.exports = {
    validate: function() {
        return[
            check('id_user','field id_user harus terisi').not().isEmpty(),
            check('title','field title harus terisi').not().isEmpty(),
            check('content','field content harus terisi').not().isEmpty(),
            check('categories','field categories harus terisi').not().isEmpty()
        ]
    },

    validateUpdate: function() {
        return[
            check('title','field title harus terisi').not().isEmpty(),
            check('content','field content harus terisi').not().isEmpty(),
            check('categories','field categories harus terisi').not().isEmpty()
        ]
    }
}