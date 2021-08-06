const express = require('express')
const router = express.Router()
const storeCtrl = require('../controllers/store.controller')

router.post("/createStore",
    storeCtrl.createStore
)

router.post("/updateStore",
    storeCtrl.updateStore
)

router.post("/deleteStore",
    storeCtrl.deleteStore
)

router.post("/addProducttoStore",
    storeCtrl.addProducttoStore
)

router.get("/getStores",
    storeCtrl.getStores
)

router.get("/getStorebyId",
    storeCtrl.getStorebyId
)

router.get("/getStoresbyProduct",
    storeCtrl.getStoresbyProduct
)

router.get("/getStoresbyName",
    storeCtrl.getStoresbyName
)

module.exports = router 
