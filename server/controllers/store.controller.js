const Store = require('../models/Store')
const Product = require('../models/Product')
const getError = require('../utils/dbErrorHandler')
const {uploadImages, deleteImages} = require('../utils/multipleImageOperations')
const { deleteStorefromProducts } = require('../utils/relationOperations')
const {storePopulate} = require('../utils/populateObjects')
const User = require('../models/User')

module.exports = {

    // @desc      Create Store
    // @route     POST /api/v1/stores
    // @access    Private

    createStore : async (req,res) => {
        try{
            const store = new Store({
                name : req.body.name,
                description : req.body.description || "",
                addresses :  req.body.addresses || [],
                rating : req.body.rating || 0,
                products : [],
            })
            uploadImages(store._id,"Store",req.body.images)
            .then(async (data) => {
                let err_images = []
                for(let i in data){
                    if(data[i].err){
                        err_images.push(Number(i))
                    }else{
                        store.addImage(data[i])
                    }
                }
                try{
                    await store.save()
					let user = await User.findById(req.user._id)
					user.addStore(store._id)
					await user.save()
                    return res.status(201).json({
                        err: false,
                        data : await Store.populate(store,storePopulate),
                        message: 'Store created successfully.',
                        err_images: err_images.length == 0? null : err_images
                    })
                }
                catch(error){
                    deleteImages(store.images).then(() => {
                        return res.status(400).json({
                            err: true,
                            msg: getError(error)
                        })
                    })
                }
            })
            .catch(() => {
                return res.status(400).json({
                    err: true,
                    msg: "Could not upload images. Try again"
                })
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

	// @desc      Create Product and Add to Store
    // @route     POST /api/v1/stores/:id/products
    // @access    Private

	createProductandAddtoStore : async(req,res) => {
		try{
            if(!req.params.id){
                return res.status(400).json({
                    err: true,
                    msg: "Id was not specified."
                })
            }
			Store.findById(req.params.id)
            .then(async (store) => {
                if(store){
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
							product.addStore(req.params.id)
                            store.addProduct({
                                productId : product._id,
                                ...req.body.product
                            })
                            await product.save()
                            await store.save()
                            return res.status(200).json({
                                err: false,
                                data : await Store.populate(store,storePopulate),
                                message: 'Product added successfully.'
                            })
						}
						catch(error){
							deleteImages(product.images).then(() => {
								return res.status(400).json({
									err: true,
									msg: getError(error)
								})
							})
						}
					})
					.catch(() => {
						return res.status(400).json({
							err: true,
							msg: "Could not upload images. Try again"
						})
					})
				}
			})
		}catch(error){
            console.log(error)
            return res.status(500).json({
                err: true,
                msg: "Could not add product."
            })
        }
	},

    // @desc      Add Product to Store
    // @route     POST /api/v1/stores/:id/products/:productId
    // @access    Private

    addProducttoStore : async(req,res) => {
        try{
            if(!req.params.id){
                return res.status(400).json({
                    err: true,
                    msg: "Id was not specified."
                })
            }
            Store.findById(req.params.id)
            .then(async (store) => {
                if(store){
                    if(store.hasProduct(req.params.productId)){
                        return res.status(400).json({
                            err: true,
                            msg: "Product is already added."
                        })
                    }
                    Product.findById(req.params.productId)
                    .then(async (product) => {
                        if(product){
                            try{
                                product.addStore(req.params.id)
                                store.addProduct({
                                    productId : req.params.productId,
                                    ...req.body.product
                                })
                                await store.save()
                                await product.save()
                                return res.status(200).json({
                                    err: false,
                                    data : await Store.populate(store,storePopulate),
                                    message: 'Product added successfully.'
                                })
                            }catch(error){
                                return res.status(400).json({
                                    err: true,
                                    msg: getError(error)
                                })
                            } 
                        }else{
                            return res.status(404).json({
                                err: true,
                                msg: "No such product exists."
                            })
                        }
                    })
                }else{
                    return res.status(404).json({
                        err: true,
                        msg: "No such store exists."
                    })
                }
            })
        }
        catch(error){
            return res.status(400).json({
                err: true,
                msg: "Could not add product."
            })
        }
    },

    // @desc      Update Product in Store
    // @route     PATCH /api/v1/stores/:id/products/:productId
    // @access    Private

    updateProductinStore : async(req,res) => {
        try{
            if(!req.params.id){
                return res.status(400).json({
                    err: true,
                    msg: "Id was not specified."
                })
            }
            if(!req.params.productId){
                return res.status(400).json({
                    err: true,
                    msg: "Product Id was not specified."
                })
            }
            Store.findById(req.params.id)
            .then( async(store) => {
                if(store){
                    store.updateProduct(req.params.productId,req.body.product)
                    try{
                        await store.save()
                        return res.status(200).json({
                            err: false,
                            data : await Store.populate(store,storePopulate),
                            message: 'Product updated successfully.'
                        })
                    }
                    catch(error){
                        return res.status(400).json({
                            err: true,
                            msg: getError(error)
                        })
                    }
                }else{
                    return res.status(404).json({
                        err: true,
                        msg: "No such store exists."
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

    // @desc      Delete Product from Store
    // @route     DELETE /api/v1/stores/:id/products/:productId
    // @access    Private

    deleteProductfromStore : async(req,res) => {
        try{
            if(!req.params.id){
                return res.status(400).json({
                    err: true,
                    msg: "Id was not specified."
                })
            }
            if(!req.params.productId){
                return res.status(400).json({
                    err: true,
                    msg: "Product Id was not specified."
                })
            }
            Store.findById(req.params.id)
            .then( async(store) => {
                if(store){
                    if(!store.hasProduct(req.params.productId)){
                        return res.status(400).json({
                            err: true,
                            msg: "Product is not present."
                        })
                    }
                    Product.findById(req.params.productId)
                    .then(async (product) => {
                        if(product){
                            try{
                                product.deleteStore(req.params.id)
                                store.deleteProduct(req.params.productId)
                                await store.save()
                                await product.save()
                                return res.status(200).json({
                                    err: false,
                                    data : await Store.populate(store,storePopulate),
                                    message: 'Product deleted successfully.'
                                })
                            }
                            catch(error){
                                return res.status(400).json({
                                    err: true,
                                    msg: getError(error)
                                })
                            }
                        }
                    })
                }else{
                    return res.status(404).json({
                        err: true,
                        msg: "No such store exists."
                    })
                }
            })    
        }
        catch(error){
            return res.status(400).json({
                err: true,
                msg: "Can not delete product."
            })
        }
    },

    
    // @desc      Add Images to Store
    // @route     POST /api/v1/stores/:id/images
    // @access    Private

    addImagestoStore : async(req,res) => {
        try{
            if(!req.params.id){
                return res.status(400).json({
                    err: true,
                    msg: "Id was not specified."
                })
            }
            Store.findById(req.params.id)
            .then( async(store) => {
                if(store){
                    uploadImages(store._id,"Store",req.body.images)
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
                                store.addImages(temp)
                                await store.save()
                                return res.status(200).json({
                                    err: false,
                                    data : await Store.populate(store,storePopulate),
                                    message: 'Images added successfully.',
                                    err_images: err_images.length == 0? null : err_images
                                })
                            }else{
                                deleteImages(temp).then(() => {
                                    return res.status(400).json({
                                        err: true,
                                        err_images,
                                        msg: "Could not upload images."
                                    })
                                })
                            }
                        }
                        catch(error){
                            deleteImages(temp).then(() => {
                                return res.status(400).json({
                                    err: true,
                                    msg: getError(error)
                                })
                            })
                        }
                    })
                    .catch(() => {
                        return {
                            err: true,
                            msg: "Could not upload images. Try again"
                        }
                    })
                }else{
                    return res.status(404).json({
                        err: true,
                        msg: "No such store exists."
                    })
                }
            })    
        }
        catch(error){
            return res.status(400).json({
                err: true,
                msg: "Can not update store."
            })
        }
    },

    // @desc      Delete Images from Store
    // @route     DELETE /api/v1/stores/:id/images
    // @access    Private

    deleteImagesfromStore : async(req,res) => {
        try{
            if(!req.params.id){
                return res.status(400).json({
                    err: true,
                    msg: "Id was not specified."
                })
            }
            Store.findById(req.params.id)
            .then( async(store) => {
                if(store){
                    deleteImages(req.body.images)
                    .then(async (data) => {
                        console.log(data)
                        let err_images = []
                        for(let i in data){
                            if(data[i].err){
                                err_images.push(Number(i))
                            }else{
                                store.deleteImage(data[i])
                            }
                        }
                        try{
                            await store.save()
                            if(err_images.length < data.length){
                                return res.status(200).json({
                                    err: false,
                                    data : await Store.populate(store,storePopulate),
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
                    .catch(() => {
                        return {
                            err: true,
                            msg: "Could not delete images. Try again"
                        }
                    })
                }else{
                    return res.status(404).json({
                        err: true,
                        msg: "No such store exists."
                    })
                }
            })    
        }
        catch(error){
            return res.status(400).json({
                err: true,
                msg: "Can not update store."
            })
        }
    },

    // @desc      Add address in Store
    // @route     POST /api/v1/stores/:id/addresses
    // @access    Private

    addAddresstoStore : async(req,res) => {
        try{
            if(!req.params.id){
                return res.status(400).json({
                    err: true,
                    msg: "Id was not specified."
                })
            }
            Store.findById(req.params.id)
            .then( async(store) => {
                if(store){
                    store.addAddress(req.body.address)
                    await store.save()
                    try{
                        await store.save()
                        return res.status(200).json({
                            err: false,
                            data: await Store.populate(store,storePopulate),
                            message: 'Address added successfully.'
                        })
                    }
                    catch(error){
                        return res.status(400).json({
                            err: true,
                            msg: getError(error)
                        })
                    }
                }else{
                    return res.status(404).json({
                        err: true,
                        msg: "No such store exists."
                    })
                }
            })    
        }
        catch(error){
            return res.status(400).json({
                err: true,
                msg: "Can not add address."
            })
        }
    },

    // @desc      Update address in Store
    // @route     PATCH /api/v1/stores/:id/addresses/:addressId
    // @access    Private

    updateAddressinStore : async(req,res) => {
        try{
            console.log(req.params)
            if(!req.params.id){
                return res.status(400).json({
                    err: true,
                    msg: "Id was not specified."
                })
            }
            if(!req.params.addressId){
                return res.status(400).json({
                    err: true,
                    msg: "Address Id was not specified."
                })
            }
            Store.findById(req.params.id)
            .then( async(store) => {
                if(store){
                    store.updateAddress(req.params.addressId,req.body.address)
                    try{
                        await store.save()
                        return res.status(200).json({
                            err: false,
                            data: await Store.populate(store,storePopulate),
                            message: 'Address updated successfully.'
                        })
                    }
                    catch(error){
                        return res.status(400).json({
                            err: true,
                            msg: getError(error)
                        })
                    }
                }else{
                    return res.status(404).json({
                        err: true,
                        msg: "No such store exists."
                    })
                }
            })    
        }
        catch(error){
            return res.status(400).json({
                err: true,
                msg: "Can not update address."
            })
        }
    },

    // @desc      Delete address from Store
    // @route     DELETE /api/v1/stores/:id/addresses/:addressId
    // @access    Private

    deleteAddressfromStore : async(req,res) => {
        try{
            if(!req.params.id){
                return res.status(400).json({
                    err: true,
                    msg: "Id was not specified."
                })
            }
            if(!req.params.addressId){
                return res.status(400).json({
                    err: true,
                    msg: "Address Id was not specified."
                })
            }
            Store.findById(req.params.id)
            .then( async(store) => {
                if(store){
                    store.deleteAddress(req.params.addressId)
                    try{
                        await store.save()
                        return res.status(200).json({
                            err: false,
                            data: await Store.populate(store,storePopulate),
                            message: 'Address deleted successfully.'
                        })
                    }
                    catch(error){
                        return res.status(400).json({
                            err: true,
                            msg: getError(error)
                        })
                    }
                }else{
                    return res.status(404).json({
                        err: true,
                        msg: "No such store exists."
                    })
                }
            })    
        }
        catch(error){
            return res.status(400).json({
                err: true,
                msg: "Can not delete address."
            })
        }
    },

    // @desc      Update Store
    // @route     PATCH /api/v1/stores/:id
    // @access    Private

    updateStore : async (req,res) => {
        try{
            if(!req.params.id){
                return res.status(400).json({
                    err: true,
                    msg: "Id was not specified."
                })
            }
            let updateFields = {                    
                name: req.body.name,
                description: req.body.description,
                rating: req.body.rating
            }
            for (const [key, value] of Object.entries(updateFields)) {
                if (!value) {
                  delete updateFields[key];
                }
            }
            Store.findByIdAndUpdate(
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
            .then( async(store) => {
                if(store){
                    return res.status(200).json({
                        err: false,
                        data: await Store.populate(store,storePopulate),
                        message: 'Store updated successfully.'
                    })
                }else{
                    return res.status(404).json({
                        err: true,
                        msg: "No such store exists."
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
                msg: "Can not update store."
            })
        }
    },

    // @desc      Delete Store
    // @route     DELETE /api/v1/stores/:id
    // @access    Private

    deleteStore : async (req,res) => {
        try{
            if(!req.params.id){
                return res.status(400).json({
                    err: true,
                    msg: "Id was not specified."
                })
            }
            Store.findById(req.params.id)
            .then( async(store) => {
                if(store){
                    await deleteStorefromProducts(store)
                    await deleteImages(store.images)
                    await store.deleteOne()
                    return res.status(200).json({
                        err: false,
                        data: await Store.populate(store,storePopulate),
                        msg: "Store Deleted Successfully."
                    })
                }else{
                    return res.status(404).json({
                        err: true,
                        msg: "No such store exists."
                    })
                }
            })    
        }
        catch(error){
            return res.status(400).json({
                err: true,
                msg: "Cant delete store."
            })
        }
    },

    // @desc      Get Stores
    // @route     GET /api/v1/stores
    // @access    Public

    getStores : async (req,res) => {
        if(res.results.err){
            return res.status(404).json(res.results)
        }else if(res.results.metadata.count == 0){
            return res.status(404).json({
                err : true,
                metadata : {
                    msg : "No Stores found."
                }
            })
        }else{
            return res.status(200).json(res.results)
        }
    },

    // @desc      Get Stores by Id
    // @route     GET /api/v1/stores/:id
    // @access    Public

    getStorebyId : async (req,res) => {
        if(res.results.err){
            return res.status(404).json(res.results)
        }else if(res.results.data == null){
            return res.status(404).json({
                err : true,
                metadata : {
                    msg : "No Store found."
                }
            })
        }else{
            return res.status(200).json(res.results)
        }
    }

}