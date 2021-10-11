// @desc      Stripe Component
// @route     localhost:3000/test
// @access    Private/Public

import React, { useState, useEffect } from "react";
import axios from 'axios'
import Stripe from 'react-stripe-checkout'
import {getCart, addToCart,removeFromCart} from "../redux/helpers/cartHelpers";
import { getUser,logOut } from '../redux/helpers/authHelpers';

export const PaymentTest = () => {
    const [cart, setCart] = useState([]);
    const user=getUser()
    useEffect(() => {
        const getCartItem = async () => {
        setCart(getCart())
        }
        getCartItem();
      }, [cart]);

      console.log(cart);
      console.log(user);

    const tokenHandler = (token) => {
        axios({
            method : 'POST',
            url : `http://localhost:4000/api/v1/payment/stripe`,
            data: {
                token,
                cart: {
                    products : [
                        cart.cart
                    ],
                    amount : cart.amount,
                },
                user:{
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    address: {
                        location: user.addresses[0].location,
                        // landmark: user.addresses[0].location,
                        pincode: user.addresses[0].pincode,
                        city: user.addresses[0].city,
                        state:user.addresses[0].state
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