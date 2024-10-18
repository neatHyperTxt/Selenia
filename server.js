const path = require('path');

const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();

const bodyparser = require('body-parser');
const PORT = process.env.PORT || 5000;

const authRoutes = require('./routes/auth');

app.use(bodyparser.urlencoded());
app.use('view engine','ejs'); 
app.use(authRoutes);
app.use('/',(req,res,next)=>{
    res.send("<h1>Welcome to the home page</h1>");
})
app.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`);
});