// @desc      Add Component
// @route     Used in all Routes
// @access    Private/Public

import { Button, Container, Fab, makeStyles, Modal, Snackbar, Tooltip } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { Add as AddIcon } from '@material-ui/icons';
import React, { useState } from 'react'


const useStyles = makeStyles((theme) => ({
    fab: {
        position: "fixed",
        bottom: 20,
        right: 20,
    },
    container: {
        width: 500,
        height: 550,
        backgroundColor: "white",
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        margin: "auto",
        [theme.breakpoints.down("sm")]: {
            width: "100vw",
            height: "100vh",
        },
        
    },button: {
        margin: "20px"
        

    }
}))

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Add() {
    const [open, setOpen] = useState(false)
    const [openAlert, setOpenAlert] = useState(false)
    const classes = useStyles({  })

    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenAlert(false);
      };
    return (
        <div>
            <Tooltip title="Add" aria-label="add" onClick={() => setOpen(true)}>
                <Fab color="primary" className={classes.fab}>
                    <AddIcon />
                </Fab>
            </Tooltip>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Container className={classes.container}>
                    <Button variant="contained" size="small" onClick={() => setOpenAlert(true)} className={classes.button}> Snackbar</Button>
                </Container>
            </Modal>
            <Snackbar 
                open={openAlert} 
                autoHideDuration={6000} 
                onClose={handleClose} 
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    This is a success message!
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Add
