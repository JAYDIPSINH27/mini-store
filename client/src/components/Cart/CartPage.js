import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../../assets/shopping.gif";
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
import {getCart, addToCart,removeFromCart,updateCart} from "../../redux/helpers/cartHelpers";
import Slider from "react-slick";
import { useSelector } from 'react-redux';
import { remove } from "lodash";
import { Add,Remove } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  loadingDiv :{
    // border : "2px solid black",
    width : "100%"
  },
  loadingImage: {
    margin: "auto",
  },
  imageDiv: {
    display: "flex",
    minWidth:"150px",
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
    fontFamily: "Noto Serif",
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
   Title:{
    alignItems:"center",
    justifyContent:"center",
    textAlign:"center",
    margin: "20px",
    display: "flex",
   }, 
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
  console.log(props.data);

  const remove=(productId)=>{
    removeFromCart(productId)
    console.log(productId)
  }
  const addOne=(cart)=>{
    updateCart(cart._id,cart.quantity+1)
  }
  const removeOne=(cart)=>{
    if(cart.quantity===0){
      removeFromCart(cart._id)
    }else{

      updateCart(cart._id,cart.quantity-1)
    }
  }

  return (
    <>
      <Grid container>
        <Grid item></Grid>
      </Grid>
      <Container>
      <Grid container  >
          <div className={classes.Title}>
          <Typography
                className={classes.fontStyle}
                gutterBottom
                variant="h4"
                component="h4"
            >
            Your Cart
            </Typography>
            <a href="/payment">Purchase</a>
          </div>
         </Grid> 
        
        <Grid container spacing={5}>
          {props.data.cart.map((cart) => {
            return (
                // <h1>{cart.id}</h1>
                                
              <Grid item xs={12} sm={6} md={4} key={cart._id}>
                <Card className={classes.card}>
                  <CardActionArea>
                    <div className={classes.imageDiv}>
                      <img
                        src={cart.productId.images[0].url}
                        className={classes.storeImage}
                      />
                    </div>
                  </CardActionArea>
                  <CardContent>
                    <Grid container className={classes.ratingDiv}>
                      <Grid item lg={6} md={6}>
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
                        Quantity:
                      {cart.quantity}
                    </Typography>
                  </CardContent>
                  <CardActions>
                      <Button onClick={()=>{addOne(cart)}}><Add/></Button>
                      <Button onClick={()=>{removeOne(cart)}}><Remove/></Button>
                    <Button
                      onClick={()=>{remove(cart._id)}}
                      size="small"
                      color="primary"
                    >
                      Remove from Cart
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

const CartPage = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const getStores = async () => {
      await axios
      .get("http://localhost:4000/api/v1/stores")
      .then((stores) => {
        setStores(stores.data.data);
        setLoading(true);
        console.log(stores);
      })
      .catch((err) => {
        console.log(err);
      });
    }
    getStores();
  }, []);

  // useEffect(() => {
  //   const getCartItem = async () => {
  //   //   await axios
  //   //   .get("http://localhost:4000/api/v1/stores")
  //   //   .then((stores) => {
  //   //     setStores(stores.data.data);
  //   //     setLoading(true);
  //   //     console.log(stores);
  //   //   })
  //   //   .catch((err) => {
  //   //     console.log(err);
  //   //   });
  //   setCart(getCart())
  //   }
  //   getCartItem();
  // }, [cart]);

  const cart = useSelector((state) =>state.cartReducer)

  return (
    <>
      <Container className={classes.container}>
        <div>
          {loading ? (
            <Stores data={cart} />
            //<div className={classes.loadingDiv}>
              //<img src={logo} alt="loading..." width="300px" className={classes.loadingImage}/>
            //</div>
          ) : (
            <img src={logo} alt="loading..." width="300px" />
          )}
        </div>
      </Container>
    </>
  );
};

export default CartPage;