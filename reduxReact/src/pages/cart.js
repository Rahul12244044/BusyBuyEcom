import React from "react";
import cartCssModule from "../cssModule/cart.module.css" ;
import {useSelector,useDispatch} from "react-redux";
import {cartSelector} from "../redux/reducers/cartReducer.js";
import {cartDeleteAsync,quantityAsync,allCartItemsUserAsync,quantityUpAsync} from "../redux/reducers/cartReducer.js";
import {useItem} from "../context/itemContext.js";
import {useState,useEffect,useCallback} from "react"
// import {allProduct} from "../itemsData/allItems.js";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {useItem} from "../context/itemContext.js";
import {Outlet,NavLink,useLocation} from "react-router-dom";
// import {useState,useEffect} from "react";
import {ClipLoader} from "react-spinners";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
import {debounce} from "lodash";

const Cart=()=>{
    const cartState=useSelector(cartSelector);
    console.log("cartState");
    console.log(cartState.allCarts);
    const dispatch=useDispatch();
    const {userId,setCartLength,setTotalPrice,orderPlaced}=useItem();
    const [isUpQuantity,setIsUpQuantity]=useState(false);
    const [isBelowQunatity,setIsBelowQuantity]=useState(false);
    const [itemRemove,setItemRemove]=useState({});
    const [loading,setLoading]=useState(true);
        useEffect(()=>{
            const timer=setTimeout(()=>{
                setLoading(false);
            },2000);
            return ()=>clearInterval(timer);
        })
    // const {allItems,removeItem,itemsAddOn,itemsLessOn,totalOrders}=useItem();
    // const location=useLocation();
    // useEffect(()=>{
    //     console.log("pathName");
    //     console.log(location.pathname);
    //     if(allItems.length==0){
    //         toast.error("No products in Cart!");
    //     }
    // },[allItems])
    // const [loading, setLoading] = useState(true);
    // useEffect(() => {
    //     // Simulating data fetching or component loading
    //     const timer = setTimeout(() => {
    //         setLoading(false);
    //     },2000); // Adjust delay as needed
    //     return () => clearTimeout(timer);
    // }, []);

    // if (loading) {
    //     return (
    //         <div className={cartCssModule.loading}>
    //             <ClipLoader size={40} color="blue" />
    //             <p className={cartCssModule.loadingName}>Loading...</p>
    //         </div>
    //     );
    // }
    useEffect(()=>{
        dispatch(allCartItemsUserAsync({userId,setTotalPrice,orderPlaced}));
    },[]);
    const removeCartItem=(elm,index)=>{
        console.log("productId");
        // console.log(productId);
        console.log(elm);
        setItemRemove((prevState)=>{
            return {...prevState,[index]:!prevState[index]}
        });
        setTimeout(()=>{
            setItemRemove((prevState)=>{
                return {...prevState,[index]:!prevState[index]}
            });
        },1000)
        dispatch(cartDeleteAsync({userId:userId,productId:elm.productId,setTotalPrice}));
    }
    const handleQuantity=useCallback((productId)=>{
        console.log("handleQuantity");
        console.log(productId);
        debounceQunatityBelow(productId,userId,setTotalPrice);
    },[])
    // const handleQuantityUp=(productId)=>{
    //     console.log("handleQuantityUp");
    //     dispatch(quantityUpAsync({productId,userId,setTotalPrice}));
    // }
    const debounceQuantiyUp=debounce((productId)=>{
        if(isUpQuantity){
            return;
        }
        setIsUpQuantity(true);
        console.log("handleQuantityUp");
        try{
        dispatch(quantityUpAsync({productId,userId,setTotalPrice}));
        }finally{
            setIsUpQuantity(false);
        }
    },300);
    const debounceQunatityBelow=debounce((productId,userId,setTotalPrice)=>{
        if(isBelowQunatity){
            return;
        }
        setIsBelowQuantity(true);
        try{
            dispatch(quantityAsync({productId,userId,setTotalPrice}));
        }finally{
            setIsBelowQuantity(false)
        }
    },300)
    const handleQuantityUp=useCallback((productId)=>{
        debounceQuantiyUp(productId);
    },[]);
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


        
        <>
        {cartState.allCarts.map((elem,index)=>{
            return (
            <>
            <div className={cartCssModule.oneItem}>
        <div className={cartCssModule.itemImage}>
            <img className={cartCssModule.image} src={elem?.elm?.image}/>
        </div>
        <div className={cartCssModule.itemInfo}>
            <div className={cartCssModule.itemName}>
                {elem?.elm?.name}
            </div>
            <div className={cartCssModule.itemPrice}>
                <div>&#8377;&nbsp; {elem?.elm?.price}</div>
                <div className={cartCssModule.buttonUpAndDown}>
                    <img onClick={()=>handleQuantity(elem.productId)} className={cartCssModule.upImage} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABFElEQVR4nO2WT2rCQBTGf5dwUWuK55D2AIVWeg012rN016J00aX7/rmJEU9h4s6IZeAJocTJm0mmZOEH3yaQ/Hhf3rw3cFELdQNMgR8gAXbiRJ7FQNQk8Bp4A3LgWOEDsAT6daFPQKYA/nUKDH2hz1KBK7RY/cyn0kMNaBGurrznGa8t9q4G/N4g9OS55shoutfVuSR5VrMA0JMnNvB3QPCnDbwJCE5s4LTkhQHuuj3T3U5g8xFX3bmC1wGjXrWyueKA4JENHAUaIPuqAWK0CAB+Rbn4y7rb11vgCqXuG4rcrMVHLbQ4t+teBMwdzUtDz9hNvA/UVAd4kc7UVPnh8k816slq+5IplIlXMhzGmiNzEf+tX262pRCJmsimAAAAAElFTkSuQmCC"/>
                    <span>{elem.quantity}</span>
                    <img onClick={()=>handleQuantityUp(elem.productId)} className={cartCssModule.downImage} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABHUlEQVR4nO2WQWrCQBSGv0t0oVXxHFIPIKj0GlWrZ3HXonTRpXutNzHFUxjdNZISeEIIY/Je0iku/OFtwpCP988/bwbuukG1gFdgCwTASSqQbxOg+ZfAR+AdiIC4oM7ACmhXhT4DRwUwWyEwLAudSQdWaLr7aZlOzxWgabi684bS3g7wpLS9rgF/KLu5SLN2oTkykQdwJE5e1dSwfxZwDIzzwF8ewes88N4jOMgDh1fSa5Ur7aEVnPzEqq4V/O3R6t1NhmviEfySB256GiA/RQMk0dID+A3lxe9KtyvtrvRm6wDUUKpnsLzoWhxooem5XfUhkLzRSmmotN1lb5+KegDmkkxNl5+WPdWoIVfbRqbQUWonw2GkOTJ38d/6BZ8CjheXznrAAAAAAElFTkSuQmCC"/>
                </div>
            </div>
            <button onClick={()=>removeCartItem(elem,index)} className={cartCssModule.addButton}>{itemRemove[index]?"Removing":"Remove From Cart"}</button>

        </div>

    </div>
            </>)
        })}
        
        </>
    
        {cartState.allCarts.length===0?<div className={cartCssModule.emptyCartShow}>
        <img className={cartCssModule.cartImage} src="https://cdn.dribbble.com/users/2058104/screenshots/4198771/media/6a0fa7f46ba72d002786d0579f8de1d0.jpg"/>
    </div>:null}
    {cartState.allCarts.length===0?<NavLink to="/"><button className={cartCssModule.emptyCartButton}>Return To Shop</button></NavLink>:null}
    

    
    </>)
}
export default Cart;
