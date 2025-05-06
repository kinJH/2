const express = require('express')
var router = express.Router()
var path = require('path')
var sanitizeHtml = require('sanitize-html');
var fs = require('fs');
var template = require('../lib/template.js');
var cookie = require('cookie');
var mysql = require('mysql');
var db = require('./db.js');



router.post('/create_process', (req, res)=>{//생성 진행
    var post = req.body;
    
    db.query("INSERT INTO `board`.`comment` (`description`, `author_id`, `post_id`) VALUES (?, ?, ?);",[post.description, req.session.userId??'', post.post_id])
    res.redirect(`/topic/${post.post_id}`)

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
          <input type="hidden" name="post_id" value="${req.body.post_id}">
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
  var post = req.body;
  db.query("UPDATE `board`.`comment` SET `description` = ? WHERE (`id` =   ?);", [post.description, post.id])
  res.redirect(`/topic/${post.post_id}`)
})

router.post('/delete', (req, res)=>{//삭제 진행
  var cookies = cookie.parse(req.headers.cookie)
  comment_id = req.body.id
  db.query("DELETE FROM `board`.`comment` WHERE (`id` = ?);", [comment_id], function(err, result){
    if(err){res.send('삭제 오류')}
    res.redirect(`/topic/${req.body.post_id}`)
  })
})

router.get('/:post_id', function(req, res){//댓글 작성 페이지
  
  var post_id = req.params.post_id
  db.query("select * from post where id=?",[post_id], (err, result)=>{
    if(err){res.send('게시글 조회 중 오류')}
    var post = result[0]
    var list = template.list(req.list)
    var html = template.HTML(post.title, list, `
    <form action="/comment/create_process" method="post">
      <p>
        <textarea name="description" placeholder="댓글"></textarea>
        <input type="hidden" name="post_id" value="${post_id}">
      </p>
      <p>
        <input type="submit">
      </p>
    </form>
    `,
  '',res.locals.authStatus)
  res.send(html)
  })
})


module.exports = router;
