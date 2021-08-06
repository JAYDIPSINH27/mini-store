const Store = require('../models/Store')
const Product = require('../models/Product')
const getError = require('../utils/dbErrorHandler')

module.exports = {

    createProduct : async (req,res) => {
        try{
            const product = new Product({
                name : req.query.name,
                description : req.query.description || "",
                images : req.query.images || [],
                category :  req.query.category,
                store : [],
            })
            await product.save()
            return res.status(200).json({
                err: false,
                message: 'Product created successfully.'
            })
        }
        catch(error){
            console.log(error)
            return res.status(400).json({
                err: true,
                msg: getError(error)
            })
        }
    },

    updateProduct : async (req,res) => {
        try{
            if(!req.query.id){
                return res.status(400).json({
                    err: true,
                    msg: "Id was not specified."
                })
            }
            Product.findById(req.query.id)
            .then( async(product) => {
                if(product){
                    product.name = req.query.name || product.name
                    product.description = req.query.description || product.description
                    product.category = req.query.category || product.category
                    if(req.query.images){
                        req.query.images.forEach((image) => product.addImage(image))
                    }
                    await product.save()
                    return res.status(200).json({
                        err: false,
                        data: product,
                        msg: "Store Updated Successfully."
                    })
                }else{
                    return res.status(400).json({
                        err: true,
                        msg: "No such product exists."
                    })
                }
            })    
        }
        catch(error){
            return res.status(400).json({
                err: true,
                msg: "Can not update product."
            })
        }
    },

    deleteProducts : async (req,res) => {

    },

    getProducts : async (req,res) => {
        try{
            let page = Math.max(req.query.page,0)
            let perPage = 10
            Product.find({}).limit(page).skip(perPage*(page))
            .then( async(products) => {
                if(products && products.length > 0){
                    return res.status(200).json({
                        err: false,
                        page,
                        data: products
                    })
                }else{
                    return res.status(400).json({
                        err: true,
                        msg: "No products exist for this page."
                    })
                }
            })    
        }
        catch(error){
            return res.status(400).json({
                err: true,
                msg: "Could not fetch any products."
            })
        }
    },

    getProductbyId : async (req,res) => {
        try{
            if(!req.query.id){
                return res.status(400).json({
                    err: true,
                    msg: "Id was not specified."
                })
            }
            Product.findById(req.query.id)
            .then( async(product) => {
                if(product){
                    return res.status(200).json({
                        err: false,
                        data: product
                    })
                }else{
                    return res.status(400).json({
                        err: true,
                        msg: "No such product exists."
                    })
                }
            })    
        }
        catch(error){
            console.log(error)
            return res.status(400).json({
                err: true,
                msg: "Could not fetch any product."
            })
        }
    },

    getProductsbyCategory : async (req,res) => {
        try{
            let page = Math.max(req.query.page,0)
            let perPage = 10
            if(!req.query.category){
                return res.status(400).json({
                    err: true,
                    msg: "Product was not specified."
                })
            }
            Product.find(req.query.category).limit(perPage).skip(page*perPage)
            .then( async(products) => {
                if(products && products.length > 0){
                    return res.status(200).json({
                        err: false,
                        page,
                        data: products
                    })
                }else{
                    return res.status(400).json({
                        err: true,
                        msg: "No such product exists."
                    })
                }
            })    
        }
        catch(error){
            console.log(error)
            return res.status(400).json({
                err: true,
                msg: "Could not fetch any products."
            })
        }
    },

    getProductsbyName : async (req,res) => {
        try{
            let limit = req.query.limit || 5
            if(!req.query.name){
                return res.status(400).json({
                    err: true,
                    msg: "Name was not specified."
                })
            }
            Product.find({name : { $regex: req.query.name }}).limit(limit)
            .then( async(products) => {
                if(products && products.length > 0){
                    return res.status(200).json({
                        err: false,
                        data: products
                    })
                }else{
                    return res.status(400).json({
                        err: true,
                        msg: "No such product exists."
                    })
                }
            })    
        }
        catch(error){
            console.log(error)
            return res.status(400).json({
                err: true,
                msg: "Could not fetch any products."
            })
        }
    }

}