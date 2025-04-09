const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var fs = require('fs');
const compression = require('compression');
const { default: helmet } = require('helmet');
var cookie = require('cookie');

var topicRouter = require('./routes/topic.js')
var indexRouter = require('./routes/index.js');
var loginRouter = require('./routes/login.js');
var signupRouter = require('./routes/signup.js')
var logoutRouter = require('./routes/logout.js');
var commentRouter = require('./routes/comment.js');


app.use((req, res, next)=>{
  var cookies = {}

  if (req.headers.cookie){
    cookies = cookie.parse(req.headers.cookie);
  }
  if (cookies.is_login ==='logined'){
    res.locals.authStatus = `
    ${cookies.name}님 <a href='/logout'>logout</a>
    `
  }
  else{
    res.locals.authStatus = `
    <a href='/login'>login</a>
    `
  }
  next();
})


// app.use(helmet())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression())


app.get('*',function(request, response, next){
  fs.readdir('./data/post', function(error, filelist){
    request.list = filelist;
    next();
  })
})



app.use('/', indexRouter);
app.use('/topic',topicRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/logout', logoutRouter);
app.use('/comment', commentRouter);

app.use((err, req, res, next)=>{
  console.error(err.stack)
  res.status(500).send('something broken')
})

app.get('/page', (req,res) => res.send('page'))
  
app.use((req, res, next)=>{
  res.status(404).send('not found');
})
app.listen(3000, ()=> console.log('listening 3000'))

