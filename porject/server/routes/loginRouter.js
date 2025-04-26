const express = require('express');
const router = express.Router();
const path = require('path');

const db = require('../db');

router.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '../../html/login.html'))
})

router.post('/process', (req, res)=>{
    const id=req.body.id;
    const password = req.body.password;

    if(!id||!password){
        res.status(400);
        res.json({error:"아이디 비밀번호를 입력"})
    }
    db.query("select * from user where id=?",[id],(err, result)=>{
        if(err){
            res.status(500)
            return res.json({error:"DB 조회 오류"})
        }
        if(result.length==0 || result[0].password != password){
            res.status(400)
            return res.json({error:"아이디, 비밀번호 불일치"})
        }
        if(result[0].id==id&&result[0].password==password){
            req.session.is_loggedin = true;
            req.session.name=result[0].name;
            req.session.userId=result[0].id;

            res.status(500);
            return res.redirect('/')
        }

    })
})

module.exports = router;