import React, { useState } from "react";
import priceCssModule from "../cssModule/price.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  cartActions,
  cartSelector,
  deleteAllCartItemAsync,
} from "../redux/reducers/cartReducer.js";
import {
  oneUserOrderAsync,
  orderPlaceAsync,
} from "../redux/reducers/orderReducer.js";
import { useItem } from "../context/itemContext.js";

const TotalPrice = () => {
  const { userId, totalPrice, setOrderPlaced, setTotalPrice } = useItem();
  const dispatch = useDispatch();
  const cartState = useSelector(cartSelector);
  const allCartItems = cartState.allCarts;
  const navigate = useNavigate();

  // Prevent double order placement
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const handleOrderPlace = async () => {
    if (isPlacingOrder || allCartItems.length === 0) return;

    setIsPlacingOrder(true);

    try {
      // Place order
      await dispatch(
        orderPlaceAsync({ userId, totalPrice, orderItems: allCartItems })
      );

      // Update state
      setOrderPlaced(true);
      setTotalPrice(0);

      // Clear cart
      await dispatch(deleteAllCartItemAsync(userId));
      dispatch(cartActions.setCartToEmpty([]));

      // Navigate to orders page
      navigate("/myOrders");
    } catch (error) {
      console.error("Order placement failed:", error);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <>
      <div className={priceCssModule.totalPrice}>
        <h3 className={priceCssModule.itemsPrice}>
          TotalPrice:- &#8377; {totalPrice}/-
        </h3>

        <button
          onClick={handleOrderPlace}
          className={priceCssModule.purchaseButton}
          disabled={isPlacingOrder}
        >
          {isPlacingOrder ? "Placing Order..." : "Purchase"}
        </button>
      </div>
    </>
  );
};

export default TotalPrice;
