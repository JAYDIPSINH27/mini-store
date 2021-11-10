import React from "react";
import { Button, Container, makeStyles,Typography,Divider } from "@material-ui/core";
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
    display: "flex",
    marginLeft: "85%",
    margin: "15px",
    padding: "5px",
  },
}));

function ProductList() {
  const classes = UseStyles({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.authReducer);
  const history = useHistory();
  const [userData, setUserData] = useState({});
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/products?limit=10000")
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

  setTimeout(() => {
    products.map((product) => {
      product.id = Math.random();
      delete product.images;
      // delete product.category;
      delete product.stores;
    });
    console.log("products : ", products);
  }, 500);

  setTimeout(() => {
    setLoading(true);
  }, 1500);

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
          // const sure = window.confirm("This record will be deleted permently.");
          // if (sure) {
          //   await axios
          //     .delete(
          //       `http://localhost:4000/api/v1/products/${params.row._id}`,
          //       {
          //         headers: {
          //           Authorization: `Bearer ${user.jwtToken}`,
          //         },
          //       }
          //     )
          //     .then((res) => {
          //       console.log(res.data);
          //       window.location.reload(false);
          //     })
          //     .catch((err) => {
          //       console.log(err);
          //     });
          // }
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
            <Button
              href="/dashboard/product/add"
              variant="outlined"
              color="primary"
              size="small"
              className={classes.addButton}
            >
              Add a Product
            </Button>

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
