// @desc      Product Component
// @route     localhost:3000/products
// @access    Private

import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core';
import React from 'react'
import { Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    card: {
        margin: theme.spacing(2),
    },
    media: {
        height: 250,
        [theme.breakpoints.down("sm")]: {
            height: 150,
        },
    },
    action: {
        display: "flex",
        justifyContent: "space-between"
    },
    price: {
        marginLeft: theme.spacing(1),
    },
    button: {
        marginRight: theme.spacing(1),
    },
    link:{
        textDecoration:"none",
        '&hover':{
            textDecoration:"none",
            color: theme.palette.common.white,
            opacity:"0.9"
        }
    }
}))

function Product(props) {
    const classes = useStyles({  })
    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia 
                    className={classes.media} 
                    // image="https://images.pexels.com/photos/7319337/pexels-photo-7319337.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    image={props.product.images[0].url}
                    title={props.product.name}    
                    />
            </CardActionArea>
            <CardContent>
                <Typography gutterBottom variant="h5">{props.product.name}</Typography>
                <Typography variant="body2">{props.product.description} </Typography>
            </CardContent> 
            <CardActions className={classes.action}>
               <Link to={"/store/"+props.product.stores[0]._id} className={classes.link}>
                <Button size="small" color="primary" className={classes.button}>View Product</Button>
                </Link>
            </CardActions>           
        </Card>
    )
}

export default Product
