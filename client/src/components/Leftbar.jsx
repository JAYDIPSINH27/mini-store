// @desc      Leftbar Component
// @route     localhost:3000/products
// @access    Private

import { Container, makeStyles, Typography } from '@material-ui/core';
import { ViewList, ExitToApp, Home, Storefront,} from '@material-ui/icons';
import React from 'react'
import { useSelector } from 'react-redux';
import { useHistory,Link} from "react-router-dom";
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
    const history = useHistory();
    const user = useSelector((state) => state.authReducer); 

    const clearCookie = () => {
        logOut()
        history.push('/')
    }

    return (
        <Container className={classes.container}>
            <div className={classes.item}> 
                <Link to="/" className={classes.a}>   
                <Home className={classes.icon}/>
                <span className={classes.text}>Home Page</span>
                </Link>
            </div>
        
            <div className={classes.item}> 
            <Link to="/products" className={classes.a}>
                <ViewList className={classes.icon}/>
                <span className={classes.text}>Products</span>
            </Link>  
            </div>
            
            <div className={classes.item}> 
                <Link to="/stores" className={classes.a}>
                <Storefront className={classes.icon}/>
                <span className={classes.text}>Stores</span>
                </Link>
            </div>
            {
                user.jwtToken !== "" ? <div className={classes.item}>
                <Link onClick={clearCookie} className={classes.a}> 
                <ExitToApp className={classes.icon}/>
                <span className={classes.text}>Logout</span>
                </Link>
            </div> : null
            }

        </Container>
    )
}

export default Leftbar

