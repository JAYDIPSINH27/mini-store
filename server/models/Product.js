const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category',
        required : 'Category is required.'
    },
    images : [
        {
            data: Buffer, 
            contentType: String
        }
    ],
    name : {
        type : String,
        required : 'Product Name is required.'
    },
    description : {
        type : String,
        trim : true,
        default : ""
    },
    stores : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Product',
        }
    ]
});

ProductSchema.methods = {
    addImage : function(image){
        this.images.push(image)
    },
    addStore : function(id){
        this.stores.push(id)
    }
}

module.exports = mongoose.model("Product",ProductSchema)