import { Container, makeStyles, Typography,Box,Grid,Divider } from '@material-ui/core';
import React from 'react'
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
// import { useHistory } from "react-router";
import logo from "../../assets/shopping.gif";
import unAuth from "../../assets/401.png";
import DateTime from './DateTime'
// import store from '../../redux/store';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(2),
    },
    box1:{
      boxShadow : "1px 3px 3px grey",
      borderRadius : "20px",
      height: "120px",
      width: "400px",
      
    },
    box2:{
        boxShadow : "1px 3px 3px grey",
        borderRadius : "20px",
        height: "120px",
    },
    box3:{
      boxShadow : "1px 3px 3px grey",
      borderRadius : "20px",
      padding: "10px",
    },
    chart:{
      display: "flex",
      margin: "10px",
    },
    text: {
      display: "flex",
      alignItems:"centre",
      textAlign: 'center',
    },
    charttext: {
      display: "flex",
      alignItems:"centre",
      textAlign: 'center',
      marginLeft: "180px",
    },
    chartContainer: {
      marginTop: "30px",
    }
}))


function DashboardHome() {
  const classes = useStyles({  })

  const [stores, setStores] = useState([]);
  // const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.authReducer);
  // const history = useHistory();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    axios
      .get("https://ministore-backend.herokuapp.com/api/v1/stores?limit=10000")
      .then((res) => {
        console.log("default :", res.data.data);
        setStores(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

      axios
      .get("https://ministore-backend.herokuapp.com/api/v1/auth/user", {
        headers: {
          Authorization: `Bearer ${user.jwtToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUserData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
	})

  useEffect( () => {
    axios
    .get("http://localhost:4000/api/v1/auth/user", {
      headers: {
        Authorization: `Bearer ${user.jwtToken}`,
      },
    })
    .then((res) => {
      console.log(res.data);
      setUserData(res.data.data);
      
    })
    .catch((err) => {
      console.log(err);
    });
    
      
  }, []);

  setTimeout(() => {
    setLoading(true);
  }, 1500);
  
  const productnum=()=>{
    var count=0;
    userData.stores.map((store)=>{
      count+=store.products.length
    }) 
    return count;
  }

  const stocks1 = [
    {
      name: 'Wireless Earbuds',
      quantity: 50,
    },
    {
      name: 'mouse',
      quantity: 40,
    },
    {
      name: 'Sony Speaker',
      quantity: 100,
    },
    {
      name: 'surface laptop',
      quantity: 46,
    }
  ]

  const stocks2 = [
    {
      name: 'T-shirt',
      quantity: 20,
    },
    {
      name: "Sandle",
      quantity: 45,
    },
    {
      name: "Topwear",
      quantity: 44,
    },
    {
      name: "Handbag",
      quantity: 44,
    },
    {
      name: "Machine",
      quantity: 37,
    }
  ]

    return (
        <Container className={classes.container}>
        {
          user.user && user.user.admin === true ? loading ? (
            <>
            <Typography variant="h4">Dashboard</Typography>

            <Divider />
            
            <Grid container spacing={5}>
            
            <Grid item xs={12} sm={6} md={4}>

            <Box
                className={classes.box1}
                display="flex"
                justifyContent="center"
                alignItems="center"
            >  
                <DateTime />
            </Box>
            
            </Grid>

            <Grid item xs={12} sm={6} md={4}>

            <Box
                className={classes.box2}
                display="flex"
                justifyContent="center"
                alignItems="center"
            >  
                <Typography variant="h6" className={classes.text}>Total Products:{productnum()}</Typography>
            </Box>
            
            </Grid>

            <Grid item xs={12} sm={6} md={4}>

            <Box
                className={classes.box2}
                display="flex"
                justifyContent="center"
                alignItems="center"
            >  
                <Typography variant="h6" className={classes.text}>Total Stores:{userData.stores.length}</Typography>
            </Box>
            
            </Grid>
            
            </Grid>

            <Grid container spacing={5} className={classes.chartContainer}>

              <Grid item xs={12} sm={6} lg={6}> 
                {
                  <BarChart
                    width={600}
                    height={300}
                    data={stocks1}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis/>
                    <Tooltip />
                    <Legend />
                    
                    <Bar dataKey="quantity" fill="#82ca9d" />
                  </BarChart>
                }
                <Typography variant="h6" className={classes.charttext}>
                    M-Mart Store's Stock
                </Typography>
           
              </Grid>

              <Grid item xs={12} sm={6} lg={6}> 
                {
                  <BarChart
                    width={600}
                    height={300}
                    data={stocks2}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis/>
                    <Tooltip />
                    <Legend />
                    
                    <Bar dataKey="quantity" fill="#8884d8" />
                  </BarChart>
                }
                <Typography variant="h6" className={classes.charttext}>
                  V-Mart Store's Stock
                </Typography>
           
              </Grid>
            </Grid>
            </>

          ) : (
            <div className={classes.loadingDiv}>
              <img
                src={logo}
                alt="loading..."
                width="300px"
                className={classes.loadingImage}
              />
            </div>
          ) : <div className={classes.loadingDiv}>
              <img
                src={unAuth}
                alt="loading..."
                width="300px"
                className={classes.loadingImage}
              />
            </div>
          }
        </Container>
    )
}

export default DashboardHome
