import React from "react";
import {Outlet,NavLink,useLocation} from "react-router-dom";
import PriceRange from "../pages/priceRange.js"
import navbarCssModule from "../cssModule/navBar.module.css";
import {useState,useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import {searchProductByName} from "../redux/reducers/itemsReducer.js";
import TotalPrice from "../pages/totalPrice.js";
// import {userReducer, userSelector} from "../redux/reducers/userReducer.js";
import {useItem} from "../context/itemContext.js";
import {logoutAsyncUser} from "../redux/reducers/userReducer.js";
// import {useSelector} from "react-redux";
import {cartSelector} from "../redux/reducers/cartReducer.js";
// import TotalPrice from "../pages/totalPrice";
// import {useItem} from "../context/itemContext.js"; 
// import {useState,useEffect} from "react";
const NavBar=()=>{
    const [searchProduct,setSearchProduct]=useState("");
    // const [loggedIn,setLoggedIn]=useState(false);
    console.log(searchProduct);
    const dispatch=useDispatch();
    const location=useLocation();
    console.log("locationPathName");
    console.log(location.pathname);
    // const loggedIn=localStorage.getItem("loggedIn");
    // const userType=localStorage.getItem("userType");
    const {nameUser,typeCustomer,loggedIn,userId,setLoggedIn,setNameUser,cartLength,setCartLength}=useItem();
    const cartState=useSelector(cartSelector);

    useEffect(()=>{
        console.log("dispatch");
        dispatch(searchProductByName(searchProduct))
    },[searchProduct,dispatch])
    // useEffect(()=>{
    //     const state=useSelector(userSelector);
    //     console.log(state);
    // })
    // const state=useSelector(userSelector);
    // console.log("state of user");
    // console.log(state);
    const logOutUser=()=>{
        dispatch(logoutAsyncUser({payload:userId,setLoggedIn,setNameUser}));
    }
    setCartLength(cartState.allCarts.length);
    return (
    <>
    <div className={navbarCssModule.navbar}>
        <div className={navbarCssModule.buyBusy}>
            Busy Buy
        </div>
        <div className={navbarCssModule.welcomeName}>Welcome {nameUser?nameUser:"Guest"}</div>
        <div className={navbarCssModule.homeAndSignIn}>
            <div className={navbarCssModule.home}>
                <span className={navbarCssModule.image}><img className={navbarCssModule.images} src="data:image/png;base64,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"/></span>
                <NavLink className={navbarCssModule.homeLink} to="/"><p className={navbarCssModule.homeSign}>Home</p></NavLink>
            </div>
            {loggedIn && typeCustomer==="seller"?
            
            <div className={navbarCssModule.home}>
                {/* <span className={navbarCssModule.image}>Add product</span> */}
                <span className={navbarCssModule.image}><img className={navbarCssModule.images} src="https://cdn-icons-png.flaticon.com/512/10744/10744280.png"/></span>
                <NavLink className={navbarCssModule.homeLink} to="/addProduct"><p className={navbarCssModule.homeSign}>postProduct</p></NavLink>
            </div>:null}

            {loggedIn && typeCustomer==="buyer"?
            <div className={navbarCssModule.home}>
                <span className={navbarCssModule.image}><img className={navbarCssModule.images} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACB0lEQVR4nO2YPUsjQRjHx8NvIAdnY2WjsM9j8K1TLjFeNCCm8WWFHTERtE1xxcl6cM1B5ODwA/gNFFsrG2vBmf0Aop2NRRaVKK7MYq443GRf4u2TY37wLxaW4f/jmd1ZljGNRqN5i8XtrztfrK0nlYXN6g7rJiy7VipYW895s+KpzJqV5/xapcS6pTy3a42Cte2X/5PVcoO8hPVaft3e81aq371Zc7N7JLi9V+R27UGVb2a5uvuYN8sN8hL8jfJqEmoiMysbxRmz/EBWgrco37yHrAQPUZ6sBI9QnpwEj1GejARPUD51Cd6B8u8q4X6enK/nxq/d3IRHMXXVLTs2FyhAubzblMhOXAVPgEBBN0T+X4F612+h7NicuoFyeTc3XmDtkIg/JKJHKQJgl4VFIJbICSAWQws4o6MDYRa1+/r8dOpatogzPPwptIC/jQBuCAlcRyrvbyOAEzICAMeRBSTiTyoCAsCOPgHEJSoCF4YR/P0ThJPJDFIRcKI+wAqPsR4JcJu2gEAMPnnbIQBO0xaQAEexBSTir9QFEOP/VxWIa2kLOACF+BPIZIbSFjgfGfkYW8Bj7INArAct/ru/30+nruXfDzDAJUuKADhrs0ffLQLxMLGARNxPS0AaxrfkAgDLaQlcGMZUYoHT6eleCXAgEO//WXmAO/UKV4dpYgGNRqPRsBa8AHqucwJBwaHkAAAAAElFTkSuQmCC"/></span>
                <NavLink className={navbarCssModule.homeLink} to="/myOrders"><p className={navbarCssModule.homeSign}>My orders</p></NavLink>
            </div>:null}
            {loggedIn && typeCustomer==="buyer"?
            <div className={navbarCssModule.home}>
                <span className={navbarCssModule.image}><img className={navbarCssModule.images} src="data:image/png;base64,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"/></span>
                <NavLink className={navbarCssModule.homeLink} to="/cart"><p className={navbarCssModule.homeSign}>Cart <span className={navbarCssModule.cartLength}>{cartLength}</span></p></NavLink>
            </div>:null}
            <div className={navbarCssModule.signIn}>
                <span className={navbarCssModule.image}><img className={navbarCssModule.images} src="data:image/png;base64,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"/></span>

                <NavLink className={navbarCssModule.homeLink} to={loggedIn===true?"/":"/signIn"}><p onClick={loggedIn?logOutUser:undefined} className={navbarCssModule.homeSign}>{loggedIn?"Logout":"SignIn"}</p></NavLink>
            </div>
            


           
        </div>

    </div>
    {location.pathname==="/"?
    <div className={navbarCssModule.search}>
        <form className={navbarCssModule.searchByName}>
            <input onChange={(event)=>setSearchProduct(event.target.value)} className={navbarCssModule.searchItems} placeholder="Search By Name" value={searchProduct}/>
        </form>
    </div>:null}
    <div className={navbarCssModule.itemsAndRange}>
    {location.pathname!=="/myOrders"?
    <div className={navbarCssModule.priceRange}>
        {location.pathname==="/"?<PriceRange/>:(location.pathname==="/cart" && cartLength>0?<TotalPrice/>:null)}
    </div>:null}
    <div className={location.pathname!=="/myOrders"?navbarCssModule.items:navbarCssModule.items2}>

        <Outlet/>
        
        
        
       </div>
    </div>
    </>)
}
export default NavBar;