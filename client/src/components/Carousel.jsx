// @desc      Carousel Component
// @route     localhost:3000/
// @access    Private/Public

import React from 'react'
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import Home1 from '../assets/Home1.jpg'
import Home2 from '../assets/Home2.jpg'

const AutoplaySlider = withAutoplay(AwesomeSlider);

const Carousel = () => {

    return (
        <div>
            <AutoplaySlider
                play={true}
                cancelOnInteraction={true} // should stop playing on user interaction
                interval={2000}
                mobileTouch={true}
               
            >
                <div data-src={Home1}/>
                <div data-src={Home2} />
                <div data-src={Home1} />
            </AutoplaySlider>
                    </div>
    )
}

export default Carousel
