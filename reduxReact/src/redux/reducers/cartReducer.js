import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import {BASE_URL} from "../utils/api.js";
const initialState={
    //1)userId
    //2)productId,
    //3)found.
    //4)elm
    //5)quantity
    allCarts:[],
    totalPrice:0
}
export const addToCartAsync=createAsyncThunk("post/addToCart",async (payload,thunkApi)=>{
    console.log("addToCartAsync");
    console.log("payload");
    console.log(payload);
    const {productId,quantity,userId,elm,setTotalPrice}=payload.payload;
    console.log(elm);
    console.log(productId);
    // console.log(totalQuantity);
    console.log(userId);
    const query=new URLSearchParams({
        productId:productId,
        quantity:quantity,
        userId:userId,
        elm:JSON.stringify(elm)
    })
    const response=await fetch(`${BASE_URL}/api/cart/addToCart?${query}`,{
        method:"POST"
    });
    const responseJson=await response.json();
    console.log("cartResponse");
    console.log(responseJson);
    setTotalPrice((prevState)=>prevState+responseJson.quantity*responseJson.elm.price);
    
    thunkApi.dispatch(cartActions.addToCart(responseJson));

});
export const cartDeleteAsync=createAsyncThunk("delete/deleteCartItem",async (payload,thunkApi)=>{
    const {setTotalPrice}=payload;
    console.log("cartDeleteAsync")
    const query=new URLSearchParams({
        productId:payload.productId,
        userId:payload.userId
    })
    const response=await fetch(`${BASE_URL}/api/cart/delete?${query}`,{
        method:'DELETE'
    });
    const responseJson=await response.json();
    console.log("deleteJson");
    console.log(responseJson);
    let totalPrice=0;
    if(responseJson?.length>0){
    totalPrice=totalPrice+responseJson?.reduce((acc,elem)=>acc+elem.quantity*elem.elm.price,0);
    setTotalPrice(totalPrice);
    }
    thunkApi.dispatch(cartActions.deleteCartItem(responseJson));
});
export const quantityAsync=createAsyncThunk("put/quantityUpOrDown",async (payload,thunkApi)=>{
    const {setTotalPrice}=payload;
    const query=new URLSearchParams({
        productId:payload.productId,
        userId:payload.userId
    })
    const response=await fetch(`${BASE_URL}/api/cart/quantity?${query}`,{
        method:"PUT"
    });
    console.log("QuantityUpAsync");
    const responseJson=await response.json();
    console.log(responseJson);
    if(!responseJson.isZero){
        setTotalPrice((prevState)=>prevState-responseJson.cartItem.elm.price*1);
    }else{
        let totalPrice=0;
        totalPrice=totalPrice+responseJson.userCartItems?.reduce((acc,elem)=>acc+elem.quantity*elem.elm.price,0);
        setTotalPrice(totalPrice);
    }
    thunkApi.dispatch(cartActions.quantityCart(responseJson));
});
export const allCartItemsUserAsync=createAsyncThunk("get/allItemsUser",async (payload,thunkApi)=>{
    const {setTotalPrice,orderPlaced}=payload;
    const query=new URLSearchParams({
        userId:payload.userId
    })
    const response=await fetch(`${BASE_URL}/api/cart/getAll?${query}`,{
        method:"GET"
    });
    const responseJson=await response.json();
    console.log("responseJosnOfAllProducts");
    console.log(responseJson);
    const totalPrice=responseJson.reduce((acc,elem)=>acc+elem.elm.price*elem.quantity,0);
    setTotalPrice(totalPrice);
    
    thunkApi.dispatch(cartActions.getInitailState(responseJson));

});
export const quantityUpAsync=createAsyncThunk("put/quantityUp",async (payload,thunkApi)=>{
    console.log("quantityUpAsync");
    const {setTotalPrice}=payload;
    const query=new URLSearchParams({
        userId:payload.userId,
        productId:payload.productId
    })
    const response=await fetch(`${BASE_URL}/api/cart/quantityUp?${query}`,{
        method:'PUT'
    });
    console.log(response);
    const responseJson=await response.json();
    setTotalPrice((prevState)=>prevState+responseJson.elm.price*1);
    thunkApi.dispatch(cartActions.quantityUp(responseJson));
});
export const deleteAllCartItemAsync=createAsyncThunk("delete/deleteUserCartItems",async (payload,thunkApi)=>{
    console.log("deleteAllCartItemsAsync");
    const query=new URLSearchParams({
        userId:payload
    });
    const response=await fetch(`${BASE_URL}/api/cart/deleteCartItem?${query}`,{
        method:"DELETE"
    });
    const responseJson=await response.json();
    console.log(responseJson);
});
const cartSlice=createSlice({
    name:"cartSlice",
    initialState,
    reducers:{
        getInitailState:(state,action)=>{
            state.allCarts=[...action.payload]
        },
        addToCart:(state,action)=>{
            console.log("actionPayload");
            console.log(action.payload);
            const cartIndex=state.allCarts.findIndex((elm)=>elm.userId===action.payload.userId && elm.productId===action.payload.productId);
            console.log("cartIndex");
            console.log(cartIndex);
            if(cartIndex>=0){
                const cartIndex=state.allCarts.findIndex((elm)=>elm.productId===action.payload.productId);
                state.allCarts = state.allCarts.map((item, index) =>
                    index === cartIndex ? { ...action.payload } : item
                  );
            }else{
            state.allCarts.push(action.payload);
            }
            // state.allCarts=[...action.payload];
        },
        deleteCartItem:(state,action)=>{
            // console.log("deleteCartItemsCCCCCCCCCCCCCCCCCCCCCCCCC");
            console.log(action.payload);
            state.allCarts=[...action.payload];
        },
        quantityCart:(state,action)=>{
            const updatedProduct=action.payload;
            console.log("quantityCart");
            console.log(updatedProduct);
            // if(updatedProduct?.length>1){
            //     // const cartIndex=state.allCarts.findIndex((elm)=>elm.userId===updatedProduct.userId && elm.productId===updatedProduct.productId);
            //     // state.allCarts.splice(cartIndex,1);
            //     state.allCarts=[...updatedProduct];
            // }else{
            // if(updatedProduct.quantity===0){
            //     state.allCarts=state.allCarts.map((elm)=>{
            //         if(elm.productId!==updatedProduct.productId && elm.userId!==updatedProduct.userId){
            //             return elm;
            //         }
            //     })
            // }else{
            // if(updatedProduct.isZero){
            //     state.allCarts=[...updatedProduct.userCartItems]
            // }else{
            if(updatedProduct.isZero){
                state.allCarts=[...updatedProduct.userCartItems];
                // let totalPrice=0;
                // console.log("updateDeletedProduct"); 
                // console.log(updatedProduct.userCartItems);
                // totalPrice=totalPrice+updatedProduct.userCartItems.reduce((acc,elem)=>acc+elem.quantity*elem.elm.price);
                // setTotalPrice(totalPrice);
            }else{
            state.allCarts=state.allCarts.map((elm)=>{
                if(elm.userId==updatedProduct.cartItem.userId && elm.productId===updatedProduct.cartItem.productId && updatedProduct.cartItem.quantity>=1){
                    // setTotalPrice((prevState)=>prevState-updatedProduct.cartItem.elm.price);
                    return {...elm,quantity:updatedProduct.cartItem.quantity}
                }
                return elm;
            });
        }
        },
        quantityUp:(state,action)=>{
            state.allCarts=state.allCarts.map((elm)=>{
                if(elm.productId===action.payload.productId && elm.userId===action.payload.userId){
                    return {...elm,quantity:action.payload.quantity};
                }
                return elm;
            })
        },
        setCartToEmpty:(state,action)=>{
            state.allCarts=action.payload;
        }
        // totalPrice:(state,action)=>{
        //     state.totalPrice=state.allCarts
        //     .filter((elm) => elm.userId === action.payload)
        //     .reduce((acc, elm) =>{
        //         acc + parseFloat(elm.price) * parseFloat(elm.quantity), 0)
        //     };
        // }

    }
});
export const cartReducer=cartSlice.reducer;
export const cartActions=cartSlice.actions;
export const cartSelector=(state)=>state.cartReducer;