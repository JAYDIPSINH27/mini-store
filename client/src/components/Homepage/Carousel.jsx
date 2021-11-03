// @desc      Carousel Component
// @route     localhost:3000/
// @access    Private

import React from 'react'
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import styled from "styled-components"
import Caro1 from '../../assets/Caro1.jpg'
import Caro2 from '../../assets/Caro2.jpg'
import Caro3 from '../../assets/Caro3.jpg'
import { mobile } from './responsive'


const Container = styled.div`
    padding:0rem 1rem;
    justify-content: center;
    width:100%;
    height:80vh;
    display:flex;
    position:relative;
    /* overflow:hidden; */
    ${mobile({height:"100%",width:"100%"})}
`
const Image=styled.div`
    width:100%;
    height:100%;
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
                <Image data-src={Caro2}/>
                <Image data-src={Caro1} />
                <Image data-src={Caro3} />
            </AutoplaySlider>
        </Container>
    )
}

export default Carousel
