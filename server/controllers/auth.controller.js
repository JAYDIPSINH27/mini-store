const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Image = require('../models/Image');
const { userPopulate } = require('../utils/populateObjects');
const {sendWelcomeEmail,sendRequestPasswordEmail,sendResetPasswordEmail} = require('../utils/sendEmail')
const getError = require('../utils/dbErrorHandler');
const { createToken } = require('../utils/createTokens');
const ActivationToken = require('../models/ActivationToken');
const PasswordToken = require('../models/PasswordToken');
const {urlGoogle,getGoogleEmailFromCode} = require('../utils/googleClient')
const {deleteImages} = require('../utils/multipleImageOperations')
const {deleteImage} = require('../utils/singleImageOperations')

const redirectURL = process.env.REDIRECT_URL
const frontendURL = process.env.FRONTEND_URL
const jwtSecret = process.env.SECRET_KEY

module.exports = {

    // @desc      Register New User
    // @route     POST /api/v1/auth/registration
    // @access    Public

    registerUser : async(req,res) => {
        const user = new User({
            email : req.body.email,
            name : req.body.name,
            password : req.body.password
        })
        let image = null
        if(req.body.address){
            user.addAddress(req.body.address)
        }
        if(req.body.admin){
            user.admin = true
        }
        if(req.body.image){
            image = new Image()
            let response = await image.upload(user._id,req.body.image,'User')
            if(response){
                user.image = response
            }
        }
        try{
            await user.save()
            if(image){
                await image.save()
            }
            const {token,hash} = createToken()
            const activateToken = new ActivationToken({
                user : user.email,
                token : hash
            })
            await activateToken.save()
            let link = `${redirectURL}/activation?user=${user.email}&token=${token}`
            let resp = await sendWelcomeEmail({
                user : req.body.name,
                email : req.body.email
            },link)
            if(resp){
                return res.status(201).json({
                    err: false,
                    msg: "Successfully signed up and verification email queued."
                })
            }else{
                await user.deleteOne()
                await activateToken.deleteOne()
                return res.status(400).json({
                    err: false,
                    msg: "Could not send verification mail."
                })
            }
        }
        catch(err){
            console.log(err)
            if(image){
                await image.deleteOne()
            }
            return res.status(400).json({
                err: true,
                msg: getError(err)
            })
        }
    },

    // @desc      Login User
    // @route     POST /api/v1/auth/login
    // @access    Public

    loginUser : async(req,res) => {
        try{
            User.findOne({email : req.body.email})
            .populate(userPopulate)
            .then(user => {
                if(user){
                    if(!user.authenticate(req.body.password)){
                        res.status(400).json({
                            auth : false,
                            msg : "Password does not match"
                        })
                    }else if(!user.isActive()){
                        res.status(400).json({
                            auth : false,
                            msg : "Account has not been activated. You need to verify your email first."
                        })
                    }else{
                        const token = jwt.sign({id : user.email},jwtSecret)
                        return res.status(200).json({
                            auth : true,
                            token : token,
                            data: {
                                ...user._doc,
                                hashed_password : ""
                            },
                            expires : new Date(new Date().getTime() + 2628000000),
                            msg: "Successfully logged in!"
                        })
                    }
                }else{
                    res.status(404).json({
                        auth : false,
                        msg : "User Doesn't Exist"
                    })
                }
            })
        }
        catch(err){
            return res.status(400).json({
                auth : false,
                msg : "Could not Login"
            })
        }
    },

    // @desc      Activate User
    // @route     GET /api/v1/auth/activation
    // @access    Public

    activateUser : async(req,res) => {
        try{
            if(!req.query.user){
                res.redirect(`${frontendURL}/signin?activation=false`)
                // res.status(400).json({
                //     err: true,
                //     msg: "User Email not specified."
                // })
            }
            if(!req.query.token){
                res.redirect(`${frontendURL}/signin?activation=false`)
                // res.status(400).json({
                //     err: true,
                //     msg: "Token not specified."
                // })
            }
            ActivationToken.findOne({user : req.query.user})
            .then(async (token) => {
                if(token && token.authenticate(req.query.token)){
                    User.findOne({email : req.query.user})
                    .then(async (user) => {
                        if(user){
                            user.active = true
                            await user.save()
                            await token.deleteOne()
                            res.redirect(`${frontendURL}/signin?activation=true`)
                            // res.status(200).json({
                            //     err: false,
                            //     msg: "Activation SuccessfulL."
                            // })
                        }else{
                            await token.deleteOne()
                            res.redirect(`${frontendURL}/signin?activation=false`)
                            // return res.status(404).json({
                            //     err: true,
                            //     msg: "User doesnt exist."
                            // })
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        res.redirect(`${frontendURL}/signin?activation=false`)
                        // return res.status(400).json({
                        //     err: true,
                        //     msg: "Activation Failed."
                        // })
                    })
                }else{
                    res.redirect(`${frontendURL}/signin?activation=false`)
                    // return res.status(404).json({
                    //     err: true,
                    //     msg: "Activation Failed. Token is invalid."
                    // })
                }
            })
            .catch(() => {
                res.redirect(`${frontendURL}/signin?activation=false`)
                // console.log(err)
                // return res.status(400).json({
                //     err: true,
                //     msg: "Activation Failed."
                // })
            })
        }
        catch(error){
            res.redirect(`${frontendURL}/signin?activation=false`)
            // return res.status(400).json({
            //     err: true,
            //     msg: "Activation Failed."
            // })
        }
    },

    // @desc      Get User
    // @route     GET /api/v1/auth/user
    // @access    Private

    getUser : async (req,res) => {
        let user = await User.findById(req.user._id).populate(userPopulate)
        if(req.user){
            return res.status(200).json({
                err : false,
                data : user
            })
        }else{
            return res.status(400).json({
                err : true,
                msg : "Could not get user."
            })
        }
    },

    // @desc      Update User
    // @route     PATCH /api/v1/auth/user
    // @access    Private

    updateUser : async (req,res) => {
        try{
        if(req.user){
            let user = await User.findById(req.user._id).populate(userPopulate)
            if(!user){
                return res.status(400).json({
                    err : true,
                    data : "Could not get user."
                })
            }
            if(req.body.addresses){
                user.addAddress(req.body.addresses)
            }
            if(req.body.name){
                user.name = req.body.name
            }
            if(req.body.image){
                if(user.image){

                    await deleteImage([user.image.public_id])
                }
                let image = new Image()
                let response = await image.upload(user._id,req.body.image,'User')
                if(response){
                    user.image = response
                    await image.save()
                }
            }
            await user.save()
            let data = user._doc
            delete data["hashed_password"]
            return res.status(200).json({
                err : false,
                data
            })
        }else{
            return res.status(400).json({
                err : true,
                msg : "Could not get user."
            })
        }
        }catch(error){
            return res.status(400).json({
                err: true,
                msg: getError(error)
            })
        }
    },

    // @desc      Forgot Password
    // @route     POST /api/v1/auth/user/password
    // @access    Private

    forgotPassword : async (req,res) => {
        console.log(req.user)
        try{
            User.findOne({email : req.body.email})
            .then(async(user) => {
                if(user){
                    const {token,hash} = createToken()
                    const passwordToken = new PasswordToken({
                        user : user.email,
                        token : hash
                    })
                    await passwordToken.save()
                    let link = `${frontendURL}/change-password?user=${user.email}&token=${token}`
                    let resp = await sendRequestPasswordEmail({
                        user : user.name,
                        email : user.email
                    },link)
                    if(resp){
                        return res.status(200).json({
                            err: false,
                            msg: `Email sent to ${user.email} for password change.`
                        })
                    }else{
                        return res.status(400).json({
                            err: false,
                            msg: "Email could not be sent for password change."
                        })
                    }
                }else{
                    return res.status(404).json({
                        err: true,
                        msg: "User doesnt exist."
                    })
                }
            })
        }
        catch(err){
            return res.status(400).json({
                err: true,
                msg: "Could not change password."
            })
        }
    },

    // @desc      Change Password
    // @route     PATCH /api/v1/auth/user/password
    // @access    Private

    changePassword : async (req,res) => {
        try{
            if(!req.body.user){
                return res.status(400).json({
                    err: true,
                    msg: "User Email not specified."
                })
            }
            if(!req.body.password){
                return res.status(400).json({
                    err: true,
                    msg: "Password not specified."
                })
            }
            if(!req.body.token){
                return res.status(400).json({
                    err: true,
                    msg: "Token not specified."
                })
            }
            PasswordToken.findOne({user : req.body.user})
            .then(async (token) => {
                if(token && token.authenticate(req.body.token)){
                    User.findOne({email : req.body.user})
                    .then(async (user) => {
                        if(user){
                            user.password = req.body.password
                            await user.save()
                            await token.deleteOne()
                            sendResetPasswordEmail({
                                user : user.name,
                                email : user.email
                            })
                            return res.status(200).json({
                                err: false,
                                msg: `Password successfully reset.`
                            })
                        }else{
                            return res.status(404).json({
                                err: true,
                                msg: "User doesnt exist."
                            })
                        }
                    })
                }else{
                    return res.status(400).json({
                        err: true,
                        msg: "Invalid Token."
                    })
                }
            })
        }
        catch(error){
            return res.status(400).json({
                err: true,
                msg: "Could not reset password."
            })
        }
    },

    
    // @desc      Login with Google
    // @route     GET /api/v1/auth/google
    // @access    Public

    googleSigninUrl : async (req,res) => {
        res.redirect(urlGoogle())
    },
    
    // @desc      Callback for Google Auth
    // @route     GET /api/v1/auth/googleCallback
    // @access    Public

    googleSigninVerify : async (req,res) => {
        try{
            let email = await getGoogleEmailFromCode(req.query.code)
            User.findOne({email : email})
            .then(user => {
                if(user){
                    const token = jwt.sign({id : user.email},jwtSecret)
                    let url = `${frontendURL}/signin?token=${encodeURIComponent(token)}}`
                    return  res.redirect(url)
                }else{
                    let url = `${frontendURL}/signin?error=${encodeURIComponent('User doesnt exist')}`
                    return  res.redirect(url)
                }
            })
        }
        catch(err){
            let url = `${frontendURL}/signin?error=${encodeURIComponent('Could not login')}`
            return  res.redirect(url)
        }
    }
}

