import { Container, makeStyles, Typography,Box,Grid,Divider } from '@material-ui/core';
import React from 'react'
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import logo from "../../assets/shopping.gif";
import unAuth from "../../assets/401.png";
import { Chart } from 'react-charts'
import DateTime from './DateTime'
import store from '../../redux/store';

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
      
  },
}))


function DashboardHome() {
    const classes = useStyles({  })

    const [stores, setStores] = useState([]);
    const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.authReducer);
  const history = useHistory();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/stores?limit=10000")
      .then((res) => {
        console.log("default :", res.data.data);
        setStores(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

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

 
  const data = React.useMemo(
    () => [
      {
        label: 'Series 1',
        data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
      },
      {
        label: 'Series 2',
        data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
      }
    ]
  )
 
  const axes = React.useMemo(
    () => [
      { primary: true, type: 'linear', position: 'bottom' },
      { type: 'linear', position: 'left' }
    ],
    []
  )
  console.log(userData)

  const productnum=()=>{
    var count=0;
    userData.stores.map((store)=>{
      count+=store.products.length
    })
    
    return count;

  }

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

            

            <Grid container spacing={5}>

            <Grid item xs={12} sm={6} md={4}> 
            <Box
                className={classes.box3}
                display="flex"
                justifyContent="center"
                alignItems="center"
                height={400} width={500}
            >
                
                <Chart data={data} axes={axes} tooltip  />

            </Box>
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
