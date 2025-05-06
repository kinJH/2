const express = require('express')
var router = express.Router()
var path = require('path')
var sanitizeHtml = require('sanitize-html');
var fs = require('fs');
var template = require('../lib/template.js');
var cookie = require('cookie');
var mysql = require('mysql');
var db = require('./db.js');




router.get('/create', function(req, res){//생성페이지
  var title = 'WEB - create';
  var list = template.list(req.list);
  var html = template.HTML(title, list, `
    <form action="/topic/create_process" method="post">
      <p><input type="text" name="title" placeholder="title"></p>
      <p>
        <textarea name="description" placeholder="description"></textarea>
        
      </p>
      <p>
        <input type="submit">
      </p>
    </form>
  `, '', res.locals.authStatus);
  res.send(html)
})

router.post('/create_process', (req, res)=>{//생성진행
  var post = req.body;
  author = req.session.userId;
  db.query("INSERT INTO `board`.`post` (`title`, `description`, `author_id`) VALUES (?,?,?);", [post.title, post.description, author??''], (err, result)=>{
    if(err){res.send('쓰기 오류')}
    res.redirect(`/topic/${result.insertId}`)})
})


router.get('/update/:pageId', (request, response) =>{//수정페이지
  var filteredId = path.parse(request.params.pageId).base;

  db.query("select * from post where id=?",[filteredId], (err, result)=>{
    var isAuthor = res.session.userId === result[0].author_id;
    var list = template.list(request.list)
    var html = template.HTML(
      result[0].title,
      list,
      `
      <form action="/topic/update_process" method="post">
        <input type="hidden" name="post_id" value="${filteredId}">
        <p><input type="text" name="title" placeholder="title" value="${result[0].title}"></p>
        <p><textarea name="description" placeholder="description">${result[0].description}</textarea></p>
        <p><input type="submit" value="수정"></p>
      </form>
      `,
      `<a href="/topic/create">create</a>`,
      response.locals.authStatus
    );
    response.send(html)
  })
})

router.post('/update_process', (request, response) => {//수정 진행
  var post = request.body;
  db.query("UPDATE `board`.`post` SET `title`=?, `description`=? WHERE (`id`=?);", [post.title, post.description, post_id],(err, result)=>{
    response.redirect(`/topic/${insertId}`)
  })
});


router.post('/delete_process', function(request, response){ //삭제 진행
  var post = request.body;
  db.query("DELETE FROM `board`.`post` WHERE (`id`=?);",[post.id], (err, result)=>{
    if(err){response.send('삭제 오류')}
    response.redirect('/')
  })
})  


router.get('/:pageId', function(request, response, next){//상세페이지
  var filteredId = path.parse(request.params.pageId).base ;


  db.query("select * from post where id=?", [filteredId], (err, result)=>{
    if(err){next(err)}
    else{

    if (!result || result.length === 0) {
      
      return response.status(404).send("해당 게시글이 존재하지 않습니다.");
    }
    var sanitizedTitle = sanitizeHtml(result[0].title);
    var loginUser = decodeURIComponent(request.session.name || '');
    var isAuthor = request.session.userId??'' === result[0].author_id;
    var sanitizedDescription = sanitizeHtml(result[0].description, {
      allowedTags:['h1']
    });
    sanitizedDescription += `</a><br><br><br><a href="/comment/${filteredId}">댓글작성</a><br><br><br>`;
    db.query(`select * from comment where post_id=?`, [filteredId], (err, result)=>{
      var i = 0
      result = result ?? '';
      while(i<result.length){// 본문댓글
        var delete_button = ''
        var edit_button = ''
        if(request.session.userId??''==result[i].author_id){
          var delete_button = `
          <form action="/comment/delete" method="post" style="display:inline">
            <input type="hidden" name="post_id" value="${filteredId}">
            <input type="hidden" name="id" value="${result[i].id}">
            <input type="submit" value="댓글 삭제">
          </form>
          `
          var edit_button = `
          <form action="/comment/update" method="post" style="display:inline">
            <input type="hidden" name="id" value="${result[i].id}">
            <input type="hidden" name="post_id" value="${filteredId}">
            <input type="submit" value="댓글 수정">
          </form>
          `
        }
        sanitizedDescription += `${result[i].description}&ensp;${edit_button}${delete_button}<br>`
        i++
      }
      var controls = `<a href="/topic/create">create</a>`;
      if (isAuthor) {
        controls += `
          <a href="/topic/update/${filteredId}">update</a>
          <form action="/topic/delete_process" method="post" style="display:inline">
            <input type="hidden" name="id" value="${filteredId}">
            <input type="submit" value="게시글 삭제">
          </form> 
        `;
      }
      var list = template.list(request.list);
      var html = template.HTML(sanitizedTitle, list,sanitizedDescription, controls,response.locals.authStatus
      ); 
      response.send(html)
    })
    }
  })


})

module.exports = router;