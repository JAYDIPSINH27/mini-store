// @desc      Leftbar Component
// @route     localhost:3000/products
// @access    Private/Public

import { Container, makeStyles, Typography } from '@material-ui/core';
import { ViewList, ExitToApp, Home, Storefront,} from '@material-ui/icons';
import React from 'react'
import { useHistory } from "react-router-dom";
import Cookies from 'universal-cookie';
import { getUser,logOut } from '../redux/helpers/authHelpers';

const useStyles = makeStyles((theme) => ({
    container: {
        color: "white",
        height: "100vh",
        paddingTop: theme.spacing(10),
        position: "sticky",
        top: 0,
        backgroundColor: theme.palette.primary.main,
        [theme.breakpoints.up("sm")]: {
            backgroundColor: "white",
            color: "#555",
            border: "1px solid #ece7e7"
        },
        
    },
    item: {
        display: "flex",
        alignItems: "center",
        marginBottom: theme.spacing(4),
        [theme.breakpoints.up("sm")]: {
            marginBottom: theme.spacing(3),
            cursor: "pointer",
        }
    },
    icon: {
        marginRight: theme.spacing(1),
        alignItems:"center",
        [theme.breakpoints.up("sm")]: {
            fontSize: "18px",
        } 
    },
    text: {
        fontWeight: "500",
        alignItems:"center",
        [theme.breakpoints.down("sm")]: {
            display: "none",
        }
    },
    a:{
        textDecoration:"none",

        color: "#555",
        '&:hover': {
            textDecoration:"none",
            color: "#555",
            opacity:"0.9"
        },
        [theme.breakpoints.down("sm")]: {
            color: theme.palette.common.white,
            '&:hover': {
                textDecoration:"none",
                color: theme.palette.common.white,
                opacity:"0.9"
            },
        }
    },
   
}))

function Leftbar() {
    const classes = useStyles({  })
    const cookies = new Cookies();
    const history = useHistory();

    const clearCookie = () => {
        logOut()
        cookies.remove('jwt');
        history.push('/')
    }

    return (
        <Container className={classes.container}>
            <div className={classes.item}> 
                <a href="/" className={classes.a}>   
                <Home className={classes.icon}/>
                <span className={classes.text}>Home Page</span>
                </a>
            </div>
        
            <div className={classes.item}> 
            <a href="/products" className={classes.a}>
                <ViewList className={classes.icon}/>
                {/* <Typography className={classes.text}>
                Product List 
                </Typography> */}
                <span className={classes.text}>Products</span>
            </a>  
            </div>
            
            <div className={classes.item}> 
                <a href="/stores" className={classes.a}>
                <Storefront className={classes.icon}/>
                {/* <Typography className={classes.text}>
                Shop List
                </Typography> */}
                <span className={classes.text}>Stores</span>
                </a>
            </div>
            
            <div className={classes.item}>
                <a onClick={clearCookie} className={classes.a}> 
                <ExitToApp className={classes.icon}/>
                {/* <Typography className={classes.text}>
                Logout
                </Typography> */}
                <span className={classes.text}>Logout</span>
                </a>
            </div>

        </Container>
    )
}

export default Leftbar

