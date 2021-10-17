// @desc      HomeProduct Component
// @route     localhost:3000/
// @access    Private

import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined,Storefront } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'
import { Link} from "react-router-dom";

const Info=styled.div`
    opacity:0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    display:flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0,0.2);
    transition: all 0.5s ease;

`

const Container=styled.div`
    flex:1;
    margin:5px;
    min-width: 300px;
    height: 350px;
    display:flex;
    align-items: center;
    justify-content: center;
    background: #f5fbfd;
    position:relative;

    &:hover ${Info}{
        opacity: 1;
    }

`
const Circle=styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
`

const Image=styled.img`
height:55%;
min-width: 150px;
z-index: 2;
object-fit: cover;

`


const Icon=styled.a`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color:white;
    display:flex;
    align-items:center;
    justify-content: center;
    margin: 10px;
    cursor: pointer;
    transition:all 0.5s ease;
    &:hover{
        background-color: #e9f5f5;
        transform: scale(1.1);

    }
`


const HomeProduct = ({item}) => {
    return (
        <Container>
            <Circle />
            <Image src={item.images[0].url} />
            <Info>
            <Link to={"/store/"+item.stores[0]._id} style={{textDecoration:"none",color:"light blue"}}>
                <Icon>
                    <Storefront />
                </Icon>
            </Link>  

            <Link to="/products" style={{textDecoration:"none",color:"light blue"}}>
                <Icon>
                    <SearchOutlined  />
                </Icon>
            </Link>

            <Link to="/products" style={{textDecoration:"none",color:"light blue"}}>
                <Icon>
                    <FavoriteBorderOutlined />
                </Icon>
            </Link>
            </Info>
        </Container>
    )
}

export default HomeProduct
