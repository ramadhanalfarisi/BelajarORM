const passport = require('passport')
var JwtStrategy = require('passport-jwt').Strategy
var Extractjwt = require('passport-jwt').ExtractJwt
const User = require('../models').User
const Response = require('../helper/response')
require('dotenv').config()
var opts = {}
opts.jwrFromRequest = Extractjwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.JWT_SECRET

module.exports = function(req,res,next){
    passport.use(new JwtStrategy(opts,function(payload,done){
        User.findOne({
            where: {
                id: payload.id
            }
        }).then(function(res,err){
            if(err){
                return  done(err,false,false)
            }
            return done(null,res)
        })
    }))

    passport.authenticate('jwt', function(err,user){
        if (err){
            console.log(err)
        }
        console.log(user.role)
        if(user){
            return next()
        }
        let response = new Response(res)
        return response.failed({
            value: '',
            msg: 'invalid token',
            param: 'authorization'
        },500)
    })(req,res)
}