import express from "express";
import UserController from "../userController/user.controller.js";
const userController=new UserController();
const userRouter=express.Router();
userRouter.post("/signUp",userController.signUp);
userRouter.post("/signIn",userController.signIn);
userRouter.get("/logout",userController.logOut);
export default userRouter;