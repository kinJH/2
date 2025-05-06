const authRepo = require("../repository/authRepo");


module.exports = {
    login : async (req, res)=>{
        const{id, password} = req.body;
        const user = await authRepo.getUserById(id);
        if(!user){return res.status(400).send('아이디 없음')}
        if(password!==user.password){return res.status(400).send('비밀번호 오류')}
        req.session.isLoggedIn = true;
        req.session.userId = user.id;
        req.session.name = user.name;
        res.redirect('/')
    },
    logout : (req, res)=>{
        req.session.destroy(err=>{
            if(err){throw err}
            else{
                res.redirect('/')
            }
            
        })
    },
    signup : async (req, res)=>{
        const {id, password, passwordCheck, name} = req.body;
        if(await authRepo.getUserById(id)){
            return res.send('id 중복')
        }
        else{
            await authRepo.signup(id, password, name)
            res.redirect('/')
        }

    }
}