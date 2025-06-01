import {createContext,useContext,useState} from "react";
const ItemContext=createContext();
export const useItem=()=>{
    return useContext(ItemContext);
}
const ItemContextProvider=({children})=>{
    const [nameUser,setNameUser]=useState(undefined);
    const [typeCustomer,setTypeCustomer]=useState(undefined);
    const [loggedIn,setLoggedIn]=useState(false);
    const [userId,setUserId]=useState(undefined);
    const [cartLength,setCartLength]=useState(undefined);
    const [totalPrice,setTotalPrice]=useState(0);
    const [orderPlaced,setOrderPlaced]=useState(false);
    const [userExist,setUserExist]=useState(false);
    return (
    <>
    <ItemContext.Provider value={{nameUser,setNameUser,typeCustomer,setTypeCustomer,setLoggedIn,loggedIn,userId,setUserId,cartLength,setCartLength,totalPrice,setTotalPrice,orderPlaced,setOrderPlaced,userExist,setUserExist}}>
        {children}
    </ItemContext.Provider>
    </>)
}
export default ItemContextProvider;