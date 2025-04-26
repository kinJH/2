const boardTitle = document.getElementById('board-title');
const boardBody = document.getElementById('board-body');
const nowBoard = document.cookie.split('=')[1]

boardTitle.innerHTML = nowBoard;
boardBody.innerHTML = `
<form action="/api/post/create-process" method="post">
    <input type="text" name="title" placeholder="제목"><br>
    <input type="text" name="description" placeholder="내용" style= "height: 80px;">
    <input type="hidden" name="board" value=${nowBoard}>
    <input type="submit" value="작성">
</form>`

