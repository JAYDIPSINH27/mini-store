const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    paymentId: {
        type: String,
        unique:"ID must be unique"
    },
    paymentGateway: {
        type: String,
        enum: ['card','cash'],
        required: 'Payment Gateway is required.'
    },
    status:{
        type: String,
        enum: ['paid','pending','cancelled'],
        required: 'Payment Status is required.'
    },
    date: {
        type: Date,
        default: new Date(Date.now())
    },
    email: {
        type: String,
        required : "Email is required",
        trim: true,
        match: [/.+@.+\..+/, 'Email is invalid']
    },
    userId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    shippingDetails: {
        name: {
            type : String,
            required: 'Name is required.'
        },
        address : {
            location : {
                type : String,
                required: "Location is required"
            },
            landmark:{
                type : String,
                required: "Landmark is required"
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
    },
    products: [
        {
            productId : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'Product',
                required : "Product Id not specified."
            },
            quantity : {
                type : Number,
                min: [0, 'Quantity must be a positive value.'],
                required : "Quantity is required."
            }
        }
    ],
    amount: {
        type: Number,
        min: [0,'Amount cant be less than zero.'],
        required: 'Amount is required.'
    },
    reciept: {
        type: String
    }
})

OrderSchema.methods = {
    cancelOrder : function(){
        this.status = 'cancelled'
    },
    setAsPaid : function(){
        this.status = 'paid'
    }
}

module.exports = mongoose.model("Order",OrderSchema)