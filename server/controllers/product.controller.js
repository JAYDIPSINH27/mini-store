const Product = require('../models/Product')
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
                    uploadImages(product._id,"Product",req.body.images)
                    .then(async (data) => {
                        let err_images = [],temp = []
                        for(let i in data){
                            if(data[i].err){
                                err_images.push(Number(i))
                            }else{
                                temp.push(data[i])
                            }
                        }
                        try{
                            if(err_images.length < data.length){
                                product.addImages(temp)
                                await product.save()
                                return res.status(200).json({
                                    err: false,
                                    data: await Product.populate(product,productPopulate),
                                    message: 'Images added successfully.',
                                    err_images: err_images.length == 0? null : err_images
                                })
                            }else{
                                deleteImages(temp).then((data) => {
                                    return res.status(400).json({
                                        err: true,
                                        err_images,
                                        msg: "Could not upload images."
                                    })
                                })
                            }
                        }
                        catch(error){
                            deleteImages(temp).then((data) => {
                                console.log(error)
                                return res.status(400).json({
                                    err: true,
                                    msg: "Could not upload images"
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
                            if(!data[i]){
                                err_images.push(Number(i))
                            }else{
                                product.deleteImage(data[i])
                            }
                        }
                        try{
                            await product.save()
                            if(err_images.length < data.length){
                                return res.status(200).json({
                                    err: false,
                                    data : await Product.populate(product,productPopulate),
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
            let updateFields = {                    
                name: req.body.name,
                description: req.body.name,
                category: req.body.category
            }
            for (const [key, value] of Object.entries(updateFields)) {
                if (!value) {
                  delete updateFields[key];
                }
            }
            Product.findByIdAndUpdate(
                req.params.id,
                {
                    ...updateFields,
                    updatedAt : Date.now()
                },
                {
                    new : true,
                    runValidators: true
                }
            )
            .then( async(product) => {
                if(product){
                   return res.status(200).json({
                        err: false,
                        data: await Product.populate(product,productPopulate),
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
                    await deleteImages(product.images)
                    await product.deleteOne()
                    return res.status(200).json({
                        err: false,
                        data : await Product.populate(product,productPopulate),
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
    },

    // @desc      Update Quantity of Products by Id
    // @route     PATCH /api/v1/products/:id/quantity
    // @access    Private

    updateQuantity : async (req,res) => {
        
    },

}