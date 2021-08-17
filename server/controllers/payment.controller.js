const stripe = require('../config/stripe_config')
const {v4 : uuid} = require('uuid')

module.exports = {

    makeStripePayment : async (req,res) => {
        try{
            const {token,amount} = req.body
            const idempotencyKey = uuid()

            return stripe.customers.create({
                email : token.email,
                source : token.id
            })
            .then(customer => {
                stripe.charges.create({
                    amount: amount*100,
                    currency: 'inr',
                    customer: customer.id,
                    receipt_email: token.email
                },{idempotencyKey})
                .then(result => {
                    console.log(result)
                    return res.status(200).json({result})
                })
            })
            .catch(err => {
                return res.status(400).json({err})
            })
        }
        catch(error){
            console.log(error)
            return res.status(400).json({
                err : true,
                msg: "Could not make payment."
            })
        }
    }

}