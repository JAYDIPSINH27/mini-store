// @desc      ProductPage Component
// @route     localhost:3000/products
// @access    Private/Public

import { Grid, makeStyles } from '@material-ui/core'
import React from 'react'
import Leftbar from './Leftbar'
import Navbar from './Navbar'
import Feed from './Feed'

const UseStyles = makeStyles((theme) => ({
    
}))

function ProductsPage() {
    const classes = UseStyles({  })

    return (
        <div>
            <Navbar />
            <Grid container>
                <Grid item sm={2} xs={2}>
                    <Leftbar />
                </Grid> 
                <Grid item sm={10} xs={10}>
                    <Feed />
                </Grid>
            </Grid>
            
        </div>
    )
}

export default ProductsPage
