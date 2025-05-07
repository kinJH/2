const express = require('express');
const commentLogic = require('../logic/commentLogic');
const postLogic = require('../logic/postLogic');
const postRepo = require('../repository/postRepo');

const router = express.Router();

router.get('/comments/:post_id', async (req, res)=>{
    const postId = req.params.post_id
    const comments= await commentLogic.loadComments(postId)
    res.json(comments)
})

router.post('/post-up', async (req, res)=>{
    try{
        const postId = req.body.postId;
        await postLogic.postUp(postId);
        const post = await postRepo.getPostById(postId)
        res.json({goods:post.goods})
    
    } catch(err){
        throw(err)
    }    
})

    


module.exports = router;
