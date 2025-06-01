import react from "react";
import addProductModuleCss from "../cssModule/addProduct.module.css";
import {useState} from "react";
import {useDispatch,useSelector} from "react-redux";
import {addProductAsync} from "../redux/reducers/itemsReducer.js";
import {notificationSelector,notificationAction} from "../redux/reducers/notificationReducer.js";
import {useNavigate} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddProduct=()=>{
    const dispatch=useDispatch();
    const notification=useSelector(notificationSelector);
    const navigate=useNavigate();
    if(notification.message){
        setTimeout(()=>{
            console.log("timeout");
            dispatch(notificationAction.reset());
        },3000)
    }
    console.log("notification");
    console.log(notification);
    const [productName,setProductName]=useState("");
    const [productPrice,setProductPrice]=useState(undefined);
    const [productImage,setProductImage]=useState("");
    const [productCategory,setProductCategory]=useState("");
    const addProduct=(event)=>{
        event.preventDefault();
        console.log("addProduct");
        console.log(productName);
        console.log(productPrice);
        console.log(productImage);
        console.log(productCategory);
        // console.log(event.target.productName.value);
        const category=productCategory;
        const product={
            name:productName,
            price:productPrice,
            image:productImage,
            category:productCategory,
            type:[event.target.productName.value,category,category.charAt(0).toUpperCase()+category.substring(1)]
        }
        console.log("product");
        console.log(product);
        // event.raget.productName.value="";
        // event.clear();
        setProductName("");
        setProductPrice("");
        setProductImage("");
        setProductCategory("");
        console.log("products");
        console.log(product);
        dispatch(addProductAsync(product)).unwrap().then((product)=>{
            // console.log("$$$$$$$$$$$$$$$$$$$$$$");
            // console.log(product);
            // toast.success("SignUp first");
            navigate("/");
            // toast.success("SignUp first");
        });
        


    }
    return (
    <>
    {notification.message &&<div className={addProductModuleCss.alert}>{notification.message}</div>}
    <div className={addProductModuleCss.allProducts}>
        <h1 className={addProductModuleCss.details}>Details of Product</h1>
        <form onSubmit={addProduct} className={addProductModuleCss.product}>
            <label className={addProductModuleCss.names}>Name</label>
            <input onChange={(event)=>setProductName(event.target.value)} className={addProductModuleCss.text} type="text" placeholder="name" name="productName" value={productName} required/>
            <label className={addProductModuleCss.names}>Price</label>
            <input onChange={(event)=>setProductPrice(event.target.value)} className={addProductModuleCss.text} type="text" placeholder="price" name="productPrice" value={productPrice} required/>
            <label className={addProductModuleCss.names}>ImageUrl</label>
            <input onChange={(event)=>setProductImage(event.target.value)} className={addProductModuleCss.text} type="text" name="productImage" placeholder="imageUrl" value={productImage} required/>
            <label className={addProductModuleCss.names}>Category</label>
            <input onChange={(event)=>setProductCategory(event.target.value)} className={addProductModuleCss.text} type="text" placeholder="category" name="productCategory" value={productCategory} required/>
            <button className={addProductModuleCss.addButton} type="submit">Post Product</button>
        </form>
    </div>
    </>)
}
export default AddProduct;
