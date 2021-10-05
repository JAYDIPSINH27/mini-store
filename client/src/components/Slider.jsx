import { ArrowLeftOutlined, ArrowRightOutlined } from '@material-ui/icons'
import React,{useState,useEffect} from 'react'
import styled from "styled-components"
import { slideData } from './SlideData'

const Container = styled.div`
    padding:5rem 0rem;
    width:100%;
    height:100vh;
    display:flex;
    position:relative;
    overflow:hidden;
`

const Arrow = styled.div`
    width:50px;
    height:50px;
    background-color:#fff7f7;
    border-radius:50%;
    justify-content:center;
    display:flex;
    align-items:center;
    position:absolute;
    top:0;bottom:0;
    left:${props=> props.direction==="left" && "10px"};
    right:${props=> props.direction==="right" && "10px"};
    margin:auto;
    cursor:pointer;
    z-index:2;
`
const Wrapper=styled.div`
    height:100%;
    display:flex;
    transition: all 1.5s ease;
    transform:translateX(${props=>props.slideIndex * -100}vw);
`
const Slide=styled.div`
    display:flex;
    align-items:center;
    width:100vw;
    height:100vh;
    background-color: #${props=>props.bg}
`

const Image=styled.img`
    height:80%;
    padding:50px;
`
const Title=styled.h1`
    font-size:78px;
`
const Desc=styled.p`
    margin:50px 0px;
    font-size:20px;
    font-weight:500;
    letter-spacing:3px;
`
const Button=styled.a`
    text-decoration:none;
    padding:10px;
    font-size:20px;
    // background-color:transparent;
    // cursor:pointer ;
    background-color:#EB9800;
    color: #FFFFFF;
    font-weight:bold;
    border-radius:5px;
    cursor:pointer;
    &:hover{
            text-decoration:none;
            color:black;
        }
    
 
`

const ImageContainer=styled.div`
    height:100%;
    flex:1;
`
const InfoContainer=styled.div`
    flex:1;
`

const Slider = () => {

    const [slideIndex,setSlideIndex]=useState(0)
    const handleClick=(direction)=>{

        if(direction==="left"){
            setSlideIndex(slideIndex > 0 ? slideIndex-1 : 2)
        }
        else{
            setSlideIndex(slideIndex< 2 ? slideIndex+1 : 0)
        }
    };

    
    return (
        <Container>
            <Arrow direction="left" onClick={()=>handleClick("left")}>
                <ArrowLeftOutlined />
            </Arrow>

            <Wrapper slideIndex={slideIndex}>
                {slideData.map(item=>(

                    <Slide bg={item.bg}>
                <ImageContainer>
                    <Image src={item.img} />
                </ImageContainer>

                <InfoContainer>
                    <Title>{item.title}</Title>
                    <Desc>{item.desc}</Desc>
                    <Button href="/products">Shop Now</Button>
                </InfoContainer>
                    </Slide>

                    ))}

            </Wrapper>

            <Arrow direction="right" onClick={()=>handleClick("right")}>
                <ArrowRightOutlined />
            </Arrow>
        </Container>
    )
}

export default Slider
