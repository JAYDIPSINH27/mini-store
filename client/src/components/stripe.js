// @desc      Stripe Component
// @route     localhost:3000/test
// @access    Private/Public

import React from 'react'
import axios from 'axios'
import Stripe from 'react-stripe-checkout'

export const PaymentTest = () => {

    const tokenHandler = (token) => {
        axios({
            method : 'POST',
            url : `http://localhost:4000/api/v1/payment/stripe`,
            data: {
                token,
                cart: {
                    products : [
                        {
                            productId: '6111fefe5b2b6850d822a193',
                            quantity : 5
                        },
                        {
                            productId: '6111fefe5b2b6850d822a193',
                            quantity : 6
                        }
                    ],
                    amount : 100,
                },
                user:{
                    id: '614e196de6874e38487acb55',
                    email: 'sample@gmail.com',
                    name: "Test",
                    address: {
                        location: 'Location',
                        landmark: 'LandMark',
                        pincode: '0000000',
                        city: 'City',
                        state: 'State'
                    }
                }
            }
        })
        .then(res => console.log(res.data))
        .catch(err => console.log(err.response.data))
    }

    return(
        <>
            <Stripe
                stripeKey="pk_test_51JNXGXSC9D6J4dbWboIoFAKi8SR1w4Go1pOAiO0iomrtOohP2jfYFX5iyKD6SXBB6O06RWIqfTQSHKDdV6fqiROY00Gh2dCwEs"
                token={tokenHandler}
            />
        </>
    )
}