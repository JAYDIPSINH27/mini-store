// @desc      Header Component
// @route     localhost:3000/home
// @access    Private/Public

import React from "react";
import { useHistory } from "react-router-dom";
import Cookies from 'universal-cookie';


import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useMediaQuery,
  Button,
  useScrollTrigger,
  Slide,
  Menu,
  MenuItem,
  ListItemIcon
} from "@material-ui/core";


import { makeStyles, useTheme } from "@material-ui/core/styles";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

import MenuIcon from '@material-ui/icons/Menu';


// const useStyles = makeStyles((theme) => ({
//    root: {
//      flexGrow: 1,
//    },
//    menuButton: {
//      marginRight: theme.spacing(2),
//    },
//    title: {
//      flexGrow: 1,
//    },
//  }));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));






const Header=()=>{

    
    const classes = useStyles();

    const cookies = new Cookies();
    const history = useHistory();
    const clearCookie = () => {
      cookies.remove('jwt');
      history.push('/signin')
  }

    if (cookies.get('jwt') !== undefined) {
    return(
        <div className={classes.root}>
                <AppBar >
                    <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Mini-Mall
                    </Typography>
                    <Button color="inherit" onClick={clearCookie}>Logout</Button>
                    </Toolbar>
                </AppBar>
        </div>
    );
  } else {
    history.push('/signin')
}
return 0;
 };


 export default Header;