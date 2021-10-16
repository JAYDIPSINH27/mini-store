import React from 'react'
import { makeStyles, Container, TextField, Typography, Grid, Select, MenuItem, Box, FormControl, InputLabel, InputAdornment, Input, OutlinedInput, Button } from '@material-ui/core'
import { useState } from 'react'

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(10),
        padding: theme.spacing(5),
        marginLeft: "16%",
        marginRight: "16%",
    },
    heading: {
        marginBottom: theme.spacing(3),
        
    },
    input: {
        width: "100%",
    },
    button: {
        margin: "5px",
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(2),
        display: "flex",
    },
    
    
}))

function CreateProduct() {
    const classes = useStyles({  })
    const [values, setValues] = useState({
        productName: '',
        category : '',
        amount: '',
        description: '',
        image: '',
    })

    // const handleChange = (attr) => {
    //     setValues(() => retrun {
    //         ...,
    //         attr: 
    //     })
    // }

    return (
        <>
            <Container class={classes.container}>
                <Typography variant="h3" class={classes.heading} >Fill the Product Details</Typography>
                <Grid container spacing={3}>
                    <Grid item sm={6}>
                        <TextField 
                            style={{width: "100%"}}
                            label="Product Name"
                            variant="outlined" 
                            value={values.productName}
                            // onChange={handleChange('productName')}
                        />
                    </Grid>

                    <Grid item sm={6}>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel id="category-id" >Category</InputLabel>
                                <Select
                                labelId="category-id"
                                // value={age}
                                label="category"
                                // onChange={handleChange}
                                 
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={1}>Food</MenuItem>
                                    <MenuItem value={2}>Cloths</MenuItem>
                                    <MenuItem value={3}>Electronics</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>

                    <Grid item sm={6}>
                        <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                            <InputLabel htmlFor="amount-label">Amount</InputLabel>
                            <OutlinedInput
                                id="amount-label"
                                // value={values.amount}
                                // onChange={handleChange('amount')}
                                startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                                label="Amount"
                            />
                        </FormControl>
                    </Grid>

                    <Grid item sm={12}>
                        <TextField 
                            style={{width: "100%"}}
                            label="Description"
                            variant="outlined" 
                            // value={values.amount}
                            // onChange={handleChange('amount')}
                            multiline
                            rows={5}
                        />
                    </Grid>

                    <Grid item sm={6}>
                        <label htmlFor="input-image">
                            <OutlinedInput variant="contained" multiple accept="image/*" id="input-image"  type="file" />
                        </label>
                    </Grid>
                </Grid>
                 
                <div  class={classes.button}>
                    <Button variant="contained" color="primary">Submit</Button>
                </div> 
                    
                
            </Container>
        </>
    )
}

export default CreateProduct
