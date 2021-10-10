// @desc      HomeProducts Component
// @route     localhost:3000/
// @access    Private/Public

import React,{useState,useEffect} from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { popularProducts } from '../SlideData'
import HomeProduct from './HomeProduct'

const Container=styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
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
            {products.map(item=>(

                <HomeProduct item={item} key={item.id}/>

            ))}
        </Container>
    )
}

export default HomeProducts
