const express = require('express')
const router = express.Router()
const productCtrl = require('../controllers/product.controller')

router.post("/createProduct",
   productCtrl.createProduct
)

router.post("/updateProduct",
   productCtrl.updateProduct
)

// router.post("/deleteProduct",
//    productCtrl.deleteProduct
// )

router.get("/getProducts",
    productCtrl.getProducts
)

router.get("/getProductbyId",
    productCtrl.getProductbyId
)

router.get("/getProductsbyCategory",
    productCtrl.getProductsbyCategory
)

router.get("/getProductsbyName",
    productCtrl.getProductsbyName
)

module.exports = router 
