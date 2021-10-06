// @desc      Category Item Component
// @route     localhost:3000/
// @access    Private/Public

import React from 'react'
import styled from "styled-components"

const Container=styled.div`
    flex:1;
    margin:5px;
    height:50vh;
    position:relative;
    display:flex;
    align-items: center;
    justify-content: center;
`
const Image=styled.img`
    width:80%;
    height:80%;
    object-fit: cover;
    
`
const Info=styled.div`
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    display:flex;
    flex-direction: column;
    align-items:center;
    justify-items: center;
`
const Title=styled.h2`
    color:white;
    margin-bottom:20px;
    align-items: center;
    justify-content: center;

`
const Button=styled.a`
    text-decoration:none;
    padding:10px;
    font-size:20px;
    // background-color:transparent;
    // cursor:pointer ;
    background-color:white;
    color: grey;
    font-weight:bold;
    border-radius:5px;
    cursor:pointer;
    &:hover{
            text-decoration:none;
            color:black;
        }
`

const CategoryItem = ({item}) => {
    return (
        <Container>
            <Image src="https://images.pexels.com/photos/7319337/pexels-photo-7319337.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" />
            <Info>
                <Title>{item.name}</Title>
                <Button href="/products">Shop Now </Button>
            </Info>    
        </Container>
    )
}

export default CategoryItem
