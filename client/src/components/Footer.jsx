// @desc      Footer Component
// @route     Used in all Routes
// @access    Private/Public

import { Facebook, Instagram, MailOutline, Phone, Room, Twitter } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'
import { mobile } from './Homepage/responsive'

const Container=styled.div`
    display:flex;
    margin-top: 2em;
    ${mobile({flexDirection: "column",marginTop: "1em"})}
`

const Left=styled.div`
    flex:1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`

const Logo=styled.h1`

`

const Desc=styled.p`
    margin: 20px 0px;


`
const SocialContainer=styled.div`
    display: flex;
`
const SocialIcon=styled.div`
    width: 40px;height: 40px;
    border-radius: 50%;
    color:white;
    background-color: #${props=>props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`


const Center=styled.div`
    flex:1;
    padding: 20px;
    ${mobile({display:"none"})}
`

const Title=styled.h3`
    margin-bottom: 30px;
`

const List=styled.ul`
    margin: 0;
    padding: 0;
    list-style:none;
    display: flex;
    flex-wrap:wrap;

`

const ListItem=styled.li`
    width:50%;
    margin-bottom: 10px;

`


const Right=styled.div`
    flex:1;
    padding: 20px;
    ${mobile({backgroundColor:"#fff8f8"})}
`
const ContactItem=styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items:center;
`

const Payment=styled.img`
    width:50%;
`

const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>Mini Mall</Logo>
                <Desc>
                MiniMall provide online e-commerce service for seller and customer.
                It is a website application for all store which sell and manage their inventory.
                </Desc>
                <SocialContainer>
                    <SocialIcon color="3B5999">
                    <Facebook />
                    </SocialIcon>
                    
                    <SocialIcon color="E4405f">
                    <Instagram/>
                    </SocialIcon>
                    
                    <SocialIcon color="55ACee">
                     <Twitter/>   
                    </SocialIcon>
                </SocialContainer>

            </Left>

            <Center>
                    <Title>Useful Links</Title>
                    <List>
                        <ListItem>Home</ListItem>
                        <ListItem>Account</ListItem>
                        <ListItem>Cart</ListItem>
                        <ListItem>Shops</ListItem>
                        <ListItem>Products</ListItem>
                        <ListItem>Terms</ListItem>
                    </List>

            </Center>

            <Right>

            <Title>Contact</Title>
            <ContactItem>
            <Room style={{marginRight:"10px"}}/>
            CHARUSAT Campus, Highway, Off, Nadiad - Petlad Rd, Changa, Gujarat 388421
            </ContactItem>

            <ContactItem>
            <Phone style={{marginRight:"10px"}}/> +91 02697 265 011
            </ContactItem>

            <ContactItem>
                <MailOutline style={{marginRight:"10px"}}/>
            contact@minimall.dev
            </ContactItem>

            <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />

            </Right>
        </Container>
    )
}

export default Footer
