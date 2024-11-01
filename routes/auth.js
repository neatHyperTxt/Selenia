const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data.json');
router.post('/register',(req,res)=>{
    const {fname,lname,email,password} = req.body;
    console.log('From the backend');
    console.log(fname,lname,email,password);
    const responseData = {
        fname: fname,
        lname: lname,
        email: email,
        password: password
    }
    if(fs.existsSync('./data.json')){
        const data = fs.readFileSync('./data.json','utf8');
        let jsonData = JSON.parse(data);
        jsonData.push(responseData);
        const updatedData = JSON.stringify(jsonData);
        fs.writeFileSync('./data.json',updatedData);
        console.log('Data added successfully');
    }
    else{
        const jsonData = [];
        jsonData.push(responseData);
        const updatedData = JSON.stringify(jsonData);
        fs.writeFileSync('./data.json',updatedData);
        console.log('Data added successfully');
    }
    res.status(201).json({message:'User registered successfully'});
});
router.post('/login',(req,res)=>{
    const {email,password} = req.body;
    console.log(email,password);
    console.log(fs.existsSync(dataPath));
    {
        const data = fs.readFileSync(dataPath);
        const jsonData = JSON.parse(data);
        const user = jsonData.find(user=> (user.email===email && user.password===password));
        console.log(user);
        if(user){
            res.status(200).json({message:'Log in successful',user});
        }
        else{
            res.status(401).json({message:'Login failed!!! Please check credentials'});
        }
    }
    // else{
    //     res.status(401).json({message:'Login failed!!! Please check credentials'});
    // }
});


module.exports = router;