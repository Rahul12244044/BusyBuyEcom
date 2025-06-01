import UserModel from "../userModel/user.model.js";
export default class UserController{
    async signUp(req,res){
        try{
        const {name,email,password,typeUser}=req.body;
        console.log("signUpUsers");
        console.log(req.body);
        const signUpUser=await UserModel.signUpUser(req.body);
        if(signUpUser){
        res.status(201).send(signUpUser);
        }else{
        res.status(400).send(undefined);
        }
        }catch(err){
            console.log(err);
            throw new Error("soething went wrong");
        }

    }
    async logOut(req,res){
        try{
        const {userId}=req.query;
        // console.log(req.params);
        console.log("logout");
        console.log(userId);
        const result=await UserModel.logOutUser(userId);
        console.log(result);
        res.status(200).send(result);
        }catch(err){
            console.log(err);
            throw new Error("something went wrong");
        }

    }
    async signIn(req,res){
        try{
        console.log(req.body);
        console.log("signIn");
        const result=await UserModel.signInUser(req.body);
        if(result){
            res.status(200).send(result);
        }else{
            res.status(404).send("Oops! Your credentials don’t match. Try again.")
        }
    }catch(err){
        console.log(err);
        throw new Error("something went wrong");
    }
    }
}