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
    const writeButton = await boardLogic.writeButton(board, req.session.userId)
    
    res.render('index',{
        boardTitle:board,
        boardBody: await boardLogic.makeList(board),
        underBody:writeButton
    })
})





module.exports = router;