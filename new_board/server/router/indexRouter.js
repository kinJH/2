const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.render('index', {
        boardTitle :'welcome',
        boardBody : '',
        underBody : ''
    })
})

module.exports = router;