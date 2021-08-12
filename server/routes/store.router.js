const express = require('express')
const storeCtrl = require('../controllers/store.controller')
const Store = require('../models/Store')
const passport= require('../config/passport_config')
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
    .post(
        passport.authenticate('admin', {session : false}),
        storeCtrl.createStore
    )

router.route("/:id")
    .get(        
        getDocumentbyId(
            Store,
            storePopulate
        ),
        storeCtrl.getStorebyId
    )
    .patch(
        passport.authenticate('admin', {session : false}),
        storeCtrl.updateStore
    )
    .delete(
        passport.authenticate('admin', {session : false}),
        storeCtrl.deleteStore
    )
 
router.route("/:id/products/:productId")
    .post(
        passport.authenticate('admin', {session : false}),
        storeCtrl.addProducttoStore
    )
    .patch(
        passport.authenticate('admin', {session : false}),
        storeCtrl.updateProductinStore
    )
    .delete(
        passport.authenticate('admin', {session : false}),
        storeCtrl.deleteProductfromStore
    )

router.route("/:id/addresses")
    .post(
        passport.authenticate('admin', {session : false}),
        storeCtrl.addAddresstoStore
    )

router.route("/:id/addresses/:addressId")   
    .patch(
        passport.authenticate('admin', {session : false}),
        storeCtrl.updateAddressinStore
    )
    .delete(
        passport.authenticate('admin', {session : false}),
        storeCtrl.deleteAddressfromStore
    )

router.route("/:id/images")
    .post(
        passport.authenticate('admin', {session : false}),
        storeCtrl.addImagestoStore
    )
    .delete(
        passport.authenticate('admin', {session : false}),
        storeCtrl.deleteImagesfromStore
    )

module.exports = router 
