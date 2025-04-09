var express = require('express')
var parseurl = require('parseurl')
var session = require('express-session')

var app = express()

  app.use(session({
    secret: '1451451',
    resave: false,
    saveUninitialized: true
  }))

app.get('/', function (req, res, next) {
  console.log(req.session)
  if(req.session.num===undefined){
    req.session.num =1;
  }
  else{
    req.session.num +=1;
  }

  res.send(`views : ${req.session.num}`)
})

app.listen(3002)