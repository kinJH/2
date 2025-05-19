const express = require('express');
const router = express.Router();
const authLogic = require('../logic/authLogic');
const authRepo = require('../repository/authRepo');

router.get('/login', (req, res)=>{
    res.render('index',{
        template1 : 'login',
        boardTitle:'로그인',
        boardBody:'',
        underBody:''
    })  
})


router.post('/login-process', async (req, res, next)=>{
    const {id, password}=req.body;
    try {
        await authLogic.login(id, password);
        const user = await authRepo.getUserById(id)
        req.session.isLoggedIn = true;
        req.session.userId=user.id;
        req.session.name=user.name;
        res.status(200).redirect('/')

    } catch (error) {
        next(error)
    }
})

router.get('/logout', (req, res)=>{  
    req.session.destroy(err=>{
        if(err){throw err}
        else{
            res.redirect('/')
        }
    })
})

router.get('/signup', (req, res)=>{
    res.render('index',{
        template1 : 'signup',
        boardTitle:'가입',
        boardBody:'',
        underBody:''
    })
})

router.post('/signup-process', async (req, res)=>{
    try{    
        await authLogic.signup(req.body)
        res.redirect('/')
    } catch(err){
        res.send(`<script>alert('${err.message}');location='/auth/signup'</script>`)
    }
})




module.exports = router;