const express = require('express')
var router = express.Router()
var path = require('path')
var sanitizeHtml = require('sanitize-html');
var fs = require('fs');
var template = require('../lib/template.js');
var cookie = require('cookie');

router.get('/create', (req, res)=>{
    cookies = cookie.parse(req.headers.cookie);
    console.log(cookies.is_login)

    res.send('comment')
})

module.exports = router;