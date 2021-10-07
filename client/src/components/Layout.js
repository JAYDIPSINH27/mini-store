import { Grid, makeStyles } from '@material-ui/core'
import React from 'react'
import Leftbar from './Leftbar'
import Rightbar from './Rightbar'
import Navbar from './Navbar'
import Feed from './Feed'
import Add from './Add'
import axios from 'axios'

const UseStyles = makeStyles((theme) => ({
    right: {
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
}))

const Layout = ({children}) => {
    const classes = UseStyles({  })

    return (
        <div>
            <Navbar />
            <Grid container>
                <Grid item sm={2} xs={2}>
                    <Leftbar />
                </Grid> 
                <Grid item sm={10} xs={10}>
                    {children}
                </Grid>
                {/* <Grid item className={classes.right}>
                    <Rightbar />
                </Grid> */}
            </Grid>
            {/* <Add /> */}
        </div>
    )
}

export default Layout
