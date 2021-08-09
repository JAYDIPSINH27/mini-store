const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name : {
        type : String,
        required : "Name is required."
    },
    image : {
        url : {
            type : String,
            trim : true,
            match: [/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, 'URL is invalid']
        },
        public_id : String
    }
});

module.exports = mongoose.model("Category",categorySchema)