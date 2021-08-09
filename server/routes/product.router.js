const express = require('express')
const router = express.Router()
const productCtrl = require('../controllers/product.controller')

router.post("/create",
   productCtrl.createProduct
)

router.post("/addImage",
    productCtrl.addImagestoProduct
)

router.post("/deleteImage",
    productCtrl.deleteImagesfromProduct
)

router.post("/update",
   productCtrl.updateProduct
)

router.post("/delete",
   productCtrl.deleteProduct
)

router.get("/get",
    productCtrl.getProducts
)

router.get("/getbyId",
    productCtrl.getProductbyId
)

router.get("/getbyCategory",
    productCtrl.getProductsbyCategory
)

router.get("/getbyName",
    productCtrl.getProductsbyName
)

module.exports = router 
