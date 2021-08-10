const Product = require('../models/Product')
const Store = require('../models/Store')

module.exports = {

    deleteStorefromProducts : async(store) => {
        let promises = []
        for(let i in store.products){
            promises.push(Product.findById(store.products[i].productId)
            .then(async (product)=>{
                if(product){
                    console.log(store._id)
                    product.deleteStore(store._id.toString())
                    await product.save()
                }
            }))
        }
        return Promise.all(promises)
    },

    deleteProductfromStores : async(product) => {
        let promises = []
        for(let i in product.stores){
            promises.push(Store.findById(product.stores[i])
            .then(async (store)=>{
                if(store){
                    store.deleteProduct(product._id.toString())
                    await store.save()
                }
            }))
        }
        return Promise.all(promises)
    }

}