const authRepo = require("../repository/authRepo");
const commentRepo = require("../repository/commentRepo");
const postRepo = require("../repository/postRepo");


module.exports = {
    login : async (id, password)=>{
        const user = await authRepo.getUserById(id);
        if(!user){throw new Error('ID 없음')}
        if(password !==user.password){throw new Error('비밀번호 오류')}

    },
    signup : async ({id, password, passwordCheck, name})=>{

        if(await authRepo.getUserById(id)){
            throw new Error('ID 중복')
        }
        if(password!==passwordCheck){
            throw new Error('비밀번호 불일치')
        }
        authRepo.signup(id, password, name)
            

    },
    deleteAccount : async (userId, password)=>{

        const userInfo = await authRepo.getUserById(userId);
        if(userInfo.password===password){
            await postRepo.clearUserPost(userId);
            await commentRepo.clearUserComment(userId);
            await authRepo.deleteAccount(userId);
        }
        else{throw new Error('비밀번호 불일치')}
    }
}