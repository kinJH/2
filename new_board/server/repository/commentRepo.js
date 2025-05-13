const db = require('../db')
module.exports = {
    loadComments : (postId) => {
        return new Promise((resolve, reject)=>{
            db.query('select * from comment where post_id=?',[postId],(err, result)=>{
                if(err) {return reject(err)}
                resolve(result)
            })
        })
    },
    createComment : (authorId, description, postId)=>{
        db.query("INSERT INTO `board`.`comment` (`author_id`, `post_id`, `description`) VALUES (?,?,?);",[authorId, postId, description],(err, result)=>{
            if(err){throw err}
        })
    },
    comment : (commentId)=>{
        return new Promise((resolve, reject)=>{
            db.query("select * from comment where id=?",[commentId],(err, result)=>{
                if(err){return reject(err)}
                return resolve(result[0])
            })
        })
    },
    deleteComment : (commentId)=>{
        db.query("DELETE FROM `board`.`comment` WHERE (`id`=?);",[commentId],(err, result)=>{
            if(err){throw err}
        })
    },
    getCommentsByauthor : (userId)=>{
        return new Promise((resolve, reject)=>{
            db.query("select comment.id as comment_id, comment.post_id as post_id, comment.description, post.description as post_description, comment.author_id, post.title as post_title, comment.created from comment, post where comment.author_id=? and post_id = post.id;",
                [userId],(err, result)=>{
                if(err){throw reject(err)}
                return resolve(result)
            })
        })
    },
    getCommentsByPostid : (postId)=>{
        return new Promise((resolve, reject)=>{
            db.query("select * from comment where post_id=?",[postId],(err, result)=>{
                if(err){throw reject(err)}
                return resolve(result)
            })
        })
    }

}