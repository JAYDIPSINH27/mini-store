const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    name : {
        type : String,
        required : "Name is required."
    },
    image : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Image'
    },
    createdAt : {
        type : Date,
        default : Date.now()
    },
    updatedAt : {
        type : Date,
        default : Date.now()
    }
});

module.exports = mongoose.model("Category",CategorySchema)