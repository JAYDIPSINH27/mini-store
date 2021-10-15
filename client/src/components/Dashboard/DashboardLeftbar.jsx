import React from 'react'
import { Container, makeStyles, Typography } from '@material-ui/core';
import { ViewList, ExitToApp, Home, Storefront,} from '@material-ui/icons';
import { Link, BrowserRouter } from 'react-router-dom';

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
    }
}))

function DashBoardLeftbar() {
    const classes = useStyles({  })
    return (
        <>
            <Container className={classes.container}>
                <Link to="/dashboard">
                    <div className={classes.item}> 
                        <Home className={classes.icon}/>
                        <Typography className={classes.text}>
                            Home 
                        </Typography>
                    </div>
                </Link>
            
                <Link to="/dashboard/product/view">
                    <div className={classes.item}> 
                        <ViewList className={classes.icon}/>
                        <Typography className={classes.text}>
                            Product List
                        </Typography>
                    </div>
                </Link>

                <Link to="/dashboard/store/details">
                    <div className={classes.item}> 
                        <Storefront className={classes.icon}/>
                        <Typography className={classes.text}>
                            Store Details
                        </Typography>
                    </div>
                </Link>
                
                <div className={classes.item}> 
                    <ExitToApp className={classes.icon}/>
                    <Typography className={classes.text}>
                        Logout
                    </Typography>
                </div>
            
            </Container>
         </>

    )
}

export default DashBoardLeftbar

