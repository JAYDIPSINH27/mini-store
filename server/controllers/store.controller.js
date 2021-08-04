const Store = require('../models/Store')
const Product = require('../models/Product')
const getError = require('../utils/dbErrorHandler')

module.exports = {

    createStore : async (req,res) => {
        try{
            console.log(req.query)
            const store = new Store({
                name : req.query.name,
                description : req.query.description || "",
                images : req.query.images || [],
                location :  JSON.parse(req.query.addresses) || [],
                rating : req.query.rating || 0,
                products : req.query.products || [],
            })
            await store.save()
            return res.status(200).json({
                err: false,
                message: 'Store created successfully.'
            })
        }
        catch(err){
            return res.status(400).json({
                err: true,
                msg: getError(err)
            })
        }
    }
}