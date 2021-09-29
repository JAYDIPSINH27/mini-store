const express = require('express');
const {orderPopulate} = require('../utils/populateObjects')
const Order = require('../models/Order')
const { getDocuments, getDocumentbyId } = require('../middleware/modelResults')
const orderCtrl = require('../controllers/order.controller')
const passport= require('../config/passport_config');

const router = express.Router()

router.route("/")
    .get(
        passport.authenticate('admin', {session : false}),
        getDocuments(
            Order,
            orderPopulate
        ),
        orderCtrl.getOrders
    )

router.route("/:id")
    .get(
        passport.authenticate('admin', {session : false}),
        getDocumentbyId(
            Order,
            orderPopulate
        ),
        orderCtrl.getOrderbyId
    )

router.route("/:id")
    .put(
        passport.authenticate('user', {session : false}),
        orderCtrl.cancelOrder
    )

module.exports = router
