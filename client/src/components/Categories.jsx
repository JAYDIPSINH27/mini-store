import React,{useState,useEffect} from 'react'
import styled from "styled-components"
import axios from 'axios';
import CategoryItem from './CategoryItem'

const Container=styled.div`
    display:flex;
    padding:20px;
`


const Categories = () => {

    const [categories, setCategory] = useState([]);

    //get the category details
    useEffect(() => {
        const getCategories = async ()=>{
          await axios({
            method: "GET",
            url: "http://localhost:4000/api/v1/categories",
          })
          .then((res) => {
            setCategory(res.data.data)
            
          })
          .catch((err) => {
            console.log(err)
          })
          
        }
        getCategories()
        
      }, [categories ])


    return (
        <Container>
            {categories.map(item=>(
                <CategoryItem item={item} />
            ))}
        </Container>
    )
}

export default Categories
