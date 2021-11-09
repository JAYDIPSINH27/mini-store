const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors')
require('dotenv').config();

const authRouter = require('./routes/auth.router');
const storeRouter = require('./routes/store.router')
const productRouter = require('./routes/product.router')
const categoryRouter = require('./routes/category.router')
const paymentRouter = require('./routes/payment.router')
const orderRouter = require('./routes/order.router')
//const testRouter = require('./routes/test.router')

const port = process.env.PORT || 5000
const mongo_url = process.env.MONGO_URL
const frontendURL = process.env.FRONTEND_URL

const app = express();

mongoose.connect(mongo_url,{useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.json({limit : '50mb'}));
app.use(express.urlencoded({limit : '50mb', extended : false}));
app.use(cookieParser());
app.use(cors({
    origin : frontendURL
}))

app.use('/api/v1/payment',paymentRouter)
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/stores',storeRouter)
app.use('/api/v1/products',productRouter)
app.use('/api/v1/categories',categoryRouter)
app.use('/api/v1/orders',orderRouter)

app.listen(port, ()=>{
    console.log(`Server Running on ${port}`)
});




