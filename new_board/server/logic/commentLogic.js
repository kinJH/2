const commentRepo = require("../repository/commentRepo")

module.exports = {
    loadComments : (postId)=>{
        return new Promise(async (resolve, reject)=>{
            resolve(await commentRepo.loadComments(postId))
        })
    },
    createComment : (authorId, description, postId)=>{
        commentRepo.createComment(authorId, description, postId)
    },
    getPostIdByCommentId : (commentId)=>{
        return new Promise(async(resolve, reject)=>{
            const comment = await commentRepo.comment(commentId);
            const postId = comment.post_id;
            resolve(postId);
        })
    },
    deleteComment : async (commentId, userId)=>{
        comment = await commentRepo.comment(commentId)
        if(userId===comment.author_id||!comment.author_id){
            commentRepo.deleteComment(commentId)
        }
        else{
            return new Error('권한 없음')
        }
    }
}