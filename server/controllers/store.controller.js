const Store = require('../models/Store')
const Product = require('../models/Product')
const getError = require('../utils/dbErrorHandler')

module.exports = {

    createStore : async (req,res) => {
        try{
            const store = new Store({
                name : req.query.name,
                description : req.query.description || "",
                images : req.query.images || [],
                addresses :  req.body.addresses || [],
                rating : req.query.rating || 0,
                products : req.body.products || [],
            })
            await store.save()
            return res.status(200).json({
                err: false,
                message: 'Store created successfully.'
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
            if(!req.query.id){
                return res.status(400).json({
                    err: true,
                    msg: "Id was not specified."
                })
            }
            Store.findById(req.query.id)
            .then(async (store) => {
                if(store){
                    try{
                        store.addProduct(req.body.product)
                        await store.save()
                        return res.status(200).json({
                            err: false,
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
                    
                    return res.status(200).json({
                        err: false,
                        msg: "Store Updated Successfully."
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
            Store.find({}).limit(page).skip(perPage*(page))
            .then( async(stores) => {
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
            if(!req.query.id){
                return res.status(400).json({
                    err: true,
                    msg: "Id was not specified."
                })
            }
            Store.findById(req.query.id)
            .then( async(store) => {
                if(store){
                    return res.status(200).json({
                        err: false,
                        data: store
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
    },

    getStoresbyProduct : async (req,res) => {
        try{
            let limit = req.query.limit || 5
            if(!req.query.product){
                return res.status(400).json({
                    err: true,
                    msg: "Product was not specified."
                })
            }
            Product.findById(req.query.product).limit(limit)
            .then( async(product) => {
                if(product && product.stores.length > 0){
                    return res.status(200).json({
                        err: false,
                        data: product.stores
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
    },

    getStoresbyName : async (req,res) => {
        try{
            let limit = req.query.limit || 5
            if(!req.query.name){
                return res.status(400).json({
                    err: true,
                    msg: "Name was not specified."
                })
            }
            Store.find({name : { $regex: req.query.name }}).limit(limit)
            .then( async(stores) => {
                if(stores && stores.length > 0){
                    return res.status(200).json({
                        err: false,
                        data: stores
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
    },
}