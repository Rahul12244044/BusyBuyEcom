import React from "react";
import myOrdersCssModule from "../cssModule/myOrders.module.css";
// import {useItem} from "../context/itemContext.js";
import {useState,useEffect} from "react";
import {useSelector,useDispatch} from "react-redux";
import {orderSelector} from "../redux/reducers/orderReducer.js";
import {useItem} from "../context/itemContext.js";
import {oneUserOrderAsync} from "../redux/reducers/orderReducer.js";
import {ClipLoader} from "react-spinners";
// import db from "../firestore.js";
// import {query,collection,getDocs,where,onSnapshot} from "firebase/firestore";
const MyOrders=()=>{
    const orderState=useSelector(orderSelector);
    console.log("myOrders");
    console.log(orderState);
    const {userId}=useItem();
    const oneUserAllOrders=orderState.orders.filter((elm)=>elm.userId===userId);
    console.log(oneUserAllOrders);
    const sortedOneUserAllOrders = oneUserAllOrders.map((order) => {
        let orderDate = order.orderOn;
        if (orderDate && typeof orderDate === "object" && "seconds" in orderDate) {
            orderDate = new Date(orderDate.seconds * 1000);
        } else {
            orderDate = new Date();
        }
        return {
            ...order,
            orderOn: orderDate,
        };
    }).sort((a, b) => new Date(b.orderOn) - new Date(a.orderOn));
    console.log("Before sorting:", oneUserAllOrders.map(o => o.orderOn));
    oneUserAllOrders.sort((a, b) => new Date(b.orderOn) - new Date(a.orderOn));
    console.log("oneUserAllOrders");
    const dispatch=useDispatch();
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        const timer=setTimeout(()=>{
            setLoading(false);
        },2000);
        return ()=>clearInterval(timer);
    })

    // const {allItems,totalPrice,totalOrders,price,allOrdersOfUsers,setAllOrdersOfUser,email,password,userId}=useItem();
    // const [loading, setLoading] = useState(true);
    // useEffect(() => {
    //     // Simulating data fetching or component loading
    //     const timer = setTimeout(() => {
    //         setLoading(false);
    //     }, 2000); // Adjust delay as needed

    //     return () => clearTimeout(timer);
    // }, []);
    // useEffect(()=>{
    //     // console.log("userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrriD");
    //     console.log(userId);
    // })
    // useEffect(()=>{
    //     // const fetchAllAlbums=async ()=>{
    //     //     const collectiionRef=collection(db,"albums");
    //     //     const snapShots=await getDocs(collectiionRef);
    //     //     console.log(snapShots);
    //     //     const albums=snapShots.docs.map((elm)=>elm.data());
    //     //     console.log(albums);
    //     //     setAllAlbums(albums);
    //     // }
    //     // fetchAllAlbums();
    //     const uSub=onSnapshot(collection(db,"orders"),(snapShot)=>{
    //         console.log(snapShot.docs);
    //         // console.log(snapShot.docs[0].data());
    //         const orders=snapShot.docs.map((elm)=>{
    //             let order=elm.data();
    //             let orderDate=order.orderOn;
    //             console.log(orderDate.toDate);
    //             if(orderDate && orderDate.toDate){
    //                 orderDate = orderDate.toDate();
    //             }else{
    //                 orderDate = new Date(orderDate);
    //             }
    //             return {
    //                 ...order,
    //                 orderOn: orderDate,
    //             };
    //         })
    //         .filter((order) => order.userId === userId);
    //         console.log("before");
    //         console.log(orders);
    //         orders.forEach(order => console.log(order.orderOn, new Date(order.orderOn)));
    //         orders.sort((a,b)=>new Date(b.orderOn)-new Date(a.orderOn));
    //         console.log("after");
    //         console.log(orders);
    //         console.log("relaTimeUpdate");
    //         // console.log(albums);
    //         setAllOrdersOfUser(orders);
    //     })
    // },[userId,setAllOrdersOfUser])
    // useEffect(()=>{
    //   const allOrders=async ()=>{
    //     if (!email || !password) {
    //         console.error("Email or password is undefined!");
    //         return; // Early return if email or password is undefined
    //       }
    // const collectionRef=collection(db,"users");
    // const q1=query(collectionRef,where("email","==",email),where("password","==",password));
    // const isUserFound=await getDocs(q1);
    // console.log(isUserFound);
    //   const q=query(collection(db,"orders"),where("userId","==",isUserFound.docs[0].id));
    //   const allOrdersOfUser=await getDocs(q);
    //   console.log("ordersOfUsers");
    //   console.log(allOrdersOfUser);
      
    //   allOrdersOfUser.docs.forEach((elm)=>{
    //     console.log(elm.data());
    //     setAllOrdersOfUser([elm.data(),...allOrdersOfUsers]);
        
    //   })
    //   console.log(allOrdersOfUsers);
    //   }
    //   allOrders();
      
    // })
    useEffect(()=>{
        dispatch(oneUserOrderAsync(userId));
        // console.log(userOrders);
    },[dispatch])
    if (loading) {
        return (
            <div className={myOrdersCssModule.loading}>
                <ClipLoader size={40} color="blue" />
                <p className={myOrdersCssModule.loadingName}>Loading...</p>
            </div>
        );
    }
    return (
    <> 
    
        <>
        {sortedOneUserAllOrders.length===0?<h1>No Orders Found!</h1>:<h2>Your Orders</h2>}
        {/* {allOrdersOfUsers.map((elms)=>{
            let totalPrice=0; */}
            {sortedOneUserAllOrders.map((elem)=>{
                return (
                <>
                <div className={myOrdersCssModule.myOrders}>
        <h3 className={myOrdersCssModule.orderedOn}>Ordered On:- {new Date().toISOString().substring(0,10)}</h3>
        <table className={myOrdersCssModule.ordersTable} border="1" cellPadding="10" cellSpacing="1">
            <thead>
                <tr>
                    <th className={myOrdersCssModule.tableHeader}>Title</th>
                    <th className={myOrdersCssModule.tableHeaders}>Price</th>
                    <th className={myOrdersCssModule.tableHeaders}>Quantity</th>
                    <th className={myOrdersCssModule.tableHeaders}>Total Price</th>
                </tr>
            </thead>
            <tbody>
                {elem.orderItems.map((order)=>{
                    return (
                    <>
                    <tr className={myOrdersCssModule.tableRow}>
                    <td className={myOrdersCssModule.tableData}>{order.elm.name}</td>
                    <td className={myOrdersCssModule.tableData}>&#8377;&nbsp;{order.elm.price}</td>
                    <td className={myOrdersCssModule.tableData}>{order.quantity}</td>
                    <td className={myOrdersCssModule.tableData}>&#8377;&nbsp;{order.quantity*order.elm.price}</td>
                </tr>
                    </>)
                })}
                    

                    
                
                
                <tr className={myOrdersCssModule.tableRow}>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className={myOrdersCssModule.tableData}>&#8377;&nbsp;{elem.totalPrice}</td>
                </tr>
            </tbody>
        </table>
    </div>
                </>)
            })}
            <>
             
            </>
        
       
        </>
    </>)
}
export default MyOrders;