const express = require('express')
const storeCtrl = require('../controllers/store.controller')
const Store = require('../models/Store')
const { getDocuments, getDocumentbyId } = require('../middleware/modelResults')
const {storePopulate} = require('../utils/populateObjects')

const router = express.Router()

router.route("/")
    .get(
        getDocuments(
            Store,
            storePopulate
        ),
        storeCtrl.getStores
    )
    .post(storeCtrl.createStore)

router.route("/:id")
    .get(        
        getDocumentbyId(
            Store,
            storePopulate
        ),
        storeCtrl.getStorebyId
    )
    .patch(storeCtrl.updateStore)
    .delete(storeCtrl.deleteStore)
 
router.route("/:id/products/:productId")
    .post(storeCtrl.addProducttoStore)
    .patch(storeCtrl.updateProductinStore)
    .delete(storeCtrl.deleteProductfromStore)

router.route("/:id/addresses")
    .post(storeCtrl.addAddresstoStore)

router.route("/:id/addresses/:addressId")   
    .patch(storeCtrl.updateAddressinStore)
    .delete(storeCtrl.deleteAddressfromStore)

router.route("/:id/images")
    .post(storeCtrl.addImagestoStore)
    .delete(storeCtrl.deleteImagesfromStore)

module.exports = router 
