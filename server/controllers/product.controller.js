const Store = require('../models/Store')
const Product = require('../models/Product')
const Image = require('../models/Image')
const getError = require('../utils/dbErrorHandler')
const {uploadImages, deleteImages} = require('../utils/multipleImageOperations')
const { deleteProductfromStores } = require('../utils/relationOperations')
const { productPopulate } = require('../utils/populateObjects')

module.exports = {

    // @desc      Create Product
    // @route     POST /api/v1/products
    // @access    Private

    createProduct : async (req,res) => {
        try{
            const product = new Product({
                name : req.body.name,
                description : req.body.description || "",
                category : req.body.category,
                store : [],
            })
            uploadImages(product._id,"Product",req.body.images)
            .then(async (data) => {
                let err_images = []
                for(let i in data){
                    if(data[i]){
                        product.addImage(data[i])
                    }else{
                        err_images.push(Number(i))
                    }
                }
                try{
                    await product.save()
                    return res.status(201).json({
                        err: false,
                        data: await Product.populate(product,productPopulate),
                        message: 'Product created successfully.',
                        err_images: err_images.length == 0? null : err_images
                    })
                }
                catch(error){
                    deleteImages(product.images).then((data) => {
                        return res.status(400).json({
                            err: true,
                            msg: getError(error)
                        })
                    })
                }
            })
            .catch((error) => {
                return res.status(400).json({
                    err: true,
                    msg: "Could not upload images. Try again"
                })
            })
        }
        catch(error){
            console.log(error)
            return res.status(500).json({
                err: true,
                msg: "Could not create product."
            })
        }
    },

    // @desc      Add Images to Products
    // @route     POST /api/v1/products/:id/images
    // @access    Private

    addImagestoProduct : async(req,res) => {
        try{
            if(!req.params.id){
                return res.status(400).json({
                    err: true,
                    msg: "Id was not specified."
                })
            }
            Product.findById(req.params.id)
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
                                return res.status(400).json({
                                    err: true,
                                    msg: "Could not upload images. Try again",
                                    err_images
                                })
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
                        return res.status(400).json({
                            err: true,
                            msg: "Could not upload images. Try again"
                        })
                    })
                }else{
                    return res.status(404).json({
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

    // @desc      Delete Images from Products
    // @route     DELETE /api/v1/products/:id/images
    // @access    Private

    deleteImagesfromProduct : async(req,res) => {
        try{
            if(!req.params.id){
                return res.status(400).json({
                    err: true,
                    msg: "Id was not specified."
                })
            }
            Product.findById(req.params.id)
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

    // @desc      Update Product
    // @route     PATCH /api/v1/products/:id
    // @access    Private

    updateProduct : async (req,res) => {
        try{
            if(!req.params.id){
                return res.status(400).json({
                    err: true,
                    msg: "Id was not specified."
                })
            }
            Product.findByIdAndUpdate(
                req.params.id,
                {
                    ...req.body,
                    updatedAt : Date.now()
                },
                {
                    new : true,
                    runValidators: true
                }
            )
            .populate({path : 'category',select: 'name'})
            .then( async(product) => {
                if(product){
                   return res.status(200).json({
                        err: false,
                        data: product,
                        msg: "Product Updated Successfully."
                    })
                }else{
                    return res.status(404).json({
                        err: true,
                        msg: "No such product exists."
                    })
                }
            })
            .catch(error => {
                return res.status(400).json({
                    err: true,
                    msg: getError(error)
                })
            }) 
        }
        catch(error){
            return res.status(400).json({
                err: true,
                msg: "Can not update product."
            })
        }
    },

    // @desc      Delete Product
    // @route     DELETE /api/v1/products/:id
    // @access    Private

    deleteProduct : async (req,res) => {
        try{
            if(!req.params.id){
                return res.status(400).json({
                    err: true,
                    msg: "Id was not specified."
                })
            }
            Product.findById(req.params.id)
            .then( async(product) => {
                if(product){
                    await deleteProductfromStores(product)
                    await product.deleteOne()
                    return res.status(200).json({
                        err: false,
                        data : await Product.populate(product,{path : 'category',select: 'name'}),
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

    // @desc      Get Products
    // @route     GET /api/v1/products
    // @access    Public

    getProducts : async (req,res) => {
        if(res.results.err){
            return res.status(404).json(res.results)
        }else if(res.results.metadata.count == 0){
            return res.status(404).json({
                err : true,
                metadata : {
                    msg : "No Products found."
                }
            })
        }else{
            return res.status(200).json(res.results)
        }
    },

    // @desc      Get Products by Id
    // @route     GET /api/v1/products/:id
    // @access    Public

    getProductbyId : async (req,res) => {
        if(res.results.err){
            return res.status(404).json(res.results)
        }else if(res.results.data == null){
            return res.status(404).json({
                err : true,
                metadata : {
                    msg : "No Product found."
                }
            })
        }else{
            return res.status(200).json(res.results)
        }
    }

}