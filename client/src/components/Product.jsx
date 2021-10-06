// @desc      Product Component
// @route     localhost:3000/products
// @access    Private/Public

import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core';
import React from 'react'

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
}))

function Product(props) {
    const classes = useStyles({  })
    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia 
                    className={classes.media} 
                    image="https://images.pexels.com/photos/7319337/pexels-photo-7319337.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    title={props.product.name}    
                    />
            </CardActionArea>
            <CardContent>
                <Typography gutterBottom variant="h5">{props.product.name}</Typography>
                <Typography variant="body2">{props.product.description} </Typography>
            </CardContent> 
            <CardActions className={classes.action}>
                <Typography variant="h5" className={classes.price}>₹50.00{/*props.product.price*/}</Typography>
                <Button size="small" color="primary" className={classes.button}>Add to Cart</Button>
            </CardActions>           
        </Card>
    )
}

export default Product
