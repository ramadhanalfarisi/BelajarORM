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
    const error = validationResult(req)
    if (!error.isEmpty()){
        let response = new Response(res)
        return response.failed(
            error.array(),
            422
        )
    }

    const password = bcrypt.hashSync(req.body.password,10)
    const {email,username,role} = req.body

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

exports.login = async function(req,res,) {
    let error = validationResult(req)
    if(!error.isEmpty()){
        let response = new Response()
        return response.failed(error.array(),422)
    }

    let User = new UserService()

    let strategy = new JwtStrategy(opts,function(payload,next){
        let user = User.login({id: payload.id})

        if(user){
            next(null,user)
        }else{
            next(null,false)
        }
    })

    passport.use(strategy)
    const{email,password} = req.body

    if(email && password){
        let user = await User.login({email:email})
        if(!user){
            res.status(401).json({message: 'Akun tidak ada'})
        }
        bcrypt.compare(password,user.password,function(err,exist){
            if(exist){
                let payload = {
                    id : user.id
                }
                let token = jwt.sign(payload,opts.secretOrKey)
                let response = new Response(res)
                return response.success({
                    token: token,
                    email: user.email,
                    role: user.role
                },[{
                    value:'',
                    msg:'berhasil login',
                    param:''
                }])
            }else{
                console.log(err)
                let response = new Response(res)
                return response.failed([{
                    value: password,
                    msg: 'password salah',
                    param: 'password'
                }],422)
            }
        })
    }
}