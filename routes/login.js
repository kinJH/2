const express = require('express')
var router = express.Router()
var path = require('path')
var sanitizeHtml = require('sanitize-html');
var fs = require('fs');
var template = require('../lib/template.js');
var cookie = require('cookie');
var mysql = require('mysql');



var db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'board'
}) 



router.get('/', (req, res)=>{//로그인 페이지
  var title = 'login';
  var list = template.list(req.list)
  var description = `
  <form action='/login/login_process' method='post'>
  <p><input type='text' name='id' placeholder='id'></p>
  <p><input type='password' name='password' placeholder='password'></p>
  <input type='submit' value='로그인'>
  </form>`;
  var html = template.HTML(title, list, description,'', res.locals.authStatus)
  res.send(html) 
})

router.post('/login_process', (req, res)=>{ //로그인진행
    var info = req.body;
    var id = info.id;
    var password = info.password; 

    db.query(`select * from user where id=?`,[id], (err, result)=>{
        if(err){throw err}
        console.log(result[0].id)
        
        if(id ===result[0].id && password === result[0].password){
            res.writeHead(302,{location:`/`, 'set-cookie':
                [`name=${encodeURIComponent(result[0].name)}; Path=/`,
                'is_login=logined; Path=/'
                ]
            })
            res.end()
        }
        else{
            res.writeHead(302, {location:`/login`})
            res.end()
        }
            
    })


})

module.exports = router