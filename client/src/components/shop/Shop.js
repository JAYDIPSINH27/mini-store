import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Container, makeStyles, Grid, Typography } from "@material-ui/core";
import ReactStars from "react-rating-stars-component";
import axios from "axios";
import logo from "../../assets/shopping.gif";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Divider from "@material-ui/core/Divider";
import ShopProduct from "./ShopProduct";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(2),
  },
  carosoulDiv: {
    width: "100%",
    height: "400px",
    marginBottom: "20px",
  },
  storeImage: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    height: "100%",
    borderRadius: "20px",
    // boxShadow: "5px 10px 15px grey",
  },
  storeDetails: {
    marginTop: "10px",
  },
  location: {
    display: "flex",
    fontFamily: "Nunito Sans",
  },
  fontStyle: {
    fontFamily: "Noto Serif",
  },
  descriptionFont: {
    fontFamily: "Nunito Sans",
    color: "grey",
  },
  detailsGrid: {
    marginBottom: "20px",
  },
}));

const Shop = () => {
  const { id } = useParams();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [store, setStore] = useState({
    images: [{}],
    description: "",
    addresses: [{}],
    name: "",
    products: [{}],
    rating: 0,
    _id: "",
  });

  const settings = {
    fade: true,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/stores/${id}`)
      .then((store) => {
        setStore({
          images: store.data.data.images,
          description: store.data.data.description,
          name: store.data.data.name,
          products: store.data.data.products,
          addresses: store.data.data.addresses,
          rating: store.data.data.rating,
          _id: store.data.data._id,
        });
        setLoading(true);
        console.log(store.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Container className={classes.container}>
        {loading ? (
          <div>
            <Grid container className={classes.detailsGrid}>
              <Grid
                item
                className={classes.imageDiv}
                xs={12}
                sm={12}
                md={6}
                lg={5}
              >
                <Container>
                  {/* <img
                    src={store.images[0].url}
                    alt="Image not found"
                    className={classes.storeImage}
                  /> */}
                    <Slider {...settings}>
                      {store.images.map((image) => {
                        return (
                          <img src={image.url} className={classes.storeImage} />
                        );
                      })}
                    </Slider>
                </Container>
              </Grid>
              <Grid
                item
                className={classes.storeDetails}
                xs={12}
                sm={12}
                md={6}
                lg={6}
              >
                <Container>
                  <Grid container>
                    <Grid item xs={12} sm={6} lg={8}>
                      <Typography variant="h4" className={classes.fontStyle}>
                        {store.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                      <ReactStars
                        size={25}
                        value={store.rating}
                        edit={false}
                        isHalf={true}
                      />
                    </Grid>
                  </Grid>
                  <Typography
                    align="justify"
                    className={classes.descriptionFont}
                    paragraph
                  >
                    {store.description}
                  </Typography>
                  <div className={classes.location}>
                    <LocationOnIcon className={classes.locationLogo} />
                    <Typography align="justify" paragraph>
                      {store.addresses[0].location},{" "}
                      {store.addresses[0].landmark}, {store.addresses[0].city},{" "}
                      {store.addresses[0].state}, {store.addresses[0].pincode}
                    </Typography>
                  </div>
                </Container>
              </Grid>
            </Grid>
            <Divider />
            <ShopProduct products={store.products} />
          </div>
        ) : (
          <img src={logo} alt="loading..." width="300px" />
        )}
      </Container>
    </>
  );
};

export default Shop;
