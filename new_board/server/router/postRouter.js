const express = require('express');
const postLogic = require('../logic/postLogic');
const postRepo = require('../repository/postRepo');
const commentLogic = require('../logic/commentLogic');
const router = express.Router();


router.post('/create-process',async (req, res)=>{
    const {title,description,board} = req.body;
    result = await postLogic.create(title, description, board, req.session.userId)
    res.redirect(`/post/${result.insertId}`)
})

router.get('/delete-process/:post_id', (req, res)=>{
    const postId = req.params.post_id
    postLogic.delete(req.session.userId, postId)
    res.redirect('/')
})

router.get('/:post_id', async (req, res)=>{
    const postId = req.params.post_id;
    const post = await postRepo.getPostById(postId);
    if(!post){return res.status(404).send('게시글이 존재하지 않습니다');}
    let controller = ''
    if(postLogic.isAuthor(req.session.userId, post.author_id)){
        controller = `<a href="/post/delete-process/${postId}">삭제</a> <a href="/post/edit/${postId}">수정</a>`
    }
  

    res.render('index',{
        boardTitle:post.title,
        boardBody: post.description,
        underBody: controller,
        template1:'postButtons',
        template2 : 'comment',
        postId : postId,
        userId : req.session.userId
    })
})

router.get('/edit/:post_id', async (req, res)=>{
    const postId = req.params.post_id;
    const {title, description} = await postRepo.getPostById(postId)
    res.render('index',{
        boardTitle:'',
        boardBody: '',
        underBody: '',
        template1 : 'editForm',
        title:title,
        description:description,
        postId:postId

    })
})

router.post('/update-process', async (req, res)=>{
    const post = req.body;
    await postLogic.update(post.postId, post.title, post.description)
    res.redirect(`/post/${post.postId}`)

})

module.exports = router;