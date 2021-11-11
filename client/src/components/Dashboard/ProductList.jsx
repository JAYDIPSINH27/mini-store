import React from "react";
import { Button, Container, makeStyles,Typography,Divider, FormControl, InputLabel, Select, MenuItem, Grid } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { Delete, Edit } from "@material-ui/icons";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import logo from "../../assets/shopping.gif";
import unAuth from "../../assets/401.png";

const UseStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(2),
  },
  loadingDiv: {
    width: "100%",
    display: "flex",
  },
  loadingImage: {
    margin: "auto",
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
    // display: "flex",
    marginLeft: "83%", 
    marginRight: "0%",
    margin: "15px",
    padding: "5px",
  },
  storeName: {
    // display: "flex",
    padding: "5px",
    width: "50%",
  },
  topButtons: {
    marginTop: "10px",
    marginBottom: "10px",
  }
}));

function ProductList() {
  const classes = UseStyles({});
  const [products, setProducts] = useState([]);
  const [storeName, setStoreName] = useState();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.authReducer);
  const history = useHistory();
  const [userData, setUserData] = useState({});
  useEffect(() => {
    console.log(user.user.stores);
    
    axios
      .get(`http://localhost:4000/api/v1/products/stores/:${user.user.stores[0]}`)
      .then((res) => {
        console.log("default :", res.data.data);
        setProducts(res.data.data);
        
      })
      .catch((err) => {
        console.log(err);
      });

      axios
      .get("http://localhost:4000/api/v1/auth/user", {
        headers: {
          Authorization: `Bearer ${user.jwtToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUserData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function deleteNotUsedFields(){
    
    setTimeout(() => {
      products.map((product) => {
        
        console.log(product.stores);
      });
        // products.filter((product) => product.stores.includes(storeName))
    }, 500);

    setTimeout(() => {
      products.map((product) => {
        product.id = Math.random();
        delete product.images;
        // delete product.category;
        delete product.stores;
      });
      console.log("products : ", products);
    }, 500);
  }

  deleteNotUsedFields();

  setTimeout(() => {
    setLoading(true);
  }, 1500);


  function getProducts(){
    
    deleteNotUsedFields();
  }
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 100,
    },
    {
      field: "name",
      headerName: "Product Name",
      width: 200,
      editable: true,
    },
    {
      field: "category",
      headerName: "Category",
      width: 200,
      editable: true,
      valueGetter: (params) => {
        return params.row.category.name;
      },
    },
    {
      field: "description",
      headerName: "Description",
      width: 300,
      editable: true,
    },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => {
        const deleteProduct = async () => {
          const sure = window.confirm("This record will be deleted permanently.");
          if (sure) {
            await axios
              .delete(
                `http://localhost:4000/api/v1/products/${params.row._id}`,
                {
                  headers: {
                    Authorization: `Bearer ${user.jwtToken}`,
                  },
                }
              )
              .then((res) => {
                console.log(res.data);
                window.location.reload(false);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        };

        return (
          <div className={classes.icons}>
            <Button onClick={deleteProduct}>
              <Delete className={classes.deleteIcon} />
            </Button>
            <Edit className={classes.editIcon} />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Container className={classes.container}>
        {
          user.user && user.user.admin === true ? loading ? (
          <>
            
            <Typography variant="h4">Product Details</Typography>
            <Divider />
            <Grid container className={classes.topButtons}>
              <Grid item lg={2} className={classes.storeName}>
                <FormControl fullWidth>
                  <InputLabel id="store-id">Store Name</InputLabel>
                  <Select
                    required
                    labelId="storename-id"
                    value={storeName}
                    label="Store Name"
                    size="small"
                    onChange={(e) => {
                      setStoreName(e.target.value);
                      getProducts();
                    }}
                    
                    variant="outlined"
                  >
                    {userData.stores.map((store)=>{
                      return(
                        <MenuItem value={store._id}>{store.name}</MenuItem>
                      )
                    })}
                    
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item lg={10}>
                  <Button
                  href="/dashboard/product/add"
                  variant="outlined"
                  color="primary"
                  size="small"
                  className={classes.addButton}
                >
                  Add a Product
                </Button>
              </Grid>
            </Grid>
            
            

            <div style={{ height: 530, width: "100%" }}>
              <DataGrid
                rows={products}
                columns={columns}
                pageSize={8}
                checkboxSelection
                disableSelectionOnClick
                id={Math.random()}
              />
            </div>
          </>
        ) : (
          <div className={classes.loadingDiv}>
            <img
              src={logo}
              alt="loading..."
              width="300px"
              className={classes.loadingImage}
            />
          </div>
        ) : <div className={classes.loadingDiv}>
            <img
              src={unAuth}
              alt="loading..."
              width="300px"
              className={classes.loadingImage}
            />
          </div>
        }
      </Container>
    </>
  );
}

export default ProductList;
