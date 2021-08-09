const mongoose = require('mongoose')

const StoreSchema = mongoose.Schema({
    images : [{
        url : {
            type : String,
            trim : true,
            match: [/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, 'URL is invalid']
        },
        public_id : String
    }],
    name : {
        type : String,
        required : 'Store Name is required.'
    },
    description : {
        type : String,
        trim : true,
        default : ""
    },
    addresses : [
        {
            location : {
                type : String,
                required: "Location is required"
            },
            landmark : {
                type : String
            },
            city : {
                type : String,
                required: "City is required"
            },
            state : {
                type : String,
                required: "State is required"
            },
            pincode : {
                type : String,
                required: "Pincode is required"
            }
        }
    ],
    rating : {
        type : Number,
        min: [0, 'Rating must be a positive value.'],
        max: [5, 'Rating cant exceed 5.'],
        default: 0,
    },
    products : [
        {
            productId : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'Product',
                required : "Product Id not specified."
            },
            price : {
                type : Number,
                min: [0, 'Price must be a positive value.'],
                required : 'Price is required.'
            },
            discount : {
                type : Number,
                default : 0,
                min: [0, 'Discount must be a positive value.'],
                max: [100, 'Discount cant exceed 100%.'],
            },
            rating : {
                type : Number,
                min: [0, 'Rating must be a positive value.'],
                max: [5, 'Rating cant exceed 5.'],
                default: 0,
            },
            quantity : {
                type : Number,
                min: [0, 'Quantity must be a positive value.'],
                required : "Quantity is required."
            }
        }
    ],
});

StoreSchema.methods = {
    setName : function(name){
        if(name){
            this.name = name
        }
    },
    setDescription : function(description){
        if(description){
            this.description = description
        }
    },
    setRating : function(rating){
        if(rating){
            this.rating = rating
        }
    },
    addImage : function(image){
        this.images.push(image)
    },
    deleteImage : function(id){
        this.images = this.images.filter((image) => image.public_id != id)
    },
    addAddress : function(address){
        this.addresses.push(address)
    },
    deleteAddress : function(id){
        this.addresses = this.addresses.filter(e => e._id != id)
    },
    updateAddress : function(id,address){
        let curr = this.addresses.findIndex(e => e._id == id)
        if(curr != -1){
            this.addresses[curr].location = address.location || this.addresses[curr].location
            this.addresses[curr].landmark = address.landmark || this.addresses[curr].landmark
            this.addresses[curr].city = address.city || this.addresses[curr].city
            this.addresses[curr].state = address.state || this.addresses[curr].state
            this.addresses[curr].pincode = address.pincode || this.addresses[curr].pincode
        }
    },
    addProduct : function(product){
        this.products.push(product)
    },
    hasProduct : function(id){
        let curr = this.products.findIndex(e => e.productId == id)
        if(curr == -1)
            return false
        return true
    },
    deleteProduct : function(id){
        this.products = this.products.filter(e => e.productId != id)
    },
    updateProduct : function(id,product){
        let curr = this.products.findIndex(e => e.productId == id)
        if(curr != -1){
            this.products[curr].price = product.price || this.products[curr].price
            this.products[curr].discount = product.discount || this.products[curr].discount
            this.products[curr].rating = product.rating || this.products[curr].rating
            this.products[curr].quantity = product.quantity || this.products[curr].quantity
        }
    },
}

module.exports = mongoose.model("Store",StoreSchema)