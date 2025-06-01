import React from "react";
import signInCssModule from "../cssModule/signIn.module.css";
import {Link,useNavigate} from "react-router-dom";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {useItem} from "../context/itemContext.js";
// import {useItem} from "../context/itemContext.js";
import {signInAsync} from "../redux/reducers/userReducer.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SignIn=()=>{
    // const {handleSignInSubmit}=useItem();
    const [email,setEmail]=useState(undefined);
    const [password,setPassword]=useState(undefined);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {setNameUser,setTypeCustomer,setLoggedIn,setUserId,loggedIn}=useItem();
    const [signIn,setSignIn]=useState(true);
    const handleSignIn=(event)=>{
        event.preventDefault();
        console.log("handleSignIn");
        const userLogin={email,password};
        setSignIn(false);
        dispatch(signInAsync({payload:userLogin,setNameUser,setTypeCustomer,setLoggedIn,setUserId})).unwrap().then((user)=>{
            if(user){
                console.log("signIn$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
                console.log(loggedIn);
                console.log(user);
            navigate("/");
            }else{
                toast.error("Please enter valid email and password!");
            }
            setTimeout(()=>{
                setSignIn(true);
            },2000)
            // }else{
            //     toast.error("Please enter valid email and password!");
            //     // setEmail("");
            //     // setPassword("");
            // }
        });
    }
    return (
    <>
    <div className={signInCssModule.signIn}>
        <h2 className={signInCssModule.signInAndSignUp}>SignIn</h2>
        <form onSubmit={handleSignIn} className={signInCssModule.signInForm}>
            <input onChange={(event)=>{setEmail(event.target.value)}} className={signInCssModule.input} value={email} name="email" type="text" placeholder="Enter Email" required/>
            <input onChange={(event)=>setPassword(event.target.value)} className={signInCssModule.input} value={password} name="password" type="password" placeholder="Enter Password" required/>
            <button className={signInCssModule.signInButton}>{signIn?"Sign In":"..."}</button>
        </form>
        <Link to="/signup"><p className={signInCssModule.signInAndSignUps}>Or Sign Up instead</p></Link>
    </div>
    </>)
}
export default SignIn;