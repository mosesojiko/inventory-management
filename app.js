const express = require('express');
const userRoute = require('./routes/User')
const productRouter = require('./routes/Product')
const app = express();
const dotenv = require('dotenv')
dotenv.config();
const mongoose = require('mongoose');

const PORT = process.env.PORT;

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//connect to db
mongoose.connect(process.env.CONNECT_TO_DB,{ useNewUrlParser: true, useUnifiedTopology: true },()=>{
    console.log('connected to db')
})

//user route
app.use('/user', userRoute);

//product route
app.use('/products', productRouter)

app.get('/', (req, res) =>{
    res.send("This is the default page, you can navigate to other routes.")
})

//testing route
app.get('/user',(req, res)=>{
   res.send("Base route for user")
})

app.listen(PORT, ()=>{
    console.log(`Server running on port:${PORT}`)
})