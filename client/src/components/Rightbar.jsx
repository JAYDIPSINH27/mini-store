// @desc      Rightbar Component
// @route     localhost:3000/
// @access    Private/Public

import { Container, makeStyles } from '@material-ui/core';
import React from 'react'

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),
        position: "sticky",
        top: 0,
    }
}))

function Rightbar() {
    const classes = useStyles({  })
    return (
        <Container className={classes.container}>
            rightbar
        </Container>
    )
}

export default Rightbar
