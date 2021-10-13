// @desc      CartPage Component
// @route     localhost:3000/cart
// @access    Private
import React from "react";
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
import { removeFromCart, updateCart } from "../../redux/helpers/cartHelpers";
import { useSelector } from "react-redux";
import { Add, Remove } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete"

const useStyles = makeStyles((theme) => ({
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
    marginTop: "4rem",
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
    backgroundColor:"#EB9800",
    textAlign: "center",
    border: "2 ",
    fontSize: "20px",
    // color: "#555",
    color: "white",
    "&:hover": {
      textDecoration: "none",
      color: "black",
      backgroundColor:"lightgreen",
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

  const remove = (productId) => {
    removeFromCart(productId);
    console.log(productId);
  };
  const addOne = (cart) => {
    updateCart(cart._id, cart.quantity + 1);
  };
  const removeOne = (cart) => {
    if (cart.quantity === 0) {
      removeFromCart(cart._id);
    } else {
      updateCart(cart._id, cart.quantity - 1);
    }
  };

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
              Your Cart
            </Typography>
          </div>
        </Grid>

        <Grid item>
          <div className={classes.Text}>
            <Typography
              className={classes.fontStyle}
              gutterBottom
              variant="h4"
              component="h4"
            >
              Total Amount :{props.data.amount}₹
            </Typography>
            </div>
            <div className={classes.Text}>
            
              <Button
                className={classes.a}
                href="/payment"
                
              >
                PlaceOrder
              </Button>
            
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

                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Price:
                      {cart.price}₹
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
                      Remove
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
  const classes = useStyles();
  const cart = useSelector((state) => state.cartReducer);
  const user = useSelector((state) => state.authReducer);
  const history = useHistory();

  if (user.jwtToken !== "") {
    return (
      <>
        <Container className={classes.container}>
          <div>
              <Stores data={cart} />
          </div>
        </Container>
      </>
    );
  } else {
    history.push("/signin");
  }
  return 0;
};

export default CartPage;
