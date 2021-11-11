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
  const [store, setStore] = useState('');
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.authReducer);
  const history = useHistory();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if(user.user.stores.length > 0){
      	getProducts(user.user.stores[0]._id)
	}else{
		setLoading(true)
	}
  }, []);

  const getProducts = async (storeId) => {
    setStore(storeId)
	setLoading(false)
	await axios.get(`http://localhost:4000/api/v1/stores/${storeId}`)
	.then((res) => res.data)
	.then(({data}) => {
		let products = data.products.map(product => {
			let temp = {}
			temp.id = product.productId._id
			temp.name = product.productId.name
			temp.description = product.productId.description
			temp.category = product.productId.category.name
			console.log(product.productId)
			return temp
		})
	  	setProducts(products);
	})
	.catch((err) => {
	  console.log(err);
	})
	setLoading(true)
  }

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 220,
    },
    {
      field: "name",
      headerName: "Product Name",
      width: 190,
      editable: true,
    },
    {
      field: "category",
      headerName: "Category",
      width: 150,
      editable: true
    },
    {
      field: "description",
      headerName: "Description",
      width: 460,
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
                `http://localhost:4000/api/v1/products/${params.row.id}`,
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

		const updateProduct = async () => {
			const sure = window.confirm("This record will be updated.");
			if (sure) {
			  await axios
				.patch(
				  `http://localhost:4000/api/v1/products/${params.row.id}`,
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
			<Button onClick={updateProduct}>
				<Edit className={classes.editIcon} />
            </Button>
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
                    value={store}
                    label="Store Name"
                    size="small"
                    onChange={(e) => {
                      getProducts(e.target.value);
                    }}
                    variant="outlined"
                  >
                    {user.user.stores.map((store)=>{
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
