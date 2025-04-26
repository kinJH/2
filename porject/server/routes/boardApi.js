const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/:board_name', (req, res)=>{
    const board_name = req.params.board_name;
    db.query("select * from post where board_name=? order by id DESC",[board_name],(err, result)=>{
        if(err){res.send('게시글 db 오류')}
        else{
            return res.json(result)
        }
    })
})

module.exports = router;

