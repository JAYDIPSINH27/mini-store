const express = require('express')
const catCtrl = require('../controllers/category.controller')
const { getDocuments, getDocumentbyId } = require('../middleware/modelResults')
const Category = require('../models/Category')
const {categoryPopulate} = require('../utils/populateObjects')
const passport= require('../config/passport_config')

const router = express.Router()

router.route("/")
   .get(
      getDocuments(
         Category,
         categoryPopulate
      ),
      catCtrl.getCategories
   )
   .post(
      passport.authenticate('admin', {session : false}),
      catCtrl.createCategory
   )

router.route("/:id")
   .get(
      getDocumentbyId(
         Category,
         categoryPopulate
      ),
      catCtrl.getCategorybyId
   )

module.exports = router 
