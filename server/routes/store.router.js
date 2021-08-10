const express = require('express')
const router = express.Router()
const storeCtrl = require('../controllers/store.controller')

router.route("/")
    .get(storeCtrl.getStores)
    .post(storeCtrl.createStore)

router.route("/:id")
    .get(storeCtrl.getStorebyId)
    .patch(storeCtrl.updateStore)
    .delete(storeCtrl.deleteStore)

router.route("/:id/product")
    .post(storeCtrl.addProducttoStore)
    .patch(storeCtrl.updateProductinStore)
    .delete(storeCtrl.deleteProductfromStore)

router.route("/:id/address")
    .post(storeCtrl.addAddresstoStore)
    .patch(storeCtrl.updateAddressinStore)
    .delete(storeCtrl.deleteAddressfromStore)

router.route("/:id/images")
    .post(storeCtrl.addImagestoStore)
    .delete(storeCtrl.deleteImagesfromStore)

module.exports = router 
