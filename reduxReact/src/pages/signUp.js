import React, { useState } from "react";
import signUpCssModule from "../cssModule/signUp.module.css";
// import {useItem} from "../context/itemContext.js";
// import {NavLink,useNavigate} from "react-router-dom";
import {useEffect} from "react";
// import { useSearchParams } from "react-router-dom";
import {signUpAsync} from "../redux/reducers/userReducer.js";
import {useDispatch} from "react-redux";
import {useItem} from "../context/itemContext.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate} from "react-router-dom";
const SignUp=()=>{
    const navigate=useNavigate();
    // const {loggedIn,setLoggedIn,setAllUsers,allUsers,setUser,handleSubmitOfSignUp}=useItem();
    const [userName,setUserName]=useState("");
    const [userEmail,setUserEmail]=useState("");
    const [userPassword,setUserPassword]=useState("");
    const [userType,setUserType]=useState("");
    const dispatch=useDispatch();
    const {nameUser,setNameUser,setTypeCustomer,setLoggedIn,setUserId,setUserExist,userExist}=useItem();
    const [signUp,setSignUp]=useState(true);
   const handleSignUp=(event)=>{
        event.preventDefault();
        if(userType!=="seller" && userType!=="buyer"){
            toast.error("Please enter only 'seller' or 'buyer'.");
            navigate("/signUp");
            return;
        }
        const signUpUser={
            name:userName,
            email:userEmail,
            password:userPassword,
            userType
        }
        setSignUp(false);
        dispatch(signUpAsync({payload:signUpUser,setNameUser,setTypeCustomer,setLoggedIn,setUserId,setUserExist})).unwrap().then((user)=>{
            console.log("user");
            console.log(user);
           if(user.signUp){
            console.log("signUp$$$$$$$$$$$$$$$$$$$$$$$$$$$");
            console.log(user);
            navigate("/")
           }else{
            toast.error("Error(auth/email-already-in-use).");
            setUserExist(false);
           }
        });
        setTimeout(()=>{
            setSignUp(true);
        },5000);
        // localStorage.setItem("loggedIn",true);
        // localStorage.setItem("userType",userType);
        // navigate("/");
    }
    return (
    <>
    <div className={signUpCssModule.signIn}>
        <h2 className={signUpCssModule.signInAndSignUp}>SignUp</h2>
        <form onSubmit={handleSignUp}  className={signUpCssModule.signInForm}>
            <input onChange={(event)=>setUserName(event.target.value)} className={signUpCssModule.input} name="names" type="text" value={userName}  placeholder="Enter Name" required/>
            <input onChange={(event)=>setUserEmail(event.target.value)} className={signUpCssModule.input} name="email" type="email" value={userEmail}  placeholder="Enter Email" required/>
            <input onChange={(event)=>setUserPassword(event.target.value)} className={signUpCssModule.password} name="password" value={userPassword} type="password" placeholder="Enter Password" required/>
            <input onChange={(event) => setUserType(event.target.value.toLowerCase())} className={signUpCssModule.password} value={userType} placeholder="seller or buyer" required />
            <button  className={signUpCssModule.signInButton}>{signUp?"Sign Up":"..."}</button>
        </form>
        {/* <p className={signUpCssModule.signInAndSignUps}>Or Sign Up instead</p> */}
    </div>
    </>)
}
export default SignUp;