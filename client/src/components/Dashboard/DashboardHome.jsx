import { Container, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(2),
    },

}))


function DashboardHome() {
    const classes = useStyles({  })
    return (
        <Container className={classes.container}>
            <h1>dashboard</h1>
        </Container>
    )
}

export default DashboardHome
