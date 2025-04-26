const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/create-process',(req, res)=>{
    const post = req.body;
    const userId=req.session.userId
    db.query("INSERT INTO `board`.`post` (`title`, `description`, `board_name`, `author_id`) VALUES (?,?,?,?);",[post.title, post.description, post.board, userId], (err, result)=>{
        if(err){return res.status(500).send("쓰기 중 DB 오류");}
        res.redirect(`/post/${result.insertId}`)
    })
})


router.get('/delete-process/:post_id',(req,res)=>{
    const postId = req.params.post_id;
    db.query("select * from post where id=?",[postId],(err,result)=>{
        const board=result[0].board_name;
        if(err){return res.status(500).send("db오류")}
        if(result[0].author_id!==(req.session.userId??null)){
            return res.status(403).send('작성자만 삭제가능');        
        }
        db.query("delete from post where id=?",[postId],(err)=>{
            if(err){return res.status(500).send("삭제중 db오류")}
            return res.redirect(`/board/${board}`)
        })
    })
})

router.get('/:post_id', (req, res)=>{
    const postId = req.params.post_id;
    db.query("select * from post where id=?;",[postId], function(err, result){
        if(err){
            res.status(500);
            return res.json({err:'DB조회 실패'})
        }
        res.status(200)
        result[0].isAuthor=result[0].author_id===req.session.userId;
        return res.json(result[0])
    })
})



module.exports = router;