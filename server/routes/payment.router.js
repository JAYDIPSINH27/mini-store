const express = require('express');
const payCtrl = require('../controllers/payment.controller')
const passport= require('../config/passport_config')

const router = express.Router()

router.route("/stripe")
    .post(
        // passport.authenticate('user', {session : false}),
        payCtrl.makeStripePayment
    )

router.route("/cash")
    .post(
        // passport.authenticate('user', {session : false}),
        payCtrl.makeCashPayment
    )

router.route("/razorpay")
    .post(
        // passport.authenticate('user', {session : false}),
        payCtrl.makeRazorpayPayment
    )

module.exports = router
