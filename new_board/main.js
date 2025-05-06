const express = require('express')
const app = express()
const path = require('path');
const sessionMiddleware = require('./server/session')
const indexRouter = require('./server/router/indexRouter')
const authRouter = require('./server/router/authRouter')
const boardRouter = require('./server/router/boardRouter')
const postRouter = require('./server/router/postRouter')
const commonRouter = require('./server/router/commonRouter')
const commentRouter = require('./server/router/commentRouter')
const apiRouter = require('./server/router/apiRouter')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(sessionMiddleware)
app.use(express.urlencoded({ extended: true }));  // req.body
app.use(express.json());   

app.use(commonRouter);
app.use('/', indexRouter)
app.use('/auth', authRouter)
app.use('/board', boardRouter)
app.use('/post', postRouter)
app.use('/comment', commentRouter)
app.use('/api', apiRouter);


app.listen(3000,()=>{
    console.log('서버 실행중')
})