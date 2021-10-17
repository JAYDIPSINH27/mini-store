import React from 'react'
import { makeStyles} from "@material-ui/core";
import { Container } from "@material-ui/core";
import { Grid,CardMedia } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import { removeFromCart, updateCart } from "../../redux/helpers/cartHelpers";
import { useSelector } from "react-redux";
import { useHistory,Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    card: {
        margin: theme.spacing(2),
        direction:"row",
        justify:"flex-start",
        alignItems:"flex-start",
    },
    media: {
        height: 150,
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
    },
    
  }));

const Product = (props) => {
    const classes = useStyles();

    return (
        <>
        <Container>
            <Grid container
                spacing={2}
                direction="row"
                justify="flex-start"
                alignItems="flex-start">

            {props.data.map((product)=>{
                
                return(
                    <Grid item xs={12} sm={6} md={3}>
                    <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia 
                            className={classes.media} 
                            image={product.productId.images[0].url}
                            title={product.productId.name}    
                            />
                    </CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5">{product.productId.name}</Typography>
                        <Typography variant="body2">Quantity: {product.quantity} </Typography>
                    </CardContent> 
                </Card>
                </Grid>
                )
                
            })
       
            }
            </Grid>
        </Container>
        </>
    )
}

export default Product
