//.
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const port = 5000 ||  process.env.PORT
const mongo_url = "mongodb+srv://vraj291:test123@bugtracker.x1kzp.mongodb.net/test?retryWrites=true&w=majority" || process.env.MONGO_URL
const router = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const storeRouter = require('./routes/store.router')

mongoose.connect(mongo_url,{useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());
app.use('/auth-user',router);
app.use('/store',storeRouter)

app.listen(port, ()=>{
    console.log(`Server Running on ${port}`)
});




