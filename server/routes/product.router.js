const express = require('express')
const productCtrl = require('../controllers/product.controller')
const { getDocuments, getDocumentbyId } = require('../middleware/modelResults')
const Product = require('../models/Product')
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
    .post(productCtrl.createProduct)

router.route("/:id")
    .get(
        getDocumentbyId(
            Product,
            productPopulate
        ),
        productCtrl.getProductbyId
    )
    .patch(productCtrl.updateProduct)
    .delete(productCtrl.deleteProduct)

router.route("/:id/images")
    .post(productCtrl.addImagestoProduct)
    .delete(productCtrl.deleteImagesfromProduct)

module.exports = router 
