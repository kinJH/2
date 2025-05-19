const express = require('express');
const router = express.Router();
const postLogic = require('../logic/postLogic');
const authLogic = require('../logic/authLogic');
const { getUserById } = require('../repository/authRepo');


router.get('/:board_name/create', (req, res)=>{
    const board = req.params.board_name;
    res.render('index',{
        boardTitle:board,
        boardBody: '',
        underBody: '',
        template1:'createForm'
    })
})



router.get('/:board_name', async (req, res)=>{
    const board = req.params.board_name;
    const posts = await postLogic.getPostByBoard(board)
    const user = await getUserById(req.session.userId)
    
    res.render('index',{
        boardTitle:board,
        template1 : 'boardPosts',
        posts : posts,
        role : (user?.role??'user'),
        board : board
    })
})





module.exports = router;