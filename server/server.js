//.
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authRouter = require('./routes/authRoutes');
const storeRouter = require('./routes/store.router')
const productRouter = require('./routes/product.router')
const categoryRouter = require('./routes/category.router')

const port = process.env.PORT || 5000
const mongo_url = process.env.MONGO_URL

const app = express();

mongoose.connect(mongo_url,{useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());

app.use('/api/auth',authRouter)
app.use('/api',storeRouter)
app.use('/api',productRouter)
app.use('/api',categoryRouter)

app.listen(port, ()=>{
    console.log(`Server Running on ${port}`)
});




