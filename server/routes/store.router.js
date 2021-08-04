const express = require('express')
const router = express.Router()
const storeCtrl = require('../controllers/store.controller')

router.post("/create",
    storeCtrl.createStore
)

module.exports = router 
