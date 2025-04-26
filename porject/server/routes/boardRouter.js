const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');

router.get('/:board_name', (req, res)=>{
    const boardName = req.params.board_name;
    res.cookie('nowBoard', boardName)
    res.sendFile("C:/Users/kmc01/Desktop/porject/html/index.html")
})

module.exports = router;