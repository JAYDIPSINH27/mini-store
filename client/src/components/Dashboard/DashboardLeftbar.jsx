import React from 'react'
import { Container, makeStyles, Typography } from '@material-ui/core';
import { ViewList, ExitToApp, Home, Storefront,} from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { useHistory,Link} from "react-router-dom";
import { getUser,logOut } from '../../redux/helpers/authHelpers';

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
        [theme.breakpoints.up("sm")]: {
            fontSize: "18px",
        } 
    },
    text: {
        fontWeight: "500",
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

function DashBoardLeftbar() {
    const classes = useStyles({  })
    const history = useHistory();
    const user = useSelector((state) => state.authReducer); 

    const clearCookie = () => {
        logOut()
        history.push('/')
    }

    return (
        <>
            <Container className={classes.container}>
                <Link to="/dashboard" className={classes.a}>
                    <div className={classes.item}> 
                        <Home className={classes.icon}/>
                        <Typography className={classes.text}>
                            Home 
                        </Typography>
                    </div>
                </Link>
            
                <Link to="/dashboard/product/view" className={classes.a}>
                    <div className={classes.item}> 
                        <ViewList className={classes.icon}/>
                        <Typography className={classes.text}>
                            Product List
                        </Typography>
                    </div>
                </Link>

                <Link to="/dashboard/store/view" className={classes.a}>
                    <div className={classes.item}> 
                        <Storefront className={classes.icon}/>
                        <Typography className={classes.text}>
                            Store Details
                        </Typography>
                    </div>
                </Link>
                
                {
                user.jwtToken !== "" ? <div className={classes.item}>
                <a onClick={clearCookie} className={classes.a}> 
                <ExitToApp className={classes.icon}/>
                <span className={classes.text}>Logout</span>
                </a>
             </div> : null
            }
            
            </Container>
         </>

    )
}

export default DashBoardLeftbar

