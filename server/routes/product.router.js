const express = require('express')
const productCtrl = require('../controllers/product.controller')
const { getDocuments, getDocumentbyId } = require('../middleware/modelResults')
const Product = require('../models/Product')
const passport= require('../config/passport_config')
const { productPopulate } = require('../utils/populateObjects')

const router = express.Router()

router.route("/")
    .get(
        getDocuments(
            Product,
            productPopulate
        ),
        productCtrl.getProducts
    )
    .post(
        passport.authenticate('admin', {session : false}),
        productCtrl.createProduct
    )

router.route("/:id")
    .get(
        getDocumentbyId(
            Product,
            productPopulate
        ),
        productCtrl.getProductbyId
    )
    .patch(
        passport.authenticate('admin', {session : false}),
        productCtrl.updateProduct
    )
    .delete(
        passport.authenticate('admin', {session : false}),
        productCtrl.deleteProduct
    )

router.route("/:id/images")
    .post(
        passport.authenticate('admin', {session : false}),
        productCtrl.addImagestoProduct
    )
    .delete(
        passport.authenticate('admin', {session : false}),
        productCtrl.deleteImagesfromProduct
    )

module.exports = router 
