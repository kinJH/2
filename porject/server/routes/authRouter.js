const express = require('express');
const router = express.Router();
const db = require('../db');
const session = require('express-session')

router.get('/', (req, res)=>{
    if(req.session.is_loggedin){
        res.status(200);
        return res.json({
            is_loggedin:true,
            userId:req.session.userId,
            name:req.session.name
        })
    }
    else {return res.json({is_loggedin:false})}
})