import React, { useState } from 'react'
import {AppBar, Badge, InputBase, makeStyles, Toolbar, Typography,MenuItem,Button } from '@material-ui/core'
import {Cancel, LocalMall, Mail,  Person, Search} from '@material-ui/icons'
import { alpha } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: "flex",
        justifyContent: "space-between"
    }
    ,logoLg: {
        display: "none",
        textAlign:"center",
        width:"33%",
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
    },
    logoSm: {
        display: "block",
        flex: "1",
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
    },
    search: {
        display: "flex",
        alignItems: "center",
        justifyContent:"flex-start",
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        borderRadius: theme.shape.borderRadius,
        width:"33%",
        marginRight: theme.spacing(2),
        [theme.breakpoints.down("xs")]: {
            display: (props) => (props.open ? "flex" : "none"),
            width:"70%",
            alignItems: "center",
            marginRight: "1rem"
        },
    },
    input: {
        color: "white",
        marginLeft: theme.spacing(1),
    },
    cancel: {
        display: (props) => (props.open ? "flex" : "none"),
    },
    icons: {
        justifyContent:"flex-end",
        width:"33%",
        display: (props) => (props.open ? "none" : "flex"),
    },
    button: {
        alignItems: "center",
        marginRight: theme.spacing(2),
        '&:hover': {
            color:"black",
            backgroundColor: alpha(theme.palette.common.white, 0.05),
        },
        color: theme.palette.common.white,
        borderColor:theme.palette.common.white,
    },
    searchButton: {
        alignItems: "center",
        marginRight: theme.spacing(2),
        display: "flex",
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
    },
    

}))

function NavbarHome() {
    const [open, setOpen] = useState(false)
    const classes = useStyles({ open });
    return (
        <AppBar position="fixed">
            <Toolbar className={classes.toolbar} >

            <div className={classes.search} >
                    <Search />
                    <InputBase placeholder="Search..." className={classes.input} />
                    <Cancel className={classes.cancel} onClick={() => setOpen(false)} />
                </div>
            
                <Typography variant="h6" className={classes.logoLg}>
                    Mini Mall
                </Typography>
                <Typography variant="h6" className={classes.logoSm}>
                    MALL
                </Typography>
                
                

                <div className={classes.icons} >
                    <Search className={classes.searchButton} onClick={() => setOpen(true)}/>
                    <Button href="/signup" variant="outlined" size="large" className={classes.button}>SIGN UP</Button>
                    <Button href="/signin"  variant="outlined" size="large" className={classes.button}>SIGN IN</Button>
                    
                </div>
              
            </Toolbar>
        </AppBar>
    )
}

export default NavbarHome

