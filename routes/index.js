const express = require('express')
var router = express.Router()
var path = require('path')
var sanitizeHtml = require('sanitize-html');
var fs = require('fs');
var template = require('../lib/template.js');
var cookie = require('cookie');

router.get('/', function(req,res){//기본페이지
    var title = 'Welcome';
    var description = '';
    var list = template.list(req.list);
    console.log(res.locals.authStatus)
    
    var html = template.HTML(title, list,
      `<h2>${title}</h2>${description}
      <img src="/images/balloon.jpg" style="width:100px; display:block; margin:10px">`,
      `<a href="/topic/create">create</a>`, res.locals.authStatus);
    res.send(html)
    
  }
)
module.exports = router