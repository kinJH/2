const db = require('../db')

module.exports = {
    getPostById : (postId)=>{
        return new Promise((resolve, reject)=>{
            db.query("select * from post where id=?",[postId],(err, result)=>{
                if(err){reject(err)}
                return resolve(result[0])
            })
        })
    },
    boardPosts :  (board)=>{
        return new Promise((resolve, reject)=>{
            db.query("select * from post where board_name=?",[board],(err, result)=>{
                if(err){return reject(err)}
                return resolve(result)
            })
        })
    },
    deleteById : (postId)=>{
        db.query("DELETE FROM `board`.`post` WHERE (`id`=?);",[postId],(err, result)=>{
            if(err){throw err}
        })
    },
    createPost : (title, description, board, userId)=>{
        return new Promise((resolve, reject)=>{
            db.query("INSERT INTO `board`.`post` (`title`, `description`, `author_id`, `board_name`) VALUES (?,?,?,?);",[title, description, userId??null, board],(err, result)=>{
                if (err){return reject(err)}
                return resolve(result)
            })
        })
    },
    updatePost : (id, title, description)=>{
        return new Promise((resolve, reject)=>{
            db.query("UPDATE `board`.`post` SET `title` = ?, `description` = ? WHERE (`id` =?);",[title, description, id],(err, result)=>{
                if(err){reject(err)}
                else{resolve(result)}
            })

        })
    },
    postUp : (postId)=>{
        return new Promise((resolve, reject)=>{
            db.query("UPDATE post SET goods = goods + 1 WHERE id = ?;",[postId],(err, result)=>{
                if(err){reject(err)}
                resolve(result)
            })
        })
    },    
    postDown : (postId)=>{
        return new Promise((resolve, reject)=>{
            db.query("UPDATE post SET bads = bads + 1 WHERE id = ?;",[postId],(err, result)=>{
                if(err){reject(err)}
                resolve(result)
            })
        })
    },
    getPostsByUser : (userId)=>{
        return new Promise((resolve, reject)=>{
            db.query("select * from post where author_id=?",[userId],(err, result)=>{
                if(err){throw reject(err)}
                return resolve(result)
            })
        })
    },
    clearUserPost : (userId)=>{
        return new Promise((resolve, reject)=>{
            db.query("delete from post where author_id=?",[userId],(err, result)=>{
                if(err){return reject(err)}
                return resolve(result)
            })
        })
    }
}
