const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use('/',(req,res,next)=>{
    res.send("<h1>Welcome to the home page</h1>");
})
app.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`);
})

