import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Button, TextField } from "@material-ui/core";
import {
  makeStyles,
  Container,
  Grid,
  Divider,
  Avatar,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import axios from "axios";
import { getUser } from "../../redux/helpers/authHelpers";
import { setAuthDetails } from "../../redux/helpers/authHelpers";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import IconButton from "@material-ui/core/IconButton";
import { ToastContainer, toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "100px",
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
  large: {
    width: theme.spacing(30),
    height: theme.spacing(30),
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
}));

const ProfileEdit = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.authReducer);
  const [editUser, setUser] = useState({ ...getUser() });
  const [address, setAddress] = useState({
    location: "",
    landmark: "",
    city: "",
    state: "",
    pincode: 0,
  });

  const [fileInput, setFileInput] = useState("");
  const [previewSource, setPreviewSource] = useState(user.user.image.url);

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

  const updateUser = async (e) => {
    e.preventDefault();
    if (!previewSource) return;
    editUser.addresses[0] = address;
    // console.log(editUser);
    await axios
      .patch(
        "http://localhost:4000/api/v1/auth/user",
        { user: editUser, addresses : [address], image : previewSource},
        {
          headers: {
            Authorization: `Bearer ${user.jwtToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.err === true) {
          console.log(res.data);
        } else {
          console.log(res.data);
          setAuthDetails({ token: user.jwtToken, data: res.data.data });
          toast("Details updated Successfully")
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(previewSource)

  return (
    <div className={classes.root}>
      <Container>
      <ToastContainer />
        <form method="PATCH" onSubmit={updateUser}>
          <div>
                <Avatar
              alt="Remy Sharp"
              src={previewSource}
              alt="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              className={classes.large}
            />
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
          </div>
          <Grid container className={classes.form}>
            <Grid item lg={6} className={classes.emailField}>
              <TextField
                value={editUser.email}
                variant="outlined"
                label="Email"
                disabled
              />
            </Grid>
            <Grid item lg={6} className={classes.nameField}>
              <TextField
                value={editUser.name}
                variant="outlined"
                onChange={(e) => {
                  setUser({ ...editUser, name: e.target.value });
                }}
                required
                label="User Name"
              />
            </Grid>
            <Grid lg={12}>
              <Divider />
            </Grid>
            <Grid item lg={6} className={classes.emailField}>
              <TextField
                value={address.location}
                onChange={(e) => {
                  setAddress({ ...address, location: e.target.value });
                }}
                required
                variant="outlined"
                label="location"
              />
            </Grid>
            <Grid item lg={6} className={classes.nameField}>
              <TextField
                value={address.landmark}
                onChange={(e) => {
                  setAddress({ ...address, landmark: e.target.value });
                }}
                required
                variant="outlined"
                label="landmark"
              />
            </Grid>
            <Grid item lg={6} className={classes.emailField}>
              <TextField
                value={address.city}
                onChange={(e) => {
                  setAddress({ ...address, city: e.target.value });
                }}
                required
                variant="outlined"
                label="city"
              />
            </Grid>
            <Grid item lg={6} className={classes.nameField}>
              <TextField
                value={address.state}
                variant="outlined"
                onChange={(e) => {
                  setAddress({ ...address, state: e.target.value });
                }}
                required
                label="state"
              />
            </Grid>
            <Grid item lg={12} className={classes.field}>
              <TextField
                value={address.pincode}
                onChange={(e) => {
                  setAddress({ ...address, pincode: parseInt(e.target.value) });
                }}
                required
                variant="outlined"
                label="pincode"
              />
            </Grid>
            <Grid item lg={12} className={classes.field}>
              <Button type="submit" variant="contained" color="primary">
                <SaveIcon />
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};

export default ProfileEdit;
