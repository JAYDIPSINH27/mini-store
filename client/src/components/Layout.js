import { Grid, makeStyles } from '@material-ui/core'
import React from 'react'
import Leftbar from './Leftbar'
import Navbar from './Navbar'

const UseStyles = makeStyles((theme) => ({
    
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
            </Grid>
        </div>
    )
}

export default Layout
