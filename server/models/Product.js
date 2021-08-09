const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'categories',
        required : 'Category is required.'
    },
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