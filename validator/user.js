const {check} = require('express-validator')

module.exports = {

    validateRegister: function(){
        return [
            check('email','field email harus terisi').not().isEmpty(),
            check('email','format email salah').isEmail(),
            check('password','field password harus terisi').not().isEmpty(),
            check('password','password setidaknya harus 8 digit').isLength({min:8}),
            check('role','field role harus terisi').not().isEmpty(),
            check('role','role tidak tersedia').isIn(['Admin','User'])
        ]
    },
    validateLogin: function(){
        return [
            check('email','field email harus terisi').not().isEmpty(),
            check('email','format email salah').isEmail(),
            check('password','field password harus terisi').not().isEmpty(),
            check('password','password setidaknya harus 8 digit').isLength({min:8}),
        ]
    }
}