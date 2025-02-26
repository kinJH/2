const http = require('http');
const mysql = require('mysql2');

const PORT = 4000;

// MariaDB 연결 설정
var db = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '',
  database : 'board'
})


// 데이터베이스 연결 확인
db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MariaDB');
});

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    
    if (req.method === 'GET' && req.url === '/posts') {
        db.query('SELECT * FROM posts', (err, results) => {
            if (err) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: err.message }));
                return;
            }
            res.writeHead(200);
            res.end(JSON.stringify(results));
        });
    } else if (req.method === 'POST' && req.url === '/posts') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            const { title, content } = JSON.parse(body);
            db.query('INSERT INTO posts (title, content) VALUES (?, ?)', [title, content], (err, result) => {
                if (err) {
                    res.writeHead(500);
                    res.end(JSON.stringify({ error: err.message }));
                    return;
                }
                res.writeHead(201);
                res.end(JSON.stringify({ id: result.insertId, title, content }));
            });
        });
    } else if (req.method === 'PUT' && req.url.startsWith('/posts/')) {
        const id = req.url.split('/')[2];
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            const { title, content } = JSON.parse(body);
            db.query('UPDATE posts SET title = ?, content = ? WHERE id = ?', [title, content, id], (err) => {
                if (err) {
                    res.writeHead(500);
                    res.end(JSON.stringify({ error: err.message }));
                    return;
                }
                res.writeHead(200);
                res.end(JSON.stringify({ message: 'Post updated successfully' }));
            });
        });
    } else if (req.method === 'DELETE' && req.url.startsWith('/posts/')) {
        const id = req.url.split('/')[2];
        db.query('DELETE FROM posts WHERE id = ?', [id], (err) => {
            if (err) {
                res.writeHead(500);
                res.end(JSON.stringify({ error: err.message }));
                return;
            }
            res.writeHead(200);
            res.end(JSON.stringify({ message: 'Post deleted successfully' }));
        });
    } else {c
        res.writeHead(404);
        res.end(JSON.stringify({ message: 'Not Found' }));
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
