const express = require('express');
var router = express.Router();

router.get('/', function(req, res){

    res.clearCookie('name', { path: '/' });
    res.clearCookie('is_login', { path: '/' });
    res.clearCookie('id', {path: '/'})
    res.redirect('/');    
});

module.exports = router;
