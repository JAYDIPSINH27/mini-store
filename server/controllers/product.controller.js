const Store = require('../models/Store')
const Product = require('../models/Product')
const getError = require('../utils/dbErrorHandler')
const {uploadImages, deleteImages} = require('../utils/imageOperations')
const { getStoreDetails, deleteProductfromStores} = require('../utils/relationOperations')

module.exports = {

    createProduct : async (req,res) => {
        try{
            const product = new Product({
                name : req.body.name,
                description : req.body.description || "",
                category : req.body.category,
                store : [],
            })
            uploadImages("products",req.body.images)
            .then(async (data) => {
                let err_images = []
                for(let i in data){
                    if(data[i].err){
                        err_images.push(Number(i))
                    }else{
                        product.addImage(data[i])
                    }
                }
                try{
                    await product.save()
                    return res.status(200).json({
                        err: false,
                        message: 'Product created successfully.',
                        err_images: err_images.length == 0? null : err_images
                    })
                }
                catch(error){
                    console.log(error)
                    return res.status(400).json({
                        err: true,
                        msg: getError(error)
                    })
                }
            })
            .catch((error) => {
                return {
                    err: true,
                    msg: "Could not upload images. Try again"
                }
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

    addImagestoProduct : async(req,res) => {
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
                    uploadImages("products",req.body.images)
                    .then(async (data) => {
                        let err_images = []
                        for(let i in data){
                            if(data[i].err){
                                err_images.push(Number(i))
                            }else{
                                product.addImage(data[i])
                            }
                        }
                        try{
                            await product.save()
                            if(err_images.length < data.length){
                                return res.status(200).json({
                                    err: false,
                                    message: 'Images added successfully.',
                                    err_images: err_images.length == 0? null : err_images
                                })
                            }else{
                                return {
                                    err: true,
                                    msg: "Could not upload images. Try again",
                                    err_images
                                }
                            }
                        }
                        catch(error){
                            return res.status(400).json({
                                err: true,
                                msg: getError(error)
                            })
                        }
                    })
                    .catch((error) => {
                        return {
                            err: true,
                            msg: "Could not upload images. Try again"
                        }
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

    deleteImagesfromProduct : async(req,res) => {
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
                    deleteImages(req.body.images)
                    .then(async (data) => {
                        let err_images = []
                        for(let i in data){
                            if(data[i].err){
                                err_images.push(Number(i))
                            }else{
                                product.deleteImage(data[i].id)
                            }
                        }
                        try{
                            await product.save()
                            if(err_images.length < data.length){
                                return res.status(200).json({
                                    err: false,
                                    message: 'Images deleted successfully.',
                                    err_images: err_images.length == 0? null : err_images
                                })
                            }else{
                                return {
                                    err: true,
                                    msg: "Could not delete images. Try again",
                                    err_images
                                }
                            }
                        }
                        catch(error){
                            return res.status(400).json({
                                err: true,
                                msg: getError(error)
                            })
                        }
                    })
                    .catch((error) => {
                        return {
                            err: true,
                            msg: "Could not delete images. Try again"
                        }
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
                    product.setName(req.body.name)
                    product.setDescription(req.body.description)
                    product.setCategory(req.body.category)
                    await product.save()
                    return res.status(200).json({
                        err: false,
                        data: product,
                        msg: "Product Updated Successfully."
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

    deleteProduct : async (req,res) => {
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
                    await deleteProductfromStores(product)
                    await product.deleteOne()
                    return res.status(200).json({
                        err: false,
                        msg: "Product Deleted Successfully."
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
                msg: "Cant delete product."
            })
        }
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
                    getStoreDetails(product)
                    .then((data) => {
                        return res.status(200).json({
                            err: false,
                            data: {
                                ...product._doc,
                                stores : data
                            }
                        })
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