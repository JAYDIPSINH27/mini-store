import React from 'react'
import styled from "styled-components"

const Container=styled.div`
    position:relative;    
    height:30px;
    background-color: teal;
    color:white;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:14px;
    font-weight:500;
`

const Announcement = () => {
    return (
        <Container>
            Super Deal! Diwali Sale is live! Get Superb Deals.
        </Container>
    )
}

export default Announcement
