// @desc      StoreList Component
// @route     localhost:3000/stores
// @access    Private
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
import Slider from "react-slick";

const useStyles = makeStyles((theme) => ({
  loadingDiv: {
    width: "100%",
    display: "flex",
  },
  loadingImage: {
    margin: "auto",
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
  const offers = [
    {
      url: "https://images.freekaamaal.com/store_desc_images/1515145891.jpg",
    },
    {
      url: "https://previews.123rf.com/images/elenabsl/elenabsl1603/elenabsl160300017/54060490-grocery-shopping-discount-paper-shopping-bag-filled-with-vegetables-fruits-and-other-products.jpg",
    },
    {
      url: "https://previews.123rf.com/images/elenabsl/elenabsl2001/elenabsl200100005/137269692-grocery-shopping-promotional-sale-banner-fast-shopping-cart-full-of-fresh-colorful-food.jpg",
    },
  ];
  return (
    <>
      <Grid container>
        <Grid item></Grid>
      </Grid>
      <Container>
        <div>
          <Slider {...settings}>
            {offers.map((store) => {
              return (
                <div className={classes.carosoulDiv}>
                  <img src={store.url} className={classes.storeImage} />
                </div>
              );
            })}
          </Slider>
        </div>
        <Grid container spacing={5}>
          {props.data.map((store) => {
            return (
              <Grid item xs={12} sm={6} md={4} key={store._id}>
                <Card className={classes.card}>
                  <CardActionArea>
                    <div className={classes.imageDiv}>
                      <img
                        src={store.images[0].url}
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
                          {store.name}
                        </Typography>
                      </Grid>
                      <Grid item lg={6} md={6}>
                        <ReactStars
                          size="30"
                          value={store.rating}
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
                      {store.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      href={`/store/${store._id}`}
                      size="small"
                      color="primary"
                    >
                      Show More
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

const StoreList = () => {
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
    };
    getStores();
  }, []);

  return (
    <>
      <Container className={classes.container}>
        <div>
          {loading ? (
            <Stores data={stores} />
          ) : (
            //<div className={classes.loadingDiv}>
            //<img src={logo} alt="loading..." width="300px" className={classes.loadingImage}/>
            //</div>
            <div className={classes.loadingDiv}>
              <img
                src={logo}
                alt="loading..."
                width="300px"
                className={classes.loadingImage}
              />
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default StoreList;
