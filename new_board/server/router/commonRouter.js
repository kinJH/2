const express = require('express');
const router = express.Router();


router.get('*', (req, res, next)=>{
    res.locals.template1 = 'default'
    res.locals.template2 = 'default'
    res.locals.template3 = 'default'
    res.locals.authStatusUi = req.session.isLoggedIn 
    ? `${req.session.name}님 <a href="/auth/logout">로그아웃</a>` 
    :`<a href="/auth/login">로그인</a> <a href="/auth/signup">회원가입</a>`;
    next()
})

    


module.exports = router;
