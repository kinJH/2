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
    signup : async ({id, password, passwordCheck, name})=>{
        if(await authRepo.getUserById(id)){
            throw new Error('ID 중복')
        }
        else{
            await authRepo.signup(id, password, name)
        }
    },
    deleteAccount : async (userId, password)=>{
        const userInfo = await authRepo.getUserById(userId);
        if(userInfo.password===password){
            authRepo.deleteAccount(userId)
        }
        else{throw new Error('비밀번호 불일치')}
    }
}