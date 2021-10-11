// @desc      Feed Component
// @route     localhost:3000/products
// @access    Private/Public

import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Product from './Product';
import logo from "../../assets/shopping.gif";

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(2),
    }
}))

function Feed() {
    const classes = useStyles({  })
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    //get the products details
    useEffect(() => {
        const getProducts = async ()=>{
          await axios({
            method: "GET",
            url: "http://localhost:4000/api/v1/products",
          })
          .then((res) => {
            setProducts(res.data.data)
            setLoading(true);
          })
          .catch((err) => {
            console.log(err)
          })
          
        }
        getProducts()
        
      }, [products ])

      
    

    return (
        <Container className={classes.container}>
          
            <Grid container spacing={4}>
              {loading?
                (products.map((productValue) => (
                    <Grid item sm={12} md={6} lg={4} key={productValue.id}> 
                        <Product product={productValue}/>
                    </Grid>
                )))
                :
                ( <img src={logo} alt="loading..." width="300px" />)
                }
            </Grid>

            
        </Container>
    )
}

export default Feed
