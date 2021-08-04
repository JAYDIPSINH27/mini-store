const mongoose = require('mongoose')

const StoreSchema = mongoose.Schema({
    images : [
        {
            data: Buffer, 
            contentType: String
        }
    ],
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
                ref : 'Product'
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
    addProduct : function(product){
        this.products.push(product)
    }
}

module.exports = mongoose.model("Store",StoreSchema)