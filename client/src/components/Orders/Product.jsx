import React from "react";
import { makeStyles } from "@material-ui/core";
import { Container } from "@material-ui/core";
import { Grid, CardMedia } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import { removeFromCart, updateCart } from "../../redux/helpers/cartHelpers";
import { useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { motion } from "framer-motion";

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: "20px",
    boxShadow: "2px 3px 5px grey",
  },
  imageDiv: {
    display: "flex",
    height: "180px",
    backgroundColor: "yellow",
  },
  storeImage: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    height: "100%",
  },
  media: {
    height: 150,
    [theme.breakpoints.down("sm")]: {
      height: 150,
    },
  },
  action: {
    display: "flex",
    justifyContent: "space-between",
  },
  price: {
    marginLeft: theme.spacing(1),
  },
  button: {
    marginRight: theme.spacing(1),
  },
  link: {
    textDecoration: "none",
    "&hover": {
      textDecoration: "none",
      color: theme.palette.common.white,
      opacity: "0.9",
    },
  },
}));

const Product = (props) => {
  const classes = useStyles();

  return (
    <>
      <Container>
        <Grid
          container
          spacing={5}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          {props.data.map((product) => {
            return (
              <Grid item xs={12} sm={6} md={4}>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Card className={classes.card}>
                    <CardActionArea>
                      {/* <CardMedia 
                            className={classes.media} 
                            image={product.productId.images[0].url}
                            title={product.productId.name}    
                            /> */}
                      <div className={classes.imageDiv}>
                        <img
                          src={product.productId.images[0].url}
                          className={classes.storeImage}
                        />
                      </div>
                    </CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5">
                        {product.productId.name}
                      </Typography>
                      <Typography variant="body2">
                        Quantity: {product.quantity}{" "}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
};

export default Product;
