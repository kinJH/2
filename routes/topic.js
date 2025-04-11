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



router.post('/create_process', function(request, response){//생성진행
  var post = request.body;
  var title = post.title;
  var cookies = cookie.parse(request.headers.cookie || '');
  var author = cookies.name || '';
  var description = post.description;
  var postjson = {
    author : author,
    title : title,
    description : description
  }
  fs.writeFile(`data/post/${title}.json`, JSON.stringify(postjson), 'utf-8', error=>{
    response.redirect(`/topic/${title}.json`)
  })
})

router.get('/update/:pageId', (request, response) =>{//수정페이지
  var filteredId = path.parse(request.params.pageId).base;
  fs.readFile(`data/post/${filteredId}.json`, 'utf8', function(err, content){
    
    var postjson = JSON.parse(content);
    var cookies = cookie.parse(request.headers.cookie || '');
    var loginUser = decodeURIComponent(cookies.name || '');
    var isAuthor = loginUser === postjson.author;
    var list = template.list(request.list)
    
    var list = template.list(request.list);
    var html = template.HTML(
      sanitizeHtml(postjson.title),
      list,
      `
      <form action="/topic/update_process" method="post">
        <input type="hidden" name="old_title" value="${sanitizeHtml(postjson.title)}">
        <p><input type="text" name="title" placeholder="title" value="${sanitizeHtml(postjson.title)}"></p>
        <p><textarea name="description" placeholder="description">${sanitizeHtml(postjson.description)}</textarea></p>
        <p><input type="submit" value="수정"></p>
      </form>
      `,
      `<a href="/topic/create">create</a>`,
      response.locals.authStatus
    );
    response.send(html)
  });
})

router.post('/update_process', (request, response) => {//수정 진행
  var post = request.body;
  var oldTitle = post.old_title;
  var newTitle = post.title;
  var oldFilename = `data/post/${oldTitle}.json`;
  var newFilename = `data/post/${newTitle}.json`;

  var cookies = cookie.parse(request.headers.cookie || '');
  var loginUser = decodeURIComponent(cookies.name || '');

  fs.readFile(oldFilename, 'utf8', (err, content) => {
    if (err) {
      return response.status(500).send('error');
    }
    var postjson = JSON.parse(content);
    
    if (loginUser !== postjson.author) {
      return response.send(`
        <script>
          alert("작성자 불일치");
          location.href = "/";
        </script>
      `);
    }
    postjson.title = newTitle;
    postjson.description = post.description;

    fs.rename(oldFilename, newFilename, function(err){
      fs.writeFile(newFilename, JSON.stringify(postjson), 'utf8', err => {
        if (err) return response.status(500).send('파일 저장 실패');
        response.redirect(`/topic/${newTitle}.json`);
      })
    })
  });
});
router.post('/delete_process', function(request, response){ //삭제 진행
  var post = request.body;
  fs.unlink(`data/post/${post.id}.json`, error =>{
    response.redirect('/')
  })
})  


router.get('/:pageId', function(request, response, next){//상세페이지
  var filteredId = path.parse(request.params.pageId).base ;
  fs.readFile(`data/post/${filteredId}`, 'utf8', function(err, content){
    if(err){next(err)}
    else{
    var postjson = JSON.parse(content);
    var sanitizedTitle = sanitizeHtml(postjson.title);
    var cookies = cookie.parse(request.headers.cookie || '');
    var loginUser = decodeURIComponent(cookies.name || '');
    var isAuthor = loginUser === postjson.author;
    var sanitizedDescription = sanitizeHtml(postjson.description, {
      allowedTags:['h1']
    });
    db.query(`select * from comment where post=?`, [path.parse(filteredId).name], (err, result)=>{
      sanitizedDescription += `<a href="/comment/create" onclick="document.cookie='postTitle=${encodeURIComponent(sanitizedTitle)}; path=/'"></br></br>댓글<br><br><br></a>`
      var i = 0
      while(i<result.length){// 댓글
        var delete_button = ''
        var edit_button = ''
        if(cookies.id==result[i].author_id){
          var delete_button = `
          <form action="/comment/delete" method="post" style="display:inline">
            <input type="hidden" name="postTitle" value="${result[i].post}">
            <input type="hidden" name="id" value="${result[i].id}">
            <input type="submit" value="댓글 삭제">
          </form>
          `
          var edit_button = `
          <form action="/comment/update" method="post" style="display:inline">
            <input type="hidden" name="id" value="${result[i].id}">
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
          <a href="/topic/update/${sanitizedTitle}">update</a>
          <form action="/topic/delete_process" method="post" style="display:inline">
            <input type="hidden" name="id" value="${sanitizedTitle}">
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
  });
})

module.exports = router;