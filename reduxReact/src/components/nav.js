import React from "react";
import { Outlet, NavLink, useLocation,useNavigate } from "react-router-dom";
import navbarCssModule from "../cssModule/navBar.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchProductByName } from "../redux/reducers/itemsReducer.js";
import { useItem } from "../context/itemContext.js";
import { logoutAsyncUser } from "../redux/reducers/userReducer.js";
import { cartSelector } from "../redux/reducers/cartReducer.js";
import TotalPrice from "../pages/totalPrice.js";

const NavBar = () => {
    const [searchProduct, setSearchProduct] = useState("");
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate=useNavigate();

    const {
        nameUser,
        typeCustomer,
        loggedIn,
        userId,
        setLoggedIn,
        setNameUser,
        cartLength,
        setCartLength,
        isInitialized
    } = useItem();
    

    const cartState = useSelector(cartSelector);

    useEffect(() => {
        dispatch(searchProductByName(searchProduct));
    }, [searchProduct, dispatch]);

    const logOutUser = () => {
  dispatch(logoutAsyncUser({ payload: userId })); // 👈 First, call backend

  sessionStorage.removeItem("user");
  localStorage.removeItem("user");

  setLoggedIn(false);
  setNameUser(undefined);
  setCartLength(0);
  // optionally: setTypeCustomer(undefined); setUserId(undefined);
  navigate("/signIn");
};



    setCartLength(cartState.allCarts.length);
    if (!isInitialized) return null;

    return (
        <>
            <div className={navbarCssModule.navbar}>
                <div className={navbarCssModule.buyBusy}>Busy Buy</div>
                <div className={navbarCssModule.welcomeName}>Welcome {nameUser ? nameUser : "Guest"}</div>
                <div className={navbarCssModule.homeAndSignIn}>
                    <div className={navbarCssModule.home}>
                        <NavLink className={navbarCssModule.homeLink} to="/">
                            <p className={navbarCssModule.homeSign}>Home</p>
                        </NavLink>
                    </div>

                    

                    {loggedIn && typeCustomer === "buyer" && (
                        <>
                            <div className={navbarCssModule.home}>
                                <NavLink className={navbarCssModule.homeLink} to="/myOrders">
                                    <p className={navbarCssModule.homeSign}>My Orders</p>
                                </NavLink>
                            </div>

                            <div className={navbarCssModule.home}>
                                <NavLink className={navbarCssModule.homeLink} to="/cart">
                                    <p className={navbarCssModule.homeSign}>Cart <span className={navbarCssModule.cartLength}>{cartLength}</span></p>
                                </NavLink>
                            </div>
                        </>
                    )}

                    <div className={navbarCssModule.signIn}>
                        <NavLink className={navbarCssModule.homeLink} to={loggedIn ? "/" : "/signIn"}>
                            <p onClick={loggedIn ? logOutUser : undefined} className={navbarCssModule.homeSign}>
                                {loggedIn ? "Logout" : "SignIn"}
                            </p>
                        </NavLink>
                    </div>
                </div>
            </div>

            {location.pathname === "/" && (
                <div className={navbarCssModule.search}>
                    <form className={navbarCssModule.searchByName}>
                        <input
                            onChange={(event) => setSearchProduct(event.target.value)}
                            className={navbarCssModule.searchItems}
                            placeholder="Search By Name"
                            value={searchProduct}
                        />
                    </form>
                </div>
            )}

            <div className={location.pathname !== "/myOrders" ? null : navbarCssModule.items}>
                <Outlet />
                {/* {location.pathname === "/cart" && <TotalPrice />} */}
            </div>
        </>
    );
};

export default NavBar;