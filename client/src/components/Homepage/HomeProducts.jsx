// @desc      HomeProducts Component
// @route     localhost:3000/
// @access    Private/Public

import React from 'react'
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
    return (
        <Container>
            {popularProducts.map(item=>(

                <HomeProduct item={item} key={item.id}/>

            ))}
        </Container>
    )
}

export default HomeProducts
