const express = require('express')
var router = express.Router()
var path = require('path')
var sanitizeHtml = require('sanitize-html');
var fs = require('fs');
var template = require('../lib/template.js');
var cookie = require('cookie');
var mysql = require('mysql');
var db = require('./db.js');




router.get('/', (req, res)=>{//로그인 페이지
  var title = 'login';
  var list = template.list(req.list)
  var description = `
  <form action='/login/login_process' method='post'>
  <p><input type='text' name='id' placeholder='id'></p>
  <p><input type='password' name='password' placeholder='password'></p>
  <input type='submit' value='로그인'>
  </form>`; 
  var html = template.HTML(title, list, description,`
  <a href='/signup'>가입</a>`, res.locals.authStatus)
  res.send(html) 
})

router.post('/login_process', (req, res)=>{ //로그인진행
    var info = req.body;
    var id = info.id;
    var password = info.password; 

    db.query(`select * from user where id=?`,[id], (err, result)=>{
        if(err){throw err}

        if(!result[0]){
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
            res.end(`<script> alert('아이디 오류'); location.href='/login';</script>`)
        }
        
        else if(id ===result[0].id && password === result[0].password){//로그인 성공
            req.session.is_logined = true;
            req.session.name = result[0].name;
            req.session.userId = result[0].id;
            res.redirect('/')
                    
        }
        else{
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
            res.end(`<script> alert('로그인 오류'); location.href='/login';</script>`)
        }   
    })
})

module.exports = router