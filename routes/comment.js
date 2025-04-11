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

router.get('/create', function(req, res){//댓글 작성 페이지

  var cookies = cookie.parse(req.headers.cookie);
  var title = cookies.postTitle;
  var list = template.list(req.list);
  var html = template.HTML(title, list, `
    <form action="/comment/create_process" method="post">
      <p>
        <textarea name="description" placeholder="댓글"></textarea>
      </p>
      <p>
        <input type="submit">
      </p>
    </form>
  `, '', res.locals.authStatus);
  res.send(html)
})

router.post('/create_process', (req, res)=>{
    var cookies = cookie.parse(req.headers.cookie)
    var post = req.body;
    
    db.query('INSERT INTO `board`.`comment` (`author_id`, `description`, `post`, `created`) VALUES (?,?,?, now());',[cookies.id, post.description, cookies.postTitle])
    res.redirect(`/topic/${cookies.postTitle}.json`)

})

router.post('/update', (req, res)=>{//댓글 수정 페이지
  var comment_id = req.body.id;
  db.query("select * from comment where id=?",[comment_id], (err, result)=>{
    if(err){throw err}

    var title = result[0].post;
    var list = '';
    var html = template.HTML(title, list, `
      <form action="/comment/update_process" method="post">
        <p>
          <input type="hidden" name="id" value=${comment_id}>
          <input type="hidden" name="postTitle" value="${result[0].post}">
          <textarea name="description" placeholder="댓글">${result[0].description}</textarea>
        </p>
        <p>
          <input type="submit">
        </p>
      </form>
    `, '', res.locals.authStatus);
    res.send(html)
  })
})

router.post('/update_process', (req, res)=>{//수정 진행
  post = req.body;
  db.query("UPDATE `board`.`comment` SET `description` = ? WHERE (`id` =   ?);", [post.description, post.id])
  res.redirect(`/topic/${post.postTitle}.json`)
})

router.post('/delete', (req, res)=>{//삭제 진행
  comment_id = req.body.id
  db.query("DELETE FROM `board`.`comment` WHERE (`id` = ?);", [comment_id], function(err, result){
    if(err){res.send('삭제 오류')}
    res.redirect(`/topic/${req.body.postTitle}.json`)
  })
})

module.exports = router;
