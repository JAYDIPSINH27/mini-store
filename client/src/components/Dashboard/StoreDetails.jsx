import React,{useState,useEffect} from 'react'
import { Button, Container, makeStyles, Typography } from '@material-ui/core'
import axios from 'axios'
import logo from "../../assets/shopping.gif";
import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import ReactStars from "react-rating-stars-component";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),
        padding: theme.spacing(5),
       
    },

    heading: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'nowrap',             
    },
    editButton: {
        
        marginLeft: "auto",
        margin: "10px",
        padding: "5px",
    },
    loadingDiv: {
        width: "100%",
        display: "flex",
      },
      loadingImage: {
        margin: "auto",
      },
      imageDiv: {
        display: "flex",
        height: "100%",
        width:"500px",
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
    
}))

function StoreDetails() {
    const classes = useStyles({  })
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(false);
  
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

    console.log(stores)

    return (
        loading?

        (<>
            <Container class={classes.container}>
                <div class={classes.heading}>
                    <Typography  variant="h4">{stores[0].name}</Typography>
                    
                    <Button 
                        href="/dashboard/store/details/edit"
                        variant="outlined" 
                        color="primary" 
                        size="small" 
                        className={classes.editButton}
                    >
                        Edit Details
                    </Button>
                </div>

                <div className={classes.imageDiv}>
                      <img
                        src={stores[0].images[0].url}
                        className={classes.storeImage}
                      />
                </div>

                <div><Typography  variant="h6">Description </Typography></div>
                <div><Typography  variant="paragraph">{stores[0].description} </Typography></div>
                <div><Typography  variant="h6">Address</Typography></div>
                <div>
                    <Typography  variant="body">{stores[0].addresses[0].location},</Typography>
                    <Typography  variant="body">{stores[0].addresses[0].landmark},</Typography>
                    <Typography  variant="body">{stores[0].addresses[0].city},</Typography>
                    <Typography  variant="body">{stores[0].addresses[0].state}</Typography>
                </div>
            </Container>
        </>)
        :
        (
            <div className={classes.loadingDiv}>
            <img
              src={logo}
              alt="loading..."
              width="300px"
              className={classes.loadingImage}
            />
          </div>
        )
    )
}

export default StoreDetails
