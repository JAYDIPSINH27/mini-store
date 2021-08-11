const express = require('express')
const router = express.Router()
const Image = require('../models/Image')
const getError = require('../utils/dbErrorHandler')

router.post('/:id',async (req,res) => {
    try{
        let {id} = req.params
        await Image.findById(id)
        .then(async (data) => {
            if(data){
                await data.deleteOne()
                return res.status(200).json({
                    err : false
                })
            }else{
                return res.status(404).json({
                    err : true,
                    msg : "No such image exists."
                })
            }
        })
    }catch(err){
        return res.status(400).json({
            err : true,
            msg : getError(err)
        })
    }
})



module.exports = router