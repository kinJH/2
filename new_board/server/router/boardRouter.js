const express = require('express');
const router = express.Router();
const boardLogic = require('../logic/boardLogic');


router.get('/:board_name/create', (req, res)=>{
    res.render('index',{
        boardTitle:'',
        boardBody: '',
        underBody: '',
        template1:'createForm'
    })
})



router.get('/:board_name', async (req, res)=>{
    const board = req.params.board_name;
    
    res.render('index',{
        boardTitle:board,
        boardBody: await boardLogic.makeList(board),
        underBody:`<a href="/board/${board}/create">글쓰기</a>`
    })  
})





module.exports = router;