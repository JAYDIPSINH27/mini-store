// @desc      HomePage Component
// @route     localhost:3000/
// @access    Private/Public

import React, {useEffect} from 'react'
import Navbar from '../Navbar'
import Slider from './Slider'
import Categories from './Categories'
import Newsletter from './Newsletter'
import Footer from '../Footer'
import Carousel from './Carousel'
// import Announcement from './Announcement'
import { Grid, makeStyles } from '@material-ui/core'
import HomeProducts from './HomeProducts'
import {useSelector} from "react-redux";
import { getAuthDetails } from '../../redux/helpers/authHelpers'


const UseStyles = makeStyles((theme) => ({
    right: {
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
    carousel:{
        padding:"5rem 1rem",
        height:"30%",
        width:"100%",
    },
 
}))

const HomePage = () => {
    const user = useSelector((state) => state.authReducer)
    useEffect(() => {
		console.log(getAuthDetails())
    }, [])

    const classes = UseStyles({  })
    return (
        <div>
        
       <Navbar />
       <div className={classes.carousel}>
               <Carousel />
        </div>
        <Slider />
        <Categories />
        <HomeProducts />
        <Newsletter />
        <Footer />
       </div>
    )
}

export default HomePage
