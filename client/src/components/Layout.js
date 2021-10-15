// @desc      Layout for Components
// @route     used in all routes
// @access    Private
import { Grid, makeStyles } from '@material-ui/core'
import React from 'react'
import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import DashboardLeftbar from './Dashboard/DashboardLeftbar'
import Leftbar from './Leftbar'
import Navbar from './Navbar'
import Footer from './Footer'

import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const UseStyles = makeStyles((theme) => ({
    
}))

const Layout = ({children}) => {
    const classes = UseStyles({  })
    // const [Admin, setAdmin] = useState(true);
    const user = useSelector((state) => state.authReducer);
    const history = useHistory();
    return (
        <BrowserRouter>
            <Navbar />
            <Grid container>
                <Grid item sm={2} xs={2}>
                    {user.admin ? <DashboardLeftbar /> : <Leftbar />}
                </Grid> 
                <Grid item sm={10} xs={10}>
                    {children}
                </Grid>
            </Grid>
            <Footer />
        </BrowserRouter>
            
        
    )
}

export default Layout
