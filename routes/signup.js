const express = require('express')
var router = express.Router()
var path = require('path')
var template = require('../lib/template.js');
var db = require('./db.js');


router.get('/', (req, res)=>{
    var title = 'sign up';
    var list = template.list(req.list);
    var description = `
    <form action='/signup/signup_process' method='post'>
    <p><input type='text' name='name' placeholder='이름'></p>
    <p><input type='text' name='id' placeholder='아이디'></p>
    <p><input type='password' name='password' placeholder='password'></p>
    <p><input type='password' name='password_check' placeholder='비밀번호 확인'></p>
    <input type='submit' value='제출'>
    </form>`
    var html = template.HTML(title, list, description, '','')
    res.send(html)
})

router.post('/signup_process', (req, res)=>{
    var info = req.body;
    
    if(info.password===info.password_check){
        db.query('INSERT INTO user (id, password, name) VALUES (?, ?, ?)', [info.id, info.password, info.name], (err)=>{
          if(err){
            res.send(`
            <script>
              alert('중복 ID');
              location.href = '/signup';
            </script>
            `)
          }
          else{
            res.redirect('/')
          }
        })
    }
    else {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.send(`
          <script>
            alert('비밀번호가 일치하지 않습니다.');
            location.href = '/signup';
          </script>
        `);
      }
    });
module.exports = router