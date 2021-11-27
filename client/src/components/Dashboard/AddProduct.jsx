import React, { useState, useEffect } from "react";
import {
  Container,
  FormControl,
  Select,
  MenuItem,
  makeStyles,
  Avatar,
  TextField,
  Button,
  Grid,
  Divider,
  InputLabel
} from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import IconButton from "@material-ui/core/IconButton";
import logo from "../../assets/shopping.gif";
import ReactStars from "react-rating-stars-component";
import axios from "axios";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import unAuth from "../../assets/401.png";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
    padding: theme.spacing(5),
  },
  ratingDiv: {
    display: "flex",
    justifyContent: "center",
  },
  large: {
    width: theme.spacing(35),
    height: theme.spacing(35),
    margin: "auto",
  },
  imgUpload: {
    display: "flex",
    alignItems: "center",
    // margin: "10px",
    justifyContent: "center",
  },
  uploadButton: {
    height: "40px",
    width: "40px",
  },
  loadingDiv: {
    width: "100%",
    display: "flex",
  },
  loadingImage: {
    margin: "auto",
  },
  submitButton: {
    display: "flex",
    justifyContent: "center",
  },
  emailField: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "20px",
  },
  nameField: {
    display: "flex",
    justifyContent: "flex-start",
    padding: "20px",
  },
  field: {
    display: "flex",
    justifyContent: "center",
    padding: "20px",
  },
}));

const AddStore = () => {
  const classes = useStyles();
  const [fileInput, setFileInput] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [loading, setLoading] = useState(false);
  const history = new useHistory();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState([]);
  const [userData, setUserData] = useState({});
  const [category1, setCategory1] = useState();
  const [price, setPrice] = useState();
  const [discount, setDiscount] = useState();
  const [quantity, setQuantity] = useState();
  const [store,setStore]=useState([]);

  const user = useSelector((state) => state.authReducer);
  const imageFile = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  useEffect(() => {
      axios
      .get("https://ministore-backend.herokuapp.com/api/v1/auth/user", {
        headers: {
          Authorization: `Bearer ${user.jwtToken}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setUserData(res.data.data);

      })
      .catch((err) => {
        console.log(err);
      });

      axios
        .get("https://ministore-backend.herokuapp.com/api/v1/categories")
        .then((res) => {
          console.log("default :", res.data.data);
          setCategory(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });

  }, []);

  setTimeout(() => {
    setLoading(true);
  }, 1500);
  
    // userData.stores.map((store) => {
    //   console.log(store.name);
    // })
    // console.log("user : ", userData.stores);
  

  const createShop = (e) => {
    e.preventDefault();
    axios
      .post(
        `https://ministore-backend.herokuapp.com/api/v1/stores/${store}/products`,
        {
          user: user.user,
          name: name,
          description: description,
          category: category1,
          images: [previewSource],
          product: {
            price: price,
            discount: discount,
            rating: rating,
            quantity: quantity
          }
        },
        {
          headers: {
            Authorization: `Bearer ${user.jwtToken}`,
          },
        }
      )
      .then((res) => {
        if (res.data.error === true) {
          toast.error("Product Not Created.");
        } else {
          toast.success("Product Created Successfully");
          history.push("/dashboard/product/view");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Container className={classes.container}>
        {user.user && user.user.admin === true ? loading ? (
          <>
            <ToastContainer />
            <form onSubmit={createShop}>
              <div>
                {loading ? (
                  <Avatar
                    alt="Remy Sharp"
                    src={previewSource} //add || with exixsting store image like profile edit
                    alt="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    variant="rounded"
                    className={classes.large}
                  />
                ) : (
                  <Avatar
                    alt="Remy Sharp"
                    src={logo}
                    alt="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    variant="rounded"
                    className={classes.large}
                  />
                )}
                <div className={classes.imgUpload}>
                  <input
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    style={{ display: "none" }}
                    value={fileInput}
                    onChange={imageFile}
                  />
                  <label htmlFor="icon-button-file">
                    <IconButton
                      color="primary"
                      variant="contained"
                      aria-label="upload picture"
                      component="span"
                    >
                      <PhotoCamera className={classes.uploadButton} />
                    </IconButton>
                  </label>
                </div>
                <div className={classes.ratingDiv}>
                  <ReactStars
                    size="40"
                    count={5}
                    edit={true}
                    onChange={(value) => {
                      setRating(value);
                    }}
                  />
                </div>
              </div>
              <Grid container className={classes.form}>
                <Grid item lg={6} className={classes.emailField}>
                  <TextField
                    label="Product Name"
                    autoFocus
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="filled"
                  />
                </Grid>
                <Grid item lg={6} className={classes.nameField}>
                  <TextField
                    label="Description"
                    required
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    multiline
                    maxRows={4}
                    variant="filled"
                  />
                </Grid>
                <Grid lg={12}>
                  <Divider />
                </Grid>

                <Grid item lg={12} className={classes.field}>

                <Grid item lg={5} className={classes.field}>
                  <FormControl fullWidth>
                    <InputLabel id="category-id">Category *</InputLabel>
                    <Select
                      required
                      labelId="category-id"
                      value={category1}
                      label="Category"
                      onChange={(e) => {
                        setCategory1(e.target.value);
                      }}
                      variant="filled"
                    >
                      {category.map((categor)=>{
                        return(

                          <MenuItem value={categor._id}>{categor.name}</MenuItem>
                        )
                      })}
                      
                    </Select>
                  </FormControl>
                </Grid>
                </Grid>

                <Grid item lg={12} className={classes.field}>

                <Grid item lg={5} className={classes.field}>
                  <FormControl fullWidth>
                    <InputLabel id="store-id">Store *</InputLabel>
                    <Select
                      required
                      labelId="store-id"
                      value={store}
                      label="Store"
                      onChange={(e) => {
                        setStore(e.target.value);
                      }}
                      variant="filled"
                    >
                      {userData.stores.map((store)=>{
                        return(

                          <MenuItem value={store._id}>{store.name}</MenuItem>
                        )
                      })}
                      
                    </Select>
                  </FormControl>
                </Grid>

                </Grid>
                

                <Grid item lg={6} className={classes.emailField}>
                  <TextField
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                    required
                    variant="filled"
                    label="Price"
                  />
                </Grid>
                <Grid item lg={6} className={classes.nameField}>
                  <TextField
                    value={quantity}
                    onChange={(e) => {
                      setQuantity(e.target.value);
                    }}
                    required
                    variant="filled"
                    label="Quantity"
                  />
                </Grid>
                <Grid item lg={12} className={classes.field}>
                  <TextField
                    value={discount}
                    onChange={(e) => {
                      setDiscount(e.target.value);
                    }}
                    required
                    variant="filled"
                    label="Discount"
                  />
                </Grid>

              </Grid>
              <div className={classes.submitButton}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </div>
            </form>
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
};

export default AddStore;
