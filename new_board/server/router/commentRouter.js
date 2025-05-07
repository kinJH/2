const express = require('express');
const commentLogic = require('../logic/commentLogic');
const router = express.Router();


router.post('/create-process', (req,res)=>{
    const comment = req.body;
    commentLogic.createComment(req.session.userId??null,comment.description,comment.postId)
    res.redirect(`/post/${comment.postId}`)
})

router.delete('/delete-comment',async (req, res)=>{
    const commentId = req.body.commentId;
    commentLogic.deleteComment(commentId, req.session.userId);
    return res.json({success : true})
})

    


module.exports = router;
