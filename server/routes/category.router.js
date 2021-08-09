const express = require('express')
const router = express.Router()
const catCtrl = require('../controllers/category.controller')

router.post("/create",
   catCtrl.createCategory
)

router.get("/getbyId",
   catCtrl.getCategorybyId
)

router.get("/get",
   catCtrl.getCategories
)

module.exports = router 
