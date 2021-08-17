import React from 'react'
import axios from 'axios'
import Stripe from 'react-stripe-checkout'

export const PaymentTest = () => {

    const tokenHandler = (token) => {
        console.log(token)
        axios({
            method : 'POST',
            url : `http://localhost:4000/api/v1/payment`,
            data: {
                token,
                amount : 100
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