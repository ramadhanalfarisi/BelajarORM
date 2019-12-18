const UserService = require('../service/UserService')
const Response = require('../helper/response')
const {validationResult} = require('express-validator')
const passport = require('passport')
let JwtStrategy = require('passport-jwt').Strategy
let ExtractJwt = require('passport-jwt').ExtractJwt
const jwt = require('jsonwebtoken')
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
require('dotenv').config()
opts.secretOrKey = process.env.JWT_SECRET
const bcrypt = require('bcryptjs')
const User = require('../models/user')

exports.registerAkun = async function (req,res){
    const error = validationResult(res)
    if(!error.isEmpty()){
        let response = new Response(res)
        return response.failed(error.array(),422)
    }

    const password = bcrypt.hashSync(req.body.password,10)
    const {email,username} = req.body
    const role = 'User'

    let User = new UserService()

    let data = await User.register({
        email: email,
        password: password,
        username: username,
        role: role
    })
    let response = new Response(res)
    return response.success({
        id: data.id,
        email: data.email,
        username: data.username,
        role: data.role
    },[{
        value: '',
        msg: 'success register user',
        param: ''
    }])
}