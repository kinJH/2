const mysql = require('mysql');

var db = mysql.createConnection({
    host : 'board.cdawugs6o4sz.ap-northeast-2.rds.amazonaws.com',
    user : 'admin',
    password : '11111111',
    port : 3306,
    database : 'board'
}) 

db.connect(err => {
    if (err) {
      console.error('DB 연결 실패:', err);
    } else {
      console.log('DB 연결 성공');
    }
  });
  
  module.exports = db;