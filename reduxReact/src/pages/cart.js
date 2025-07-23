import React, { useState, useEffect, useCallback } from "react";
import cartCssModule from "../cssModule/cart.module.css";
import { useSelector, useDispatch } from "react-redux";
import { cartSelector, cartDeleteAsync, quantityAsync, allCartItemsUserAsync, quantityUpAsync } from "../redux/reducers/cartReducer.js";
import { useItem } from "../context/itemContext.js";
import { NavLink } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { debounce } from "lodash";
import TotalPrice from "./totalPrice.js";

const Cart = () => {
  const cartState = useSelector(cartSelector);
  const dispatch = useDispatch();
  const { userId, setCartLength, setTotalPrice, orderPlaced } = useItem();

  const [isUpQuantity, setIsUpQuantity] = useState(false);
  const [isBelowQuantity, setIsBelowQuantity] = useState(false);
  const [itemRemove, setItemRemove] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    dispatch(allCartItemsUserAsync({ userId, setTotalPrice, orderPlaced }));
  }, []);

  const handleQuantity = useCallback((productId) => {
    debounceQuantityBelow(productId, userId, setTotalPrice);
  }, []);

  const debounceQuantityUp = debounce((productId) => {
    if (isUpQuantity) return;
    setIsUpQuantity(true);
    try {
      dispatch(quantityUpAsync({ productId, userId, setTotalPrice }));
    } finally {
      setIsUpQuantity(false);
    }
  }, 300);

  const debounceQuantityBelow = debounce((productId, userId, setTotalPrice) => {
    if (isBelowQuantity) return;
    setIsBelowQuantity(true);
    try {
      dispatch(quantityAsync({ productId, userId, setTotalPrice }));
    } finally {
      setIsBelowQuantity(false);
    }
  }, 300);

  const handleQuantityUp = useCallback((productId) => {
    debounceQuantityUp(productId);
  }, []);

  const removeCartItem = (elem, index) => {
    setItemRemove((prev) => ({ ...prev, [index]: !prev[index] }));
    setTimeout(() => {
      setItemRemove((prev) => ({ ...prev, [index]: !prev[index] }));
    }, 1000);
    dispatch(cartDeleteAsync({ userId, productId: elem.productId, setTotalPrice }));
  };

  setCartLength(cartState.allCarts.length);

  if (loading) {
    return (
      <div className={cartCssModule.loading}>
        <ClipLoader size={40} color="blue" />
        <p className={cartCssModule.loadingName}>Loading...</p>
      </div>
    );
  }

  return (
    <>
      {cartState.allCarts.length > 0 ? (
        <div className={cartCssModule.cartContainer}>
          <div className={cartCssModule.cartItems}>
            {cartState.allCarts.map((elem, index) => (
              <div className={cartCssModule.oneItem} key={elem.productId}>
                <div className={cartCssModule.itemImage}>
                  <img className={cartCssModule.image} src={elem?.elm?.image} alt={elem?.elm?.name} />
                </div>
                <div className={cartCssModule.itemInfo}>
                  <div className={cartCssModule.itemName}>{elem?.elm?.name}</div>
                  <div className={cartCssModule.itemPrice}>
                    <div>&#8377;&nbsp; {elem?.elm?.price}</div>
                    <div className={cartCssModule.buttonUpAndDown}>
                      <img onClick={() => handleQuantity(elem.productId)} className={cartCssModule.upImage} src="/images/minus.png" />
                      <span>{elem.quantity}</span>
                      <img onClick={() => handleQuantityUp(elem.productId)} className={cartCssModule.downImage} src="/images/plus.png" />
                    </div>
                  </div>
                  <button onClick={() => removeCartItem(elem, index)} className={cartCssModule.addButton}>
                    {itemRemove[index] ? "Removing..." : "Remove From Cart"}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className={cartCssModule.totalPriceSection}>
            <TotalPrice /> {/* ✅ Total Price Below All Items */}
          </div>
        </div>
      ) : (
        <>
          <div className={cartCssModule.emptyCartShow}>
            <img className={cartCssModule.cartImage} src="https://cdn.dribbble.com/users/2058104/screenshots/4198771/media/6a0fa7f46ba72d002786d0579f8de1d0.jpg" />
          </div>
         <NavLink to="/" className={cartCssModule.emptyCartButton}>
           Return To Shop
          </NavLink>

        </>
      )}
    </>
  );
};

export default Cart;
