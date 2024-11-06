const express = require('express');
const router = express.Router();
const Users = require('../models/User');
const bcrypt = require('bcrypt');
const hashPassword = async(plaintext)=>{
    const salt = await bcrypt.genSalt(12);
    console.log("salt",salt);
    const hash = await bcrypt.hash(plaintext,salt);
    console.log("hash",hash);
    return hash;
}
router.post('/register',async (req,res)=>{
    const {fname,lname,email,password} = req.body;
    const target_user = await Users.findOne({email:email}); 
    const hash = await hashPassword(password);
    console.log(hash);
    if(!target_user){
        const new_user = new Users({
            firstname:fname,
            lastname:lname,
            email:email,
            password:hash
        })
        await new_user.save();
        res.status(201).json("User Registered Successfully!!!");
    }
    else{
        res.status(401).json({message:"User already exists! Please Login!"});
    }
});

router.post('/login',async (req,res)=>{
    const {email,password} = req.body;
    const user = {
        email:email,
        password:password
    }
    console.log(user);
    const target_user = await Users.findOne({email:email});
    if(target_user){
        const hashedPassword = target_user.password;
        const matching = await bcrypt.compare(password,hashedPassword);
        if(matching){
            res.status(201).json({ message: "Login Successful", user });
        }
        else{
            res.status(401).json({message:'Login failed!!! Please check your password!!!'});
        }
    }
    else{
        res.status(401).json({message:"The email doesn't exist! Please register first!!"});
    }
});


module.exports = router;