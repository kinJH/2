const express = require('express');
const commentLogic = require('../logic/commentLogic');
const router = express.Router();


router.get('/comments/:post_id', async (req, res)=>{
    const postId = req.params.post_id
    const comments= await commentLogic.loadComments(postId)
    res.json(comments)
})

    


module.exports = router;
