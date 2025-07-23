import React, { useState } from "react";
import signUpCssModule from "../cssModule/signUp.module.css";
import { signUpAsync } from "../redux/reducers/userReducer.js";
import { useDispatch } from "react-redux";
import { useItem } from "../context/itemContext.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userType, setUserType] = useState(""); // ⬅️ Important

  const { setNameUser, setTypeCustomer, setLoggedIn, setUserId, setUserExist } = useItem();
  const [signUp, setSignUp] = useState(true);

  const handleSignUp = (event) => {
    event.preventDefault();

    if (!userType) {
      toast.error("Please select user type (Buyer or Seller).");
      return;
    }

    const signUpUser = {
      name: userName,
      email: userEmail,
      password: userPassword,
      userType,
    };

    setSignUp(false);

    dispatch(
      signUpAsync({
        payload: signUpUser,
        setNameUser,
        setTypeCustomer,
        setLoggedIn,
        setUserId,
        setUserExist,
      })
    )
      .unwrap()
      .then((user) => {
        if (user.signUp) {
          const userData = {
            userId: user.userId,
            nameUser: user.name,
            typeCustomer: user.userType,
          };

          // ✅ Save correct data
          sessionStorage.setItem("user", JSON.stringify(userData));

          // ✅ Update context manually
          setNameUser(user.name);
          setTypeCustomer(user.userType);
          setLoggedIn(true);
          setUserId(user.userId);

          navigate("/");
        } else {
          toast.error("Email already in use.");
          setUserExist(false);
        }
      })
      .finally(() => {
        setTimeout(() => setSignUp(true), 2000);
      });
  };

  return (
    <>
      <div className={signUpCssModule.signUpWrapper}>
        <form onSubmit={handleSignUp} className={signUpCssModule.signUpForm}>
          <h2 className={signUpCssModule.signUpHeading}>Sign Up</h2>

          <input
            onChange={(e) => setUserName(e.target.value)}
            className={signUpCssModule.input}
            name="name"
            type="text"
            value={userName}
            placeholder="Enter Name"
            required
          />

          <input
            onChange={(e) => setUserEmail(e.target.value)}
            className={signUpCssModule.input}
            name="email"
            type="email"
            value={userEmail}
            placeholder="Enter Email"
            required
          />

          <input
            onChange={(e) => setUserPassword(e.target.value)}
            className={signUpCssModule.input}
            name="password"
            value={userPassword}
            type="password"
            placeholder="Enter Password"
            required
          />

          {/* ✅ User Type Selector */}
          <select
            className={signUpCssModule.input}
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            required
          >
            <option value="">Select Role</option>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>

          <button className={signUpCssModule.signUpButton} type="submit">
            {signUp ? "Sign Up" : "..."}
          </button>
        </form>
      </div>

      <ToastContainer />
    </>
  );
};

export default SignUp;
