const User = require('../models/').User

const UserService = function(){

}

UserService.prototype = {

    /**
     * 
     * @param {Object} data 
     */

    register:async function(data){
        let user = await User.create(data)
        return user
    },

    login:async function(data){
        let user = await User.findOne({
            where:data
        })
        return user
    }
}

module.exports = UserService