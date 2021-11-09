import React from "react";
import { Button, Container, makeStyles } from "@material-ui/core";
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

const ShopList = () => {
  const classes = UseStyles({});
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.authReducer);
  const history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/stores?limit=10000")
      .then((res) => {
        console.log("default :", res.data.data);
        setStores(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  setTimeout(() => {
    stores.map((store) => {
      store.id = Math.random();
    });
    console.log("Stores : ", stores);
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
      headerName: "Store Name",
      width: 200,
      editable: true,
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
            <Button
              href="/dashboard/store/add"
              variant="outlined"
              color="primary"
              size="small"
              className={classes.addButton}
            >
              Add Store
            </Button>

            <div style={{ height: 530, width: "100%" }}>
              <DataGrid
                rows={stores}
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

export default ShopList;
