import React, { useState } from 'react'
import {AppBar, Badge, InputBase, makeStyles, Toolbar, Typography } from '@material-ui/core'
import {Cancel, LocalMall, Mail,  Person, Search} from '@material-ui/icons'
import { alpha } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: "flex",
        justifyContent: "space-between"
    }
    ,logoLg: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
    },
    logoSm: {
        display: "block",
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
    },
    search: {
        display: "flex",
        alignItems: "center",
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        borderRadius: theme.shape.borderRadius,
        width: "50%",
        [theme.breakpoints.down("xs")]: {
            display: (props) => (props.open ? "flex" : "none"),
            width: "70%",
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
        alignItems: "center",
        display: (props) => (props.open ? "none" : "flex"),
    },
    badge: {
        marginRight: theme.spacing(2),
    },
    searchButton: {
        marginRight: theme.spacing(2),
        display: "flex",
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
    },
    

}))

function Navbar() {
    const [open, setOpen] = useState(false)
    const classes = useStyles({ open });
    return (
        <AppBar position="fixed">
            <Toolbar className={classes.toolbar} >
                <Typography variant="h6" className={classes.logoLg}>
                    Mini Mall
                </Typography>
                <Typography variant="h6" className={classes.logoSm}>
                    MALL
                </Typography>
                
                <div className={classes.search} >
                    <Search />
                    <InputBase placeholder="Search..." className={classes.input} />
                    <Cancel className={classes.cancel} onClick={() => setOpen(false)} />
                </div>

                <div className={classes.icons} >
                    <Search className={classes.searchButton} onClick={() => setOpen(true)}/>
                    <Badge badgeContent={4} color="secondary" className={classes.badge}>
                        <Mail />
                    </Badge>
                    <Badge badgeContent={2} color="secondary" className={classes.badge}>
                        <LocalMall />
                    </Badge>
                    <Badge color="secondary" className={classes.badge}>
                        <Person />
                    </Badge>
                </div>
              
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
