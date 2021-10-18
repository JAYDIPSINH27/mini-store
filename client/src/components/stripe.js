// @desc      Stripe Component
// @route     localhost:3000/test
// @access    Private/Public

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Stripe from "react-stripe-checkout";
import { clearCart } from "../redux/helpers/cartHelpers";
import { getUser, logOut } from "../redux/helpers/authHelpers";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import { Container, Grid, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home1 from "../assets/Caro2.jpg";
import useRazorpay from "react-razorpay";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  body: {
    height: "100vh",
    width: "100%",
  },
  loadingDiv: {
    // border : "2px solid black",
    width: "100%",
  },
  loadingImage: {
    margin: "auto",
  },
  imageDiv: {
    display: "flex",
    minWidth: "150px",
    height: "180px",
    backgroundColor: "yellow",
  },
  storeImage: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    height: "100%",
  },
  search: {
    margin: "20px",
  },
  formControl: {
    margin: "20px",
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  sortSearch: {
    display: "flex",
    justifyContent: "space-between",
  },
  ratingDiv: {
    justifyContent: "space-between",
  },
  fontStyle: {
    //   fontFamily: "Noto Serif",
  },
  carosoulDiv: {
    width: "100%",
    height: "400px",
    marginBottom: "20px",
  },
  container: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(2),
  },
  Title: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: "5rem",
    marginBottom: "1rem",
    display: "flex",
  },
  Text: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: "1rem",
    marginBottom: "1rem",
    display: "flex",
  },
  a: {
    textDecoration: "none",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EB9800",
    textAlign: "center",
    border: "2 ",
    fontSize: "20px",
    // color: "#555",
    color: "white",
    "&:hover": {
      textDecoration: "none",
      color: "black",
    },
    [theme.breakpoints.down("sm")]: {
      color: theme.palette.common.white,
      "&:hover": {
        textDecoration: "none",
        color: theme.palette.common.white,
        opacity: "0.9",
      },
    },
  },
  pay: {
    textDecoration: "none",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EB9800",
    textAlign: "center",
    border: "2 ",
    fontSize: "20px",
    // color: "#555",
    color: "white",
    "&:hover": {
      textDecoration: "none",
      color: "black",
      backgroundColor: "lightgreen",
    },
    [theme.breakpoints.down("sm")]: {
      color: theme.palette.common.white,
      "&:hover": {
        textDecoration: "none",
        color: theme.palette.common.white,
        opacity: "0.9",
      },
    },
  },
}));

export const PaymentTest = () => {
  const classes = useStyles();
  // const [cart, setCart] = useState([]);
  const cart = useSelector((state) => state.cartReducer);
  const user = getUser();
  const userData = useSelector((state) => state.authReducer);
  const history = useHistory();

  console.log(cart);
  console.log(user);

  const products = [];
  cart.cart.map((prod) => {
    products.push({
      productId: prod.productId._id,
      quantity: prod.quantity,
    });
  });

  const successPayment = (data) => {
    // alert('Payment Successful');
    toast.success(data.data.message);
    clearCart();
    console.log(data);
  };

  const errorPayment = (data) => {
    // alert(data.data.message);
    toast.error(data.message);
    console.log(data);
  };

  const tokenHandler = (token) => {
    axios({
      method: "POST",
      url: `http://localhost:4000/api/v1/payment/stripe`,
      data: {
        token,
        cart: {
          products: products,

          amount: cart.amount,
        },
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          address: {
            location: user.addresses[0].location,
            landmark: user.addresses[0].location,
            pincode: user.addresses[0].pincode,
            city: user.addresses[0].city,
            state: user.addresses[0].state,
          },
        },
      },
    })
      // .then(res => console.log(token))
      .then((res) => successPayment(res))
      // .catch(err => console.log(err.response.data))
      .catch((res) => errorPayment(res));
  };

  const cashOnDelivery = () => {
    axios({
      method: "POST",
      url: `http://localhost:4000/api/v1/payment/cash`,
      data: {
        cart: {
          products: products,

          amount: cart.amount,
        },
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          address: {
            location: user.addresses[0].location,
            landmark: user.addresses[0].location,
            pincode: user.addresses[0].pincode,
            city: user.addresses[0].city,
            state: user.addresses[0].state,
          },
        },
      },
    })
      .then((res) => successPayment(res))
      // .catch(err => console.log(err.response.data))
      .catch((res) => errorPayment(res));
  };

  const Razorpay = useRazorpay();

  const handlePayment = useCallback(() => {
    // const order = await createOrder(params);

    const RazorpayOptions = {
      key: "rzp_test_bNG0doZIkfeoBb",
      amount: cart.amount * 100,
      currency: "INR",
      name: "Mini MAll",
      description: "Purchase Products",
      image: { Home1 },
      // order_id: order.id,
      handler: (res) => {
        console.log(res);
        toast("Payment Successful");
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3f51b5",
      },
    };

    const rzpay = new Razorpay(RazorpayOptions);
    rzpay.open();
    rzpay.on("payment.failed", (res) => {
      toast("Payment Failed");
    });
  }, [Razorpay]);

  if (userData.jwtToken !== "") {
    return (
      <div className={classes.body}>
        <Grid container>
          <Grid item></Grid>
        </Grid>
        <Container>
          <ToastContainer />
          <Grid item>
            <div className={classes.Title}>
              <Typography
                className={classes.fontStyle}
                gutterBottom
                variant="h4"
                component="h4"
              >
                Mini Mall
              </Typography>
            </div>
            <div className={classes.Text}>
              <Typography
                className={classes.fontStyle}
                gutterBottom
                variant="h6"
                component="h6"
              >
                Choose Payment Option
              </Typography>
            </div>
          </Grid>

          <div className={classes.Text}>
            <Stripe
              name="Mini Mall"
              image={Home1}
              description={`Payment by ${user.name}`}
              panelLabel="Pay Total" // prepended to the amount in the bottom pay button
              amount={cart.amount * 100} // cents
              currency="INR"
              stripeKey="pk_test_51JNXGXSC9D6J4dbWboIoFAKi8SR1w4Go1pOAiO0iomrtOohP2jfYFX5iyKD6SXBB6O06RWIqfTQSHKDdV6fqiROY00Gh2dCwEs"
              // locale="in"
              // email={user.email}
              token={tokenHandler}
              ComponentClass="div"
              // shippingAddress
              // billingAddress={false}
            >
              <Button className={classes.pay}>Pay With Card</Button>
            </Stripe>
          </div>
          <div className={classes.Text}>
            <Button
              className={classes.pay}
              onClick={() => {
                cashOnDelivery();
              }}
            >
              Cash
            </Button>
          </div>

          <div className={classes.Text}>
            <Button
              className={classes.pay}
              onClick={() => {
                handlePayment();
              }}
            >
              RazorPay
            </Button>
          </div>
        </Container>
      </div>
    );
  } else {
    history.push("/signin");
  }

  return 0;
};
