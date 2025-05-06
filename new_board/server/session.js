const session = require('express-session')

const sessionMiddleware = session({
  secret: '1451451',
  resave: false,
  saveUninitialized: true
})


module.exports = sessionMiddleware; 