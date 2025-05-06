var session = require('express-session')

var sessionMiddleware = session({
  secret: '1451451',
  resave: false,
  saveUninitialized: true
})


module.exports = sessionMiddleware; 