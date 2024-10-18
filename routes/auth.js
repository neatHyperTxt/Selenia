const express = require('express');
const router = express.Router();

router.get('/login',(req,res,next)=>{
    res.render('login',{
        path:'/login'
    });
});
router.get('/register',(req,res,next)=>{
    res.render('register',{
        path:'/register'
    });
});
router.post('/register',(req,res,next)=>{
    const user_data = {
        fname: req.body.fname,
        uname: req.body.uname,
        email: req.body.email,
        password: req.body.password
    }
    console.log(user_data);
    console.log('Successful POST');
    res.redirect('/');
});
router.post('/login',(req,res,next)=>{
    const user_data = {
        email: req.body.email,
        password: req.body.password
    }
    console.log(user_data);
    res.redirect('/');
});


module.exports = router;