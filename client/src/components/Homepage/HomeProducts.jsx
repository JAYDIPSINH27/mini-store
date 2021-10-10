// @desc      HomeProducts Component
// @route     localhost:3000/
// @access    Private/Public

import React,{useState,useEffect} from 'react'
import axios from 'axios'
import styled from 'styled-components'
// import { popularProducts } from '../SlideData'
import HomeProduct from './HomeProduct'
import { TrendingUp } from '@material-ui/icons'

const Container=styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

const Info=styled.div`
   
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
    color:black;
    margin-bottom:20px;
    align-items: center;
    justify-content: center;

`

const Button=styled.a`
    text-decoration:none;
    padding:10px;
    font-size:15px;
    /* background-color:transparent; */
    cursor:pointer ;
    background-color:#EB9800;
    color: white;
    font-weight:bold;
    border-radius:5px;
    cursor:pointer;
    &:hover{
            text-decoration:none;
            color:black;
        }
`

const HomeProducts = () => {

    const [products, setProducts] = useState([]);

    //get the products details
    useEffect(() => {
        const getProducts = async ()=>{
          await axios({
            method: "GET",
            url: "http://localhost:4000/api/v1/products",
          })
          .then((res) => {
            setProducts(res.data.data)
            
          })
          .catch((err) => {
            console.log(err)
          })
          
        }
        getProducts()
        
      }, [products ])

    return (
            
        <Container>
            <Info>
                <Title><TrendingUp />&nbsp;Trending Products</Title>
                <Button href="/products">View More</Button>
            </Info>
            {products.map(item=>(

                <HomeProduct item={item} key={item.id}/>

            ))}
        </Container>
          
    )
}

export default HomeProducts
