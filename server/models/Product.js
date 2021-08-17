const mongoose = require('mongoose')
const Category = require('./Category')

const ProductSchema = mongoose.Schema({
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category',
        required : 'Category is required.'
    },
    images : [ 
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Image'
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
            ref : 'Store',
        }
    ],
    createdAt : {
        type : Date,
        default : Date.now()
    },
    updatedAt : {
        type : Date,
        default : Date.now()
    }
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
    addImages : function(images){
        if(this.images.length == 0){
            this.images = images
        }else{
            this.images = [...this.images,...images]
        }
    },
    deleteImage : function(id){
        this.images = this.images.filter((image) => image != id)
    },
    addStore : function(id){
        this.stores.push(id)
    },
    deleteStore : function(id){
        this.stores = this.stores.filter(e => e != id)
    }
}

module.exports = mongoose.model("Product",ProductSchema)