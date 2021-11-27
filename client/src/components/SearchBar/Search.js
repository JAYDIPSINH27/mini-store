// @desc      CartPage Component
// @route     localhost:3000/cart
// @access    Private
import React,{useState,useEffect} from "react";
import { makeStyles, alpha } from "@material-ui/core";
import { Container } from "@material-ui/core";
import { Grid } from "@material-ui/core";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Product from '../Products/Product'
import axios from 'axios'
import logo from "../../assets/shopping.gif";
import NoSearch from "../../assets/Nosearch.jpg";


const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(2),
    },
    loadingDiv: {
      width: "100%",
      display: "flex",
    },
    loadingImage: {
      margin: "auto",
    }
}));

const Stores = (props) => {
    const classes = useStyles({  })
    return (
        <Container className={classes.container}>
            <Grid container spacing={4}>
              {props.loading?
                (props.data.map((productValue) =>(
                    <Grid item sm={12} md={6} lg={4} key={productValue.id}> 
                        <Product product={productValue}/>
                    </Grid>
                )))
                :
                (<div className={classes.loadingDiv}> <img src={logo} className={classes.loadingImage} alt="loading..." width="300px" /></div>)
                }
            </Grid>

            
        </Container>
    )
};

const Search = (props) => {
  const classes = useStyles();

const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    //get the products details
    useEffect(() => {
        const getProducts = async ()=>{
          await axios({
            method: "GET",
            url: "https://ministore-backend.herokuapp.com/api/v1/products",
          })
          .then((res) => {
            setProducts(res.data.data.filter(p=>p.name.toLowerCase()==props.match.params.name.toLowerCase()))
            // console.log(res.data.data.filter(p=>p.name.toLowerCase()==props.match.params.name.toLowerCase()))
            setLoading(true);
          })
          .catch((err) => {
            console.log(err)
          })
          
        }
        getProducts()
        
      }, [products ])



  const user = useSelector((state) => state.authReducer);
  const history = useHistory();
  if (user.jwtToken !== "") {
    return (
      <>
        <Container className={classes.container}>
          <div>
              <Stores data={products} loading={loading}/>
          </div>
        </Container>
      </>
    );
  } else {
    history.push("/signin");
  }
  return 0;
};

export default Search;
