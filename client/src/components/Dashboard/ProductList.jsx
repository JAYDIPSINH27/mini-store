import React from 'react'
import { Button, Container, makeStyles } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import { Delete, Edit } from '@material-ui/icons'
import { useState } from 'react'
import { useEffect } from 'react'

const UseStyles = makeStyles ((theme) => ({
    container: {
      paddingTop: theme.spacing(10),
      paddingBottom: theme.spacing(2),
    },
    deleteIcon: {
        verticalAlign: "middle",
        marginLeft: "12px", 
    },
    editIcon: {
        verticalAlign: "middle",
        marginLeft: "12px", 
    },
    addButton: {
        display: "flex",
        marginLeft: "85%",
        margin: "15px",
        padding: "5px",
    }
}))

function ProductList() {
    const classes = UseStyles({  })

    const columns = [
        { 
            field: 'id', 
            headerName: 'ID', 
            width: 100, 
        },
        {
            field: 'productname',
            headerName: 'Product Name',
            width: 200,
            editable: true,
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 300,
            editable: true,
        },
        {
          field: 'category',
          headerName: 'Category',
          width: 150,
          editable: true,
        },
        {
            field: 'price',
            headerName: 'price',
            width: 120,
            type: "number",
            editable: true,
        },
        {
          field: 'action',
          headerName: 'Action',
          width: 120,
          renderCell: (params) => {
              return(
                <div className={classes.icons}>
                    <Delete className={classes.deleteIcon}/>
                    <Edit className={classes.editIcon}/>
                </div>
              )
          }
        },
      ];
    
    const [products, setProducts] = useState([])

   

    useEffect(() => {
      setProducts(() => {
        return [
        { 
          id: 1,
          productname: "Chips",
          description: "Chips are Sweet, testy and spicy.",
          category: "Snacks",
          price: 15,
        },
        { 
          id: 2,
          productname: "Chips",
          description: "Chips are Sweet, testy and spicy.",
          category: "Snacks",
          price: 15,
        },
        { 
            id: 3,
            productname: "Chips",
            description: "Chips are Sweet, testy and spicy.",
            category: "Snacks",
            price: 15,
          },
        { 
            id: 4,
            productname: "Chips",
            description: "Chips are Sweet, testy and spicy.",
            category: "Snacks",
            price: 15,
          },
        { 
            id: 5,
            productname: "Chips",
            description: "Chips are Sweet, testy and spicy.",
            category: "Snacks",
            price: 15,
          },
          { 
            id: 6,
            productname: "Chips",
            description: "Chips are Sweet, testy and spicy.",
            category: "Snacks",
            price: 15,
          },
        { 
            id: 7,
            productname: "Chips",
            description: "Chips are Sweet, testy and spicy.",
            category: "Snacks",
            price: 15,
          },
        { 
            id: 8,
            productname: "Chips",
            description: "Chips are Sweet, testy and spicy.",
            category: "Snacks",
            price: 15,
          },
        { 
            id: 9,
            productname: "Chips",
            description: "Chips are Sweet, testy and spicy.",
            category: "Snacks",
            price: 15,
          },
        { 
            id: 10,
            productname: "Chips",
            description: "Chips are Sweet, testy and spicy.",
            category: "Snacks",
            price: 15,
          }
        ]
      });
      console.log(products);
    }, [])
      
    return (
      <>
        <Container className={classes.container}>
  
          <Button 
            href="/dashboard/product/add"
            variant="outlined" 
            color="primary" 
            size="small" 
            className={classes.addButton}
            >
            Add a Product
          </Button>
          
          <div style={{ height: 530, width: '100%' }}>
              <DataGrid
                  rows={products}
                  columns={columns}
                  pageSize={8}
                  checkboxSelection
                  disableSelectionOnClick
              />
          </div>
        </Container>
      </>
    )
}

export default ProductList
