const express =require('express');
const payCtrl = require('../controllers/payment.controller')
const passport= require('../config/passport_config')

const router = express.Router();

router.route("/stripe")
    .post(payCtrl.makeStripePayment)

module.exports = router