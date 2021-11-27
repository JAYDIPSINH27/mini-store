// @desc      CartPage Component
// @route     localhost:3000/cart
// @access    Private
import React, { useState, useEffect} from "react";
import { makeStyles, alpha } from "@material-ui/core";
import { Container } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import ReactStars from "react-rating-stars-component";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { removeFromCart, updateCart, clearCart } from "../../redux/helpers/cartHelpers";
import { useSelector } from "react-redux";
import { Add, Remove } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import Divider from "@material-ui/core/Divider";

import {Table, TableBody, TableCell,TableContainer, TableHead, TableRow,  Paper} from '@material-ui/core';


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
    // fontFamily: "Noto Serif",
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
    marginTop: "2rem",
    marginBottom: "1rem",
    display: "flex",
  },
  Text: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: "2.5rem",
    marginBottom: "1rem",
    display: "flex",
  },
  a: {
    textDecoration: "none",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:"#f44336",
    textAlign: "center",
    border: "2 ",
    fontSize: "20px",
    // color: "#555",
    color: "white",
    "&:hover": {
      textDecoration: "none",
      color: "white",
      backgroundColor:"#ba000d",
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
  removeButton: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    }
  },
  productName: {
    minHeight: "4.5rem",
  },
  productsContainer: {
    marginTop: '2rem',
  },
  totalText: {
    fontWeight: 'bold',
    fontSize: '1.3rem',
    
  },
  billTable: {
    marginTop: '2rem',
    paddingLeft: '20%',
    paddingRight: '20%',
    [theme.breakpoints.down("sm")]: {
      paddingLeft: '0',
      paddingRight: '0',
    }
  },
  emptyCart: {
    height: '400px',
    textAlign: "center",
    paddingTop: "180px",
  }
}));

const Stores = (props) => {
  const classes = useStyles();
  const settings = {
    dots: true,
    fade: true,
    autoplay: true,
    infinite: true,
    speed: 500,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  // console.log(props.data);
  const [rows, setRows] = useState([]);

  const remove = (productId) => {
    removeFromCart(productId);
    console.log(productId);
  };
  const addOne = (cart) => {
    updateCart(cart._id, cart.quantity + 1);
  };
  const removeOne = (cart) => {
    if (cart.quantity === 1) {
      removeFromCart(cart._id);
    } else {
      updateCart(cart._id, cart.quantity - 1);
    }
  };

  useEffect(() => {
    const res = [];
    props.data.cart.map((cart) => {
      res.push({
        name: cart.productId.name,
        quantity: cart.quantity,
        rate: cart.price,
        amount: (cart.price * cart.quantity)
      })
    });
    setRows(res);
  }, [remove, addOne, removeOne]);

  return (
    <>
      <Grid container>
        <Grid item></Grid>
      </Grid>
      <Container>
        <Grid item>
          <div className={classes.Title}>
            <Typography
              className={classes.fontStyle}
              gutterBottom
              variant="h4"
              component="h4"
            >
              My Cart
            </Typography>
          </div>
        </Grid>
        <Divider />

        <Grid container spacing={5} className={classes.productsContainer}>
          {props.data.cart.map((cart) => {
            return (
              // <h1>{cart.id}</h1>

              <Grid item xs={12} sm={6} md={4} key={cart._id}>
                <Card className={classes.card}>
                  <CardActionArea>
                    <div className={classes.imageDiv}>
                      <img
                        src={cart.productId.images[0].url}
                        alt=" abc"
                        className={classes.storeImage}
                      />
                    </div>
                  </CardActionArea>
                  <CardContent>
                    <Grid container className={classes.ratingDiv}>
                      <Grid item lg={6} md={6} className={classes.productName}>
                        <Typography
                          className={classes.fontStyle}
                          gutterBottom
                          variant="h5"
                          component="h2"
                        >
                          {cart.productId.name}
                        </Typography>
                      </Grid>
                      <Grid item lg={6} md={6}>
                        <ReactStars
                          size={30}
                          value={cart.rating}
                          edit={false}
                          isHalf={true}
                        />
                      </Grid>
                    </Grid>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Quantity :&nbsp;
                      {cart.quantity}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Rate :&nbsp;
                      {cart.price}&nbsp;₹
                    </Typography>

                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Amount :&nbsp;
                      {cart.price * cart.quantity}&nbsp;₹
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      onClick={() => {
                        addOne(cart);
                      }}
                      variant="outlined"
                    >
                      <Add />
                    </Button>
                    <Button
                      onClick={() => {
                        removeOne(cart);
                      }}
                      variant="outlined"
                    >
                      <Remove />
                    </Button>
                    <Button
                      onClick={() => {
                        remove(cart._id);
                      }}
                      size="small"
                      color="primary"
                      variant="contained"
                    >
                        <DeleteIcon/>
                      <div className={classes.removeButton}>
                          Remove
                      </div>

                      </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        <Grid item>
          <div className={classes.Title}>
            <Typography
              className={classes.fontStyle}
              gutterBottom
              variant="h5"
              component="h5"
            >
              Order Details
            </Typography>
          </div>
        </Grid>

        <Grid item className={classes.billTable}>
          <TableContainer component={Paper} >
            <Table  aria-label="Bill">
              <TableHead>
                <TableRow>
                  <TableCell>Product Name</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Rate</TableCell>
                  <TableCell align="right">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
                    <TableCell align="right">{row.rate}</TableCell>
                    <TableCell align="right">{row.amount}</TableCell>
                    
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell rowSpan={1} />
                  <TableCell colSpan={2} align="right" className={classes.totalText}> Total Amount (₹) </TableCell>
                  <TableCell align="right" className={classes.totalText}>{props.data.amount}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {/* <div className={classes.Text}>
            <Typography
              className={classes.fontStyle}
              gutterBottom
              variant="h4"
              component="h4"
            >
              Total Amount :{props.data.amount}₹
            </Typography>
            </div> */}
            <div className={classes.Text}>
            
              <Button
                className={classes.a}
                href="/#/payment"
                
              >
                Place Order
              </Button>
              <div style={{width : "2rem"}}></div>
              <Button
                className={classes.a}
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            
            </div>
        </Grid>

        
      </Container>
    </>
  );
};

const CartPage = () => {
  const classes = useStyles();
  const cart = useSelector((state) => state.cartReducer);
  const user = useSelector((state) => state.authReducer);
  const history = useHistory();

  if (user.jwtToken !== "") {
    return (
      <div>
        <Container className={classes.container}>
        {cart.amount === 0 
        ?
          <h3
            className={classes.emptyCart}
            >
            Cart is Empty ! 
          </h3>  
        :
          <div>
              <Stores data={cart} />
          </div>
        }
        </Container>
        
        
      </div>
    );
  } else {
    history.push("/signin");
  }
  return 0;
};

export default CartPage;
