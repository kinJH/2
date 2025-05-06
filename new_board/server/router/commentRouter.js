const express = require('express');
const commentLogic = require('../logic/commentLogic');
const router = express.Router();


router.post('/create-process', (req,res)=>{
    const comment = req.body;
    commentLogic.createComment(req.session.userId??null,comment.description,comment.postId)
    res.redirect(`/post/${comment.postId}`)
})
router.get('/delete/:comment_id',async (req, res)=>{
    const commentId = req.params.comment_id;
    commentLogic.deleteComment(commentId, req.session.userId);
    const postId = await commentLogic.getPostIdByCommentId(commentId);
    res.redirect(`/post/${postId}`)
})

    


module.exports = router;
