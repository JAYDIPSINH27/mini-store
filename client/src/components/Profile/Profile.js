import React from "react";
import {
  Container,
  Grid,
  Avatar,
  Button,
  Divider,
  Typography,
  CardMedia,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import EmailIcon from "@material-ui/icons/Email";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import EditIcon from '@material-ui/icons/Edit';
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "100px",
  },
  body : {
    height : "100vh",
    width : "100%",
    backgroundColor: "#dbdbdb",
  },
  large: {
    width: theme.spacing(30),
    height: theme.spacing(30),
    margin: "auto"
  },
  name: {
    color: "#8a8a8a",
    margin: "10px",
    fontFamily : "Georgia, serif",
    fontWeight : "bold"
  },
  email: {
    display: "flex",
    alignItems: "center",
    color: "#8a8a8a",
    margin: "10px",
    justifyContent : "center",
  },
  editButton : {
    display: "flex",
    alignItems: "center",
    // margin: "10px",
    justifyContent : "center",
  },
  card: {
    width: theme.spacing(45),
    boxShadow : "5px 10px 15px gray"
  },
  cardDiv: {
    display: "flex",
    justifyContent: "center",
  },
  cardContent : {
      textAlign : "center"
  },
  cardText : {
    fontFamily : "Georgia, serif",
  },
  imgDiv : {
    padding : "10px"
  }
}));

const Profile = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.authReducer);
  console.log(user.user);

  return (
    <div className={classes.body}>
      <Container className={classes.root}>
        <div className={classes.cardDiv}>
          <Card className={classes.card}>
            <CardActionArea className={classes.imgDiv}>
              <Avatar
                alt="Remy Sharp"
                src={user.user.image ? user.user.image.url : ""}
                alt="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                className={classes.large}
              />
            </CardActionArea>
            <Divider />
            <CardContent className={classes.cardContent}>
              <Typography variant="h5" className={classes.name}>
                {user.user.name}
              </Typography>
              <div className={classes.email}>
                <EmailIcon style={{ marginRight: "10px" }} />
                <Typography variant="h6" className={classes.cardText}>{user.user.email}</Typography>
              </div>
              <div className={classes.email}>
                <LocationOnIcon style={{ marginRight: "10px" }} />
                <Typography variant="h6" className={classes.cardText}>
                  {user.user.addresses[user.user.addresses.length-1].location},
                  {user.user.addresses[user.user.addresses.length-1].landmark},
                  {user.user.addresses[user.user.addresses.length-1].city}, {user.user.addresses[0].state},
                  {user.user.addresses[user.user.addresses.length-1].pincode}
                </Typography>
              </div>
              <div className={classes.editButton}>
              <Link to="/edit/profile" style={{width : "100%"}}>
                <Button variant="contained" color="primary" fullWidth><EditIcon/>Edit</Button>
              </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default Profile;
