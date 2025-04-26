const boardTitle = document.getElementById('board-title');
const boardBody = document.getElementById('board-body');
const board_name = window.location.pathname.split('/')[2]



fetch(`/api/board/${board_name}`).then(res=>res.json()).then(posts=>{
    boardTitle.innerHTML=board_name

    if(posts.err){
        boardBody.innerText=posts.err;
        return  
    }  
    let li = `<a href="/post-create">글쓰기</a>`
    li +='<ul>';
    for(let i=0; i<posts.length; i++){
        const post = posts[i];
        li += `<li><a href="/post/${post.id}">${post.title}</a></li>`
    }
    li += '</ul>'
    boardBody.innerHTML = li;
    
})