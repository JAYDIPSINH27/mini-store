const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const key = process.env.SECRET_KEY;

const saltRounds = process.env.SALT_ROUNDS

const UserSchema = mongoose.Schema({
    email : {
        type : String,
        required : "Email ",
        trim: true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Email is invalid'],
        required: 'Email is required'
    },
    hashed_password : { 
        type : String,
        required: "Password is required",
    },
    active: {
        type : Number,
        default : 0 
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
                type : Number,
                required: "Pincode is required"
            }
        }
    ],
    image : {
        type : String,
        trim : true,
        match: [/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, 'URL is invalid']
    },
    history : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Product'
        }
    ],
    created: {
        type: Date,
        default: Date.now()
    }  
});

UserSchema.path('hashed_password').validate(function(pass){
    if(this._password && this._password.length < 8){
        this.invalidate('password', 'Password must be at least 8 characters.')
    }
    if(!this._password && this.isNew){
        this.invalidate('password', 'Password is required.')
    }
},null)

UserSchema.virtual('password')
.set(function(pass){
    this._password = pass
    this.hashed_password = this.encryptPassword(pass)
})
.get(function(){
    return this._password
})

UserSchema.methods = {
    authenticate : function(pass){
        return bcrypt.compareSync(pass, this.hashed_password)
    },
    encryptPassword : function(pass){
        return bcrypt.hashSync(pass, saltRounds)
    },
    addItem : function(item){
        this.history.push(item)
    },
    addAddress : function(address){
        this.addresses.push(address)
    }
}

module.exports = mongoose.model('User',UserSchema)

// userSchema.pre('save', function(next){
//     const user = this;
//     if (user.isModified('password')) {
//         bcrypt.genSalt(10, (err, salt) => {
//             bcrypt.hash(user.password, salt, function(err, hash) {
//                 if (err) {
//                     return next(err)
//                 }
//                 user.password = hash;
//                 next();
//             });
//         })
//     } else {
//         user.active = 1
//         next()
//     }
// });

// // userSchema.methods.comparePassword = function(password){
// //     const user = this;
// //     return new Promise((resolve, reject)=>{
// //         bcrypt.compare(password, user.password, (err, isMatch) => {
// //             if (err) {
// //                 return reject(err);
// //             }
// //             if (!isMatch) {
// //                 return reject(err);
// //             }
// //             return resolve(true);
// //         });
// //     });
// // }

// const User = mongoose.model('User', userSchema);

// module.exports = User;