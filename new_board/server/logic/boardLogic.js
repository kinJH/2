const postRepo = require("../repository/postRepo")
const authRepo = require("../repository/authRepo")

module.exports = {
    makeList : async (board)=>{
        let list='<ul>'
        const posts = await postRepo.boardPosts(board)
        for(let i=0; i<posts.length; i++){
            let post = posts[i]
            list += `<li><a href="/post/${post.id}">${post.title}</a></li>`
        }
        list +='</ul>'
        return list;
    },
    writeButton : async (boardName, userId)=>{
        if(boardName==='notice'){
            const user = await authRepo.getUserById(userId)
            try{            
                if(user.role==='admin'){
                    console.log(user)
                    return `<a href="/board/notice/create">글쓰기</a>`
                }
                else return ''
            } catch{return ''}
        }
        return `<a href="/board/${boardName}/create">글쓰기</a>`
    }
}