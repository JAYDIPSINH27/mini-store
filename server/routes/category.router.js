const express = require('express')
const router = express.Router()
const catCtrl = require('../controllers/category.controller')

router.post("/createCategory",
   catCtrl.createCategory
)

router.get("/getCategories",
   catCtrl.getCategories
)

module.exports = router 
