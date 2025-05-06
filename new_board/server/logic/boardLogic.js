const postRepo = require("../repository/postRepo")

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
    }
}