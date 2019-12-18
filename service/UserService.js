const User = require('../models/').user

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