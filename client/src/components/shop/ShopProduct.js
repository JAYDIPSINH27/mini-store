import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import ReactStars from "react-rating-stars-component";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {
  getCart,
  addToCart,
  removeFromCart,
} from "../../redux/helpers/cartHelpers";
import { find } from "lodash";

const useStyles = makeStyles(() => ({
  products: {
    marginTop: "50px",
  },
  card: {
    boxShadow: "5px 10px 15px grey",
  },
  imageDiv: {
    display: "flex",
    height: "180px",
    backgroundColor: "yellow",
  },
  productImage: {
    height: "200px",
    width: "300px",
  },
  cartButton: {
    display: "flex",
    justifyContent: "center",
  },
  addToCartButton: {
    marginRight : "8px",
    marginBottom : "8px",
    "&:hover": {
      color: "white",
    },
  },
}));

const ShopProduct = (props) => {
  const classes = useStyles();
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const checkCart = (product, quantity) => {
    if (
      document.getElementById(product.productId._id).innerText === "REMOVE FROM CART"
    ) {
      removeFromCart(product);
      document.getElementById(product.productId._id).innerText = "ADD TO CART";
    } else {
      const cart = getCart();
      if (find(cart.cart, { productId: product.productId }) === undefined) {
        addToCart(product, quantity);
      } else {
        document.getElementById(product.productId._id).innerText =
          "REMOVE FROM CART";
      }
      document.getElementById(product.productId._id).innerText = "REMOVE FROM CART";
    }
  };

  return (
    <>
      <Container className={classes.products}>
        <Grid container spacing={5}>
          {props.products.map((product) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={product.productId._id}>
                <Card className={classes.card}>
                  <CardActionArea>
                    <Slider {...settings} className={classes.slider}>
                      {product.productId.images.map((image) => {
                        return (
                          <img
                            src={image.url}
                            className={classes.productImage}
                            alt="No image found"
                          />
                        );
                      })}
                    </Slider>
                  </CardActionArea>
                  <CardContent>
                    <Grid container className={classes.ratingDiv}>
                      <Grid item xs={8} sm={8} md={8} lg={8}>
                        <Typography
                          variant="body1"
                        >
                          {product.productId.name}
                        </Typography>
                      </Grid>
                      <Grid item xs={4} sm={4} md={4} lg={4}>
                        <Typography
                          variant="body2"
                        >
                          {product.productId.category.name}
                        </Typography>
                      </Grid>
                    </Grid>
                    <ReactStars
                      size="30"
                      value={product.rating}
                      edit={false}
                      isHalf={true}
                    />
                    {/* <Typography
                      variant="body2"
                      color="textSecondary"
                    >
                      {product.productId.description}
                    </Typography> */}
                    <Typography variant="h5">₹ {product.price}</Typography>
                  </CardContent>
                  <CardActions className={classes.cartButton}>
                    <p style={{display : "none"}}>
                    {  
                      setTimeout(() => {
                       find(getCart().cart, { productId: product.productId }) ===
                    undefined
                      ? (document.getElementById(
                          product.productId._id
                        ).innerText = "ADD TO CART")
                      : (document.getElementById(
                          product.productId._id
                        ).innerText = "REMOVE FROM CART")
                    },0)
                    }
                    </p>
                    <Button
                      size="small"
                      fullWidth
                      color="primary"
                      variant="contained"
                      className={classes.addToCartButton}
                      id={`${product.productId._id}`}
                      onClick={() => {
                        checkCart(product, 1);
                      }}
                    >
                      {/* <AddIcon /> */}
                      Add To Cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
};

export default ShopProduct;