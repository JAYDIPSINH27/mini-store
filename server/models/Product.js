const mongoose = require('mongoose')
const Category = require('./Category')

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

ProductSchema.path('category').validate(async function(id){
    let cat = await Category.findById(id)
    if(!cat){
        this.invalidate('category','Invalid Category')
    }
},null)

ProductSchema.methods = {
    setName: function(name){
        if(name){
            this.name = name
        }
    },
    setDescription: function(description){
        if(description){
            this.description = description
        }
    },
    setCategory: async function(category){
        if(category){
            this.category = category
        }
    },
    addImage : function(image){
        this.images.push(image)
    },
    deleteImage : function(id){
        this.images = this.images.filter((image) => image.public_id != id)
    },
    addStore : function(id){
        this.stores.push(id)
    },
    deleteStore : function(id){
        this.stores = this.stores.filter(e => e != id)
    }
}

module.exports = mongoose.model("Product",ProductSchema)