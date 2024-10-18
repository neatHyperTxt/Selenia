const path = require('path');

const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();

const bodyparser = require('body-parser');
const PORT = process.env.PORT || 5000;

const authRoutes = require('./routes/auth');

app.use(bodyparser.urlencoded({extended:false}));
app.set('view engine','ejs'); 
app.use(authRoutes);
app.use('/',(req,res,next)=>{
   res.render('auth',{
    path:'/'
   })
})
app.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`);
});