const Store = require('../models/Store')
const Product = require('../models/Product')
const getError = require('../utils/dbErrorHandler')
const {uploadImages, deleteImages} = require('../utils/multipleImageOperations')
const { deleteStorefromProducts } = require('../utils/relationOperations')

module.exports = {

    createStore : async (req,res) => {
        try{
            const store = new Store({
                name : req.body.name,
                description : req.body.description || "",
                addresses :  req.body.addresses || [],
                rating : req.body.rating || 0,
                products : [],
            })
            uploadImages("stores",req.body.images)
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
                    return res.status(201).json({
                        err: false,
                        data : store,
                        message: 'Store created successfully.',
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
                    if(store.hasProduct(req.body.product.productId)){
                        return res.status(400).json({
                            err: true,
                            msg: "Product is already added."
                        })
                    }
                    Product.findById(req.body.product.productId)
                    .then(async (product) => {
                        if(product){
                            try{
                                product.addStore(req.query.id)
                                store.addProduct(req.body.product)
                                await store.save()
                                await product.save()
                                return res.status(200).json({
                                    err: false,
                                    data : "",
                                    message: 'Product added successfully.'
                                })
                            }catch(error){
                                return res.status(400).json({
                                    err: true,
                                    msg: getError(error)
                                })
                            } 
                        }else{
                            return res.status(400).json({
                                err: true,
                                msg: "No such product exists."
                            })
                        }
                    })
                }else{
                    return res.status(400).json({
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

    updateProductinStore : async(req,res) => {
        try{
            if(!req.query.id){
                return res.status(400).json({
                    err: true,
                    msg: "Id was not specified."
                })
            }
            if(!req.query.productId){
                return res.status(400).json({
                    err: true,
                    msg: "Product Id was not specified."
                })
            }
            Store.findById(req.query.id)
            .then( async(store) => {
                if(store){
                    store.updateProduct(req.query.productId,req.body.product)
                    try{
                        await store.save()
                        return res.status(200).json({
                            err: false,
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
                    return res.status(400).json({
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


    deleteProductfromStore : async(req,res) => {
        try{
            if(!req.query.id){
                return res.status(400).json({
                    err: true,
                    msg: "Id was not specified."
                })
            }
            if(!req.query.productId){
                return res.status(400).json({
                    err: true,
                    msg: "Product Id was not specified."
                })
            }
            Store.findById(req.query.id)
            .then( async(store) => {
                if(store){
                    if(!store.hasProduct(req.query.productId)){
                        return res.status(400).json({
                            err: true,
                            msg: "Product is not present."
                        })
                    }
                    Product.findById(req.query.productId)
                    .then(async (product) => {
                        if(product){
                            try{
                                product.deleteStore(req.query.id)
                                store.deleteProduct(req.query.productId)
                                await store.save()
                                await product.save()
                                return res.status(200).json({
                                    err: false,
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
                    return res.status(400).json({
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

    addImagestoStore : async(req,res) => {
        try{
            if(!req.query.id){
                return res.status(400).json({
                    err: true,
                    msg: "Id was not specified."
                })
            }
            Store.findById(req.query.id)
            .then( async(store) => {
                if(store){
                    uploadImages("stores",req.body.images)
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

    deleteImagesfromStore : async(req,res) => {
        try{
            if(!req.query.id){
                return res.status(400).json({
                    err: true,
                    msg: "Id was not specified."
                })
            }
            Store.findById(req.query.id)
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
                                store.deleteImage(data[i].id)
                            }
                        }
                        try{
                            await store.save()
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

    addAddresstoStore : async(req,res) => {
        try{
            if(!req.query.id){
                return res.status(400).json({
                    err: true,
                    msg: "Id was not specified."
                })
            }
            Store.findById(req.query.id)
            .then( async(store) => {
                if(store){
                    store.addAddress(req.body.address)
                    await store.save()
                    try{
                        await store.save()
                        return res.status(200).json({
                            err: false,
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
                    return res.status(400).json({
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

    updateAddressinStore : async(req,res) => {
        try{
            if(!req.query.id){
                return res.status(400).json({
                    err: true,
                    msg: "Id was not specified."
                })
            }
            if(!req.query.addressId){
                return res.status(400).json({
                    err: true,
                    msg: "Address Id was not specified."
                })
            }
            Store.findById(req.query.id)
            .then( async(store) => {
                if(store){
                    store.updateAddress(req.query.addressId,req.body.address)
                    try{
                        await store.save()
                        return res.status(200).json({
                            err: false,
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
                    return res.status(400).json({
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

    deleteAddressfromStore : async(req,res) => {
        try{
            if(!req.query.id){
                return res.status(400).json({
                    err: true,
                    msg: "Id was not specified."
                })
            }
            if(!req.query.addressId){
                return res.status(400).json({
                    err: true,
                    msg: "Address Id was not specified."
                })
            }
            Store.findById(req.query.id)
            .then( async(store) => {
                if(store){
                    store.deleteAddress(req.query.addressId)
                    try{
                        await store.save()
                        return res.status(200).json({
                            err: false,
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
                    return res.status(400).json({
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

    updateStore : async (req,res) => {
        try{
            if(!req.query.id){
                return res.status(400).json({
                    err: true,
                    msg: "Id was not specified."
                })
            }
            Store.findById(req.query.id)
            .then( async(store) => {
                if(store){
                    store.setName(req.body.name)
                    store.setDescription(req.body.description)
                    store.setRating(req.body.rating)
                    try{
                        await store.save()
                        return res.status(200).json({
                            err: false,
                            message: 'Store updated successfully.'
                        })
                    }
                    catch(error){
                        return res.status(400).json({
                            err: true,
                            msg: getError(error)
                        })
                    }
                }else{
                    return res.status(400).json({
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

    deleteStore : async (req,res) => {
        try{
            if(!req.query.id){
                return res.status(400).json({
                    err: true,
                    msg: "Id was not specified."
                })
            }
            Store.findById(req.query.id)
            .then( async(store) => {
                if(store){
                    await deleteStorefromProducts(store)
                    await store.deleteOne()
                    return res.status(200).json({
                        err: false,
                        msg: "Store Deleted Successfully."
                    })
                }else{
                    return res.status(400).json({
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

    getStores : async (req,res) => {
        try{
            let page = Math.max(req.query.page,0)
            let perPage = 10
            let filter = {}
            if(req.query.name){
                filter['name'] = { $regex: req.query.name }
            }
            Store.find(filter)
            .limit(page).skip(perPage*(page))
            .populate({
                path : 'products',
                populate: {
                    path: 'productId',
                    select: 'name description category',
                    populate : {
                        path : 'category',
                        select : 'name'
                    }
                } 
            })
            .then( async(stores) => {
                if(stores && stores.length > 0){
                    return res.status(200).json({
                        err: false,
                        page,
                        data: stores
                    })
                }else{
                    return res.status(404).json({
                        err: true,
                        msg: "No stores exist for this page."
                    })
                }
            })    
        }
        catch(error){
            return res.status(400).json({
                err: true,
                msg: "Could not fetch any stores."
            })
        }
    },

    getStorebyId : async (req,res) => {
        try{
            if(!req.params.id){
                return res.status(400).json({
                    err: true,
                    msg: "Id was not specified."
                })
            }
            Store.findById(req.params.id)
            .populate({
                path : 'products',
                populate: {
                    path: 'productId',
                    select: 'name description category',
                    populate : {
                        path : 'category',
                        select : 'name'
                    }
                } 
            })
            .then( async(store) => {
                if(store){
                    return res.status(200).json({
                        err: false,
                        data: store
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
            console.log(error)
            return res.status(400).json({
                err: true,
                msg: "Could not fetch any store."
            })
        }
    },

    getStoresbyProduct : async (req,res) => {
        try{
            let page = Math.max(req.query.page,0)
            let perPage = 10
            if(!req.query.productId){
                return res.status(400).json({
                    err: true,
                    msg: "Product was not specified."
                })
            }
            Product.findById(req.query.productId)
            .then( async(product) => {
                if(product && product.stores.length > 0){
                    Store.find({ '_id': { $in: product.stores } }).limit(page).skip(perPage*(page))
                    .then(async (stores) => {
                        if(stores && stores.length > 0){
                            return res.status(200).json({
                                err: false,
                                page,
                                data: stores
                            })
                        }else{
                            return res.status(400).json({
                                err: true,
                                msg: "No stores exist for this page."
                            })
                        }
                    })
                }else{
                    return res.status(400).json({
                        err: true,
                        msg: "No such store exists."
                    })
                }
            })    
        }
        catch(error){
            console.log(error)
            return res.status(400).json({
                err: true,
                msg: "Could not fetch any store."
            })
        }
    }

}