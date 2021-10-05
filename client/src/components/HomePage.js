import React from 'react'
import Navbar from './Navbar'
import Slider from './Slider'
import Categories from './Categories'
import Carousel from './Carousel'
// import Announcement from './Announcement'
import { Grid, makeStyles } from '@material-ui/core'



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

    const classes = UseStyles({  })

    return (
        <div>
        
       <Navbar />
       {/* <div className={classes.carousel}>
               <Carousel />
        </div> */}
        <Slider />
        <Categories />
       </div>
    )
}

export default HomePage
