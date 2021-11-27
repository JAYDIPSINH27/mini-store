// @desc      Categories Component
// @route     localhost:3000/
// @access    Private

import React,{useState,useEffect} from 'react'
import styled from "styled-components"
import axios from 'axios';
import CategoryItem from './CategoryItem'
import { Category } from '@material-ui/icons'
import logo from "../../assets/shopping.gif";

const Container=styled.div`
    display:flex;
    padding:20px;
    justify-content:space-between;
    flex-wrap: wrap;
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

const Categories = () => {

    const [categories, setCategory] = useState([]);
    const [loading, setLoading] = useState(false);

    //get the category details
    useEffect(() => {
        const getCategories = async ()=>{
          await axios({
            method: "GET",
            url: "https://ministore-backend.herokuapp.com/api/v1/categories",
          })
          .then((res) => {
            setCategory(res.data.data)
            setLoading(true)
            
          })
          .catch((err) => {
            console.log(err)
          })
          
        }
        getCategories()
        
      }, [categories ])


    return (
        <Container>

            <Info>
                <Title><Category/>&nbsp;Categories</Title>
            </Info>

          {loading
            ?
            (categories.map(item=>(
                <CategoryItem item={item} key={item._id} />
            )))
            :
            (
              <img src={logo} alt="loading..." width="300px" />
            )    
          }
        </Container>
    )
}

export default Categories
