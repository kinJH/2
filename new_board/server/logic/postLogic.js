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
    postUp : async (postId) => {
        return await postRepo.postUp(postId);
    }
}