const db = require('../db')

module.exports = {
    getUserById : async (id)=>{
        return new Promise((ok, no)=>{
            db.query("select * from user where id=?",[id],(err, result)=>{
                if(err){return no(err)}
                return ok(result[0])
            })
        })
    },
    signup :  (id, password, name)=>{
        db.query("INSERT INTO `board`.`user` (`id`, `password`, `name`) VALUES (?,?,?);",[id, password, name], (err, result)=>{
            if(err){throw err}
            return result
        })
    }
}