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
    }
}