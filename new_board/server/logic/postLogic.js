const commentRepo = require("../repository/commentRepo");
const postRepo = require("../repository/postRepo")

module.exports = {
    isAuthor : (userId, authorId)=>{
        if(userId===authorId||authorId===null){return true}
        else{return false}
    },

    delete : async (userId, postId)=>{
        const post = await postRepo.getPostById(postId);
        const author = post.author_id;
        if(module.exports.isAuthor(userId, author)){
            await postRepo.deleteById(postId)
        }
        else{throw new Error('삭제 권한 없음')}
    },
    create : (title, description, board, userId)=>{
        return new Promise(async (resolve, reject)=>{
            result = await postRepo.createPost(title, description, board, userId);
            resolve(result)
        })
    },
    update : async (id, title, description)=>{
        await postRepo.updatePost(id, title, description)
    },
    postUp : async (postId, cookies) => {
        const liked = cookies[`liked-${postId}`]
        if(liked){
            throw new Error('liked')
        }
        else {return await postRepo.postUp(postId);}
    },
    postDown : async (postId) => {
        return await postRepo.postDown(postId);
    },
    myPostsInfo :  (userId)=>{
        return new Promise(async (resove, reject)=>{
            const posts = await postRepo.getPostsByUser(userId)
            for(let i=0;i<posts.length;i++){
                let post = posts[i];
                let comment = await commentRepo.getCommentsByPostid(post.id);
                posts[i].commentNum = comment.length;
            }
            resove(posts)
        })
    },
    postComments : (postId)=>{
        return new Promise(async (resolve, reject)=>{
            const comments = await commentRepo.getCommentsByPostid(postId)
            resolve(comments)
        })
    }
}