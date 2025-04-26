const boardTitle = document.getElementById('board-title');
const boardBody = document.getElementById('board-body');
const postId = window.location.pathname.split('/')[2]

fetch(`/api/post/${postId}`).then(res=>res.json()).then(data=>{
    const deleteButton = `<br><br><a href="/api/post/delete-process/${postId}">삭제</a>&emsp;`;
    const editButton =`<a href="/post/edit/${postId}">수정</a>`
    boardTitle.innerHTML=data.title;
    boardBody.innerHTML=data.description;
    if(data.isAuthor||!data.author_id){
        boardBody.innerHTML += deleteButton;
        boardBody.innerHTML += editButton;    
    }
})