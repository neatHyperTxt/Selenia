const express = require('express');
const router = express.Router();
const Users = require('../models/User');

router.post('/register',async (req,res)=>{
    const {fname,lname,email,password} = req.body;
    const target_user = await Users.findOne({email:email}); 
    if(!target_user){
        const new_user = new Users({
            firstname:fname,
            lastname:lname,
            email:email,
            password:password
        })
        await new_user.save();
        res.status(201).json("User Registered Successfully!!!");
    }
    else{
        res.status(401).json({message:"User already exists"});
    }
});
router.post('/login',async (req,res)=>{
    const {email,password} = req.body;
    const user = {
        email:email,
        password:password
    }
    console.log(user);
    const target_user = await Users.findOne({email:email,password:password});
    if(target_user){
        res.status(201).json({ message: "Login Successful", user });
    }
    else{
        res.status(401).json({message:'Login failed!!! Please check credentials'});
    }
});


module.exports = router;