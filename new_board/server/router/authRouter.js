const express = require('express');
const router = express.Router();
const authLogic = require('../logic/authLogic')

router.get('/login', (req, res)=>{
    res.render('index',{
        template1 : 'login',
        boardTitle:'로그인',
        boardBody:'',
        underBody:''
    })  
})

router.post('/login-process', (req, res)=>{
    authLogic.login(req, res)
})

router.get('/logout', (req, res)=>{  
    authLogic.logout(req, res)
})

router.get('/signup', (req, res)=>{
    res.render('index',{
        template1 : 'signup',
        boardTitle:'가입',
        boardBody:'',
        underBody:''
    })
})

router.post('/signup-process', (req, res)=>{
    authLogic.signup(req, res)
})



module.exports = router;