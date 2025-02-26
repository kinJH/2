var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var path = require('path')
var mysql = require('mysql');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

var db = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '',
  database : 'board'
}) 

// function createTemplate(description){`
// <body>
//     <h1><a href="./">메인으로</a></h1>
//     <table>
//         <tr>
//             <li><a href="./board">게시판</a></li>
//             <li><a href="./sign_in">로그인</a></li>
//             <li><a href="./sign_up">회원가입</a></li>
//         </tr>
//     </table>
//     ${description}
// </body>
// `
// }







var app = http.createServer(function(request,response){
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var id = queryData.id;
  var pathname = url.parse(_url, true).pathname

  if(pathname==='/'){
    if(id===undefined){
      template = `
      <head><meta charset="UTF-8"/></head>
    <h1>
      <a href="/">메인으로</a>
    </h1>
    <tr>
      <li><a href="./board">게시판</a></li>
      <li><a href="./sign_in">로그인</a></li>
      <li><a href="./sign_up">회원가입</a></li>
    </tr>
      `
      response.end(template)
    }    
  }
  else if(pathname=='/board'){
    response.end('board')
  }
  else if(pathname=='/sign_in'){ //로그인 페이지
    fs.readFile('./sign_in.html', 'utf-8', (err, data) =>{
      if(err){
        response.writeHead(404)
        response.end('page not found')
      }
      response.end(data)
    })
  }
  else if (pathname=='/sign_in_process'){ //로그인 진행
    var body = ''
    request.on('data', function(data){
      body +=data;
    })
    request.on('end', function(){
      user_data = qs.parse(body)
      db.query(`select * from user where id=?`, [user_data.id], function(err, result){
        if(result.length ===0){
          response.writeHead(401, { "Content-Type": "text/html; charset=utf-8" });
          response.end(`<script>alert('아이디 오류'); window.location='/';</script>`)
          return;
        }
        else if(result[0].password===user_data.password){
          response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          response.end(`<script>alert('로그인 성공'); window.location='/';</script>`)
          return;
        }
        else{
          response.writeHead(401, { "Content-Type": "text/html; charset=utf-8" });
          response.end(`<script>alert('비밀번호 오류'); window.location='/';</script>`)
          return;
        }
      })
    })
  }
  else if(pathname == '/sign_up'){ //회원가입 페이지
    fs.readFile("./sign_up.html", "utf-8", (err, data) =>{
      if(err){console.log('pageError')}
      else{
        response.end(data)
      }
    })
  }
  else if(pathname=='/sign_up_process'){ //회원가입 진행
    var body ='';
    request.on('data', function(data){
      body += data;
    })
    request.on('end', function(){
      var user_data = qs.parse(body)
      db.query(`insert into user values(?, ?, ?)`,[user_data.id, user_data.password, user_data.name], function(err, post){
        if(err){
          response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          response.end(`<script>alert('사용 불가능 ID'); window.location='/sign_up';</script>`)
        }
        else{
          response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          response.end(`<script>alert('가입완료'); window.location='/';</script>`)
        }

      })
    })
  }

    
})
app.listen(3001);