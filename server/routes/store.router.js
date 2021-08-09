const express = require('express')
const router = express.Router()
const storeCtrl = require('../controllers/store.controller')

router.post("/create",
    storeCtrl.createStore
)

router.post("/update",
    storeCtrl.updateStore
)

router.post("/addProduct",
    storeCtrl.addProducttoStore
)

router.post("/updateProduct",
    storeCtrl.updateProductinStore
)

router.post("/deleteProduct",
    storeCtrl.deleteProductfromStore
)

router.post("/addAddress",
    storeCtrl.addAddresstoStore
)

router.post("/updateAddress",
    storeCtrl.updateAddressinStore
)

router.post("/deleteAddress",
    storeCtrl.deleteAddressfromStore
)

router.post("/addImage",
    storeCtrl.addImagestoStore
)

router.post("/deleteImage",
    storeCtrl.deleteImagesfromStore
)

router.post("/delete",
    storeCtrl.deleteStore
)

router.get("/get",
    storeCtrl.getStores
)

router.get("/getbyId",
    storeCtrl.getStorebyId
)

router.get("/getbyProduct",
    storeCtrl.getStoresbyProduct
)

router.get("/getbyName",
    storeCtrl.getStoresbyName
)

module.exports = router 
