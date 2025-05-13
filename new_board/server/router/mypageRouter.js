const express = require('express');
const postLogic = require('../logic/postLogic');
const commentLogic = require('../logic/commentLogic');
const authLogic = require('../logic/authLogic');
const router = express.Router();

router.use((req, res, next)=>{
    if(!req.session.isLoggedIn || !req.session.userId){
        return res.status(403).send('<script>alert("로그인 필요"); location="/"</script>')
    }
    next()
})

router.get('/', async (req, res)=>{
    const myPosts = await postLogic.myPostsInfo(req.session.userId)
    const myComments = await commentLogic.myComments(req.session.userId)
    res.render('index', {
        boardTitle : 'mypage',
        boardBody : '',
        underBody : '<a href="/mypage/delete-account">탈퇴</a>', 
        template1 : 'myPosts',
        myPosts : myPosts,
        template2 : 'myComments',
        myComments : myComments
    })
})

router.get('/delete-account', (req, res)=>{
    res.render('index',{
        boardTitle:'delete',
        template1 : 'deleteAccount'
    })
})

router.post('/deleting-account',async (req, res)=>{
    const{password} = req.body;
    try {
        await authLogic.deleteAccount(req.session.userId,password)
        res.send('<script>alert("탈톼완료"); location="/"</script>')
    } catch (error) {
        console.log(error.message)
        res.send(`<script>alert("${error.message}"); location="/mypage"</script>`)
    }
})


module.exports = router;