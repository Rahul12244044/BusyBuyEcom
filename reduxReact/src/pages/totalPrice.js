import React from "react";
import priceCssModule from "../cssModule/price.module.css";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {cartActions,cartSelector,deleteAllCartItemAsync} from "../redux/reducers/cartReducer.js";
import {oneUserOrderAsync,orderPlaceAsync} from "../redux/reducers/orderReducer.js";
// import {useItem} from "../context/itemContext.js";
import {useItem} from "../context/itemContext.js";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
// import {cartSelector} from "../redux/reducers/cartReducer.js";
// import {NavLink} from "react-router-dom";
const TotalPrice=()=>{
    const {userId,totalPrice,setOrderPlaced,setTotalPrice}=useItem();
    const dispatch=useDispatch();
    const cartState=useSelector(cartSelector);
    const allCartItems=cartState.allCarts;
    console.log("cartState");
    console.log(cartState);
    const navigate=useNavigate();
    const handleOrderPlace=()=>{
        console.log("handleOrderPlace");
        console.log(allCartItems);
        dispatch(orderPlaceAsync({userId,totalPrice,orderItems:allCartItems}));
        setOrderPlaced(true);
        setTotalPrice(0);
        // dispatch(deleteAllCartItemAsync())
        dispatch(deleteAllCartItemAsync(userId));
        dispatch(cartActions.setCartToEmpty([]));
        // const oneUserPlacedOrders=dispatch(oneUserOrderAsync(userId));
        // console.log("oneUserPlacedOrders");
        // console.log(oneUserPlacedOrders);
        navigate("/myOrders")
    }
    // useEffect(() => {
    //     if (userId) {
    //         dispatch(cartActions.totalPrice(userId));
    //     }
    // }, [dispatch, userId]);
    // const totalPrice =useSelector(cartSelector);
    // console.log("totalPrice");
    // console.log(totalPrice);
    return (
    <>
    <div className={priceCssModule.totalPrice}>
        <h3 className={priceCssModule.itemsPrice}>TotalPrice:- &#8377; {totalPrice}/-</h3>
        <button onClick={()=>handleOrderPlace()} className={priceCssModule.purchaseButton}>Purchase</button>
    </div>
    </>)
}
export default TotalPrice;