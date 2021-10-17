// @desc      CartPage Component
// @route     localhost:3000/cart
// @access    Private
import React,{useState,useEffect} from "react";
import axios from 'axios'
import { makeStyles} from "@material-ui/core";
import { Container } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import { removeFromCart, updateCart } from "../../redux/helpers/cartHelpers";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Product from './Product';


const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "2%",
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
    justifyContent:"center",
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
    marginBottom: "1rem",
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
  card: {
    margin: theme.spacing(2),
},
carddiv:{
  display: "flex",
    flexWrap: "wrap",
    justifyContent:"center",
}
}));

const Orders = (props) => {
  const classes = useStyles();

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
  
  return (
    <>
      <Container className={classes.root}>
        <Grid item xs={12} sm={6} md={4}>
          <div className={classes.Title}>
            <Typography
              className={classes.fontStyle}
              gutterBottom
              variant="h4"
              component="h4"
            >
              My Orders
            </Typography>
          </div>
        </Grid>

        <Grid item xs={9}>
          {props.data.slice(0).reverse().map((order)=>{
            return(
              <Grid item xs={12}  key={order._id}>
                <Card className={classes.card}>
                <CardContent>
                        <Typography variant="h6">Order Details</Typography>
                        <Typography variant="body2">Date: {order.date.substring(0,10)}</Typography>
                        <Typography variant="body2">Total Amount: {order.amount} ₹</Typography>
                        <Typography variant="body2">Payment Method: {order.paymentGateway} </Typography>
                        <Typography variant="body2">Status: {order.status} </Typography>
                  </CardContent> 
                  <CardContent>
                  <Typography variant="body1">Products:</Typography>
                  </CardContent> 
                  
                  <Product data={order.products} className={classes.carddiv}/>
                </Card>
              </Grid>
            )
          })}
          </Grid>

      </Container>
    </>
  );
};

const OrderPage = () => {
  const classes = useStyles();
  const cart = useSelector((state) => state.cartReducer);
  const user = useSelector((state) => state.authReducer);
  const history = useHistory();

  const [userData, setUserData] = useState(user.user);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/auth/user", {
        headers: {
          Authorization: `Bearer ${user.jwtToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUserData(res.data.data);
        setLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(userData)
  if (user.jwtToken !== "") {
    return (
      <>
        <Container className={classes.container}>
          <div>
              <Orders data={userData.orders} />
          </div>
        </Container>
      </>
    );
  } else {
    history.push("/signin");
  }
  return 0;
};

export default OrderPage;
