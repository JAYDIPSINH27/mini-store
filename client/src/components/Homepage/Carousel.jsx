// @desc      Carousel Component
// @route     localhost:3000/
// @access    Private/Public

import React from 'react'
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import styled from "styled-components"
import Caro1 from '../../assets/Caro1.jpg'
import Caro2 from '../../assets/Caro2.jpg'
import Caro3 from '../../assets/Caro3.jpg'


const Container = styled.div`
    padding:0.5rem 1rem;
    width:100%;
    height:80%;
    display:flex;
    position:relative;
    /* overflow:hidden; */
`

const AutoplaySlider = withAutoplay(AwesomeSlider);


const Carousel = () => {

    return (
        <Container>
            <AutoplaySlider
                play={true}
                cancelOnInteraction={true} // should stop playing on user interaction
                interval={2000}
                mobileTouch={true}
                fillparent={true}
                
               
            >
                <div data-src={Caro2}/>
                <div data-src={Caro1} />
                <div data-src={Caro3} />
            </AutoplaySlider>
        </Container>
    )
}

export default Carousel
