import itemCssModule from "../cssModule/item.module.css";
import {useSelector,useDispatch} from "react-redux";
import {productSelector} from "../redux/reducers/itemsReducer.js";
import {useCallback,useEffect,useState} from "react";
import {getInitialStateAsync} from "../redux/reducers/itemsReducer.js";
import {addToCartAsync} from "../redux/reducers/cartReducer.js";
import {useItem} from "../context/itemContext.js";
import {useNavigate} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {debounce} from "lodash";
import {ClipLoader} from "react-spinners";
// import {useCallback} from "react";
const ItemCard=()=>{
    const productState=useSelector(productSelector);
    // const [toggle,setToggle]=useState(true);
    const [likedItems, setLikedItems] = useState({}); // Local state for liked items
    console.log("productState");
    console.log(productState);
    const dispatch=useDispatch();
    const {loggedIn,userId,setTotalPrice}=useItem();
    const navigate=useNavigate()
    const [totalQuantity,setTotalQuantity]=useState(1);
    const [isProductAdded,setIsProductAdded]=useState(false);
    const [itemAdd,setItemAdd]=useState({});
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        const timer=setTimeout(()=>{
            setLoading(false);
        },2000);
        return ()=>clearInterval(timer);
    })
    useEffect(()=>{
        dispatch(getInitialStateAsync());
    },[]);
    const debouncedAddToCart = debounce((productId, quantity, elm) => {
        console.log("addToCart");
        console.log(productId);
        console.log(quantity);
        if(isProductAdded){
            return;
        }
        setIsProductAdded(true);
        try{
        setTotalQuantity((prevState) => prevState + Number(quantity));
        dispatch(addToCartAsync({ payload: { productId, quantity, userId, elm, setTotalPrice } }));
        }finally{
            setIsProductAdded(false);
        }
    }, 500);
    const addToCart =useCallback( (productId, quantity, elm,index) => {

        setItemAdd((prevState)=>{
            return {...prevState,[index]:!prevState[index]}
        });
        setTimeout(()=>{
            setItemAdd((prevState)=>{
                return {...prevState,[index]:!prevState[index]}
            });
        },1000)
        debouncedAddToCart(productId, quantity, elm);
        toast.success("Product Added Successfully!")
    },[]);
    const toggleLike = (index) => {
        setLikedItems((prevState) => ({
            ...prevState,
            [index]: !prevState[index] // Toggle like for this item
        }));
    }
    if(loading){
        return (
        <>
        <div className={itemCssModule.loading}>
        <ClipLoader size={40} color="blue" />
        <p className={itemCssModule.loadingName}>Loading...</p>
        </div>
    </>)
    }
    return (
    <>
    {productState.allProducts.map((elm,index)=>{
        return (
        <>
        <div className={itemCssModule.oneItem}>
            <span onClick={()=>toggleLike(index)} className={itemCssModule.likeToggle}>{likedItems[index] ? "❤️" : "🤍"}</span>
        <div className={itemCssModule.itemImage}>
            {/* <span className={itemCssModule.backImage}>-</span> */}
            <img className={itemCssModule.image} src={elm.image}/>
            {/* <span className={itemCssModule.backImage}>+</span> */}
        </div>
        <div className={itemCssModule.itemInfo}>
            <div className={itemCssModule.itemName}>
            {elm.name}
            </div>
            <div className={itemCssModule.itemPrice}>
            &#8377;&nbsp;{elm.price}
            </div>
            
            <button onClick={()=>{
                if(loggedIn){
                    addToCart(elm.id,elm.quantity,elm,index);
                }else{
                    navigate("/signIn");
                    toast.error("Please sign up to add products!");
                }
            }} className={itemCssModule.addButton}>{itemAdd[index]?"Adding":"Add to Cart"}</button>
        </div>
    </div>
    
        </>)
    })}
     
    </>)
}
export default ItemCard;