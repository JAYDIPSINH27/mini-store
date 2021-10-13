const stripe = require('../config/stripe_config')
const Order = require('../models/Order')
const {orderPopulate} = require('../utils/populateObjects')
const {v4 : uuid} = require('uuid')
const User = require('../models/User')
const {createToken}=require('../utils/createTokens')
const currency = process.env.STRIPE_CURRENCY.toLowerCase()

module.exports = {

    // @desc      Make Stripe Payment
    // @route     POST /api/v1/payment/stripe
    // @access    Private
    makeStripePayment : async (req,res) => {
        try{
            const {token,cart,user} = req.body
            const idempotencyKey = uuid()

            return stripe.customers.create({
                email : token.email,
                source : token.id,
                shipping:{
                    name: user.name,
                    address: {
                        city : user.address.city,
                        postal_code : user.address.pincode,
                        line1 : user.address.location,
                        line2 : user.address.landmark, 
                        state : user.address.state
                    }
                }
            })
            .then(customer => {
                stripe.charges.create({
                    amount: cart.amount*100,
                    currency: currency,
                    customer: customer.id,
                    shipping: customer.shipping,
                    receipt_email: token.email
                },{idempotencyKey})
                .then(async (result) => {
                    try{
                        let order = new Order({
                            paymentId : result.id,
                            paymentGateway : 'card',
                            status: 'paid',
                            date: new Date(result.created).toString(),
                            email: token.email,
                            userId : user.id,
                            shippingDetails: {
                                name: user.name,
                                address: user.address
                            },
                            products: cart.products,
                            amount: cart.amount,
                            reciept: result.reciept_url
                        })
                        User.findById(user.id)
                        .then(async (user) => {
                            if(user){
                                user.addOrder(order._id)
                                await order.save()
                                await user.save()
                                return res.status(200).json({
                                    err: false,
                                    data: await Order.populate(order,orderPopulate),
                                    message: 'Payment successfull.'
                                })
                            }else{
                                return res.status(400).json({
                                    err: true,
                                    message: 'Could not make payment.'
                                })
                            }
                        })
                    }catch{
                        return res.status(400).json({
                            err: true,
                            message: 'Could not make payment.'
                        })
                    }
                })
            })
            .catch(() => {
                return res.status(400).json({
                    err: true,
                    message: 'Could not make payment.'
                })
            })
        }
        catch(error){
            console.log(error)
            return res.status(400).json({
                err : true,
                msg: "Could not make payment."
            })
        }
    },
    
    // @desc      Make Cash Payment
    // @route     POST /api/v1/payment/cash
    // @access    Private
    makeCashPayment : async (req,res) => {
        try{
            const {cart,user} = req.body

            let order = new Order({
                paymentId:createToken().token,
                paymentGateway : 'cash',
                status: 'pending',
                email: user.email,
                userId : user.id,
                shippingDetails: {
                    name: user.name,
                    address: user.address
                },
                products: cart.products,
                amount: cart.amount
            })
            User.findById(user.id)
                .then(async (user) => {
                    if(user){
                        user.addOrder(order._id)
                        await order.save()
                        await user.save()
                        return res.status(200).json({
                            err: false,
                            data: await Order.populate(order,orderPopulate),
                            message: 'Payment successfull.'
                        })
                    }else{
                        return res.status(400).json({
                            err: true,
                            message: 'Could not make payment.'
                        })
                    }
                })
        }
        catch(error){
            console.log(error)
            return res.status(400).json({
                err : true,
                msg: "Could not make payment."
            })
        }
    }
} 