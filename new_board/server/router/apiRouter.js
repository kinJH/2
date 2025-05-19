const express = require('express');
const commentLogic = require('../logic/commentLogic');
const postLogic = require('../logic/postLogic');
const postRepo = require('../repository/postRepo');
const cookieParser = require('cookie-parser');
const router = express.Router();

router.use(cookieParser());

router.get('/comments/:post_id', async (req, res)=>{
    const postId = req.params.post_id
    const comments= await commentLogic.loadComments(postId)
    res.json(comments)
})

router.post('/post-up', async (req, res)=>{
    try{
        const postId = req.body.postId;
        await postLogic.postUp(postId, req.cookies);
        res.cookie(`liked-${postId}`,true)
        const post = await postRepo.getPostById(postId)
        res.json({goods:post.goods}) 
    } catch(err){
        if(err.message==='liked'){
            return res.status(400).json({error:'중복추천'})
        }
        else{res.status(500).json({error:'추천 중 서버 오류'})}
    }
})  

router.post('/post-down', async (req, res)=>{
    try{
        const postId = req.body.postId;
        await postLogic.postDown(postId, req.cookies);
        res.cookie(`disliked-${postId}`,true)
        const post = await postRepo.getPostById(postId)
        res.json({bads:post.bads}) 
    } catch(err){
        console.log(err)
        if(err.message==='disliked'){
            return res.status(400).json({error:'중복추천'})
        }
        else{res.status(500).json({error:'추천 중 서버 오류'})}
    }
})

    


module.exports = router;
