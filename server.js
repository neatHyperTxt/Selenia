const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Users = require('./models/User');
dotenv.config();

mongoose.connect('mongodb://127.0.0.1:27017/Selenia')
    .then(()=>{
        console.log("Database Connection Open!!")
    })
    .catch(err =>{
        console.log("Database could not Connect!!!")
        console.log(err);
    })

const express = require('express');
const app = express();

const bodyparser = require('body-parser');
const PORT = process.env.PORT || 5000;

const authRoutes = require('./routes/auth');
app.use(cors());
app.use(bodyparser.urlencoded({extended:false}));
app.use(express.json());
app.set('view engine','ejs'); 
app.use('/api',authRoutes);
app.use('/',(req,res,next)=>{
   res.render('auth',{
    path:'/'
   })
})
app.listen(PORT,()=>{
    console.log(`CORS enabled web server Listening on PORT ${PORT}`);
});