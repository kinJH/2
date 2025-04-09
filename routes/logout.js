const express = require('express');
var router = express.Router();

router.get('/', function(req, res){

    res.clearCookie('name');
    res.clearCookie('is_login').redirect('/');
    });

module.exports = router;
