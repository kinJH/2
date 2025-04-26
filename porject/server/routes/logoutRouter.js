const session = require("express-session")
const express = require('express');
const router = express.Router();


router.get('/', (req, res)=>{
    req.session.destroy(err=>{
        if(err){
            res.send('로그아웃 오류');
            setTimeout(function(){
                res.redirect('/')
            }, 500)
        }
        else{
            res.redirect('/')
        }
        
    })
})

module.exports = router;
