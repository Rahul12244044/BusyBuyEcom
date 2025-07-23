import React, { useState } from "react";
import signInCssModule from "../cssModule/signIn.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInAsync } from "../redux/reducers/userReducer.js";
import { useItem } from "../context/itemContext.js";
import { toast } from "react-toastify";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signIn, setSignIn] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    setNameUser,
    setTypeCustomer,
    setLoggedIn,
    setUserId
  } = useItem();

  const handleSignIn = async (event) => {
    event.preventDefault();
    setSignIn(false);

    const userLogin = { email, password };

    try {
      const user = await dispatch(
        signInAsync({
          payload: userLogin,
          setNameUser,
          setTypeCustomer,
          setLoggedIn,
          setUserId
        })
      ).unwrap();

      if (user && user.userId) {
        // ✅ Extract required fields and save in sessionStorage
        const userObj = {
          userId: user.userId,
          nameUser: user.nameUser,
          typeCustomer: user.typeCustomer
        };

        sessionStorage.setItem("user", JSON.stringify(userObj));
        navigate("/");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (err) {
      toast.error("Login failed. Please try again.");
    } finally {
      setTimeout(() => setSignIn(true), 2000);
    }
  };

  return (
    <div className={signInCssModule.signInWrapper}>
      <form onSubmit={handleSignIn} className={signInCssModule.signInForm}>
        <h2 className={signInCssModule.signInHeading}>Sign In</h2>

        <input
          onChange={(e) => setEmail(e.target.value)}
          className={signInCssModule.input}
          value={email}
          name="email"
          type="email"
          placeholder="Enter Email"
          required
        />

        <input
          onChange={(e) => setPassword(e.target.value)}
          className={signInCssModule.input}
          value={password}
          name="password"
          type="password"
          placeholder="Enter Password"
          required
        />

        <button type="submit" className={signInCssModule.signInButton}>
          {signIn ? "Sign In" : "..."}
        </button>

        <Link to="/signUp" className={signInCssModule.signInSwitch}>
          Or Sign Up instead
        </Link>
      </form>
    </div>
  );
};

export default SignIn;
