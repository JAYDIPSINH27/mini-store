import  React, { useState , useEffect } from 'react'
import { Container, makeStyles, Typography,Box,Grid} from '@material-ui/core';
import {AccessTimeOutlined,TodayOutlined} from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(2),
    },
    box:{
        boxShadow : "1px 3px 3px grey",
        borderRadius : "20px",
        padding:"1rem"
        
    },
    icon:{
        marginRight: theme.spacing(1),
    },
    text: {
        display: "flex",
        alignItems:"centre",
        
    },

}))

export const DateTime = () => {

    const classes = useStyles({  })

    var [date,setDate] = useState(new Date());
    
    useEffect(() => {
        var timer = setInterval(()=>setDate(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }
    
    });

    return(
        <Container className={classes.container}>

            <Typography variant="body1" className={classes.text}>
                <TodayOutlined className={classes.icon}/>
                <strong> Date : </strong>{date.toLocaleDateString()}
            </Typography>
            <br />
            <Typography variant="body1" className={classes.text}>
                <AccessTimeOutlined  className={classes.icon}/>
                <strong> Time : </strong>{date.toLocaleTimeString()}
            </Typography>
        </Container>
    )
}

export default DateTime