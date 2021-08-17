const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = Number(process.env.SALT_ROUNDS)

const UserSchema = mongoose.Schema({
    name : {
        type : String,
        required : "Name is required."
    },
    email : {
        type : String,
        required : "Email is required",
        trim: true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Email is invalid']
    },
    hashed_password : { 
        type : String,
        required: "Password is required",
    },
    active: {
        type : Boolean,
        default : false
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
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Image'
    },
    admin : {
        type: Boolean,
        default: false
    },
    history : [
        {
            productId : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'Product'
            },
            date : {
                type: Date,
                default: Date.now()
            },
            quantity : {
                type : Number,
                required : "Quantity is required.",
                min : [0,"Quantity cant be a negative number."]
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
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
    },
    isActive : function(){
        return this.active
    }
}

module.exports = mongoose.model('User',UserSchema)
