import React, { useState } from "react";
import {
  Container,
  makeStyles,
  Avatar,
  TextField,
  Button,
  Grid,
  Divider,
} from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import IconButton from "@material-ui/core/IconButton";
import logo from "../../assets/shopping.gif";
import ReactStars from "react-rating-stars-component";
import axios from "axios";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import unAuth from "../../assets/401.png";

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
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

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

  const createShop = (e) => {
    e.preventDefault();
    axios
      .post(
        `http://localhost:4000/api/v1/stores/${user.user.stores[0]._id}/products`,
        {
          user: user.user,
          name: name,
          description: description,
          category:"615e78d422ef380c408f59f4",
          images: [previewSource],
          product:{
              price:'50',
              discount:'0',
              rating:'4',
              quantity:'10'
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
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Container className={classes.container}>
        {user.user && user.user.admin === true ? (
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
                {/* <div className={classes.ratingDiv}>
                  <ReactStars
                    size="40"
                    count={5}
                    edit={true}
                    onChange={(value) => {
                      setRating(value);
                    }}
                  />
                </div> */}
              </div>
              <Grid container className={classes.form}>
                <Grid item lg={6} className={classes.emailField}>
                  <TextField
                    label="Store Name"
                    autoFocus
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
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
                    variant="outlined"
                  />
                </Grid>
                <Grid lg={12}>
                  <Divider />
                </Grid>
                {/* <Grid item lg={6} className={classes.emailField}>
                  <TextField
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                    }}
                    required
                    variant="outlined"
                    label="location"
                  />
                </Grid>
                <Grid item lg={6} className={classes.nameField}>
                  <TextField
                    value={landmark}
                    onChange={(e) => {
                      setLandmark(e.target.value);
                    }}
                    required
                    variant="outlined"
                    label="landmark"
                  />
                </Grid>
                <Grid item lg={6} className={classes.emailField}>
                  <TextField
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                    required
                    variant="outlined"
                    label="city"
                  />
                </Grid>
                <Grid item lg={6} className={classes.nameField}>
                  <TextField
                    value={state}
                    variant="outlined"
                    onChange={(e) => {
                      setState(e.target.value);
                    }}
                    required
                    label="state"
                  />
                </Grid>
                <Grid item lg={12} className={classes.field}>
                  <TextField
                    value={pincode}
                    onChange={(e) => {
                      setPincode(parseInt(e.target.value));
                    }}
                    required
                    variant="outlined"
                    label="pincode"
                  />
                </Grid> */}
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
              src={unAuth}
              alt="loading..."
              width="300px"
              className={classes.loadingImage}
            />
          </div>
        )}
      </Container>
    </>
  );
};

export default AddStore;
