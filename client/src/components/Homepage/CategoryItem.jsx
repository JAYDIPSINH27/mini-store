// @desc      Category Item Component
// @route     localhost:3000/
// @access    Private

import React from 'react'
import styled from "styled-components"
import { Link} from "react-router-dom";

const Container=styled.div`
    flex:1;
    /* margin:5px;
    height:60vh; */

    min-width: 300px;
    height: 350px;
    position:relative;
    display:flex;
    /* align-items: center;
    justify-content: center; */
    justify-content: center;
`
const Image=styled.img`
    /* width:75%; */
    min-width: 150px;
    height:75%;
    object-fit: cover;
    opacity: 0.4;
    
`
const Info=styled.div`
    position: absolute;
    top:50px;
    left:0;
    width:100%;
    height:100%;
    display:flex;
    flex-direction: column;
    align-items:center;
    justify-items: center;
    z-index: 3;
`
const Title=styled.h2`
    color:black;
    margin-bottom:20px;
    align-items: center;
    justify-content: center;

`
const Button=styled.a`
    text-decoration:none;
    padding:10px;
    font-size:15px;
    // background-color:transparent;
    cursor:pointer ;
    background-color:#EB9800;
    color: white;
    font-weight:bold;
    border-radius:5px;
    cursor:pointer;
    &:hover{
            text-decoration:none;
            color:black;
            opacity:0.9;
        }
`

const CategoryItem = ({item}) => {
    return (
        <Container>
            {/* <Image src="https://images.pexels.com/photos/7319337/pexels-photo-7319337.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" /> */}
            <Image src={item.image.url} />
            <Info>
                <Title>{item.name}</Title>
                <Link to="/products" style={{textDecoration:"none",color:"white"}}>
                <Button>View More</Button>
                </Link>
            </Info>    
        </Container>
    )
}

export default CategoryItem
