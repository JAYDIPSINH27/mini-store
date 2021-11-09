import React from "react";
import { Button, Container, makeStyles, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
    padding: theme.spacing(5),
  },

  heading: {
    display: "flex",
    alignItems: "center",
    flexWrap: "nowrap",
  },
  editButton: {
    marginLeft: "auto",
    margin: "10px",
    padding: "5px",
    ":&hover": {
      textDecoration: "none",
    },
  },
}));

function StoreDetails() {
  const classes = useStyles({});

  return (
    <>
      <Container class={classes.container}>
        <div class={classes.heading}>
          <Typography variant="h4">Store Name</Typography>

          <Button
            href="/dashboard/store/details/edit"
            variant="outlined"
            color="primary"
            size="small"
            className={classes.editButton}
          >
            Edit Details
          </Button>
          <Link to="/dashboard/store/add">
            <Button variant="contained" color="primary" fullWidth>
              Add Store
            </Button>
          </Link>
        </div>

        <Typography variant="paragraph">Description </Typography>
        <Typography variant="Paragraph">Address</Typography>
      </Container>
    </>
  );
}

export default StoreDetails;
